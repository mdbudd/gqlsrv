import fetch from "node-fetch"
const util = require("util")

import { URL_PI_RELATIONSHIP } from "./urls"
import { getPeopleByIds } from "./people"
import { getToolsByIds } from "./workbench-tools"
import { getResourcesByIds } from "./resource"

const relLibSuffix = "/FlintServices/RelationshipLibrary/"

const getRelationshipsByTypeAndId = async args => {
  let postData = {
    method: "POST",
    body: JSON.stringify(args),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let rels = await fetch(`${URL_PI_RELATIONSHIP}${relLibSuffix}Type`, postData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(rels, false, 7, true));

  return rels
}

const getRelationshipIds = async args => {
  let data = await getRelationshipsByTypeAndId(args)
    .then(data => data)
    .catch(error => error)

  let ids = data.map((d, i) => {
    return args.toId != undefined ? d.fromId : d.toId
  })

  return ids
}

export const getRelationshipData = async args => {
  let relData
  var dataFunction
  let ids = await getRelationshipIds(args)

  switch (args.relationshipType) {
    case "champion":
      relData = await getPeopleByIds(ids)
        .then(data =>
          data.map((p, i) => {
            return {
              id: p.id,
              name: p.name,
              racf: p.racfid,
              email: p.email,
              salaryRef: p.salaryRef
            }
          })
        )
        .catch(error => error)
      break
    case "related":
      dataFunction = getToolsByIds
      break
    case "resource":
      dataFunction = getResourcesByIds
      break
  }

  if (dataFunction != undefined) {
    relData = await dataFunction(ids)
      .then(data => data)
      .catch(error => error)
  }

  return relData
}
