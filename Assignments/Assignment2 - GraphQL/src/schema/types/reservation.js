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

  import {
    DateTimeTypeDefinition
  } from 'graphql-scalars'

  const Reservation = new GraphQLObjectType({
    name: "Room",
    fields:{
      ReservationNumber: {type: new GraphQLNonNull(GraphQLInt)},
      fromDate: {type: new GraphQLNonNull(DateTimeTypeDefinition)}
    }
  });

  export default Reservation