export const mocks = {
  SearchType: () => {
    return {
      filters: [],
      pinboardOwners: () => new JSON([{ "racfid": "mymisup" }]),
      pinboardConsumers: [{ "racfid": "carropd" }],
    }
  },
  JSON: () => {
    return [{ "racfid": "value" }]
  },
}
