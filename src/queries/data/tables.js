import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from "graphql"
import { FeatureBankMetaTableType } from "../../types/feature-bank-tables"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const featureBankMetaTable = {
  type: FeatureBankMetaTableType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getMetaTable(args)
  },
}

export const featureBankMetaTableSearch = {
  type: new GraphQLList(FeatureBankMetaTableType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    page: {
      type: GraphQLInt,
    },
    size: {
      type: GraphQLInt,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.searchMetaTables(args)
  },
}
