import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { VersioningType } from "../../types/buckets"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const versioning = {
  type: VersioningType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getVersionsById(args, getAuthHeader(context))
  },
}
