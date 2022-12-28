import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { ReportType } from "../../types/reports"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const report = {
  type: ReportType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getReportById(args.id, getAuthHeader(context))
  },
}

export const excludedReportsByAuthor = {
  type: new GraphQLList(ReportType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getExcludedReportsByAuthor(args)
  },
}
