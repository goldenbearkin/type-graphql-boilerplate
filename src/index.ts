import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

const bootstrap = async () => {
  await createConnection();

  const schema = await buildSchema({ resolvers: [__dirname + '/**/*.resolver.ts'] });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log('server started on http://localhost:4000/graphql'));
};

bootstrap();
