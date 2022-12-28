import { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLFloat, graphql } from "graphql"

import { NodeInterface } from "./node"
import { ConversationType } from "./conversations"

import * as fetchers from "../fetchers"

export const CSVHeader = new GraphQLObjectType({
  name: "CSVHeader",
  fields: {
    name: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    max: {
      type: GraphQLFloat
    },
    min: {
      type: GraphQLFloat
    },
    mean: {
      type: GraphQLFloat
    },
  }
})

export const RelatedType = new GraphQLObjectType({
  name: "RelatedReport",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    },
    views: {
      type: GraphQLInt
    },
    team: {
      type: GraphQLString
    },
    purpose: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
    doc_count: {
      type: GraphQLInt
    },
    rating: {
      type: GraphQLInt
    }
  }
})

export const ReportType = new GraphQLObjectType({
  name: "Report",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    },
    purpose: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    authorId: {
      type: GraphQLString
    },
    authorName: {
      type: GraphQLString
    },
    authorRacf: {
      type: GraphQLString
    },
    views: {
      type: GraphQLInt
    },
    viewsFromSource: {
      type: GraphQLInt
    },
    comments: {
      type: GraphQLInt
    },
    team: {
      type: GraphQLString
    },
    certified: {
      type: GraphQLString
    },
    created: {
      type: GraphQLString
    },
    updated: {
      type: GraphQLString
    },
    timestamp: {
      type: GraphQLString
    },
    source: {
      type: GraphQLString
    },
    kitemarked: {
      type: GraphQLString
    },
    conversation: {
      type: new GraphQLList(ConversationType),
      resolve(source, args) {
        //console.log(source.id)
        return fetchers.getConversationById(source.id)
      }
    },
    related: {
      type: new GraphQLList(RelatedType)
    },
    csvHeaders:{
      type: new GraphQLList(CSVHeader)
    }
  }
})

export const SetReportType = new GraphQLInputObjectType({
  name: "SetReportType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    format: { type: GraphQLString },
    purpose: { type: GraphQLString },
    rating: { type: GraphQLString },
    type: { type: GraphQLString },
    authorId: { type: GraphQLString },
    authorName: { type: GraphQLString },
    authorRacf: { type: GraphQLString },
    views: { type: GraphQLInt },
    viewsFromSource: { type: GraphQLInt },
    comments: { type: GraphQLInt },
    team: { type: GraphQLString },
    certified: { type: GraphQLString },
    created: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    source: { type: GraphQLString },
    kitemarked: { type: GraphQLString }
  }
})

export const FileType = new GraphQLInputObjectType({
  name: "FileType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    filename: { type: new GraphQLNonNull(GraphQLString) },
    mimetype: { type: new GraphQLNonNull(GraphQLString) },
    path: { type: new GraphQLNonNull(GraphQLString) },
  }
})

export const PutReportType = new GraphQLInputObjectType({
  name: "PutReportType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    purpose: { type: GraphQLString },
    format: { type: GraphQLString },
  }
})
