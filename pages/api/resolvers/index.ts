import { Agolia } from 'services/agolia'
import { DynamoDB } from 'services/dynamodb'
type DataSources = { dataSources: { dynamodb: DynamoDB; agolia: Agolia } }

export const resolvers = {
  Query: {
    getAllAnime: async (
      _: null,
      args: QueryGetAllAnimeArgs,
      { dataSources }: DataSources,
    ) => dataSources.dynamodb.getAllAnime(args),
    getAnime: async (
      _: null,
      args: QueryGetAnimeArgs,
      { dataSources }: DataSources,
    ) => dataSources.dynamodb.getAnime(args),
    getAnimeByTitle: async (
      _: null,
      args: QueryGetAnimeByTitleArgs,
      { dataSources }: DataSources,
    ) => dataSources.dynamodb.getAnimeByTitle(args),
    searchAnime: async (
      _: null,
      args: QuerySearchAnimeArgs,
      { dataSources }: DataSources,
    ) => dataSources.agolia.searchAnime(args),
  },

  AnimeRelations: {
    sideStory: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.sideStory) return []
      return Promise.all(
        parent?.sideStory?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    summary: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.summary) return []
      return Promise.all(
        parent?.summary?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    other: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.other) return []
      return Promise.all(
        parent?.other?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    alternativeVersion: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.alternativeVersion) return []
      return Promise.all(
        parent?.alternativeVersion?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    sequel: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.sequel) return []
      return Promise.all(
        parent?.sequel?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    spinOff: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.spinOff) return []
      return Promise.all(
        parent?.spinOff?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    alternativeSetting: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.alternativeSetting) return []
      return Promise.all(
        parent?.alternativeSetting?.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
    prequel: async (
      parent: { [key: string]: [string] },
      _: null,
      { dataSources }: DataSources,
    ) => {
      if (!parent.prequel) return []
      return Promise.all(
        parent.prequel.map((title) =>
          title ? dataSources.dynamodb.getAnimeByTitle({ slug: title }) : null,
        ),
      )
    },
  },
}
