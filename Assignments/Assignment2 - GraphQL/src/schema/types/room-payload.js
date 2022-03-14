import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';
import StdError from './room-error';
import Room from './room';

const RoomPayload = new GraphQLObjectType({
    name: "RoomPayload",
    fields: {
        errors: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(StdError))
            )
        },
        room: {type: new GraphQLNonNull(Room)},
    },
})

export default RoomPayload;