import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
} from 'graphql';
import Reservation from './types/reservation';

import Room from './types/room'

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      helloWorld: {
        type: GraphQLString,
        resolve: async (source, args, {queries}) => {
          let rows = await queries.roomMainList();
          rows.forEach(element => {
            console.log(element);
          });
          return "Hello There";
        }
      },
      //************* Room queries */
      roomMainList: {
        type: new GraphQLList(new GraphQLNonNull(Room)),
        resolve: async (source, args, {queries}) => {
          return await queries.roomMainList();
        }
      },
      room: {
        type: Room,
        args: { 
          uid: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async (source, {uid}, {queries}) => {
          // Get room from db
          return await queries.roomFind(uid);
        }
      },
      //************ Room queries end */
      //************ Reservation queries */
      reservationMainList: {
        type: new GraphQLList(new GraphQLNonNull(Reservation)),
        resolve: async (source, args, {queries}) => {
          return await queries.reservationMainList();
        }
      },
      //******************************** */
    
    },
  });
  
  export default QueryType;
  