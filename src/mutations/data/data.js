import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { DataDetailType, DataColumnType, SetDataColType, SetDataType } from "../../types/data"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const data = {
  type: DataDetailType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    put: {
      type: SetDataType,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.changeData(args, getAuthHeader(context))
  },
}

export const dataColumn = {
  type: DataColumnType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    put: {
      type: SetDataColType,
    },
  },
  resolve(source, args, context, info) {
    return fetchers.changeDataCol(args, getAuthHeader(context))
  },
}
