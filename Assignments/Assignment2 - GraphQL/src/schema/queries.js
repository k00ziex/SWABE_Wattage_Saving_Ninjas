import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
  } from 'graphql';
    
  import Task from './types/task';
  import SearchResultItem from './types/search-result-item';
  import Room from './types/room'

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      helloWorld: {
        type: GraphQLString,
        resolve: async () => {
          return "Hello There";
        }
      },
      roomMainList: {
        type: new GraphQLList(new GraphQLNonNull(Room)),
        resolve: async (source, args) => {
          // Get from DB
        }
      }
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
  