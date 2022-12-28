import { UserPreferenceInputType, UserPreferenceType } from "../../types/preferences"
import * as fetchersold from "../../fetchers.old"

export const userPreference = {
  type: UserPreferenceType,
  args: {
    post: {
      type: UserPreferenceInputType,
    },
  },
  resolve(source, args, context, info) {
    return fetchersold.setUserPreference(args)
  },
}
