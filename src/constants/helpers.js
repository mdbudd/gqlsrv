import { S3Service } from "./ecs"
import * as fs from "fs"
import { v4 as uuidv4 } from "uuid"
const CSV = require("csv-string")
const jwt = require("jsonwebtoken")
var multer = require("multer")
var mime = require("mime-types")
const util = require("util")
var amqp = require("amqplib/callback_api")

const { RABBIT_DOM, RABBIT_URL, RABBIT_PASS, RABBIT_USER, RABBIT_ENV } = process.env

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
  destination: "store/",
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

export const store = multer({ storage: storage })

export const storeFile = args => {
  console.log(args)
  let targetName = args.object.filename
  let path = args.object.path
  let format = mime.extension(args.object.mimetype)
  let res = args.res
  let type = args.type
  let meta = args.meta || {
    id: "",
    title: "",
    purpose: "",
  }
  console.log("preparing to store...")
  console.log(res)
  if (res != undefined) {
    // this is the old file handler from express endpoint
    fs.readFile(path, async function (err, fileData) {
      if (!err) {
        const buckets = new S3Service()
        let key = type == "new" ? `${uuidv4()}_${targetName}` : `${targetName}`
        const storeObject = await buckets.storeObject("pi-flint-store", key, format, fileData, meta)
        await addFileToIndexQueue(storeObject.Guid, storeObject.Key, "pi-flint-store")
        //   console.log(util.inspect(storeObject, false, 7, true))
        fs.unlink(path, function (err) {
          if (err) throw err
          console.log("File deleted!")
        })
        return res.send({ success: true, object: storeObject })
      } else {
        console.log({ err: err })
        return res.send({ success: false })
      }
    })
  } else {
    // this is the new file handler from GraphQL mutation
    fs.readFile(path, async function (err, fileData) {
      if (!err) {
        const buckets = new S3Service()
        let key = type == "new" ? `${uuidv4()}_${targetName}` : `${targetName}`
        const storeObject = await buckets.storeObject("pi-flint-store", key, format, fileData, meta)
        await addFileToIndexQueue(storeObject.Guid, storeObject.Key, "pi-flint-store")
        //   console.log(util.inspect(storeObject, false, 7, true))
        fs.unlink(path, function (err) {
          if (err) throw err
          console.log("File deleted!")
        })
        return { success: true, object: storeObject }
      } else {
        console.log({ err: err })
        return { success: false }
      }
    })
  }
}

export const createObject = async ({ stream, filename, mimetype }) => {
  fs.mkdir("objects", { recursive: true }, err => {
    if (err) throw err
  })
  const path = `objects/${filename}`
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on("finish", () => resolve({ path, filename, mimetype }))
      .on("error", reject)
  )
}
export const processUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload
  const stream = createReadStream()
  const file = await storeUpload({ stream, filename, mimetype })
  return file
}

function getPolicies() {
  const buckets = new S3Service()
  return new Promise((res, rej) => {
    buckets.getObject("mounted-bucket", "access-policies.csv", null).then(response => res(response.Body.toString()))
  })
}

function userHasPermission(policies, bucket, roles) {
  let matchingPolicies = policies
    // .filter((x) => x.bucket == bucket)
    .filter(x => {
      return roles.map(y => y.toLowerCase()).includes(x.role.toLowerCase()) || x.role === "*"
    })
  return matchingPolicies.length > 0
}

function retrieveToken(headers) {
  const authHeader = headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) return false
  let decodedToken = false
  try {
    decodedToken = jwt.verify(token, "correctly-sized-shared$ecret")
  } catch (err) {
    console.log("token invalid, request will be rejected")
  }
  return decodedToken
}

function extractPolicies(csvString) {
  let csvData = CSV.parse(csvString)
  let policies = []
  csvData.map((x, i, arr) => {
    if (i != 0) {
      policies.push({
        bucket: x[0],
        role: x[1],
      })
    }
  })
  return policies
}

export const fetchFile = (bucket, key, res, version, headers) => {
  const buckets = new S3Service()
  const userToken = retrieveToken(headers)
  buckets
    .getObject(bucket, key, version)
    .then(response => {
      getPolicies().then(data => {
        let userPermitted = userToken ? userHasPermission(extractPolicies(data), bucket, userToken.roles) : false
        if (userPermitted) {
          res.send(response.Body)
        } else {
          res.status(403).send("No access to this file - please contact the flint administrators")
        }
      })
    })
    .catch(err => res.status(400).send({ sucess: false, err: err }))
}

export const formatDate = date => {
  let dateConv = new Date(date)
  let formatted_date = dateConv.getDate() + "/" + (dateConv.getMonth() + 1)
  return formatted_date
}

const addFileToIndexQueue = (guid, key, bucket) => {
  return new Promise((res, rej) => {
    amqp.connect(`${RABBIT_DOM}://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_URL}`, function (error0, connection) {
      if (error0) {
        throw error0
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1
        }
        var exchange = `${RABBIT_ENV}_flint_file_indexing`
        var msg = JSON.stringify({
          fileGuid: guid,
          bucket: bucket,
          key: key,
        })

        channel.assertExchange(exchange, "fanout", {
          durable: true,
        })
        channel.publish(exchange, "", Buffer.from(msg))
        res(true)
      })
    })
  })
}
const toCamel = s => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace("-", "").replace("_", "")
  })
}

const isArray = function (a) {
  return Array.isArray(a)
}

const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function"
}

export const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {}

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = keysToCamel(o[k])
    })

    return n
  } else if (isArray(o)) {
    return o.map(i => {
      return keysToCamel(i)
    })
  }

  return o
}
