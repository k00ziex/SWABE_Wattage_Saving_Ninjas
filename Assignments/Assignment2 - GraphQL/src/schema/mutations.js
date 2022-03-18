import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import Room from './types/room';
import RoomInput from './types/room-input';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
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
    }
  }),
});

export default MutationType;
