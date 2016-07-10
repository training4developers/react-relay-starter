import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { getWidget, getWidgets, getUser, getUsers } from '../database';

import { userType} from './types/user-type';
import { widgetType } from './types/widget-type';


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
