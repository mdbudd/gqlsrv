import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { PreferenceType, UserPreferenceType } from "../../types/preferences"
import * as fetchersold from "../../fetchers.old"
import { getAuthHeader } from "../"

export const preferenceByKey = {
  type: PreferenceType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
      console.log(info)
    return fetchersold.getPreferenceByKey(args)
  },
}

export const userPreferences = {
  type: new GraphQLList(UserPreferenceType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    console.log(info)
    return fetchersold.getUserPreferences(args)
  },
}

export const userPreferenceByKey = {
  type: UserPreferenceType,
  args: {
    racf: {
      type: new GraphQLNonNull(GraphQLString),
    },
    key: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    console.log(info)
    return fetchersold.getUserPreferenceByKey(args)
  },
}
