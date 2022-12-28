import fetch from "node-fetch"
import "@babel/polyfill"
import { URL_KITEMARK } from "./urls"

export const setKitemark = async (nodeId, auth) => {
  let body = {
    kitemarkedObjectId: nodeId.id
  }

  let kitemark = await fetch(`${URL_KITEMARK}`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).catch(error => error)

  kitemark = kitemark.status === 201 ? "TRUE" : "FALSE"
  return kitemark
}
