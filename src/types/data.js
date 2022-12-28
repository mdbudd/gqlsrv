import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLInputObjectType } from "graphql"

import { NodeInterface } from "./node"
import { SuggestType } from "./search"
import { FeatureBankFeatureType } from "./feature-bank-feature"

export const DataColumnType = new GraphQLObjectType({
  name: "DataColumn",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    tableName: { type: GraphQLString },
    tableId: { type: GraphQLString },
    columnName: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    relTableName: { type: GraphQLString },
    relTableOwner: { type: GraphQLString },
    relTableId: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  }
})

export const DataDetailType = new GraphQLObjectType({
  name: "DataDetail",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLString
    },
    tableName: {
      type: GraphQLString
    },
    objType: {
      type: GraphQLString
    },
    owner: {
      type: GraphQLString
    },
    numRows: {
      type: GraphQLInt
    },
    numCols: {
      type: GraphQLInt
    },
    created: {
      type: GraphQLString
    },
    updated: {
      type: GraphQLString
    },
    lastDdlTime: {
      type: GraphQLString
    },
    suggest: {
      type: GraphQLString
    },
    source: {
      type: GraphQLString
    },
    technology: {
      type: GraphQLString
    },
    dbName: {
      type: GraphQLString
    },
    timestamp: {
      type: GraphQLString
    },
    purpose: {
      type: GraphQLString
    },
    columns: {
      //type: new GraphQLList(DataColumnType)
      type: new GraphQLList(DataColumnType)
    },
    features: {
      //type: new GraphQLList(DataColumnType)
      type: new GraphQLList(FeatureBankFeatureType)
    }
  }
})

export const DataType = new GraphQLObjectType({
  name: "Data",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        logger.info(source)
        return source.id
      }
    },
    total: {
      type: GraphQLInt
    },
    took: {
      type: GraphQLInt
    },
    term: {
      type: GraphQLString
    },
    results: {
      type: new GraphQLList(DataDetailType)
    }
  }
})

export const SetDataType = new GraphQLInputObjectType({
  name: "SetDataType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    tableName: { type: GraphQLString },
    owner: { type: GraphQLString },
    numRows: { type: GraphQLInt },
    numCols: { type: GraphQLInt },
    created: { type: GraphQLString },
    updated: { type: GraphQLString },
    source: { type: GraphQLString },
    technology: { type: GraphQLString },
    dbName: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    purpose: { type: GraphQLString } // To be added into API
  }
})

export const SetDataColType = new GraphQLInputObjectType({
  name: "SetDataColType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    source: { type: GraphQLString },
    dbName: { type: GraphQLString },
    tableName: { type: GraphQLString },
    tableId: { type: GraphQLString },
    columnName: { type: GraphQLString },
    typeName: { type: GraphQLString },
    description: { type: GraphQLString },
    relTableName: { type: GraphQLString },
    relTableOwner: { type: GraphQLString },
    relTableId: { type: GraphQLString }
  }
})
