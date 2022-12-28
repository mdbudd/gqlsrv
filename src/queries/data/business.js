import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { BusinessTermType } from "../../types/business-terms"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const businessTerm = {
  type: BusinessTermType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getBusinessTermById(args.id, getAuthHeader(context))
  },
}
