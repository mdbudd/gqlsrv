import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
} from "graphql";

import {
    NodeInterface,
} from "./node";
import {
    SuggestType,
} from "./search";


export const RelatedDetailType = new GraphQLObjectType({
    name: "RelatedDetail",
    interfaces: [NodeInterface],
    fields: {
        //from/allTypes
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        timestamp: {
            type: GraphQLString
        },
        tags: {
            type: GraphQLString
        },

        // from/person
        name: {
            type: GraphQLString
        },
        forename: {
            type: GraphQLString
        },
        surname: {
            type: GraphQLString
        },
        racf: {
            type: GraphQLString
        },

        // from/report
        title: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        format: {
            type: GraphQLString
        },

        // from/data
        tableName: {
            type: GraphQLString
        },
        objectType: {
            type: GraphQLString
        },
        owner: {
            type: GraphQLString
        },
        numRows: {
            type: GraphQLInt
        },
        version: {
            type: GraphQLInt
        },
        lastDdlTime: {
            type: GraphQLString
        },
    }
});

export const RelatedType = new GraphQLObjectType({
    name: "Related",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve(source) {
                logger.info(source)
                return source.id
            }
        },
        page: { type: GraphQLString },
        total: { type: GraphQLInt },
        results: {
            type: new GraphQLList(RelatedDetailType),

        }
    }
});

