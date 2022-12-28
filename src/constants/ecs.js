import * as fs from "fs"
import * as path from "path"
const { ECS_ACCESS_KEY_ID, ECS_SECRET_KEY, ECS_REGION, ECS_EP } = process.env
// import entire AWS SDK
import AWS from "aws-sdk"
// import individual service
import S3 from "aws-sdk/clients/s3"
import { URL_GRAPHQL } from "../fetchers/urls";

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html

export class S3Service {
  constructor() {
    this.region = ECS_REGION || ""
    // Set the Region
    AWS.config.update({ region: this.region })
    AWS.config.update({ accessKeyId: ECS_ACCESS_KEY_ID, secretAccessKey: ECS_SECRET_KEY, endpoint: `http://${ECS_EP}/` })
    AWS.config.getCredentials(function (err) {
      if (err) console.log(err.stack)
      // credentials not loaded
      else {
        console.log("ECS credentials:", AWS.config.credentials)
      }
    })
    this.s3 = new S3()
  }

  // Call S3 to list the buckets
  listBuckets() {
    return new Promise((resolve, reject) => {
      this.s3.listBuckets(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Buckets)
        }
      })
    })
  }

  // Call S3 to create the bucket
  createBucket(bucketName) {
    const bucketParams = {
      Bucket: bucketName,
      ACL: "public-read"
    }
    return new Promise((resolve, reject) => {
      this.s3.createBucket(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Location)
        }
      })
    })
  }

  // Call S3 to create the bucket
  uploadObject(bucketName, filePath, id) {
    // call S3 to retrieve upload file to specified bucket
    const fileStream = fs.createReadStream(filePath)
    fileStream.on("error", function (err) {
      console.log("File Error", err)
    })
    const uploadParams = { Bucket: bucketName, Key: `${id}_${path.basename(filePath)}`, Body: fileStream }

    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
      this.s3.upload(uploadParams, function (err, data) {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data.Location)
        }
      })
    })
  }

  // Call S3 to create the bucket
  putObject(bucketName, filePath, id, description) {
    console.log(description)
    // call S3 to retrieve upload file to specified bucket
    const fileStream = fs.createReadStream(filePath)
    fileStream.on("error", function (err) {
      console.log("File Error", err)
    })
    const putParams = {
      Bucket: bucketName,
      Key: `${path.basename(filePath)}`,
      Body: fileStream,
      Metadata: {
        id,
        filePath,
        description
      }
    }

    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
      this.s3.putObject(putParams, function (err, data) {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data)
        }
      })
    })
  }
  // Call S3 to create the bucket
  storeObject(bucketName, targetName, format, fileData, meta) {
    const putParams = {
      Bucket: bucketName,
      Key: targetName,
      Body: fileData,
      Metadata: meta
    }

    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
      this.s3.putObject(putParams, function (err, data) {
        if (err) {
          reject(err)
        }
        if (data) {
//          data.Url = `http://${bucketName}.${ECS_EP}/${targetName}`
          data.Url = `${URL_GRAPHQL}/get-file/${bucketName}/${targetName}`
          data.Guid = targetName.split("_", 1)[0]
          data.Key = targetName
          data.Format = format
          resolve(data)
        }
      })
    })
  }

  // Call S3 to create the bucket
  ManagedUpload(bucketName, filePath, id, description) {
    console.log(description)
    // call S3 to retrieve upload file to specified bucket
    const fileStream = fs.createReadStream(filePath)
    fileStream.on("error", function (err) {
      console.log("File Error", err)
    })
    const putParams = {
      Bucket: bucketName,
      Key: `${path.basename(filePath)}`,
      Body: file,
      Metadata: {
        id,
        filePath,
        description
      }
    }

    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
      this.s3.ManagedUpload(putParams, function (err, data) {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data)
        }
      })
    })
  }

  createPresignedPost(bucketName, filePath, id, description) {
    const putParams = {
      Bucket: bucketName,
      Key: "my-object.webm",
      Fields: {
        Key: "my-object.webm"
      }
    }

    // call S3 to retrieve upload file to specified bucket
    return new Promise((resolve, reject) => {
      this.s3.createPresignedPost(putParams, function (err, data) {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data)
        }
      })
    })
  }

  // Call S3 to create the bucket
  listObjects(bucketName) {
    const bucketParams = {
      Bucket: bucketName
    }
    return new Promise((resolve, reject) => {
      this.s3.listObjectsV2(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // Call S3 to create the bucket
  listObjectVersions(bucketName, objectName) {
    const bucketParams = {
      Bucket: bucketName,
      Prefix: objectName
    }
    return new Promise((resolve, reject) => {
      this.s3.listObjectVersions(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // Call S3 to delete the bucket
  // The bucket must be empty in order to delete it.
  deleteBucket(bucketName) {
    const bucketParams = {
      Bucket: bucketName
    }
    return new Promise((resolve, reject) => {
      this.s3.deleteBucket(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // Call S3 to delete object
  deleteObject(bucketName, key) {
    const bucketParams = {
      Bucket: bucketName,
      Key: key
    }
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // Call S3 to retrieve policy for selected bucket
  getBucketPolicy(bucketName) {
    const bucketParams = {
      Bucket: bucketName
    }
    return new Promise((resolve, reject) => {
      this.s3.getBucketPolicy(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Policy)
        }
      })
    })
  }

  // Call S3 to retrieve policy for selected bucket
  putBucketPolicy(bucketName) {
    // https://docs.aws.amazon.com/AmazonS3/latest/dev/using-with-s3-actions.html
    const readOnlyAnonUserPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: `${Date.now()}`,
          Effect: "Allow",
          Principal: "*",
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${bucketName}/*`]
        }
      ]
    }

    // {
    //     "Version": "2012-10-17",
    //     "Statement": [
    //         {
    //             "Effect": "Allow",
    //             "Principal": {
    //                 "AWS": "arn:aws:iam::059057590445:user/iamuser"
    //             },
    //             "Action": [
    //                 "s3:ListBucket",
    //                 "s3:ListBucketVersions",
    //                 "s3:GetBucketLocation",
    //                 "s3:Get*",
    //                 "s3:Put*"
    //             ],
    //             "Resource": [`arn:aws:s3:::${bucketName}/*`]
    //         }
    //     ]
    // }
    // convert policy JSON into string and assign into params
    const bucketPolicyParams = { Bucket: bucketName, Policy: JSON.stringify(readOnlyAnonUserPolicy) }

    return new Promise((resolve, reject) => {
      this.s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  // Call S3 to delete policy for selected bucket
  deleteBucketPolicy(bucketName) {
    const bucketParams = { Bucket: bucketName }
    return new Promise((resolve, reject) => {
      this.s3.deleteBucketPolicy(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  putBucketVersioning(bucketName, MFADelete = "Disabled", Status = "Suspended") {
    const bucketParams = {
      Bucket: bucketName,
      VersioningConfiguration: {
        MFADelete,
        Status
      }
    }
    return new Promise((resolve, reject) => {
      this.s3.putBucketVersioning(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  getBucketVersioning(bucketName) {
    const bucketParams = { Bucket: bucketName }
    return new Promise((resolve, reject) => {
      this.s3.getBucketVersioning(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  getObject(bucketName, Key, VersionId) {
    const bucketParams = { Bucket: bucketName, Key }

    if(typeof(VersionId) != "undefined"){
      bucketParams.VersionId = VersionId
    }
    else if(VersionId === "null" || VersionId == "original"){
      bucketParams.VersionId = null;
    }

    return new Promise((resolve, reject) => {
      this.s3.getObject(bucketParams, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
