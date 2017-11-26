export default `
   scalar Date

   type Link {
        id: ID!
        url: String!
        description: String!
        createdAt: Date!
   }
   
   type Query {
       allLinks: [Link!]!
   }
   
   schema {
       query: Query,
   }
`;

