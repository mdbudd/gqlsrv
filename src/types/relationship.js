import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from "graphql";

import {
    NodeInterface,
} from "./node";

export const RelationshipType = new GraphQLObjectType({
    name: "Relationship",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        fromId: {
            type: GraphQLString
        },
        toId: {
            type: GraphQLString
        },
        fromType: {
            type: GraphQLString
        },
        toType: {
            type: GraphQLString
        },
        relationshipType: {
            type: GraphQLString
        },
    }
});
