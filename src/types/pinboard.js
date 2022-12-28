import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLUnionType } from "graphql"
import { ReportType } from "./reports"
import { DataDetailType } from "./data"

import { NodeInterface } from "./node"

// export const SetPinboardType = new GraphQLInputObjectType({
//   name: "SetPinboardType",
//   fields: {
//     entityId: { type: GraphQLString },
//     racf: { type: GraphQLString },
//     value: { type: GraphQLInt }
//   }
// })

const resolveType = data => {
  if (data.tableName) {
    return DataDetailType
  }
  if (data.title) {
    return ReportType
  }
}

export const PinboardContentType = new GraphQLUnionType({
  name: "PinboardContentType",
  types: [DataDetailType, ReportType],
  resolveType: resolveType
})

export const PinboardType = new GraphQLObjectType({
  name: "Pinboard",
  interfaces: [NodeInterface],
  fields: {
    //from/allTypes
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    ownerId: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    dateCreated: {
      type: GraphQLString
    },
    dateUpdated: {
      type: GraphQLString
    },
    subscriberCount: {
      type: GraphQLInt
    },
    contentCount: {
      type: GraphQLInt
    }
  }
})

export const SetPinboardType = new GraphQLInputObjectType({
  name: "SetPinboardType",
  fields: {
    id: { type: GraphQLID },
    ownerId: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    dateUpdated: { type: GraphQLString }
  }
})

export const PinboardRoleType = new GraphQLObjectType({
  name: "PinboardRoleType",
  interfaces: [NodeInterface],
  fields: {
    racf: {
      type: GraphQLString
    },
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    pid: {
      type: GraphQLString
    },
    role: {
      type: GraphQLString
    },
    pinboard: {
      type: PinboardType
    }
  }
})
