import { GraphQLString } from "graphql"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const kitemark = {
    type: GraphQLString,
    args: {
      id: {
        type: GraphQLString,
      },
    },
    resolve(source, args, context, info) {
      return fetchers.setKitemark(args, getAuthHeader(context))
    },
  }
