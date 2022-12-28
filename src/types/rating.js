import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
} from "graphql";

import {
    NodeInterface,
} from "./node";

export const SetRatingType = new GraphQLInputObjectType({
    name: "SetRatingType",
    fields: {
        entityId: { type: GraphQLString },
        racf: { type: GraphQLString },
        value: { type: GraphQLInt },
    }
  })

export const RatingType = new GraphQLObjectType({
    name: "Rating",
    interfaces: [NodeInterface],
    fields: {
        //from/allTypes
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        averageRating: {
            type: GraphQLString
        },
        value: {
            type: GraphQLInt
        },
        
    }
});

export const RatingSummaryType = new GraphQLObjectType({
    name: "RatingSummary",
    fields: {
        entityId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        averageRating: {
            type: GraphQLFloat
        },
        totalRatings: {
            type: GraphQLInt
        },
        maxRating: {
            type: GraphQLInt
        },
        minRating: {
            type: GraphQLInt
        },
        rating5Total: {
            type: GraphQLInt
        },
        rating4Total: {
            type: GraphQLInt
        },
        rating3Total: {
            type: GraphQLInt
        },
        rating2Total: {
            type: GraphQLInt
        },
        rating1Total: {
            type: GraphQLInt
        }
    }
});