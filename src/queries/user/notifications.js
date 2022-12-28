import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { NotificationType } from "../../types/notifications"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const notificationsMissed = {
  type: new GraphQLList(NotificationType),
  args: {
    racf: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getMissedNotifications(args.racf, getAuthHeader(context))
  },
}
