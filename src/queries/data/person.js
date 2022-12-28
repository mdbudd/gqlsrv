import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { PersonType } from "../../types/people"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const person = {
  type: PersonType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getPersonById(args.id, getAuthHeader(context))
  },
}
