import fetch from "node-fetch"
import "@babel/polyfill"
import { URL_PI_NOTIFICATIONS } from "./urls"
const util = require("util")

export const getMissedNotifications = async (racf, auth) => {
  let getData = {
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }
  let data = await fetch(`${URL_PI_NOTIFICATIONS}/FlintServices/Notifications/0/2000`, getData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
    // console.log(util.inspect(data, false, 7, true))
    
    // console.log(util.inspect(data.splice(0,20), false, 7, true))
  let dataList = []

  data.map(item => {
    let newItem = {
      id: item.id,
      entityId: item.relevantObjectId,
      originId: item.originId,
      racf: item.recipientRacf,
      title: item.title,
      description: item.description,
      acked: item.acked,
      date: item.notificationDate,
      type: item.notificationType,
      app: item.appName,
      url: item.launchURL
    }
    dataList.push(newItem)
  })

    // console.log(util.inspect(dataList.splice(0,20), false, 7, true))
  return dataList
}

export const getNotificationById = async (id, auth) => {
  let getData = {
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }
  let data = await fetch(`${URL_PI_NOTIFICATIONS}/FlintServices/Notifications/${id}`, getData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  return data
}

export const ackNotifications = async (ids, auth) => {
  let postData = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ids)
  }
  let data = await fetch(`${URL_PI_NOTIFICATIONS}/FlintServices/Notifications/Ack`, postData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  if (data === true) {
    const retData = []
    await Promise.all(
      ids.map(async (id, i) => {
        let idItem = await getNotificationById(id, auth)
        let newItem = {
          id: idItem.id,
          racf: idItem.recipientRacf,
          title: idItem.title,
          description: idItem.description,
          acked: idItem.acked,
          date: idItem.notificationDate,
          type: idItem.notificationType,
          app: idItem.appName,
          url: idItem.launchURL
        }
        retData.push(newItem)
      })
    )
    data = retData
  }
  return data
}
