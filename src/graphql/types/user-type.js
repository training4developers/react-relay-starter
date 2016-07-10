import { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString} from 'graphql';

import { widgetType } from './widget-type';
import { getUserWidgets } from '../../database';

export const userType = new GraphQLObjectType({
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
