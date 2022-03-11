import { GraphQLObjectType, GraphQLNonNull } from 'graphql';

import UserPayload from './types/payload-user';
import UserInput from './types/input-user';
import Room from './types/room';
import RoomPayload from './types/room-payload';
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
    // roomCreate: {
    //   type: new GraphQLNonNull(RoomPayload), // Returns roompayload
    //   args: {type: Room}, // takes room
    //   resolve: async (source, {input}, context) => {
        
    //   }
    // },
    // roomModify: {
    //   type: new GraphQLNonNull(RoomPayload), // Returns roompayload
    //   args: {type: Room}, // takes room
    //   resolve: async (source, {input}, context) => {
      
    //   }
    // },
  }),
});

export default MutationType;
