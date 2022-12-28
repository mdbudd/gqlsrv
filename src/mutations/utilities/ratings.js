import { GraphQLNonNull, GraphQLString } from "graphql"
import { RatingType, SetRatingType } from "../../types/rating"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const rating = {
  type: RatingType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    post: {
      type: SetRatingType,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.setRating(args, getAuthHeader(context))
  },
}
