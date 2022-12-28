import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { NotificationType } from "../../types/notifications"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const ackNotifications = {
  type: new GraphQLList(NotificationType),
  args: {
    ids: {
      type: new GraphQLList(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.ackNotifications(args.ids, getAuthHeader(context))
  },
}
