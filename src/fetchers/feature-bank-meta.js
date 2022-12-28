import fetch from "node-fetch"
import { URL_FEATURE_BANK_META } from "./urls"
const { FB_META_USER, FB_META_PASS, FB_META_DOMAIN } = process.env
import { keysToCamel } from "../constants/helpers"

export const getMetaToken = async () => {
  const username = FB_META_USER,
    password = FB_META_PASS,
    domain = FB_META_DOMAIN
  const body = { username, password, domain }
  const auth = Buffer.from(JSON.stringify(body)).toString("base64")
  let token = await fetch(`${URL_FEATURE_BANK_META}/api/mdapi/v1/auth/login`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  return token
}

export const searchMetaTables = async args => {
  let { id = "", page = 0, size = 10 } = args
  let auth = await getMetaToken()
  const body = {
    filter: {
      search_string: id
    },
    pagination: {
      page,
      size
    }
  }

  let tables = await fetch(`${URL_FEATURE_BANK_META}/api/mdapi/onprem/tables/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  return keysToCamel(tables.data)
}

export const getMetaTable = async args => {
  let tables = await searchMetaTables(args)
  var table = tables.filter(function (item) {
    return args.id == item.tableName
  })[0]
  return table
}
