import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
  } from 'graphql';
  
import RoomInput from './room-input';

const ReservationInput = new GraphQLInputObjectType({
    name: "ReservationInput",
    fields: () => ({
      uid: {type: new GraphQLNonNull(GraphQLString)},
      room: {type: new GraphQLNonNull(RoomInput)},
      fromDate: {type: new GraphQLNonNull(GraphQLString)},
      toDate: {type: new GraphQLNonNull(GraphQLString)},
      nameOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      emailOfReserver: {type: new GraphQLNonNull(GraphQLString)},
      comments: {type: new GraphQLNonNull(GraphQLString)},
    })
  });

  export default ReservationInput