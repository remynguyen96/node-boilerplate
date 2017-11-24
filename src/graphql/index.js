import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default app => {
    app.use('/graphiql', graphiqlExpress({
        endPointURL: '/graphql',
        passHeader: `'Authorization': 'bearer token-foo@bar.com'`,
    }));
    app.use('/graphql', graphqlExpress(req => ({
        executableSchema
    })),);
};

