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

import { PersonType } from "./people";
import { ResourceType } from "./resource";

import * as fetchers from "../fetchers";

const RelatedToolType = new GraphQLObjectType({
    name: "RelatedTool",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        toolName: {
            type: GraphQLString
        },
        positiveTags: {
            type: GraphQLString
        },
        currentVersion: {
            type: GraphQLString
        },
        format: {
            type: GraphQLString
        },
    }
});

export const ToolType = new GraphQLObjectType({
    name: "Tool",
    interfaces: [NodeInterface],
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        toolName: {
            type: GraphQLString
        },
        positiveTags: {
            type: GraphQLString
        },
        negativeTags: {
            type: GraphQLString
        },
        editorialDescription: {
            type: GraphQLString
        },
        editorialImage: {
            type: GraphQLString
        },
        relevantJourneys: {
            type: GraphQLString
        },
        currentVersion: {
            type: GraphQLString
        },
        format: {
            type: GraphQLString
        },
        champions: {
            type: new GraphQLList(PersonType),
            resolve(source, args, context, info) {
                return fetchers.getRelationshipData({ toId: source.id, relationshipType: "champion" });
            }
        },
        resources: {
            type: new GraphQLList(ResourceType),
            resolve(source, args, context, info) {
                return fetchers.getRelationshipData({ fromId: source.id, relationshipType: "resource" });
            }
        },
        relatedTools: {
            type: new GraphQLList(RelatedToolType),
            resolve(source, args, context, info) {
                return fetchers.getRelationshipData({ fromId: source.id, relationshipType: "related" });
            }
        },
    }
});
