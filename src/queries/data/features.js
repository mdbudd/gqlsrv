import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { FeatureBankFeatureType } from "../../types/feature-bank-feature"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const featureBankFeature = {
  type: FeatureBankFeatureType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getFeatureById(args.id, getAuthHeader(context))
  },
}
