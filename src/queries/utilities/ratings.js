import { GraphQLNonNull, GraphQLString } from "graphql"
import { RatingType, RatingSummaryType } from "../../types/rating"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const rating = {
  type: RatingType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    racf: {
      type: GraphQLString,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getRatingById(args, getAuthHeader(context))
  },
}

export const ratingSummary = {
  type: RatingSummaryType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getEntityRatingSummary(args, getAuthHeader(context))
  },
}
