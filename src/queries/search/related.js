import { GraphQLNonNull, GraphQLString } from "graphql"
import { RelatedType } from "../../types/related"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const related = {
  type: RelatedType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    from: {
      type: new GraphQLNonNull(GraphQLString),
    },
    to: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getRelated(args.from, args.to, args.id, getAuthHeader(context))
  },
}
