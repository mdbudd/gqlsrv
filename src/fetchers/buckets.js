import fetch from "node-fetch"
import { S3Service } from "../constants/ecs"
import { formatDate } from "../constants/helpers"

const util = require("util")

export const getVersionsById = async (args, auth) => {
  let buckets = new S3Service()
  let versioning = await buckets.listObjectVersions("pi-flint-store", args.id)
  // for (let version of versioning.Versions) {
  //   version.LastModified = formatDate(version.LastModified)
  //   version.BucketObj = await buckets.getObject("pi-flint-store", version.Key, version.VersionId)
  //   if (version.BucketObj.Metadata.id == undefined) {
  //     version.BucketObj.Metadata = { id: null, purpose: null, title: null }
  //   }
  // }
  let Versions = await Promise.all(
    versioning.Versions.map(async (version, i) => {
      let VersionObj = await buckets.getObject("pi-flint-store", version.Key, version.VersionId)

      return {
        LastModified: formatDate(version.LastModified),
        VersionId: version.VersionId,
        VersionObj: { LastModified: formatDate(VersionObj.LastModified), VersionId: VersionObj.VersionId, Meta: VersionObj.Metadata, Purpose: VersionObj.Metadata.purpose || "", Title: VersionObj.Metadata.title || "" }
      }
    })
  )

  versioning = { Prefix: versioning.Prefix, Name: versioning.Name, Versions }
  // console.log(util.inspect(versioning, false, 7, true))
  return versioning
}
