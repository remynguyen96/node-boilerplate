import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default app => {
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        // passHeader: `'Authorization': 'bearer token-foo@bar.com'`,
    }));
    app.use('/graphql', graphqlExpress(req => {
        // console.log(req);
        return {
            schema
        }
    }));
};

