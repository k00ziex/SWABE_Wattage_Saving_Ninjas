// ADAPTED FROM POUL EJNAR DEMO - See PLAGIARISM.txt

import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import * as config from './config';

import pgApiWrapper from './db/pg-api';

async function main() {
  const pgApi = await pgApiWrapper();
  const server = express();
  server.use(cors());
  server.use(morgan('dev'));
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use('/:fav.ico', (req, res) => res.sendStatus(204));

  server.use('/graphql', (req, res) => {
    const mutators = {
      ...pgApi.mutators,
    };

    const queries = {
      ...pgApi.queries,
    };
    graphqlHTTP({
      schema,
      context: { pgApi, mutators, queries },
      graphiql: true,
      customFormatErrorFn: (err) => {
        const errorReport = {
          message: err.message,
          locations: err.locations,
          stack: err.stack ? err.stack.split('\n') : [],
          path: err.path,
        };
        console.error('GraphQL Error', errorReport);
        return config.isDev
          ? errorReport
          : { message: 'Oops! Something went wrong! :(' };
      },
    })(req, res)
  });

  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}

main();