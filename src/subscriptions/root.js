import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt, GraphQLID } from "graphql"
const util = require("util")

import { NodeInterface } from "../types/node"
import { ReportType } from "../types/reports"
import { DataDetailType } from "../types/data"
import { NotificationType } from "../types/notifications"
import { REPORT_CHANGE, DATA_CHANGE, RABBIT_NOTE, pubsub } from "../constants"
import { withFilter } from "graphql-subscriptions"

export const RootSubscription = new GraphQLObjectType({
  name: "RootSubscription",
  fields: () => ({
    reportChange: {
      type: ReportType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (payload, args, context, info) => {
        return payload.report
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(REPORT_CHANGE),
        (payload, variables) => {
          return variables.id === payload.report.id
        }
      )
    },
    dataChange: {
      type: DataDetailType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (payload, args, context, info) => {
        console.log(payload.data)
        return payload.data
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(DATA_CHANGE),
        (payload, variables) => {
          return variables.id === payload.data.id
        }
      )
    },
    rabbit: {
      type: NotificationType,
      args: {
        racf: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (payload, args, context, info) => {
        // console.log(payload)
        return payload
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(RABBIT_NOTE),
        (payload, variables) => {
          return variables.racf === payload.racf
        }
      )
    }
  })
})
