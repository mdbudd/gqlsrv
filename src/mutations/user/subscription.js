import { GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { SubscriptionType, SetSubscriptionType } from "../../types/subscriptions"
import * as fetchersold from "../../fetchers.old"

export const subscription = {
  type: SubscriptionType,
  args: {
    post: {
      type: SetSubscriptionType,
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.setSubscription(args)
  },
}

export const unsubscribe = {
  type: GraphQLString,
  args: {
    id: {
      type: GraphQLString,
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.deleteSubscription(args)
  },
}
