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
    car:[Car!]!
  }

  type AutomaticGroup {
    id: ID!
    imageId: String!
    car:[Car!]!
    automaticGroupFeatures: [AutomaticGroupFeatures!]!
  }

  type AutomaticGroupFeatures {
    id: ID!
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
