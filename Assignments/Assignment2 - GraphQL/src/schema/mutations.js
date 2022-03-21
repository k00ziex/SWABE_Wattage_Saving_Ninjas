import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import Room from './types/room';
import RoomInput from './types/room-input';
import Reservation from './types/reservation';
import ReservationInput from './types/reservation-input';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    /* Room Start */
    roomCreate: {
      type: new GraphQLNonNull(Room),
      args: {
        room: {type: new GraphQLNonNull(RoomInput)},
      },
      resolve: async (source, {room}, {mutators}) => {
        return await mutators.roomCreate(room);
      }
    },
    roomModify: {
      type: new GraphQLNonNull(Room), 
      args: {
        modifiedRoom: {type: new GraphQLNonNull(RoomInput)}
      },
      resolve: async (source, {modifiedRoom}, {mutators}) => {
        return await mutators.roomModify(modifiedRoom);
      }
    },
    roomDelete: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        uid: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (source, {uid}, {mutators}) => {
        return await mutators.roomDelete(uid);
      }
    },
    /* Room End */

    /* Reservation Start */
    reservationCreate: {
      type: new GraphQLNonNull(Reservation),
      args: {
        reservation: {type: new GraphQLNonNull(ReservationInput)}
      },
      resolve: async(source, {reservation}, {mutators}) => {
        return await mutators.reservationCreate(reservation)
      }
    },

    reservationDelete: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        uid: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (source, {uid}, {mutators}) => {
        return await mutators.reservationDelete(uid);
      }
    },
    /* Reservation End */
  }),
});

export default MutationType;
