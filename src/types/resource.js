import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} from "graphql";

import {
    NodeInterface,
} from "./node";

export const ResourceType = new GraphQLObjectType({
    name: "Resource",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        category: {
            type: GraphQLString
        },
        subCategory: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        subTitle: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        imageClass: {
            type: GraphQLString
        },
        imageUrl: {
            type: GraphQLString
        },
        subCategoryOrder: {
            type: GraphQLInt
        },
        subCategoryItemOrder: {
            type: GraphQLInt
        },
    }
});
