import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  printSchema,
} from 'graphql';
import NumbersInRange from './types/numbers-in-range';
import { numbersInRangeObject } from '../utils';

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
          }, 5000);
        });
      },
    },
    syncCurrentTime: {
      description: 'Sync version of currentTime',
      type: GraphQLString,
      resolve: () => {
        const sleepToDate = new Date(new Date().getTime() + 5000);
        while (sleepToDate > new Date()) {
          // sleep
        }
        const isoString = new Date().toISOString();
        return isoString.slice(11, 19);
      },
    },
    numbersInRange: {
      type: NumbersInRange,
      args: {
        begin: { type: new GraphQLNonNull(GraphQLInt) },
        end: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: function (source, { begin, end }) {
        return numbersInRangeObject(begin, end);
      },
    }
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});

console.log(printSchema(schema));
