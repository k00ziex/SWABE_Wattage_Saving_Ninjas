import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

const StdError = new GraphQLObjectType({
    name: 'StdError',
    fields: () => ({
        message: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});

export default StdError;