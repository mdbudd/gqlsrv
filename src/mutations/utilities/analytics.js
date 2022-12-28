import { GraphQLID, GraphQLString } from "graphql"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const logLaunch = {
  type: GraphQLString,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.logLaunch(args, getAuthHeader(context))
  },
}

export const addHit = {
  type: GraphQLString,
  args: {
    id: {
      type: GraphQLID,
    },
    term: {
      type: GraphQLString,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.addHit(args, getAuthHeader(context))
  },
}
