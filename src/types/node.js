import {
    GraphQLInterfaceType,
    GraphQLID,
    GraphQLNonNull,
  } from "graphql";
  
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
  
