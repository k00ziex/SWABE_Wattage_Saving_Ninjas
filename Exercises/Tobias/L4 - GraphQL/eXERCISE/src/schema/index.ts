import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
  GraphQLBoolean,
} from 'graphql';



import {Room} from "./Room";
import {Client} from "ts-postgres"

import pgClient from '../db/db-client';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: { 
    currentTime: {
      description: 'Async version of currentTime',
      type: GraphQLString,
      resolve: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            const isoString = new Date().toISOString();
            resolve(isoString.slice(11, 19));
          }, 1);
        });
      },
    },
    helloworld: {
      description: "Says hello world",
      type: GraphQLString,
      resolve: () => {
        return "Hello world";
      }
    },
    room:{
      type: GraphQLString, // TODO: Type ok?
      args: {
        uid: {type: new GraphQLNonNull(GraphQLInt)}
      },
        resolve: async (source, {uid}, context, info) => { // TODO set context somewhere
        const { pgPool } = await pgClient();
        let resText = "";
        try {
          // Querying the client returns a query result promise
          // which is also an asynchronous result iterator.
          const result = await pgPool.query(
              "SELECT 'Hello ' || $1 || '!' AS message",
              ['world']
          );
  
          console.log(result.rows[0].message);
          for await (const row of result.rows) {
              // 'Hello world!'
              resText = resText + row.message
              console.log(row.message);
          }
        } finally {
            await pgPool.end()
        }

        return `I returned room ${uid} boss. Restext is: ${resText}`;
      }
    }
  },
});



export const schema = new GraphQLSchema({
  query: QueryType,
});

console.log(printSchema(schema));
