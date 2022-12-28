import { GraphQLString, GraphQLBoolean } from "graphql"
import { GraphQLUpload } from "graphql-upload"

import { createObject, storeFile } from "../../constants/helpers"
import { getAuthHeader } from "../"

export const storeObject = {
  description: "Uploads a file",
  type: GraphQLBoolean,
  args: {
    file: {
      description: "File",
      type: GraphQLUpload,
    },
    title: { type: GraphQLString },
    purpose: { type: GraphQLString },
    type: { type: GraphQLString },
  },
  async resolve(source, args) {
    const { filename, mimetype, createReadStream } = await args.file
    const stream = createReadStream()
    const object = await createObject({ stream, filename, mimetype })

    let meta = {
      title: args.title,
      purpose: args.purpose,
    }
    storeFile({ object, meta, type: args.type || "new" })
    // Promisify the stream and store the file, then…
    return true
  },
}
