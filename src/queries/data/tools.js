import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { ToolType } from "../../types/tool"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const toolById = {
  type: ToolType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getToolById(args.id)
  },
}

export const tools = {
  type: new GraphQLList(ToolType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.getTools(args.id)
  },
}
