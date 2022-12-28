import { GraphQLNonNull, GraphQLID } from "graphql"
import { NodeInterface } from "../types/node"

export const node = {
  type: NodeInterface,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    return args
  },
}

export function getAuthHeader(context) {
  return context.headers.authorization
}