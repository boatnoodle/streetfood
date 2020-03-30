import apolloLogger from "apollo-link-logger";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: ApolloLink.from([apolloLogger, link])
});

export default client;
