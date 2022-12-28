import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { ReportType, SetReportType, PutReportType } from "../../types/reports"
import * as fetchers from "../../fetchers"
import * as fetchersold from "../../fetchers.old"
import { getAuthHeader } from "../"

export const report = {
  type: ReportType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    originId: {
      type: GraphQLID,
    },
    put: {
      type: SetReportType,
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.changeReport(args, getAuthHeader(context))
  },
}

export const storeReport = {
  type: ReportType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    put: {
      type: PutReportType,
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.putReport(args, getAuthHeader(context))
  },
}

export const removeFromSearch = {
  type: GraphQLString,
  args: {
    id: {
      type: GraphQLString,
    },
    entityType: {
      type: GraphQLString,
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.removeFromSearch(args)
  },
}
