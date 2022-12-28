import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLUnionType } from "graphql"
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json"
import { NodeInterface } from "./node"

const resolveType = data => {
  // console.log(" [x] resolve type")
  // console.log(data)
  switch (data.insightType) {
    case "report":
      return ReportResultType
    case "data":
      return DataResultType
    case "businessTerm":
      return BusinessTermResultType
    case "feature":
      return FeatureResultType
    case "tool":
      return ToolResultType
    case "pinboard":
      return PinboardResultType
    default:
      return ReportResultType
  }
}

export const FilterType = new GraphQLInputObjectType({
  name: "FilterType",
  fields: {
    field: { type: GraphQLString },
    values: { type: new GraphQLList(GraphQLString) }
    // values: { type: new GraphQLList(GraphQLFloat) }
  }
})

export const SortType = new GraphQLInputObjectType({
  name: "SortType",
  fields: {
    field: { type: GraphQLString },
    order: { type: GraphQLString }
  }
})

export const DatesType = new GraphQLInputObjectType({
  name: "DatesType",
  fields: {
    gte: { type: GraphQLString },
    lte: { type: GraphQLString }
  }
})

export const SuggestType = new GraphQLObjectType({
  name: "Suggestion",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    text: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    }
  }
})

export const SuggestResultType = new GraphQLObjectType({
  name: "SuggestionResult",
  fields: {
    text: {
      type: GraphQLString
    },
    score: {
      type: GraphQLFloat
    }
  }
})

export const AutoSuggestType = new GraphQLObjectType({
  name: "AutoSuggestion",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    suggestions: {
      type: new GraphQLList(SuggestType)
    }
  }
})

export const UIFilterObjType = new GraphQLObjectType({
  name: "UIObjFilter",
  fields: {
    id: {
      type: GraphQLID
    },
    docCount: {
      type: GraphQLInt
    },
    filter: {
      type: GraphQLString
    },
    isChecked: {
      type: GraphQLBoolean
    },
    label: {
      type: GraphQLString
    },
    unique: {
      type: GraphQLString
    },
    value: {
      type: GraphQLString
    }
  }
})
export const UIFilterType = new GraphQLObjectType({
  name: "UIFilter",
  fields: {
    filter: {
      type: GraphQLString
    },
    label: {
      type: GraphQLString
    },
    data: {
      type: new GraphQLList(UIFilterObjType)
    }
  }
})

export const ReportResultType = new GraphQLObjectType({
  name: "ReportResult",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    category: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    },
    views: {
      type: GraphQLInt
    },
    viewsFromSource: {
      type: GraphQLInt
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    author: {
      type: GraphQLString
    },
    author_id: {
      type: GraphQLString
    },
    doc_count: {
      type: GraphQLInt
    },
    created: {
      type: GraphQLString
    },
    updated: {
      type: GraphQLString
    },
    timestamp: {
      type: GraphQLString
    },
    team: {
      type: GraphQLString
    },
    comments: {
      type: GraphQLInt
    },
    source: {
      type: GraphQLString
    },
    dateCreatedAtSource: {
      type: GraphQLString
    },
    purpose: {
      type: GraphQLString
    },
    kitemarked: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLInt
    },
    subs: {
      type: GraphQLInt
    },
    insightType: {
      type: GraphQLString
    },
    snippet: {
      type: GraphQLString
    }
  }
})

export const DataResultType = new GraphQLObjectType({
  name: "DataResult",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },

    tableName: {
      type: GraphQLString
    },
    owner: {
      type: GraphQLString
    },
    numRows: {
      type: GraphQLInt
    },
    numCols: {
      type: GraphQLInt
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    created: {
      type: GraphQLString
    },
    suggest: {
      type: GraphQLString
    },
    pageRank: {
      type: GraphQLInt
    },
    version: {
      type: GraphQLString
    },
    source: {
      type: GraphQLString
    },
    technology: {
      type: GraphQLString
    },
    lastDdlTime: {
      type: GraphQLString
    },
    timestamp: {
      type: GraphQLString
    },
    objectType: {
      type: GraphQLString
    },
    dbName: {
      type: GraphQLString
    },
    insightType: {
      type: GraphQLString
    }
  }
})

export const PinboardResultType = new GraphQLObjectType({
  name: "PinboardResult",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    purpose: {
      type: GraphQLString
    },
    insightType: {
      type: GraphQLString
    }
  }
})

export const BusinessTermResultType = new GraphQLObjectType({
  name: "BusinessTermResult",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    insightType: {
      type: GraphQLString
    }
  }
})

export const FeatureResultType = new GraphQLObjectType({
  name: "FeatureResult",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    timestamp: {
      type: GraphQLString
    },
    version: {
      type: GraphQLString
    },
    base_feature_name: {
      type: GraphQLString
    },
    bitbucket_link: {
      type: GraphQLString
    },
    comments: {
      type: GraphQLInt
    },
    creator_racf_id: {
      type: GraphQLString
    },
    date_indexed: {
      type: GraphQLString
    },
    feature_creation_date: {
      type: GraphQLString
    },
    feature_datatype: {
      type: GraphQLString
    },
    feature_description: {
      type: GraphQLString
    },
    feature_domain: {
      type: GraphQLString
    },
    feature_regulatory_date: {
      type: GraphQLString
    },
    feature_table_name: {
      type: GraphQLString
    },
    feature_type: {
      type: GraphQLString
    },
    feature_version: {
      type: GraphQLInt
    },
    feature_views: {
      type: new GraphQLList(GraphQLString)
    },
    full_feature_name: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLInt
    },
    related_feature: {
      type: GraphQLString
    },
    related_glossary_terms: {
      type: GraphQLString
    },
    remove_from_search: {
      type: GraphQLString
    },
    sensitive_data_classification: {
      type: GraphQLString
    },
    source_column: {
      type: GraphQLString
    },
    source_db: {
      type: GraphQLString
    },
    source_system: {
      type: GraphQLString
    },
    source_table: {
      type: GraphQLString
    },
    suggest: {
      type: GraphQLString
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    used_in_projects: {
      type: GraphQLString
    },
    insight_type: {
      type: GraphQLString
    },
    insightType: {
      type: GraphQLString
    }
  }
})

export const ToolResultType = new GraphQLObjectType({
  name: "ToolResult",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    toolName: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    insightType: {
      type: GraphQLString
    }
  }
})

export const ProducerDetailType = new GraphQLObjectType({
  name: "ProducerDetail",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLString
    },
    version: {
      type: GraphQLString
    },
    timestamp: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    salaryref: {
      type: GraphQLInt
    }
  }
})

export const ProducerType = new GraphQLObjectType({
  name: "Producer",
  fields: {
    key: {
      type: GraphQLString
    },
    doc_count: {
      type: GraphQLInt
    },
    racf: {
      type: GraphQLString
    },
    expanded: {
      type: ProducerDetailType
    }
  }
})

export const ResultType = new GraphQLUnionType({
  name: "Result",
  types: [ReportResultType, DataResultType, BusinessTermResultType, FeatureResultType, ToolResultType, PinboardResultType],
  resolveType: resolveType
})

export const SearchType = new GraphQLObjectType({
  name: "Search",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        // logger.info(source)
        return source.id
      }
    },
    total: {
      type: GraphQLInt
    },
    took: {
      type: GraphQLInt
    },
    jsTook: {
      type: GraphQLFloat
    },
    newSearch: {
      type: GraphQLBoolean
    },
    filtering: {
      type: GraphQLBoolean
    },
    term: {
      type: GraphQLString
    },
    visible: {
      type: GraphQLInt
    },
    topProducers: {
      type: new GraphQLList(ProducerType)
    },
    uiFilters: {
      type: new GraphQLList(UIFilterType)
    },
    filters: {
      type: GraphQLJSON
    },
    suggestions: {
      type: new GraphQLList(SuggestResultType)
    },
    results: {
      type: new GraphQLList(ResultType)
    },

    pinboardName: {
      type: GraphQLString
    },
    pinboardDescription: {
      type: GraphQLString
    },
    pinboardOwners: {
      type: GraphQLJSON // change to more robust type asap
    },
    pinboardConsumers: {
      type: GraphQLJSON // change to more robust type asap
    },
    pinboardId: {
      type: GraphQLID
    }
  }
})

// const PageInfoType = new GraphQLObjectType({
//   name: "PageInfo",
//   fields: {
//     hasNextPage: {
//       type: new GraphQLNonNull(GraphQLBoolean)
//     },
//     hasPreviousPage: {
//       type: new GraphQLNonNull(GraphQLBoolean)
//     },
//     startCursor: {
//       type: GraphQLString
//     },
//     endCursor: {
//       type: GraphQLString
//     }
//   }
// });

// const PostEdgeType = new GraphQLObjectType({
//   name: "PostEdge",
//   fields: () => {
//     return {
//       cursor: {
//         type: new GraphQLNonNull(GraphQLString)
//       },
//       node: {
//         type: new GraphQLNonNull(PostType)
//       }
//     };
//   }
// });

// const PostsConnectionType = new GraphQLObjectType({
//   name: "PostsConnection",
//   fields: {
//     pageInfo: {
//       type: new GraphQLNonNull(PageInfoType)
//     },
//     edges: {
//       type: new GraphQLList(PostEdgeType)
//     }
//   }
// });
