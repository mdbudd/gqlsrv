import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLInputObjectType } from "graphql"

import { NodeInterface } from "./node"

export const ObjectMetaType = new GraphQLObjectType({
  name: "ObjectMeta",
  fields: {
    id: { type: GraphQLString },
    purpose: { type: GraphQLString },
    title: { type: GraphQLString }
  }
})
export const ObjectType = new GraphQLObjectType({
  name: "Object",
  fields: {
    LastModified: { type: GraphQLString },
    ContentLength: { type: GraphQLInt },
    ETag: { type: GraphQLString },
    VersionId: { type: GraphQLString },
    ContentType: { type: GraphQLString },
    Body: { type: GraphQLString },
    Meta: { type: ObjectMetaType },
    Purpose: { type: GraphQLString },
    Title: { type: GraphQLString },
  }
})

export const VersionType = new GraphQLObjectType({
  name: "Version",
  fields: {
    ETag: {
      type: GraphQLString
    },
    Size: {
      type: GraphQLString
    },
    StorageClass: {
      type: GraphQLString
    },
    Key: {
      type: GraphQLString
    },
    VersionId: {
      type: GraphQLString
    },
    IsLatest: {
      type: GraphQLString
    },
    LastModified: {
      type: GraphQLString
    },
    VersionObj: { type: ObjectType }
  }
})


export const VersioningType = new GraphQLObjectType({
  name: "Versioning",
  fields: {
    Prefix: {
      type: GraphQLString
    },
    Name: {
      type: GraphQLString
    },
    Versions: {
      type: new GraphQLList(VersionType)
    }
  }
})
