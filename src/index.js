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
    imageId: String!
    memberShips: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    imageId: String!
    memberShips: [GroupMembership!]!
    automaticGroupFeatures: [AutomaticGroupFeatures!]!
  }

  type AutomaticGroupFeatures {
    id: ID!
  }

  type GroupMembership {
    id: ID!
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
