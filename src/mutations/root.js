import { GraphQLObjectType } from "graphql"

import * as node from "./"
import * as data from "./data"
import * as user from "./user"
import * as utilities from "./utilities"
import * as objects from "./objects"

export const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "The root mutation",
  fields: {
    setNode: node.setNode,
    report: data.report,
    storeReport: data.storeReport,
    data: data.data,
    dataColumn: data.dataColumn,
    personAdd: data.personAdd,
    rating: utilities.rating,
    subscription: user.subscription,
    unsubscribe: user.unsubscribe,
    kitemark: utilities.kitemark,
    logLaunch: utilities.logLaunch,
    addHit: utilities.addHit,
    removeFromSearch: data.removeFromSearch,
    userPreference: user.userPreference,
    ackNotifications: user.ackNotifications,
    pinboard: user.pinboard,
    pinboardAdd: user.pinboardAdd,
    pinboardAddTo: user.pinboardAddTo,
    pinboardRole: user.pinboardRole,
    pinboardRemoveUser: user.pinboardRemoveUser,
    pinboardRemove: user.pinboardRemove,
    storeObject: objects.storeObject,
  },
})
