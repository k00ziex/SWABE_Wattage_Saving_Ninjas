import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
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
      reservationNumber: {type: new GraphQLNonNull(GraphQLInt)},
      fromDate: {type: new GraphQLNonNull(DateTimeTypeDefinition)},
      toDate: {type: new GraphQLNonNull(DateTimeTypeDefinition)},
      nameOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      emailOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      commentsOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      discount: {type: new GraphQLNonNull(GraphQLBoolean)},
      totalMoneySaved: {type: new GraphQLNonNull(GraphQLFloat)}
    }
  });

  export default Reservation