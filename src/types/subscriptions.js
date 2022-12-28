import { GraphQLInterfaceType, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLInputObjectType } from "graphql"

import { NodeInterface } from "./node"

import { ReportType } from "./reports"
import { ToolType } from "./tools"

import { DataDetailType } from "./data"

import { PersonType } from "./people"

export const SetSubscriptionType = new GraphQLInputObjectType({
  name: "SetSubscriptionType",
  fields: {
    entityType: { type: GraphQLString },
    entityId: { type: GraphQLString },
    racf: { type: GraphQLString }
  }
})

export const SubInterface = new GraphQLInterfaceType({
  name: "SubInterface",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    entityType: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    lastModified: {
      type: GraphQLString
    },
    groupId: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    }
  },
  resolveType: resolveSubType
})

function resolveSubType(value) {
  if (value.reportEntity) return SubscriptionReportType
  if (value.dataEntity) return SubscriptionDataType
  if (value.toolEntity) return SubscriptionToolsType
  if (value.personEntity) return SubscriptionPeopleType
  return SubscriptionType
}

export const SubscriptionType = new GraphQLObjectType({
  name: "Subscription",
  interfaces: [SubInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    entityType: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    lastModified: {
      type: GraphQLString
    },
    groupId: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    }
  }
})

export const SubscriptionReportType = new GraphQLObjectType({
  name: "SubscriptionReport",
  interfaces: [SubInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    entityType: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    lastModified: {
      type: GraphQLString
    },
    groupId: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    reportEntity: {
      type: ReportType
    }
  }
})

export const SubscriptionDataType = new GraphQLObjectType({
  name: "SubscriptionData",
  interfaces: [SubInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    entityType: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    lastModified: {
      type: GraphQLString
    },
    groupId: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    dataEntity: {
      type: DataDetailType
    }
  }
})

export const SubscriptionToolsType = new GraphQLObjectType({
  name: "SubscriptionTools",
  interfaces: [SubInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    entityType: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    lastModified: {
      type: GraphQLString
    },
    groupId: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    toolEntity: {
      type: ToolType
    }
  }
})

export const SubscriptionPeopleType = new GraphQLObjectType({
  name: "SubscriptionPeople",
  interfaces: [SubInterface],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    entityType: {
      type: GraphQLString
    },
    entityId: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    lastModified: {
      type: GraphQLString
    },
    groupId: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    personEntity: {
      type: PersonType
    }
  }
})

export const SubscriptionReportGroupType = new GraphQLObjectType({
  name: "SubscriptionReportGroup",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        return source.id
      }
    },
    groupName: {
      type: GraphQLString
    },
    groupType: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    subscriptions: {
      type: new GraphQLList(SubscriptionReportType)
    }
  }
})

export const SubscriptionDataGroupType = new GraphQLObjectType({
  name: "SubscriptionDataGroup",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        return source.id
      }
    },
    groupName: {
      type: GraphQLString
    },
    groupType: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    subscriptions: {
      type: new GraphQLList(SubscriptionDataType)
    }
  }
})

export const SubscriptionToolsGroupType = new GraphQLObjectType({
  name: "SubscriptionToolsGroup",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        return source.id
      }
    },
    groupName: {
      type: GraphQLString
    },
    groupType: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    subscriptions: {
      type: new GraphQLList(SubscriptionToolsType)
    }
  }
})

export const SubscriptionPeopleGroupType = new GraphQLObjectType({
  name: "SubscriptionPeopleGroup",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(source) {
        return source.id
      }
    },
    groupName: {
      type: GraphQLString
    },
    groupType: {
      type: GraphQLString
    },
    racf: {
      type: GraphQLString
    },
    displayOrder: {
      type: GraphQLInt
    },
    subscriptions: {
      type: new GraphQLList(SubscriptionPeopleType)
    }
  }
})

export const SubscriptionReportGroupsType = new GraphQLObjectType({
  name: "SubscriptionReportGroups",
  fields: {
    total: {
      type: GraphQLInt
    },
    subscriptionGroup: {
      type: new GraphQLList(SubscriptionReportGroupType)
    }
  }
})

export const SubscriptionDataGroupsType = new GraphQLObjectType({
  name: "SubscriptionDataGroups",
  fields: {
    total: {
      type: GraphQLInt
    },
    subscriptionGroup: {
      type: new GraphQLList(SubscriptionDataGroupType)
    }
  }
})

export const SubscriptionPeopleGroupsType = new GraphQLObjectType({
  name: "SubscriptionPeopleGroups",
  fields: {
    total: {
      type: GraphQLInt
    },
    subscriptionGroup: {
      type: new GraphQLList(SubscriptionPeopleGroupType)
    }
  }
})

export const SubscriptionToolsGroupsType = new GraphQLObjectType({
  name: "SubscriptionToolsGroups",
  fields: {
    total: {
      type: GraphQLInt
    },
    subscriptionGroup: {
      type: new GraphQLList(SubscriptionToolsGroupType)
    }
  }
})
