import 'dotenv/config';
import './db/index';

import { ApolloServer } from 'apollo-server';
import context from './utils/context';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';

const server = new ApolloServer({
  context,
  resolvers,
  typeDefs,
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true
  }
});

server.listen().then(() => {
  console.log(`
    Listening on port 4000!
    Try it out:
      https://studio.apollographql.com/graph/${process.env.APOLLO_SERVICE_NAME}/explorer?variant=current
  `);
});
