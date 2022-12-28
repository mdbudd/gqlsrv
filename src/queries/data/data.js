import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from "graphql"
import { DataDetailType, DataColumnType } from "../../types/data"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const dataDetail = {
  type: DataDetailType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchers.getDataById(args.id, getAuthHeader(context))
  },
}

export const dataCols = {
  type: new GraphQLList(DataColumnType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    //console.log(JSON.stringify(args, null, 4))
    return fetchers.getColData(args, getAuthHeader(context))
  },
}

export const referencingCols = {
    type: new GraphQLList(DataColumnType),
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(source, args, context, info) {
      //console.log(JSON.stringify(args, null, 4))
      return fetchers.getReferencingColData(args, getAuthHeader(context))
    },
  }