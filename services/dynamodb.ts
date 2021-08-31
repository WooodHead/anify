import { UserInputError } from 'apollo-server-micro'
import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { ScanResponse, QueryResponse } from 'dynamoose/dist/DocumentRetriever'
import { ModelType } from 'dynamoose/dist/General'
import { Schema } from 'dynamoose/dist/Schema'
import { DataSource } from 'apollo-datasource'
import _ from 'lodash'

type AnimeTableAttributes = { id: string; entity: string }

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
})

type relations = {
  sideStory: Maybe<Array<string>>
  summary: Maybe<Array<string>>
  other: Maybe<Array<string>>
  alternativeVersion: Maybe<Array<string>>
  alternativeSetting: Maybe<Array<string>>
  sequel: Maybe<Array<string>>
  spinOff: Maybe<Array<string>>
  prequel: Maybe<Array<string>>
}

interface AnimeEntityRelations extends Omit<AnimeEntity, 'relations'> {
  relations: relations
}
export class AnimeEntity extends Document {
  PK!: AnimeTableAttributes
  SK!: AnimeTableAttributes
  GSI1PK: AnimeTableAttributes | undefined
  GSI1SK: AnimeTableAttributes | undefined
  GSI2PK: AnimeTableAttributes | undefined
  GSI2SK: AnimeTableAttributes | undefined
  title!: Maybe<string>
  type!: Maybe<string>
  shortId!: string
  id!: string
  colors: Array<string> = []
  genres: Array<string> = []
  status!: Maybe<string>
  relations!: Maybe<AnimeRelations>
  sourceMaterialType!: Maybe<string>
  rating!: Maybe<string>
  score!: Maybe<number>
  episodes!: Maybe<number>
  description!: Maybe<string>
  mainImage!: Maybe<string>
  mainImageBlurred!: Maybe<string>
  season!: Maybe<string>
  airedStart!: Maybe<string>
  slug!: string
  airedEnd!: Maybe<string>
  duration!: Maybe<string>
  producers: Array<string> = []
  licensors: Array<string> = []
  studios: Array<string> = []
  sources: Array<{
    name: string
    url: string
  }> = []
  englishTitle!: Maybe<string>
  createdAt!: number
  updatedAt!: number
  japaneseTitle!: Maybe<string>
  synonyms: Array<string> = []
  trailer!: string
}

const schema = new dynamoose.Schema(
  {
    //@ts-expect-error we allow val to have AnimeTableAttributes
    PK: {
      type: String,
      hashKey: true,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    SK: {
      type: String,
      rangeKey: true,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI1PK: {
      type: String,
      index: {
        name: 'GSI1',
        rangeKey: 'GSI1SK',
      },
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI1SK: {
      type: String,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI2PK: {
      type: String,
      index: {
        name: 'GSI2',
        rangeKey: 'GSI2SK',
      },
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI2SK: {
      type: String,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
  },
  {
    saveUnknown: true, // use attributes which aren't defined in the schema
    timestamps: true,
  },
)

export class DynamoDB extends DataSource {
  schema: Schema
  animeRepository: ModelType<AnimeEntity>
  constructor() {
    super()
    this.schema = schema
    this.animeRepository = dynamoose.model<AnimeEntity>('anime', this.schema, {
      create: false,
    })
  }

  async getAllAnime(args: QueryGetAllAnimeArgs) {
    try {
      if (
        [args.first, args.skip, args.last].filter((arg) => arg != null).length >
        1
      )
        throw new UserInputError('You may only have one argument')

      if (args.first) {
        const animes: ScanResponse<AnimeEntity> = await this.animeRepository
          .scan()
          .limit(args.first)
          .exec()

        return animes.map((anime) => this.animeMapper(anime))
      }

      const animes: ScanResponse<AnimeEntity> = await this.animeRepository
        .scan()
        .all(100)
        .exec()

      // filter conditions
      if (args.skip)
        return animes
          .slice(args.skip - 1, undefined)
          .map((anime) => this.animeMapper(anime))
      if (args.last)
        return animes
          .slice(animes.length - args.last, undefined)
          .map((anime) => this.animeMapper(anime))

      return animes.map((anime) => this.animeMapper(anime))
    } catch (error) {
      throw error
    }
  }

  async getTop500Anime() {
    const animes: ScanResponse<AnimeEntity> = await this.animeRepository
      .scan()
      .filter('score')
      .exists()
      .all(100)
      .exec()

    const top500Animes = _.reverse(
      _.sortBy(
        animes.map((anime) => this.animeMapper(anime)),
        ['score'],
      ),
    ).slice(0, Math.min(animes.length - 1, 499))

    return top500Animes
  }
  async getAnime(args: QueryGetAnimeArgs) {
    try {
      const animeResponse: QueryResponse<AnimeEntity> =
        await this.animeRepository
          .query('GSI1PK')
          .eq(`TITLE#${args.slug}`)
          .filter('shortId')
          .eq(args.shortId)
          .using('GSI1')
          .exec()
      if (animeResponse.count === 0) return null

      return this.animeMapper(animeResponse[0])
    } catch (error) {
      throw error
    }
  }

  async getAnimeBySlug(args: QueryGetAnimeBySlugArgs) {
    const animeResponse: QueryResponse<AnimeEntity> = await this.animeRepository
      .query('GSI1PK')
      .eq(`TITLE#${args.slug}`)
      .using('GSI1')
      .exec()
    if (animeResponse.count === 0) return null

    return this.animeMapper(animeResponse[0])
  }

  animeMapper(animeEntity: AnimeEntity): Anime {
    const {
      PK,
      SK,
      GSI1PK,
      GSI1SK,
      GSI2PK,
      GSI2SK,
      createdAt,
      updatedAt,
      toDynamo,
      conformToSchema,
      model,
      ...rest
    } = animeEntity

    const anime = { ...rest }

    return anime
  }

  async getAnimeWithRelations(args: QueryGetAnimeArgs) {
    try {
      const animeResponse: QueryResponse<AnimeEntityRelations> =
        await this.animeRepository
          .query('GSI1PK')
          .eq(`TITLE#${args.slug}`)
          .filter('shortId')
          .eq(args.shortId)
          .using('GSI1')
          .exec()
      if (animeResponse.count === 0) return null

      const animeEntityWithRelations = await this.getRelations(animeResponse[0])
      const anime = this.animeMapper(animeEntityWithRelations)

      return anime
    } catch (error) {
      throw error
    }
  }

  async getRelations(anime: AnimeEntityRelations) {
    const sideStory = anime.relations?.sideStory
      ? await Promise.all(
          anime.relations?.sideStory?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const other = anime.relations?.other
      ? await Promise.all(
          anime.relations?.other?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const prequel = anime.relations?.prequel
      ? await Promise.all(
          anime.relations?.prequel?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const sequel = anime.relations?.sequel
      ? await Promise.all(
          anime.relations?.sequel?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const spinOff = anime.relations?.spinOff
      ? await Promise.all(
          anime.relations?.spinOff?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const summary = anime.relations?.summary
      ? await Promise.all(
          anime.relations?.summary?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const alternativeSetting = anime.relations?.alternativeSetting
      ? await Promise.all(
          anime.relations?.alternativeSetting?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const alternativeVersion = anime.relations?.alternativeVersion
      ? await Promise.all(
          anime.relations?.alternativeVersion?.map((title) =>
            title ? this.getAnimeBySlug({ slug: title }) : null,
          ),
        )
      : []
    const animeWithRelations = {
      ...anime,
      relations: {
        sideStory,
        other,
        prequel,
        sequel,
        spinOff,
        summary,
        alternativeSetting,
        alternativeVersion,
      },
    }
    return animeWithRelations
  }
}
