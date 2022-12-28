import { GraphQLObjectType } from "graphql"
// const util = require("util")

import * as node from "./"
import * as data from "./data"
import * as user from "./user"
import * as utilities from "./utilities"
import * as objects from "./objects"
import * as search from "./search"


export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "The root query",
  fields: {
    node: node.node,
    businessTerm: data.businessTerm,
    featureBankFeature: data.featureBankFeature,
    featureBankMetaTable: data.featureBankMetaTable,
    featureBankMetaTableSearch: data.featureBankMetaTableSearch,
    report: data.report,
    versioning: objects.versioning,
    person: data.person,
    team: data.team,
    dataDetail: data.dataDetail,
    conversation: utilities.conversations,
    search: search.search,
    suggest: search.suggest,
    dataCols: data.dataCols,
    referencingCols: data.referencingCols,
    data: search.data,
    people: search.people,
    related: search.related,
    rating: utilities.rating,
    ratingSummary: utilities.ratingSummary,
    subscriptionReportGroups: user.subscriptionReportGroups,
    subscriptionDataGroups: user.subscriptionDataGroups,
    subscriptionPeopleGroups: user.subscriptionPeopleGroups,
    subscriptionToolsGroups: user.subscriptionToolsGroups,
    subscriptionEntity: user.subscriptionEntity,
    subscriptionEntityAndSubscriber: user.subscriptionEntityAndSubscriber,
    insight: search.insight,
    excludedReportsByAuthor: data.excludedReportsByAuthor,
    preferenceByKey: user.preferenceByKey,
    userPreferences: user.userPreferences,
    userPreferenceByKey: user.userPreferenceByKey,
    toolById: data.toolById,
    tools: data.tools,
    notificationsMissed: user.notificationsMissed,
    pinboards: user.pinboards,
    allPinboards: user.allPinboards,
    pinboard: user.pinboard
  },
})

/*
{
  mainReport: report(id: "61ec8529-31b0-40a0-ba32-692f1bf2bec7") {
    id
    title
    url
    views
    timestamp
    conversation {
      id
      entityId
      authorName
      conversationText
    }
  }
  subReport: report(id: "85ec84c6-deb4-40b9-b537-dc43694c2d86") {
    id
    title
    conversation {
      authorRacf
      id
    }
  }
  oneConv: conversation(id: "85ec84c6-deb4-40b9-b537-dc43694c2d86") {
    conversationText
  }
  newSearch: search(id: "mortgages", filters: [{field: "author", values: ["wattsp", "harejc", "jonecay", "binhamt", "unknown"]}, {field: "file_format", values: ["xls", "csv"]}]) {
     title
    term
    results {
      format
      title
      url
    }
  }
}
*/
