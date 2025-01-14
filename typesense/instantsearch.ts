import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"

const typesenseQuestsInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
    nodes: [
      {
        host: "jfqln58gwoctpbmkp-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,summary,description,tags",
  },
})

const typesenseTeamsInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
    nodes: [
      {
        host: "jfqln58gwoctpbmkp-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,description,roleCategories,industry",
  },
})

const typesenseCoursesInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
    nodes: [
      {
        host: "jfqln58gwoctpbmkp-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,description,provider",
  },
})

const typesenseHeroesInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
    nodes: [
      {
        host: "jfqln58gwoctpbmkp-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "name.first,name.last,location.country",
  },
})

const questsSearchClient = typesenseQuestsInstantsearchAdapter.searchClient
const teamsSearchClient = typesenseTeamsInstantsearchAdapter.searchClient
const coursesSearchClient = typesenseCoursesInstantsearchAdapter.searchClient
const heroesSearchClient = typesenseHeroesInstantsearchAdapter.searchClient

export {
  questsSearchClient,
  teamsSearchClient,
  coursesSearchClient,
  heroesSearchClient,
}
