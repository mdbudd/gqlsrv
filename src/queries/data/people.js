import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"

import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const team = {
  type: GraphQLJSON,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getTeam(args.id, getAuthHeader(context))
  },
}
