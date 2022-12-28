import fetch from "node-fetch"
const util = require("util")
import { URL_DATA, URL_PI_TABLES, URL_REFERENCING_COLS_DATA } from "./urls"
import { DATA_CHANGE, pubsub } from "../constants"

export const getDataById = async (id, auth) => {
  let data = await fetch(`${URL_DATA}/${id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

    console.log(data)
  let dataPI = await getDataPIById(id, auth)

  data = {
    tableName: data._source.object_name,
    objType: data._source.object_type,
    owner: data._source.owner,
    numRows: data._source.object_rows,
    numCols: data._source.db_name == "FeatureBank" && data._source.featureList != undefined ? data._source.featureList.length : data._source.object_cols,
    tags: data._source.tags,
    created: data._source.date_created,
    updated: data._source.date_last_updated,
    suggest: data._source.suggest,
    source: data._source.source,
    technology: data._source.technology,
    dbName: data._source.db_name,
    id: data._source.id,
    timestamp: data._source["@timestamp"],
    purpose: data._source.purpose || dataPI.purpose,
    columns: data._source.columnList.map(x => {
      return {
        id: x.id,
        columnName: x.column_name,
        description: x.description,
        type: x.type_name,
        relTableName: x.related_table_name,
        relTableOwner: x.related_table_owner,
        relTableId: x.related_table_id,
        tags: typeof x.tags == "string" ? [x.tags] : x.tags
      }
    }),
    features: data._source.featureList != undefined && data._source.featureList.map(x =>{
      return{
        id: x.id,
        fullFeatureName: x.full_feature_name,
        featureDescription: x.feature_description
      }
    }) || []
    //columns: dataPICols
  }

  return data
}

export const getDataPIById = async (id, auth) => {
  let data = await fetch(`${URL_PI_TABLES}/DataLibrary/${id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  data = {
    tableName: data.objectName,
    owner: data.owner,
    numRows: data.objectRows,
    numCols: data.objectCols,
    created: data.dateCreated,
    updated: data.dateLastUpdated,
    source: data.source,
    technology: data.technology,
    dbName: data.dbName,
    id: data.id,
    purpose: data.purpose
  }

  return data
}

export const getReferencingColData = async (args, auth) => {
  let dataPICols = await getReferencingColDataByObjId(args.id)
  return dataPICols
}

export const getReferencingColDataByObjId = async (id, auth) => {
  let data = await fetch(`${URL_REFERENCING_COLS_DATA}/${id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  //let cols = await getDataById(id, auth)
  //cols = typeof cols.columns.map == "undefined" ? [] : cols
  let columns = data.map(x => {
    return {
      id: x._id,
      columnName: x._source.column_name,
      description: x._source.description,
      type: x._source.type_name,
      tableName: x._source.table_name,
      tableId: x._source.table_id
    }
  })
  return columns
}

export const getColData = async (args, auth) => {
  let dataPICols = await getColDataByObjId(args.id)
  return dataPICols
}

//TODO - use elasticsearch instead for this.
export const getColDataByObjId = async (id, auth) => {
  let data = await fetch(`${URL_DATA}/${id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)

  let cols = await getDataById(id, auth)
  cols = typeof cols.columns.map == "undefined" ? [] : cols
  let columns = cols.columns.map(x => {
    return {
      id: x.id,
      columnName: x.columnName,
      description: x.description,
      type: x.type,
      relTableName: x.relTableName,
      relTableOwner: x.relTableOwner,
      relTableId: x.relTableId,
      tags: x.tags
    }
  })
  return columns
}

export const changeData = async (args, auth) => {
  //fetch data in original format
  let dataPI = await fetch(`${URL_PI_TABLES}/DataLibrary/${args.id}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  let put = { ...dataPI, ...args.put }

  // Update data in original format using partial update strategy
  let data = await fetch(`${URL_PI_TABLES}/DataLibrary/${args.id}`, {
    method: "PUT",
    body: JSON.stringify(put),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }).catch(error => error)
  // console.log(await getDataPIById(put.id, auth))
  // once data is updated fetch it back through tranformation method
  // data = data.status === 204 ? await getDataPIById(put.id, auth) : false

  if (data.status === 204) {
    data = await getDataPIById(put.id, auth)
    pubsub.publish(DATA_CHANGE, { data: data })
  } else {
    data = false
  }

  return data
}

export const changeDataCol = async (args, auth) => {
  let dataPICol = await getColDataById(args.id, auth)
  let put = { ...dataPICol, ...args.put }

  let col = await fetch(`${URL_PI_TABLES}/DataColumn/${args.id}`, {
    method: "PUT",
    body: JSON.stringify(put),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  }).catch(error => error)

  // console.log(put)
  // console.log(col.status)
  // col = col.status === 204 ? put : false

  if (col.status === 204) {
    col = put
    // console.log('column updated')
    // let data = await getDataPIById(args.id, auth)
    // console.log(col)
    // pubsub.publish(DATA_CHANGE, { data: data })
  } else {
    col = false
  }

  // console.log(util.inspect(col, false, 7, true))
  return col
}

export const getColDataById = async (id, auth) => {
  let col = await fetch(`${URL_PI_TABLES}/DataColumn/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
  return col
}
