import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer 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`,
  },
})
