import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
  } from 'graphql';
    
  import Task from './types/task';
  import SearchResultItem from './types/search-result-item';
  import Room from './types/room'
import res from 'express/lib/response';

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      helloWorld: {
        type: GraphQLString,
        resolve: async (source, args, {pgApi}) => {
          let rows = await pgApi.roomMainList();
          rows.forEach(element => {
            console.log(element);
          });
          return "Hello There";
        }
      },
      //************* Room queries */
      roomMainList: {
        type: new GraphQLList(new GraphQLNonNull(Room)),
        resolve: async (source, args, {pgApi}) => {
          return await pgApi.roomMainList();
        }
      },
      room: {
        type: Room,
        args: { 
          uid: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: async (source, {uid}, context) => {
          // Get room from db

        }
      }
      //************ Room queries end */


      // taskMainList: {
      //   type: new GraphQLList(new GraphQLNonNull(Task)),
      //   resolve: async (source, args, { loaders }) => {
      //     return loaders.tasksByTypes.load('latest');
      //   },
      // },
      // taskInfo: {
      //   type: Task,
      //   args: {
      //     id: { type: new GraphQLNonNull(GraphQLID) },
      //   },
      //   resolve: async (source, args, { loaders }) => {
      //     return loaders.tasks.load(args.id);
      //   },
      // },
      // search: {
      //   type: new GraphQLNonNull(
      //     new GraphQLList(new GraphQLNonNull(SearchResultItem))
      //   ),
      //   args: {
      //     term: { type: new GraphQLNonNull(GraphQLString) },
      //   },
      //   resolve: async (source, args, { loaders }) => {
      //     return loaders.searchResults.load(args.term);
      //   },
      // },
    },
  });
  
  export default QueryType;
  