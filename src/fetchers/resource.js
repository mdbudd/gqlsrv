import fetch from "node-fetch"
const util = require("util")

import { URL_PI_RESOURCES } from "./urls"

const resLibSuffix = "/FlintServices/Resource/"

export const getResourceByCategory = async category => {
  let data = await fetch(`${URL_PI_RESOURCES}${resLibSuffix}Category/${category}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(data, false, 7, true));

  return data
}

export const getResourcesByIds = async ids => {
  let postData = {
    method: "POST",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let tools = await fetch(`${URL_PI_RESOURCES}${resLibSuffix}Resources`, postData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(tools, false, 7, true));

  return tools
}
