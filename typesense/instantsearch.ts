import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"

const typesenseQuestsInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
    nodes: [
      {
        host: "3q6vif2tznsc95r4p-1.a1.typesense.net",
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
        host: "3q6vif2tznsc95r4p-1.a1.typesense.net",
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
        host: "3q6vif2tznsc95r4p-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,description,provider",
  },
})

const typesenseMentorsInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
    nodes: [
      {
        host: "3q6vif2tznsc95r4p-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "minRate,maxRate,skill",
  },
})

const questsSearchClient = typesenseQuestsInstantsearchAdapter.searchClient
const teamsSearchClient = typesenseTeamsInstantsearchAdapter.searchClient
const coursesSearchClient = typesenseCoursesInstantsearchAdapter.searchClient
const mentorsSearchClient = typesenseMentorsInstantsearchAdapter.searchClient

export {
  questsSearchClient,
  teamsSearchClient,
  coursesSearchClient,
  mentorsSearchClient,
}
