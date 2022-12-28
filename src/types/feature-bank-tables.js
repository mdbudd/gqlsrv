import { GraphQLObjectType, GraphQLString } from "graphql"


export const FeatureBankMetaTableType = new GraphQLObjectType({
  name: "FeatureBankMetaTable",
  fields: () => ({
    tenantCode: {
      type: GraphQLString
    },
    applicationCode: {
      type: GraphQLString
    },
    databaseName: {
      type: GraphQLString
    },
    tableType: {
      type: GraphQLString
    },
    tableName: {
      type: GraphQLString
    },
    applicationName: {
      type: GraphQLString
    },
    pathName: {
      type: GraphQLString
    },
    databaseType: {
      type: GraphQLString
    },
    sourceType: {
      type: GraphQLString
    },
    partition: {
      type: GraphQLString
    },
    partitionKey: {
      type: GraphQLString
    },
    createTime: {
      type: GraphQLString
    },
    updateTime: {
      type: GraphQLString
    },
    processTime: {
      type: GraphQLString
    }
  })
})
