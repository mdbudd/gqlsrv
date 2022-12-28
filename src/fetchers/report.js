import fetch from "node-fetch"
import { URL_REPORT, URL_PI_REPORT, URL_SEARCH } from "./urls"
import { REPORT_CHANGE, pubsub } from "../constants"
const util = require("util")

export const getReportPIById = async (id, auth) => {
  let data = await fetch(`${URL_PI_REPORT}/${id}`, {
    headers: {
      Authorization: auth,
    },
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  return data
}

export const getReportById = async (nodeId, auth) => {
  // console.log(auth)
  let report = await fetch(`${URL_REPORT}/${nodeId}`, {
    headers: {
      Authorization: auth,
    },
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  let reportPI = await getReportPIById(nodeId, auth)

  // console.log(report)
  //   console.log(util.inspect(report.data._source, false, 7, true));

  report = {
    id: report.data._source.id,
    title: report.data._source.title,
    url: report.data._source.url,
    views: report.data._source.views,
    viewsFromSource: report.data._source.views_from_source,
    comments: report.data._source.comments,
    format: report.data._source.file_format,
    team: report.data._source.team,
    certified: report.data._source.certified,
    timestamp: report.data._source["@timestamp"],
    created: report.data._source.date_created_at_source,
    updated: report.data._source.updated,
    viewsFromSource: report.data._source.views_from_source,
    comments: report.data._source.comments || 0,
    source: report.data._source.source,
    authorId: report.data._source.author,
    authorName: report.data._source.author_details.known_as,
    authorRacf: report.data._source.author_details.racf,
    purpose: reportPI.purpose || "", // can change back to Elastic when hooked up to logstash
    kitemarked: report.data._source.kitemarked,
    related: report.data.relatedReports.hits.hits.map((x, i) => {
      return {
        id: x._source.id,
        title: x._source.title,
        url: x._source.url,
        format: x._source.file_format,
        views: x._source.views,
        team: x._source.team,
        // purpose: x._source.purpose,
        // author: x._source.author,
        // doc_count: x._source.doc_count,
        // rating: x._source.rating,
        // suggestions: search.suggestions,
      }
    }),
    csvHeaders: report.data._source.csvHeaders,
  }
  // pubsub.publish(REPORT_CHANGE, { report: report })
  // console.log(report)
  return report
}

export const changeReport = async (args, auth) => {
  // console.log(util.inspect(args, false, 7, true));
  let dataPI = await getReportPIById(args.id, auth)

  let put = { ...dataPI, ...args.put }
  // console.log(util.inspect(put, false, 7, true));
  let report = await fetch(`${URL_PI_REPORT}/${args.id}/${args.originId}`, {
    method: "PUT",
    body: JSON.stringify(put),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  }).catch(error => error)

  // console.log(util.inspect(report, false, 7, true));
  if (report.status === 204) {
    report = put
    pubsub.publish(REPORT_CHANGE, { report: report })
  } else {
    report = false
  }

  return report
}

export const putReport = async (args, auth) => {
  const {
    id,
    title = "",
    author = args.id || "Unknown",
    rating = 0,
    type = null,
    passProtected = 0,
    updated = "",
    views = 0,
    purpose = "",
    certified = "",
    team = null,
    format = "",
    url = "",
    source = null,
    viewsFromSource = 0,
    idFromSource = null,
    fileFormat = null,
    dateCreatedAtSource = new Date().toISOString(),
    tagIds = [],
  } = args.put

  var data = {
    id,
    title,
    author,
    rating,
    type,
    passProtected,
    updated,
    views,
    purpose,
    certified,
    team,
    format,
    url,
    source,
    viewsFromSource,
    idFromSource,
    fileFormat,
    dateCreatedAtSource,
    tagIds,
  }

  let report = await fetch(`${URL_PI_REPORT}/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  }).catch(error => error)

  if (report.status === 201) {
    report = data
  } else {
    report = false
  }
  // let report = data
  // console.log(report)
  return report
}

export const logLaunch = async (args, auth) => {
  let data = { "document_id": args.id }
  let log = await fetch(`${URL_SEARCH}/log-launch`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  }).catch(error => error)

  if (log.status === 200) {
    log = true
  } else {
    log = false
  }

  return log
}

export const addHit = async (args, auth) => {
  let data = {
    "search_term": args.term,
    "correct_document_id": args.id,
  }
  let hit = await fetch(`${URL_SEARCH}/add-correct-hit`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  }).catch(error => error)

  if (hit.status === 200) {
    hit = true
  } else {
    hit = false
  }

  return hit
}
