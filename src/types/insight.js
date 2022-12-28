import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";

import {
  NodeInterface,
} from "./node";

export const InsightType = new GraphQLObjectType({
  name: "Insight",
  interfaces: [NodeInterface],
  fields: {
    id: {
        type: new GraphQLNonNull(GraphQLID),
    },
    title: {
        type: GraphQLString
    },
    url: {
        type: GraphQLString
    },
    format: {
        type: GraphQLString
    },
    display_date: {
        type: GraphQLString
    }
  }
});
