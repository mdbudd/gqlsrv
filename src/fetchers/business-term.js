import fetch from "node-fetch"
import { URL_PI_BUSINESS_TERM } from "./urls"
const util = require("util")

export const getBusinessTermById = async (id, auth) => {
  let data = await fetch(`${URL_PI_BUSINESS_TERM}/${id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => response.json())
    .then(data => {
      let businessTerm = extractBusinessTerm(data)
      if(data.hasParentBusinessTerms){
        businessTerm.hasParentBusinessTerms = data.hasParentBusinessTerms.items.map((x) => extractBusinessTerm(x))
      }
      if(data.seeAlsoBusinessTerms){
        businessTerm.seeAlsoBusinessTerms = data.seeAlsoBusinessTerms.items.map((x) => extractBusinessTerm(x))
      }
      return data
    })
    .catch(error => error)

  return data
}

const extractBusinessTerm = (businessTerm) => {
  businessTerm.title = businessTerm.name
  businessTerm.id = businessTerm.registryId
  return businessTerm
}