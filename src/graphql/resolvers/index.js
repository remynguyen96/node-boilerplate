import GraphQLDate from 'graphql-date';
// import AuthResolver from './auth-resolver';

const links = [
    {
        id: 1,
        url: 'http://graphql.org/',
        description: 'The Best Query Language',
    },
    {
        id: 2,
        url: 'http://dev.apollodata.com',
        description: 'Awesome GraphQL Client',
    },
];

export default {
    Date: GraphQLDate,
    Query: {
        allLinks: () => links,
        // getAuth: AuthResolver.getAuth,
    },
};
