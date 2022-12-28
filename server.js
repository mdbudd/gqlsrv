console.log({ starting: true })

import express from "express"
const auth = require("./auth")

const app = express()

import { graphiqlExpress, graphqlExpress } from "graphql-server-express"
import graphqlHTTP from "express-graphql"

import bodyParser from "body-parser"
import { GraphQLSchema, execute, subscribe } from "graphql"
import { graphqlUploadExpress } from "graphql-upload"
import { Upload } from "graphql-upload"
import { addMocksToSchema } from "@graphql-tools/mock"
import { createServer } from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"

import { ConversationType } from "./src/types/conversations"
import { ReportType, SetReportType } from "./src/types/reports"
import { NotificationType } from "./src/types/notifications"
import { PinboardType, PinboardContentType, PinboardRoleType } from "./src/types/pinboard"
import { PeopleType, PersonType } from "./src/types/people"
import { ToolType } from "./src/types/tools"
import { DataType, DataDetailType, SetDataType, DataColumnType, SetDataColType } from "./src/types/data"
import { RelatedType, RelatedDetailType } from "./src/types/related"
import { SearchType, SuggestType, AutoSuggestType, ResultType } from "./src/types/search"
import { RootQuery } from "./src/queries/root"
import { RootMutation } from "./src/mutations/root"
import { RootSubscription } from "./src/subscriptions/root"
import { altairExpress } from "altair-express-middleware"

import { storeFile, store, fetchFile } from "./src/constants/helpers"
import { mocks } from "./src/constants/mocking"
const util = require("util")

const schema = new GraphQLSchema({
  types: [
    ReportType,
    SetReportType,
    ConversationType,
    SearchType,
    SuggestType,
    AutoSuggestType,
    ResultType,
    PeopleType,
    PersonType,
    DataType,
    SetDataType,
    DataColumnType,
    SetDataColType,
    ToolType,
    DataDetailType,
    RelatedType,
    RelatedDetailType,
    NotificationType,
    PinboardType,
    PinboardContentType,
    PinboardRoleType,
  ],
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription,
})
const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
})
const PORT = process.env.PORT || 3004

app.use(auth)
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  if (req.method === "OPTIONS") {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.post(
  "/graphql",
  bodyParser.json(),
  graphqlExpress((req, res) => ({
    schema,
    context: req,
    // debug: true,
    formatError: err => {
      if (err.originalError && err.originalError.error_message) {
        err.message = err.originalError.error_message
      }

      return err
    },
  }))
)

app.use(
  "/graphiql",
  altairExpress((req, res) => ({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `wss://${req.hostname}:${PORT}/subscriptions`,
    initialQuery: `query{
      toolById(id: "875C2E1C-9B1D-487B-8B89-632E8D312E38"){
        id
        toolName
        editorialDescription
        format
      }
    }`,
    theme: "dark",
  }))
)

app.post("/store-new", store.single("image"), function (req, res) {
  var meta = {
    id: req.body.id,
    title: req.body.title,
    purpose: req.body.purpose,
  }
  storeFile({ object: req.file, res, type: "new" })
})

app.post("/store-existing", store.single("image"), function (req, res) {
  console.log(util.inspect(req.body, false, 7, true))
  var meta = {
    id: req.body.id,
    title: req.body.title,
    purpose: req.body.purpose,
  }
  storeFile({ object: req.file, res, type: "existing", meta })
})

//
app.get("/get-file/:bucket/:key/:version?", function (req, res) {
  fetchFile(req.params.bucket, req.params.key, res, req.query.version, req.headers)
})

app.use("/*", (req, res) => res.send("Health Check!"))

const ws = createServer(app)

new SubscriptionServer(
  {
    onConnect: () => console.log(`Subs connection established`),
    onDisconnect: () => console.log("Subs connection terminated"),
    schema,
    execute,
    subscribe,
    onOperation: (message, params, webSocket) => {
      console.log("Subs connection operating")
      return { ...params, context: { user: "buddm" } }
    },
  },
  {
    server: ws,
    path: "/subscriptions",
  }
)

ws.listen(PORT, () => {
  console.log({ running: true })
})
