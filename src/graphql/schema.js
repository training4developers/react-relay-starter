import {
	GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLEnumType,
	GraphQLList
} from 'graphql';
import { getWidget, getUserWidgets, getWidgets, getUser, getUsers } from '../database';

const colorType = new GraphQLEnumType({
	name: 'Color',
	description: 'An enumeration of colors',
	values: {
		'red': { value: 'red', description: 'Red' },
		'yellow': { value: 'yellow', description: 'Yellow' },
		'green': { value: 'green', description: 'Green' },
		'blue': { value: 'blue', description: 'Blue' }
	}
});

const sizeType = new GraphQLEnumType({
	name: 'Size',
	description: 'An enumeration of sizes',
	values: {
		'tiny': { value: 'tiny', description: 'Tiny' },
		'small': { value: 'small', description: 'Small' },
		'medium': { value: 'medium', description: 'Medium' },
		'large': { value: 'large', description: 'Large' },
		'huge': { value: 'huge', description: 'Huge' }
	}
});

const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: 'The user id'
		},
		name: {
			type: GraphQLString,
			description: 'The user name'
		},
		widgets: {
			type: new GraphQLList(widgetType),
			description: 'The user widgets',
			resolve: ({widgets, id}) => widgets || getUserWidgets(id).then(widgets => widgets)
		}

	})
});

const widgetType = new GraphQLObjectType({
	name: 'Widget',
	description: 'A widget',
	fields: () => ({
		id: {
			type: GraphQLString,
			description: 'The widget id'
		},
		owner: {
			type: userType,
			description: 'The owner of the widget',
			resolve: ({owner, id}) => owner || getWidget(id).then(widget => widget.owner)
		},
		name: {
			type: GraphQLString,
			description : 'The widget name'
		},
		description: {
			type: GraphQLString,
			description: 'The widget description'
		},
		color: {
			type: colorType,
			description: 'The widget color'
		},
		size: {
			type: sizeType,
			description: 'The widget size'
		},
		quantity: {
			type: GraphQLInt,
			description: 'The widget quantity'
		}
	})
});


const query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		widget: {
			type: widgetType,
			description: 'Get a widget by id',
			args: {
				id: {
					type: GraphQLString,
					description: 'Id of the widget to get'
				}
			},
			resolve: (ignore, args) => getWidget(args.id)
		},
		widgets: {
			description: 'Get all widgets',
			type: new GraphQLList(widgetType),
			resolve: () => getWidgets()
		},
		user: {
			type: userType,
			description: 'Get a user by id',
			args: {
				id: {
					type: GraphQLInt,
					description: 'Id of the user to get'
				}
			},
			resolve: (ignore, args) => getUser(args.id)
		},
		users: {
			type: new GraphQLList(userType),
			description: 'Get all users',
			resolve: () => getUsers()
		}
	}

});

export const schema = new GraphQLSchema({ query });
