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

  type Group {
    id: ID1
    featureSet: GroupFeatureSet
    cars(skip: Int!, take: Int!):[Car!]!
    name: String!
    image: image!
    bodyHTML: String!
  }

  type image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]! 
    applyFeaturesSeperately: Boolean!
  }

  type GroupFeatures {
    feature: String!
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
