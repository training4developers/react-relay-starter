import { GraphQLSchema } from 'graphql';
import { queryType } from './types/query-type';


export const schema = new GraphQLSchema({ query: queryType });
