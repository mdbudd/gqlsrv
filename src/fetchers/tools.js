import fetch from "node-fetch"
import { getReportById, getDataById, getPersonById, getToolById } from "../fetchers"

import {
  URL_SUBSCRIPTION_GROUPS,
  URL_SUBSCRIPTION_ENTITY,
  URL_SUBSCRIPTION_ENTITY_AND_SUBSCRIBER,
  URL_SUBSCRIPTION_ADD,
  URL_PI_PREFERENCES,
  URL_SEARCH_MAIN,
  URL_SEARCH_DATA,
  URL_PI_REPORT
} from "./urls"

export const getSubscriptionGroupsByRacf = async (nodeId, type, auth) => {
  let subs = await fetch(`${URL_SUBSCRIPTION_GROUPS}/${nodeId}?groupType=${type}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
  auth = `Bearer ${auth}`
  // console.log(util.inspect(subs, false, 7, true));

  // not 100% on what the following were doing, liaise with Chris before removing completely
  const getData = (getFunction, id, auth) => new Promise(resolve => resolve(getFunction(id, auth)))
  const timeout = (cb, interval) => () => new Promise(resolve => setTimeout(() => cb(resolve), interval))
  const onTimeout = timeout(resolve => resolve(null), 3000)

  async function getEntity(getFunction, id) {
    if (typeof getFunction !== "function") {
      return
    }
    let insight
    // insight = await getFunction(id, auth)

    // not 100% on what the following were doing, liaise with Chris before removing completely
    insight = await Promise.race([getData, onTimeout].map(f => f(getFunction, id, auth))).then(e => e)

    return insight
  }

  subs = {
    total: subs.length,
    subscriptionGroup: subs.map((group, i) => {
      return {
        id: group.id,
        groupName: group.groupName,
        racf: group.racf,
        displayOrder: group.displayOrder,

        subscriptions: group.subscriptions.map((sub, i) => {
          var entity
          var entityFunction = null
          switch (sub.entityType) {
            case 0:
              entityFunction = getReportById
              break
            case 1:
              entityFunction = getDataById
              break
            case 2:
              entityFunction = getPersonById
              break
            case 3:
              entityFunction = getToolById
              break
          }
          entity = getEntity(entityFunction, sub.entityId)

          return {
            id: sub.id,
            entityId: sub.entityId,
            racf: sub.racf,
            lastModified: sub.lastModified,
            groupId: sub.groupId,
            displayOrder: sub.displayOrder,
            entity: entity
          }
        })
      }
    })
  }

  return subs
}

export const getSubscriptionsByEntity = async nodeId => {
  let subs = await fetch(`${URL_SUBSCRIPTION_ENTITY}${nodeId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(subs, false, 7, true));

  return subs
}

export const getSubscriptionsByEntityAndSubscriber = async args => {
  let sub = await fetch(`${URL_SUBSCRIPTION_ENTITY_AND_SUBSCRIBER}${args.id}&racf=${args.racf}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(subs, false, 7, true));

  return sub
}

export const setSubscription = async args => {
  let postData = {
    method: "POST",
    body: JSON.stringify(args.post),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let subscription = await fetch(`${URL_SUBSCRIPTION_ADD}`, postData)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  return subscription
}

export const deleteSubscription = async args => {
  let subscription = await fetch(`${URL_SUBSCRIPTION_ADD}${args.id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  return subscription
}

export const getInsights = async args => {
  let { id, racf, orderBy } = args
  let filters = []
  let start = 0
  let amount = 2000
  let url = ""
  let sort = []
  let order = orderBy || "desc"
  let lowerRacf = racf.toLowerCase()
  let upperRacf = racf.toUpperCase()

  switch (id) {
    case "report":
      url = URL_SEARCH_MAIN
      filters = [
        {
          field: "author",
          values: ["" + lowerRacf + "", "" + upperRacf + ""]
        }
      ]
      sort = [
        { "data.hits.hits._source.date_created_at_source": { order: "" + order + "" } },
        { "data.hits.hits._source.date_last_updated": { order: "" + order + "" } },
        { "data.hits.hits._source.title": { order: "asc" } }
      ]
      break
    case "data":
      url = URL_SEARCH_DATA
      filters = [
        {
          field: "owner",
          values: ["" + lowerRacf + "", "" + upperRacf + ""]
        }
      ]
      sort = [{ "data.hits.hits.date_last_updated": { order: "" + order + "" } }, { "data.hits.hits.object_name": { order: "asc" } }]
      break
  }
  let data = {
    filters: filters,
    sort: sort
  }
  let postData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let search = await fetch(`${url}/${id}/${start}/${amount}`, postData)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  let insights = search.data.hits.hits.map((x, i) => {
    return {
      id: x._source.id,
      title: x._source.title ? x._source.title : x._source.object_name,
      url: x._source.url ? x._source.url : "",
      format: x._source.file_format ? x._source.file_format : x._source.object_type,
      display_date: x._source.date_created_at_source ? x._source.date_created_at_source : x._source.date_last_updated
    }
  })

  //console.log(util.inspect(insights, false, 7, true));
  return insights
}

export const removeFromSearch = async args => {
  let removeUrl = ""
  let postData = {
    method: "POST",
    body: JSON.stringify(args.id),
    headers: {
      "Content-Type": "application/json"
    }
  }

  switch (args.entityType) {
    case "report":
      removeUrl = `${URL_PI_REPORT}/Remove`
      break
  }

  let remove = await fetch(`${removeUrl}`, postData)
    .then(response => response.status === 204)
    .then(data => {
      return data
    })
    .catch(error => error)

  return remove
}

export const getExcludedReportsByAuthor = async args => {
  let exclusions = await fetch(`${URL_PI_REPORT}/Excluded/${args.id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(exclusions, false, 7, true));

  return exclusions
}

export const getPreferenceByKey = async args => {
  let preference = await fetch(`${URL_PI_PREFERENCES}/FlintServices/Preference/key/${args.id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(subs, false, 7, true));

  return preference
}

export const getUserPreferences = async args => {
  let preferences = await fetch(`${URL_PI_PREFERENCES}/FlintServices/UserPreference/racf/${args.id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(subs, false, 7, true));

  return preferences
}

export const getUserPreferenceById = async args => {
  let preference = await fetch(`${URL_PI_PREFERENCES}/FlintServices/UserPreference/${args.id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(preference, false, 7, true));

  return preference
}

export const getUserPreferenceByKey = async args => {
  let preference = await fetch(`${URL_PI_PREFERENCES}/FlintServices/UserPreference/racf/key?racf=${args.racf}&key=${args.key}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(subs, false, 7, true));

  return preference
}

export const setUserPreference = async args => {
  let url = `${URL_PI_PREFERENCES}/FlintServices/UserPreference`
  var preference

  let postData = {
    method: "POST",
    body: JSON.stringify(args.post),
    headers: {
      "Content-Type": "application/json"
    }
  }

  if (args.post.id !== undefined && args.post.id !== null) {
    postData.method = "PUT"
    url = `${URL_PI_PREFERENCES}/FlintServices/UserPreference/${args.post.id}`

    preference = await fetch(url, postData)
      .then(response => response.status === 204)
      .then(data => {
        if (data) {
          let pref = getUserPreferenceById({ id: args.post.id })
          return pref
        } else {
          return data
        }
      })
      .catch(error => error)
  } else {
    preference = await fetch(url, postData)
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => error)
  }

  return preference
}
