
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLFloat, graphql } from "graphql"

import { NodeInterface } from "./node"

import * as fetchers from "../fetchers"

export const FeatureBankFeatureType = new GraphQLObjectType({
  name: "FeatureBankFeature",
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    baseFeatureName:{
        type: GraphQLString
    },
    featureTableName:{
        type: GraphQLString
    },
    fullFeatureName:{
        type: GraphQLString
    },
    featureVersion:{
        type: GraphQLFloat
    },
    featureDescription:{
        type: GraphQLString
    },
    featureDatatype:{
        type: GraphQLString
    },
    featureType:{
        type: GraphQLString
    },
    featureDomain:{
        type: GraphQLString
    },
    relatedFeature:{
        type: GraphQLString
    },
    sensitiveDataClassification:{
        type: GraphQLString
    },
    featureCreationDate:{
        type: GraphQLString
    },
    featureRegulatoryDate:{
        type: GraphQLString
    },
    creatorRacfid:{
        type: GraphQLString
    },
    sourceSystem:{
        type: GraphQLString
    },
    sourceDB:{
        type: GraphQLString
    },
    sourceTable:{
        type: GraphQLString
    },
    sourceColumn:{
        type: GraphQLString
    },
    relatedGlossaryTerms:{
        type: GraphQLString
    },
    usedInProjects:{
        type: GraphQLString
    },
    bitbucketLink:{
        type: GraphQLString
    },
    comments:{
        type: GraphQLString
    },
    views:{
        type: new GraphQLList(GraphQLString)
    }
  })
})