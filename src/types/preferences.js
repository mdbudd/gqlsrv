import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInterfaceType,
} from "graphql";

import {
    NodeInterface,
} from "./node";


export const UserPreferenceInterface = new GraphQLInterfaceType({
    name: "UserPreferenceInterface",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        racf: {
            type: GraphQLString
        },
        preferenceId: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
    }
});

export const PreferenceType = new GraphQLObjectType({
    name: "Preference",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        key: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        category: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        default: {
            type: GraphQLString
        }
    }
});

export const UserPreferenceType = new GraphQLObjectType({
    name: "UserPreference",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        racf: {
            type: GraphQLString
        },
        preferenceId: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        preference: {
            type: PreferenceType
        }
    }
});

export const UserPreferenceInputType = new GraphQLInputObjectType({
    name: "UserPreferenceInput",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: GraphQLString
        },
        racf: {
            type: GraphQLString
        },
        preferenceId: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
    }
});