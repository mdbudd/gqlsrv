import fetch from "node-fetch"
import { URL_RELATED } from "./urls"

export const getRelated = async (from, to, nodeId) => {
  let related = await fetch(`${URL_RELATED}/${from}/${to}/${nodeId}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  // never returns if no result currently

  related = {
    total: related.length,
    page: to,
    results: related.map((x, i) => {
      return {
        id: x._id,
        //from/person
        //surname: x._source.surname,
        name: x._source.name,
        email: x._source.email,
        racf: x._source.racf,
        // timestamp:x._source['@timestamp'],
        partKey: x._source.partition_key,
        salaryRef: x._source.salaryref,
        lastLogin: x._source.last_logged_in,
        domain: x._source.domain,
        forename: x._source.forename,

        //from/report
        // id: x._source.id,
        team: x._source.team,
        views: x._source.views,
        rating: x._source.rating,
        purpose: x._source.purpose,
        timestamp: x._source["@timestamp"],
        tags: x._source.tags,
        url: x._source.url,
        title: x._source.title,
        created: x._source.created,
        createdSource: x._source.date_created_at_source,
        pageRank: x._source.pagerank,
        certified: x._source.certified,
        authorDetails: x._source.author_details,
        source: x._source.source,
        format: x._source.file_format != null ? x._source.file_format : x._source.source,
        views: x._source.views_from_source,
        type: x._source.type,
        author: x._source.author,
        suggest: x._source.suggest,

        //from/data
        tableName: x._source.object_name,
        objectType: x._source.object_type,
        owner: x._source.owner,
        numRows: x._source.num_rows,
        // tags:x._source.tags,
        // created:x._source.created,
        // suggest: x._source.suggest,
        // pageRank: x._source.pagerank,
        version: x._source["@version"],
        // source: x._source.source,
        // id:x._source.id,
        lastDdlTime: x._source.last_ddl_time
        // timestamp: x._source['@timestamp']
      }
    })
  }

  return related
}
