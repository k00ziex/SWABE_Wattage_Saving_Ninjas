import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLIn4t,
	GraphQLNonNull,
	printSchema,
	GraphQLBoolean,
	GraphQLList,
} from "graphql";
import { extractPrefixedColumns } from "../../db/utils";
import Room from "./room";

const Reservation = new GraphQLObjectType({
	name: "Reservation",
	fields: {
		uid: { type: new GraphQLNonNull(GraphQLString) },
		roomUID: {type: new GraphQLNonNull(GraphQLString)},
        room: { 
            type: new GraphQLNonNull(Room),
            resolve: (source) => {
                return extractPrefixedColumns({prefixedObject: source, prefix: "room"});
            },
        },
		fromDate: { 
			type: new GraphQLNonNull(GraphQLString),
			resolve: ({ fromDate }) => fromDate.toISOString(),
		 },	
		toDate: { 
			type: new GraphQLNonNull(GraphQLString),
			resolve: ({ toDate }) => toDate.toISOString(),
		},
		nameOfReserver: { type: new GraphQLNonNull(GraphQLString) },
		emailOfReserver: { type: new GraphQLNonNull(GraphQLString) },
		comments: { type: new GraphQLNonNull(GraphQLString) },
	},
});

export default Reservation;