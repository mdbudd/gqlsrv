import fetch from "node-fetch"
import { URL_SEARCH_MAIN, URL_SEARCH_PINBOARDS, URL_SEARCH_PEOPLE, URL_SEARCH_DATA, GET_SEARCH_OPTS, URL_SUGGESTIONS } from "./urls"
const util = require("util")

const mergeFiltersIntoData = (data, filters) => {
  const newData = { ...data }
  filters.forEach(filter => {
    if (filter.field === "tags" && newData.filters[0]) {
      filter.values.forEach(value => {
        if (!newData.filters[0].values.includes(value)) {
          newData.filters[0].values.push(value)
        }
      })
    } else {
      newData.filters.push(filter)
    }
  })
  return newData
}

const getLabelForFilter = filter => {
  let label
  if (filter.expanded) {
    if (filter.expanded.known_as) {
      label = filter.expanded.known_as
    } else if (filter.expanded.name) {
      label = filter.expanded.name
    }
  } else {
    label = filter.key
  }
  return label
}
export const search = async args => {
  // console.log(args)
  let {
    id,
    pid = "*",
    method = "POST",
    filters = [],
    category = "all",
    start = 0,
    amount = 10,
    tags = [],
    newSearch = true,
    filtering = false,
    sort = { field: "default", order: "" },
    dates = { gte: null, lte: null }
  } = args

  tags = tags != null && typeof tags == "string" ? tags.split(",") : tags
  tags = tags == "" ? [] : tags
  if (category == "pinboard") tags = []
  let dateFilter =
    dates.gte == null || dates.lte == null
      ? ""
      : {
          gte: dates.gte,
          lte: dates.lte
        }

  let data = {
    filters: [],
    sortField: sort.field,
    sortOrder: sort.order,
    dateFilter
  }

  if (tags.length != undefined && tags.length >= 1) {
    data.filters.push({
      field: "tags",
      values: tags
    })
  }

  data = mergeFiltersIntoData(data, filters)
  // console.log(util.inspect(data, false, 7, true))
  // console.log(`/${id}/${start}/${amount}`)
  let postData = {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  const NS_PER_SEC = 1e9
  const time = process.hrtime()
  const URL_SEARCH_SWITCH = category == "pinboard" ? `${URL_SEARCH_PINBOARDS}/${id}/${pid}` : `${URL_SEARCH_MAIN}/${id}`


  let items = await fetch(`${URL_SEARCH_SWITCH}/${start}/${amount}`, postData)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  // console.log(util.inspect(items, false, 7, true))
  var suggestions = items.data.suggest ? items.data.suggest.suggestions[0] : "none"
  var topProducers =
    (items.data.aggregations.author &&
      items.data.aggregations.author.buckets.sort(function (a, b) {
        return b.doc_count - a.doc_count || []
      })) ||
    (items.data.aggregations.owner &&
      items.data.aggregations.owner.buckets.sort(function (a, b) {
        return b.doc_count - a.doc_count || []
      }))
  topProducers.length > 0 &&
    topProducers.map(producer => {
      if (producer.expanded != undefined) {
        producer.expanded.timestamp = producer.expanded["@timestamp"]
        producer.expanded.version = producer.expanded["@version"]
      }
    })
  items = {
    id: 1,
    total: items.data.hits.total,
    took: items.data.took,
    title: "All Results",
    term: suggestions.text || "",
    suggestions: suggestions.options || [],
    suggestionType: suggestions.type || "none",
    filters: items.data.aggregations || [],
    newSearch: newSearch,
    filtering: filtering,
    topProducers: (topProducers && topProducers.slice(0, 3)) || [],
    results: items.data.hits.hits.map((x, i) => {
      var snippet = x.highlight !== undefined ? x.highlight.internalContent[0] : null
      if (category == "people") {
        return {
          key: x._source.id,
          authorId: x._source.id,
          relevantDocs: x.relevant_doc_count,
          racf: x._source.racf,
          email: x._source.email,
          knownAs: x._source.known_as || x._source.name,
          relevantData: x.relevant_data_count
        }
      } else if (category == "data") {
        return {
          //tableName: x._source.table_name,
          tableName: x._source.object_name,
          owner: x._source.owner,
          numRows: x._source.object_rows,
          numCols: x._source.object_cols,
          tags: x._source.tags,
          created: x._source.date_created,
          tags: x._source.tags,
          suggest: x._source.suggest,
          pageRank: x._source.pagerank,
          version: x._source["@version"],
          source: x._source.source,
          technology: x._source.technology,
          id: x._source.id,
          lastDdlTime: x._source.date_last_updated,
          timestamp: x._source["@timestamp"],
          objectType: x._source.object_type,
          dbName: x._source.db_name
        }
      } else if (category == "tools") {
        return {
          //tableName: x._source.table_name,
          toolName: x._source.tool_name,
          description: x._source.editorial_description,
          id: x._source.id
        }
      } else if (category == "reports") {
        return {
          id: x._source.id,
          category: 1,
          title: x._source.title,
          url: x._source.url,
          format: x._source.source == "SAS VA" ? "SAS_VA" : x._source.file_format,
          views: x._source.views,
          viewsFromSource: x._source.views_from_source,
          likes: 100,
          reports: 100,
          flag: 0,
          tags: x._source.tags,
          author: x._source.author_details.known_as,
          author_id: x._source.author,
          doc_count: x._source.doc_count,
          created: x._source.created,
          timestamp: x._source["@timestamp"],
          team: x._source.team,
          comments: x._source.comments,
          source: x._source.source,
          dateCreatedAtSource: x._source.date_created_at_source,
          purpose: x._source.purpose,
          kitemarked: x._source.kitemarked,
          rating: Math.floor(x._source.rating),
          subs: x._source.subscription_count,
          snippet
        }
      } else {
        if (x._source.insight_type == "person") {
          return {
            key: x._source.id,
            authorId: x._source.id,
            relevantDocs: x.relevant_doc_count,
            racf: x._source.racf,
            email: x._source.email,
            knownAs: x._source.known_as || x._source.name,
            relevantData: x.relevant_data_count,
            insightType: x._source.insight_type
          }
        } else if (x._source.insight_type == "data") {
          return {
            //tableName: x._source.table_name,
            tableName: x._source.object_name,
            owner: x._source.owner,
            numRows: x._source.object_rows,
            numCols: x._source.object_cols,
            tags: x._source.tags || ["null"],
            created: x._source.date_created,
            suggest: x._source.suggest,
            pageRank: x._source.pagerank,
            version: x._source["@version"],
            source: x._source.source,
            technology: x._source.technology,
            id: x._source.id,
            lastDdlTime: x._source.date_last_updated,
            timestamp: x._source["@timestamp"],
            objectType: x._source.object_type,
            dbName: x._source.db_name,
            insightType: x._source.insight_type
          }
        } else if (x._source.insight_type == "businessTerm") {
          return {
            //tableName: x._source.table_name,
            insightType: x._source.insight_type,
            title: x._source.title,
            description: x._source.description,
            id: x._source.id
          }
        } else if (x._source.insight_type == "feature") {
          //returning full source for now
          x._source.insightType = x._source.insight_type
          return x._source
        } else if (x._source.insight_type == "pinboard") {
          //returning full source for now
          x._source.insightType = x._source.insight_type
          return x._source
        } else if (x._source.insight_type == "tool") {
          return {
            //tableName: x._source.table_name,
            toolName: x._source.tool_name,
            description: x._source.editorial_description,
            id: x._source.id,
            insightType: x._source.insight_type
          }
        } else if (x._source.insight_type == "report") {
          return {
            id: x._source.id,
            category: 1,
            title: x._source.title,
            url: x._source.url,
            format: x._source.source == "SAS VA" ? "SAS_VA" : x._source.file_format,
            views: x._source.views,
            viewsFromSource: x._source.views_from_source,
            likes: 100,
            reports: 100,
            flag: 0,
            tags: x._source.tags,
            author: x._source.author_details.known_as,
            author_id: x._source.author,
            doc_count: x._source.doc_count,
            created: x._source.created,
            updated: x._source.updated,
            timestamp: x._source["@timestamp"],
            team: x._source.team,
            comments: x._source.comments,
            source: x._source.source,
            dateCreatedAtSource: x._source.date_created_at_source,
            purpose: x._source.purpose,
            kitemarked: x._source.kitemarked,
            rating: Math.floor(x._source.rating),
            subs: x._source.subscription_count,
            insightType: x._source.insight_type,
            snippet
          }
        } else {
          return {}
        }

        // return {
        //   id: x._source.id,
        //   category: 1,
        //   title: x._source.title,
        //   url: x._source.url,
        //   format: x._source.source == "SAS VA" ? "SAS_VA" : x._source.file_format,
        //   views: x._source.views,
        //   viewsFromSource: x._source.views_from_source,
        //   likes: 100,
        //   reports: 100,
        //   flag: 0,
        //   tags: x._source.tags,
        //   author: x._source.author_details.known_as,
        //   author_id: x._source.author,
        //   doc_count: x._source.doc_count,
        //   created: x._source.created,
        //   timestamp: x._source["@timestamp"],
        //   team: x._source.team,
        //   comments: x._source.comments,
        //   source: x._source.source,
        //   dateCreatedAtSource: x._source.date_created_at_source,
        //   purpose: x._source.purpose,
        //   kitemarked: x._source.kitemarked,
        //   rating: Math.floor(x._source.rating),
        //   subs: x._source.subscription_count,
        //   insightType: x._source.insight_type
        // }
      }
    }),
    pinboardName: items.data.pinboardName,
    pinboardDescription: items.data.pinboardDescription,
    pinboardOwners: items.data.owners,
    pinboardConsumers: items.data.consumers,
    pinboardId: items.data.pinboardId
  }

  if (category === "people") {
    items.total = items.tabData.length
  }
  // console.log(items.filters)

  var initVis = start + amount <= items.total ? start + amount : items.total
  let initFilters = []
  Object.keys(items.filters).map((keyName, i) => {
    var label = keyName.replace(/_/g, " ")
    initFilters.push({
      filter: keyName,
      label: label,
      data: items.filters[keyName].buckets.map((item, index) => {
        var unique = `${(index, i)}-${item.key}`
        unique = unique.replace(/\s+/g, "-").toLowerCase()
        unique = unique.replace(/\./g, "-")
        const label = getLabelForFilter(item)
        return {
          id: `${(index, i)}-${item.key}`,
          unique: unique,
          value: item.key,
          label: label,
          filter: keyName,
          isChecked: false,
          docCount: item.doc_count
        }
      })
    })
  })

  if (newSearch /*&& !filtering*/) {
    items.uiFilters = initFilters
    // dispatch(filterSet(initFilters))
  }
  if (category !== null && category !== "all" && category !== "reports" && category !== "people" && category !== "pinboard") {
    var cat
    switch (category) {
      case "data":
        cat = "file_format"
        break
    }

    var catData = initFilters.filter(x => {
      return x.filter == cat
    })

    if (catData.length >= 1) {
      var newData = { ...items }
      newData.tabData = catData[0].data[0]
      newData.total = newData.tabData.length
      newData.cat = category
      initVis = start + amount <= newData.tabData.length ? start + amount : newData.tabData.length
      items = newData
    }
  }
  items.visible = initVis

  const diff = process.hrtime(time)
  const timeInSd = (diff[0] * 1000000000 + diff[1]) / 1000000000
  items.jsTook = timeInSd

  // console.log(util.inspect(items.topProducers, false, 7, true))
  // console.log(util.inspect(items.uiFilters, false, 7, true))
  // console.log(util.inspect(items, false, 7, true))
  return items
}

export const people = async (term, filters = []) => {
  let data = {
    filters: filters
  }

  let postData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let people = await fetch(`${URL_SEARCH_PEOPLE}/${term}/${GET_SEARCH_OPTS}`, postData)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => error)

  const suggestions = people.data.suggest ? people.data.suggest.suggestions[0] : "none"

  people = {
    total: people.data.hits.total,
    took: people.data.took,
    term: suggestions.text || "",
    filters: people.data.aggregations || [],
    results: people.data.hits.hits.map((x, i) => {
      return {
        email: x._source.email,
        forename: x._source.forename,
        salaryRef: x._source.salaryref,
        lastLogin: x._source.last_logged_in,
        domain: x._source.domain,
        timestamp: x._source["@timestamp"],
        racf: x._source.racf,
        surname: x._source.surname,
        name: x._source.known_as
      }
    })
  }

  // console.log(suggestions)
  // console.log(util.inspect(people, false, 7, true));
  return people
}

export const data = async (term, filters = []) => {
  let dataFetch = {
    filters: filters
  }

  let postData = {
    method: "POST",
    body: JSON.stringify(dataFetch),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let data = await fetch(`${URL_SEARCH_DATA}/${term}/${GET_SEARCH_OPTS}`, postData)
    .then(response => response.json())
    .then(dataRes => {
      return dataRes
    })
    .catch(error => error)

  // console.log(util.inspect(data, false, 7, true));
  const suggestions = data.data.suggest ? data.data.suggest.suggestions[0] : "none"

  data = {
    total: data.data.hits.total,
    took: data.data.took,
    term: suggestions.text || "",
    filters: data.data.aggregations || [],
    results: data.data.hits.hits.map((x, i) => {
      return {
        tableName: x._source.object_name,
        owner: x._source.owner,
        numRows: x._source.object_rows,
        numCols: x._source.object_cols,
        //tags: x._source.tags,
        created: x._source.date_created,
        updated: x._source.date_last_updated,
        suggest: x._source.suggest,
        source: x._source.source,
        technology: x._source.technology,
        dbName: x._source.db_name,
        id: x._source.id
        //timestamp: x._source['@timestamp'],
      }
    })
  }

  // console.log(suggestions)
  // console.log(util.inspect(people, false, 7, true));
  return data
}

export const suggest = async args => {
  let sug = await fetch(`${URL_SUGGESTIONS}/${args.id}`)
    .then(response => {
      return response.json()
    })
    .then(data => data)

  let newTerms = []
  let type

  sug.data.suggest.suggestions[0].options.map((term, i) => {
    type = term._source.insight_type
    type = type == "report" ? "reports" : type
    newTerms.push({ text: term.text, type: type })
  })

  sug = { suggestions: newTerms }

  return sug
}

// query {
//   search(
//     id: "mortgage"
//     filters: []
//     start: 0
//     amount: 10
//     sort: { field: "default", order: "" }
//     dates: { gte: null, lte: null }
//     tags: []
//   ) {
//     total
//     took
//     jsTook
//     newSearch
//     filtering
//     term
//     results {
//       ... on ReportResult {
//         id
//         category
//         title
//         url
//         format
//         views
//         viewsFromSource
//         tags
//         author
//         author_id
//         doc_count
//         created
//         updated
//         timestamp
//         team
//         comments
//         source
//         dateCreatedAtSource
//         purpose
//         kitemarked
//         rating
//         subs
//         insightType
//       }
//       ... on DataResult {
//         id
//         tableName
//         owner
//         numRows
//         numCols
//         tags
//         created
//         suggest
//         pageRank
//         version
//         source
//         technology
//         lastDdlTime
//         timestamp
//         objectType
//         dbName
//         insightType
//       }
//       ... on BusinessTermResult {
//         id
//         title
//         description
//         insightType
//       }
//       ... on FeatureResult {
//         id
//         timestamp
//         version
//         base_feature_name
//         bitbucket_link
//         comments
//         creator_racf_id
//         date_indexed
//         feature_creation_date
//         feature_datatype
//         feature_description
//         feature_domain
//         feature_regulatory_date
//         feature_table_name
//         feature_type
//         feature_version
//         feature_views
//         full_feature_name
//         rating
//         related_feature
//         related_glossary_terms
//         remove_from_search
//         sensitive_data_classification
//         source_column
//         source_db
//         source_system
//         source_table
//         suggest
//         tags
//         used_in_projects
//         insight_type
//         insightType
//       }
//       ... on ToolResult {
//         id
//         toolName
//         description
//         insightType
//       }
//     }
//     suggestions {
//       text
//       score
//     }
//     topProducers {
//       key
//       doc_count
//       expanded {
//         id
//         version
//         timestamp
//         email
//         racf
//         name
//         salaryref
//       }
//     }
//     uiFilters {
//       filter
//       label
//       data {
//         id
//         docCount
//         filter
//         isChecked
//         label
//         unique
//         value
//       }
//     }
//     filters
//   }
// }
