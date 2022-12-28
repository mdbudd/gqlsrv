import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} from "graphql";

import { NodeInterface } from "./node";

export const ConversationType = new GraphQLObjectType({
    name: "Conversation",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        rootId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        entityId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        authorRacf: {
            type: GraphQLString
        },
        authorDomain: {
            type: GraphQLString
        },
        authorName: {
            type: GraphQLString
        },
        created: {
            type: GraphQLString
        },
        conversationText: {
            type: GraphQLString
        },
    }
});
