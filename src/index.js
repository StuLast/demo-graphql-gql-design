const { ApolloServer, gql } = require("apollo-server");

typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupAddCars: (groupId: ID!, carId: ID!)Boolean
    groupCreate (
      name: String!
      image: ImageInput!
      description: String!
      featureSet: GroupFeatureFields
    ): Boolean
    groupDelete (groupId: ID!): Boolean
    groupPublish (groupId: ID!): Boolean
    groupRemoveCars (groupId: ID!, carId: ID!): Boolean
    groupUnpublish (groupId: ID!): Boolean
    groupUpdate (groupId: ID!): Boolean
  }

  input ImageInput {
    url: String!
  }


  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!):[Car!]!
    name: String!
    image: image!
    description: String!
  }

  type image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatureField!]! 
    applyFeaturesSeperately: Boolean!
  }

  enum GroupFeatureField {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }

  type GroupFeature {
    feature: GroupFeatureField!
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
