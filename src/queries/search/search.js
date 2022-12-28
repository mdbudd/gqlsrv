import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } from "graphql"
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json"
import { SearchType, SortType, DatesType, AutoSuggestType, FilterType } from "../../types/search"
import { DataType } from "../../types/data"
import { PeopleType } from "../../types/people"
import { InsightType } from "../../types/insight"
import * as fetchers from "../../fetchers"
import * as fetchersold from "../../fetchers.old"
import { getAuthHeader } from "../"

export const search = {
  type: SearchType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    pid: {
      type: GraphQLString,
    },
    method: {
      type: GraphQLString,
    },
    filters: {
      type: new GraphQLList(GraphQLJSON),
    },
    category: {
      type: GraphQLString,
    },
    start: {
      type: GraphQLInt,
    },
    amount: {
      type: GraphQLInt,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    newSearch: {
      type: GraphQLBoolean,
    },
    filtering: {
      type: GraphQLBoolean,
    },
    sort: {
      type: SortType,
    },
    dates: {
      type: DatesType,
    },

    // id,
    // method = "POST",
    // filters = [],
    // category = "all",
    // start = 0,
    // amount = 10,
    // tags = [],
    // newSearch = true,
    // filtering = false,
    // sort = { field: "default", order: "" },
    // dates = { gte: null, lte: null }
  },
  resolve(source, args, context, info) {
    //console.log(JSON.stringify(args, null, 4))
    //console.log(util.inspect(args, false, 7, true));
    return fetchers.search(args, getAuthHeader(context))
  },
}

export const suggest = {
  type: AutoSuggestType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    //console.log(JSON.stringify(args, null, 4))
    //console.log(util.inspect(args, false, 7, true));
    return fetchers.suggest(args, getAuthHeader(context))
  },
}

export const insight = {
  type: new GraphQLList(InsightType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    racf: {
      type: new GraphQLNonNull(GraphQLString),
    },
    orderBy: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args, context, info) {
    // console.log(info)
    return fetchersold.getInsights(args)
  },
}



export const data = {
  type: DataType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    filters: {
      type: new GraphQLList(FilterType),
    },
    start: {
      type: GraphQLInt,
    },
    amount: {
      type: GraphQLInt,
    },
  },
  resolve(source, args, context, info) {
    //console.log(JSON.stringify(args, null, 4))
    //console.log(util.inspect(args, false, 7, true));
    return fetchers.data(args, getAuthHeader(context))
  },
}

export const people = {
  type: PeopleType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    filters: {
      type: new GraphQLList(FilterType),
    },
  },
  resolve(source, args, context, info) {
    return fetchers.people(args.id, args.filters, getAuthHeader(context))
  },
}