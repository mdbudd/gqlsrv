import { GraphQLNonNull, GraphQLID, GraphQLString } from "graphql"

let inMemoryStore = {}

export const setNode = {
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args) {
    inMemoryStore[args.key] = args.value
    return inMemoryStore[args.key]
  },
}

export function getAuthHeader(context) {
  return context.headers.authorization
}
