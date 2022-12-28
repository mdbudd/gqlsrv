import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from "graphql";

//import * as tables from "./tables";
//import * as loaders from "./loaders";
import * as fetchers from "./fetchers";

export const NodeInterface = new GraphQLInterfaceType({
  name: "Node",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolveType: source => {
    //console.log(source)
    //  if (source.domain === "report") {
    //    return ReportType;
    //  }
  }
});

// const resolveId = source => {
//   return tables.dbIdToNodeId(source.id, source.__tableName);
// };

// export const UserType = new GraphQLObjectType({
//   name: "User",
//   interfaces: [NodeInterface],
//   // Note that this is now a function
//   fields: () => {
//     return {
//       id: {
//         type: new GraphQLNonNull(GraphQLID),
//         resolve: resolveId
//       },
//       name: { type: new GraphQLNonNull(GraphQLString) },
//       about: { type: new GraphQLNonNull(GraphQLString) },
//       friends: {
//         type: new GraphQLList(UserType),
//         resolve(source) {
//           return loaders.getFriendIdsForUser(source).then(rows => {
//             const promises = rows.map(row => {
//               const friendNodeId = tables.dbIdToNodeId(
//                 row.user_id_b,
//                 row.__tableName
//               );
//               return loaders.getNodeById(friendNodeId);
//             });
//             return Promise.all(promises);
//           });
//         }
//       },
//       posts: {
//         type: PostsConnectionType,
//         args: {
//           after: {
//             type: GraphQLString
//           },
//           first: {
//             type: GraphQLInt
//           }
//         },
//         resolve(source, args) {
//           return loaders
//             .getPostIdsForUser(source, args)
//             .then(({ rows, pageInfo }) => {
//               const promises = rows.map(row => {
//                 const postNodeId = tables.dbIdToNodeId(row.id, row.__tableName);
//                 return loaders.getNodeById(postNodeId).then(node => {
//                   const edge = {
//                     node,
//                     cursor: row.__cursor
//                   };
//                   return edge;
//                 });
//               });

//               return Promise.all(promises).then(edges => {
//                 return {
//                   edges,
//                   pageInfo
//                 };
//               });
//             });
//         }
//       }
//     };
//   }
// });

export const ConversationType = new GraphQLObjectType({
  name: "Conversation",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    authorRacf: {
      type: GraphQLString
    },
    authorName: {
      type: GraphQLString
    },
    conversationText: {
      type: GraphQLString
    },
  }
});

export const SuggestType = new GraphQLObjectType({
  name: "Suggestion",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    text: {
      type: GraphQLString
    },
  }
});


export const FilterType = new GraphQLInputObjectType({
  name: 'FilterType',
  fields: {
    field: { type: GraphQLString },
    values: { type: new GraphQLList(GraphQLString) },
  }
})

export const ResultType = new GraphQLObjectType({
  name: "Result",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
  }
});




// export const SuggestType = new GraphQLObjectType({
//   name: "Suggestions",
//   fields: {
//     text: {
//       type: GraphQLString
//     }
//   }
// });

export const ReportType = new GraphQLObjectType({
  name: "Report",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        //console.log(source)
        return source.id
      }
    },
    title: {
      type: GraphQLString
    },
    conversation: {
      type: new GraphQLList(ConversationType),
      resolve(source, args) {
        console.log(source.id)
        return fetchers.getConversationById(source.id)
      }
    }
  }
});

export const SearchType = new GraphQLObjectType({
  name: "Search",
  interfaces: [NodeInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        console.log(source)
        return source.id
      }
    },
    title: {
      type: GraphQLString
    },
    // url: {
    //   type: GraphQLString
    // },
    // format: {
    //   type: GraphQLString
    // },
    // views: {
    //   type: GraphQLString
    // },
    suggestions: {
      type: new GraphQLList(SuggestType),
      resolve(source) {
        //console.log(source.suggestions)
        return source.suggestions
      }
    },
    results: {
      type: new GraphQLList(ResultType),
      resolve(source) {
        //console.log(source.suggestions)
        return source.results
      }
    }
  }
});


// export const PostType = new GraphQLObjectType({
//   name: "Post",
//   interfaces: [NodeInterface],
//   fields: {
//     id: {
//       type: new GraphQLNonNull(GraphQLID),
//       resolve: resolveId
//     },
//     createdAt: {
//       type: new GraphQLNonNull(GraphQLString)
//     },
//     body: {
//       type: new GraphQLNonNull(GraphQLString)
//     }
//   }
// });

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
