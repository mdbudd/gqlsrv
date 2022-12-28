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

  
export const PersonType = new GraphQLObjectType({
  name: "Person",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: GraphQLString
    },
    forename: {
      type: GraphQLString
    },
    salaryRef: {
      type: GraphQLInt
    },
    lastLogin: {
      type: GraphQLString
    },
    domain: {
      type: GraphQLString
    },
    timestamp: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    surname: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
  }
});

export const PeopleType = new GraphQLObjectType({
  name: "People",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        logger.info(source)
        return source.id
      }
    },
    total: {
      type: GraphQLInt
    },
    took: {
      type: GraphQLInt
    },
    term: {
      type: GraphQLString
    },
    results: {
      type: new GraphQLList(PersonType),
     
    }
  }
});


export const SetPersonType =  new GraphQLInputObjectType({
  name: "SetPerson",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    racf: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLString
    },
    salaryRef: {
      type: GraphQLInt
    },
  }
});