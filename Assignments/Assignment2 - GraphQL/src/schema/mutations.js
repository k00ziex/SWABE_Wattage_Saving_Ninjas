import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';

import UserPayload from './types/payload-user';
import UserInput from './types/input-user';
import Room from './types/room';
import RoomPayload from './types/room-payload';
import RoomInput from './types/room-input';
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    userCreate: {
      type: new GraphQLNonNull(UserPayload),
      args: {
        input: { type: new GraphQLNonNull(UserInput) },
      },
      resolve: async (source, { input }, { mutators }) => {
        return mutators.userCreate({ input });
      },
    },
    roomCreate: {
      type: new GraphQLNonNull(Room), // Returns roompayload
      args: {
        input: {type: new GraphQLNonNull(RoomInput)},
      },
      resolve: async (source, {input}, {mutators}) => {
        return await mutators.roomCreate(input);
      }
    },
    // roomModify: {
    //   type: new GraphQLNonNull(RoomPayload), // Returns roompayload
    //   args: {type: Room}, // takes room
    //   resolve: async (source, {input}, {pgApi}) => {
      
    //   }
    // },
  }),
});

export default MutationType;
