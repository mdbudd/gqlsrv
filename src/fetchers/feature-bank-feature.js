import fetch from "node-fetch"
import { URL_PI_FEATURE_BANK } from "./urls"
const util = require("util")

export const getFeatureById = async (id, auth) => {
  let data = await fetch(`${URL_PI_FEATURE_BANK}/${id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  return data
}