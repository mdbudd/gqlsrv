import { PersonType, SetPersonType } from "../../types/people"
import * as fetchers from "../../fetchers"
import { getAuthHeader } from "../"

export const personAdd = {
  type: PersonType,
  args: {
    post: {
      type: SetPersonType,
    },
  },
  resolve(source, args, context, info) {
    // needs adding to a fetcher, not hooked up to front end yet.
    // currently done directly on front end if user doesn't exist..
    return addPerson(args, getAuthHeader(context))
  },
}