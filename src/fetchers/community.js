import fetch from "node-fetch"
import { URL_CONVERSATION, GET_CONV_OPTS, URL_RATING } from "./urls"
const util = require("util")

export const getConversationById = async nodeId => {
  let conversation = await fetch(`${URL_CONVERSATION}/${nodeId}/${GET_CONV_OPTS}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  return conversation
}

export const getRatingById = async args => {
  let rating = await fetch(`${URL_RATING}Entity/Author?entityId=${args.id}&racf=${args.racf}`)
    .then(response => response)
    .then(data => data)
    .catch(error => error)
  if (rating.status === 200) {
    rating = rating.json()
  }

  return rating
}

export const getEntityRatingSummary = async args => {
  let rating = await fetch(`${URL_RATING}Entity/Summary/${args.id}`)
    .then(response => response)
    .then(data => data)
    .catch(error => error)

  // console.log(util.inspect(rating, false, 7, true))
  if (rating.status === 200) {
    rating = rating.json()
  }
  return rating
}

export const setRating = async (args, auth) => {
  let postData = {
    method: "POST",
    body: JSON.stringify(args.post),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }

  let rating = await fetch(`${URL_RATING}`, postData)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  return rating
}
