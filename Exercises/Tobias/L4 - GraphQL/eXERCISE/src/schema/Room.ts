import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema,
    GraphQLBoolean,
  } from 'graphql';
  

export const Room = new GraphQLObjectType({
    name: "Room",
    fields:{
      roomNumber: {type: new GraphQLNonNull(GraphQLInt)},
      available: {type: new GraphQLNonNull(GraphQLBoolean)},
      comment: {type: new GraphQLNonNull(GraphQLString)},
      floor: {type: new GraphQLNonNull(GraphQLString)},
    }
  });