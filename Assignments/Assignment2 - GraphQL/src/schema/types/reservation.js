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

  const Reservation = new GraphQLObjectType({
    name: "Reservation",
    fields:{
      reservationNumber: {type: new GraphQLNonNull(GraphQLInt)},
      fromDate: {type: new GraphQLNonNull(GraphQLString)},
      toDate: {type: new GraphQLNonNull(GraphQLString)},
      nameOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      emailOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      commentsOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      discount: {type: new GraphQLNonNull(GraphQLBoolean)},
      totalMoneySaved: {type: new GraphQLNonNull(GraphQLFloat)}
    }
  });

  export default Reservation