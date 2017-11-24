export default `
   scalar Date
   
   type Status {
     message: String!
   }
   
   type Link {
        id: ID!
        url: String!
        description: String!
   }
   
   type Auth {
        _id: ID!
        name: String
        email: String
        token: String!
        verified: Boolean
        createdAt: Date!
        updatedAt: Date!
   }
   
   type Query {
       allLinks: [Link!]!
       getAuth: [Auth] 
   }
   
   schema {
       query: Query,
   }
`;

