import { GraphQLObjectType, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, graphql } from "graphql"

export const NotificationType = new GraphQLObjectType({
  name: "Notification",
  interfaces: [
    new GraphQLInterfaceType({
      name: "NotificationFace",
      fields: {
        racf: {
          type: new GraphQLNonNull(GraphQLString)
        }
      }
    })
  ],
  fields: {
    id: {
      type: GraphQLID
    },
    entityId: {
      type: GraphQLString
    },
    originId: {
      type: GraphQLString
    },
    racf: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    acked: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    app: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    }
  }
})
