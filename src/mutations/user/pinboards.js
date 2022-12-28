import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { PinboardType, SetPinboardType, PinboardRoleType } from "../../types/pinboard"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const pinboard = {
  type: PinboardType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    put: {
      type: SetPinboardType,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.changePinboard(args, getAuthHeader(context))
  },
}

export const pinboardAdd = {
  type: PinboardType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    post: {
      type: SetPinboardType,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.addPinboard(args, getAuthHeader(context))
  },
}

export const pinboardAddTo = {
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    pid: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.addToPinboard(args, getAuthHeader(context))
  },
}

export const pinboardRole = {
  type: PinboardRoleType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    pid: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.setPinboardRole(args, getAuthHeader(context))
  },
}

export const pinboardRemoveUser = {
  type: PinboardRoleType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    pid: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.removeUserFromPinboard(args, getAuthHeader(context))
  },
}

export const pinboardRemove = {
  type: PinboardType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.removePinboard(args, getAuthHeader(context))
  },
}
