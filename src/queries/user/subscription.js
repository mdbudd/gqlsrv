import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { SubscriptionReportGroupsType, SubscriptionDataGroupsType, SubscriptionPeopleGroupsType, SubscriptionToolsGroupsType, SubscriptionType } from "../../types/subscriptions"
import * as fetchersold from "../../fetchers.old"
import { getAuthHeader } from "../"

export const subscriptionReportGroups = {
  type: SubscriptionReportGroupsType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.getSubscriptionGroupsByRacf(args.id, "report", getAuthHeader(context))
  },
}

export const subscriptionDataGroups = {
  type: SubscriptionDataGroupsType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.getSubscriptionGroupsByRacf(args.id, "data", getAuthHeader(context))
  },
}

export const subscriptionPeopleGroups = {
  type: SubscriptionPeopleGroupsType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.getSubscriptionGroupsByRacf(args.id, "person", getAuthHeader(context))
  },
}

export const subscriptionToolsGroups = {
  type: SubscriptionToolsGroupsType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.getSubscriptionGroupsByRacf(args.id, "tool", getAuthHeader(context))
  },
}

export const subscriptionEntity = {
  type: SubscriptionType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.getSubscriptionsByEntity(args.id, getAuthHeader(context))
  },
}

export const subscriptionEntityAndSubscriber = {
  type: SubscriptionType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    racf: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.getSubscriptionsByEntityAndSubscriber(args)
  },
}
