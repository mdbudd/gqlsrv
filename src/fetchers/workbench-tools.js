import fetch from "node-fetch"
const util = require("util")

import { URL_PI_TOOLS } from "./urls"

const toolLibrarySuffix = "/FlintServices/ToolLibrary/"

export const getTools = async nodeId => {
  let asc = false

  if (nodeId == "ASC") {
    nodeId = ""
    asc = true
  }

  let tools = await fetch(`${URL_PI_TOOLS}${toolLibrarySuffix}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const toolA = a.toolName.toUpperCase()
    const toolB = b.toolName.toUpperCase()

    let comparison = 0
    if (toolA > toolB) {
      comparison = 1
    } else if (toolA < toolB) {
      comparison = -1
    }
    return comparison
  }

  //console.log(util.inspect(tool, false, 7, true));

  tools = asc ? tools.sort(compare) : tools
  return tools
}

export const getToolById = async nodeId => {
  let tool = await fetch(`${URL_PI_TOOLS}${toolLibrarySuffix}${nodeId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  return tool
}

export const getToolsByIds = async ids => {
  let postData = {
    method: "POST",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let tools = await fetch(`${URL_PI_TOOLS}${toolLibrarySuffix}Tools`, postData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(tools, false, 7, true));

  return tools
}

export const getToolsByJourney = async nodeId => {
  let tools = await fetch(`${URL_PI_TOOLS}${toolLibrarySuffix}Tools/Journey/${nodeId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  return tools
}
