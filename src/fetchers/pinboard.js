import fetch from "node-fetch"
import { URL_PI_PINBOARD } from "./urls"
import { PINBOARD_CHANGE, PINBOARD_ROLE_CHANGE, PINBOARD_ADDED, pubsub } from "../constants"

const util = require("util")
import { getPersonById } from "../fetchers"

export const getPinboardById = async (nodeId, auth) => {
  let pinboard = await fetch(`${URL_PI_PINBOARD}/${nodeId}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  return pinboard
}

const getBy = role => {
  switch (role) {
    case "owner":
      role = "Owner"
      break
    case "consumer":
      role = "Consumer"
      break
    case "editor":
      role = "Editor"
      break
  }
  return role
}

export const getPinboardsById = async (args, auth) => {
  let role = getBy(args.role)
  const NS_PER_SEC = 1e9
  const time = process.hrtime()

  let pinboards = await fetch(`${URL_PI_PINBOARD}/PinboardsBy${role}/${args.id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      const diff = process.hrtime(time)
      // console.log(diff)
      // console.log(`${args.role} took ${diff[0] + diff[1]} nanoseconds`)
      const timeInSd = (diff[0]* 1000000000 + diff[1]) / 1000000000;
      console.log(`${args.role} pinboards took ${timeInSd} seconds from ${URL_PI_PINBOARD}`)
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  // console.log(util.inspect(pinboards, false, 7, true))
  return pinboards
}

export const getPinboards = async (args, auth) => {

  let pinboards = await fetch(`${URL_PI_PINBOARD}/AllPinboards`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  // console.log(util.inspect(pinboards, false, 7, true))
  return pinboards
}

export const getPinboardContentById = async (nodeId, auth) => {
  let content = await fetch(`${URL_SEARCH_MAIN}/${nodeId}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)
  return content
}

export const setPinboardRole = async (args, auth) => {
  let role = getBy(args.role)
  let pinboardRole = await fetch(`${URL_PI_PINBOARD}/Add${role}ToPinboard/${args.id}/${args.pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  })
    .then(response => response.json())
    .catch(error => error)

  // console.log(util.inspect(pinboardRole, false, 7, true))

  let pinboard = await getPinboardById(args.pid, auth)
  if (pinboardRole.id !== undefined) {
    let returnData = pinboardRole
    pinboardRole = {
      racf: args.id,
      id: returnData.id,
      name: returnData.name,
      email: returnData.email,
      pid: args.pid,
      role: role,
      pinboard
    }
    pubsub.publish(PINBOARD_ROLE_CHANGE, { pinboardRole: pinboardRole })
  } else {
    pinboardRole = false
  }

  return pinboardRole
}

export const addPinboard = async (args, auth) => {
  let post = { ...args.post }

  let pinboard = await fetch(`${URL_PI_PINBOARD}/${args.id}`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  })
    .then(response => response.json())
    .catch(error => error)

  if (pinboard.id !== undefined && post.title !== "") {
    post.id = pinboard.id
    pinboard = post
    pubsub.publish(PINBOARD_ADDED, { pinboard })
  } else {
    pinboard = false
  }
  return pinboard
}

export const addToPinboard = async (args, auth) => {
  let add = await fetch(`${URL_PI_PINBOARD}/AddContentToPinboard/${args.id}/${args.pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }).catch(error => error)

  let pinboard = await getPinboardById(args.pid, auth)

  if (add.status === 200) {
    add = pinboard.title
  } else {
    add = false
  }
  return add
}

export const changePinboard = async (args, auth) => {
  let data = await getPinboardById(args.id, auth)
  let put = { ...data, ...args.put }
  let pinboard = await fetch(`${URL_PI_PINBOARD}/UpdatePinboard/${args.id}`, {
    method: "PUT",
    body: JSON.stringify(put),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }).catch(error => error)

  if (pinboard.status === 200) {
    pinboard = put
    pubsub.publish(PINBOARD_CHANGE, { pinboard: pinboard })
  } else {
    pinboard = false
  }

  return pinboard
}

export const removePinboard = async (args, auth) => {
  let pinboard = await fetch(`${URL_PI_PINBOARD}/DeletePinboard/${args.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }).catch(error => error)

  if (pinboard.status === 200) {
    pinboard = {
      id: args.id
    }
  } else {
    pinboard = false
  }

  return pinboard
}

export const removeUserFromPinboard = async (args, auth) => {
  let pinboard = await fetch(`${URL_PI_PINBOARD}/RemoveUserFromPinboard/${args.id}/${args.pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }).catch(error => error)
  
  if (pinboard.status === 200) {
    pinboard = {
      racf: args.id,
      id: args.pid
    }
  } else {
    pinboard = false
  }

  return pinboard
}
