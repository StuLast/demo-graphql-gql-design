const { ApolloServer, gql } = require("apollo-server");

typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type ManualGroup {
    id: ID!
    name: String!
    imageId: String!
    bodyHTML: String
    memberShips: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    imageId: String!
    bodyHTML: String!
    memberShips: [GroupMembership!]!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeperately: Boolean!
  }

  type AutomaticGroupFeatures {
    column: String!
  }

  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
