import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { ConversationType } from "../../types/conversations"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const conversations = {
  type: new GraphQLList(ConversationType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getConversationById(args.id, getAuthHeader(context))
  },
}
