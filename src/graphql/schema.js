export default `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }
`;

