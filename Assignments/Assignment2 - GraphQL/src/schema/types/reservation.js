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
  
const Reservation = new GraphQLObjectType({
    name: "Reservation",
    fields:{
      uid: {type: new GraphQLNonNull(GraphQLString)},
      room: {type: new GraphQLNonNull(Room)},
      fromDate: {type: new GraphQLNonNull(GraphQLString)},
      toDate: {type: new GraphQLNonNull(GraphQLString)},
      nameOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      emailOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      comments: {type: new GraphQLNonNull(GraphQLString)},
    }
  });

  export default Reservation