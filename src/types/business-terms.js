import { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLFloat, graphql } from "graphql"

import { NodeInterface } from "./node"

import * as fetchers from "../fetchers"

export const BusinessTermType = new GraphQLObjectType({
  name: "BusinessTerm",
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    externalId:{
      type:GraphQLString
    },
    definition:{
      type:GraphQLString
    },
    approvedBy:{
      type:GraphQLString
    },
    businessTermClassification:{
      type:GraphQLString
    },
    usageContext:{
      type:GraphQLString
    },
    taxonomyType:{
      type:GraphQLString
    },
    hasParentBusinessTerms:{
      type: new GraphQLList(BusinessTermType)
    },
    seeAlsoBusinessTerms:{
      type: new GraphQLList(BusinessTermType)
    }
  })
})