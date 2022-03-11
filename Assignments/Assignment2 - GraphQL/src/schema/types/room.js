import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema,
    GraphQLBoolean,
    GraphQLList,
  } from 'graphql';
  
const Room = new GraphQLObjectType({
    name: "Room",
    fields:{
      roomNumber: {type: new GraphQLNonNull(GraphQLInt)},
      available: {type: new GraphQLNonNull(GraphQLBoolean)},
      comment: {type: new GraphQLNonNull(GraphQLString)},
      floor: {type: new GraphQLNonNull(GraphQLString)},
      bedAmount: {type: new GraphQLNonNull(GraphQLInt)},
      bedType: {type: new GraphQLNonNull(GraphQLString)},
      roomServiceAvailable: {type: new GraphQLNonNull(GraphQLBoolean)},
      soundProof: {type: new GraphQLNonNull(GraphQLBoolean)},
      hasOwnTub: {type: new GraphQLNonNull(GraphQLBoolean)},
    }
  });

  export default Room