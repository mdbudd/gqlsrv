import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { NodeInterface } from './node';

export const ToolType = new GraphQLObjectType({
  name: 'Tools',
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    toolName: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    }
  }
});

export const ToolsType = new GraphQLObjectType({
  name: 'Tools',
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    toolName: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    }
  }
});
