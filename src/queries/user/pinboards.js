import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { PinboardType } from "../../types/pinboard"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const pinboards = {
  type: new GraphQLList(PinboardType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getPinboardsById(args, getAuthHeader(context))
  },
}

export const allPinboards = {
  type: new GraphQLList(PinboardType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getPinboards(args, getAuthHeader(context))
  },
}

export const pinboard = {
  type: PinboardType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getPinboardById(args.id, getAuthHeader(context))
  },
}
