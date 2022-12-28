import {
    GraphQLInterfaceType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
} from 'graphql';


const PageInfoType = new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        hasNextPage: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        hasPreviousPage: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        startCursor: {
            type: GraphQLString,
        },
        endCursor: {
            type: GraphQLString,

        }
    }
});

const ResultEdgeType = new GraphQLObjectType({
    name: 'PostEdge',
    fields: () => {
        return {
            cursor: {
                type: new GraphQLNonNull(GraphQLString)
            },
            node: {
                type: new GraphQLNonNull(PostType)
            }
        }
    }
});

const ResultsConnectionType = new GraphQLObjectType({
    name: 'PostsConnection',
    fields: {
        pageInfo: {
            type: new GraphQLNonNull(PageInfoType)
        },
        edges: {
            type: new GraphQLList(PostEdgeType)
        }
    }
});