import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import bodyParser from 'body-parser';
import schema from './schema';
import resolverQuery from './resolvers'

const executableSchema = makeExecutableSchema({schema, resolverQuery});

export default app => {
    app.use('/graphql', bodyParser.json(), graphqlExpress({executableSchema}));
};

