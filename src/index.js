const { ApolloServer, gql } = require('apollo-server');

typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupAddCars(groupId: ID!, carId: ID!): GroupTransactionPayload!
    groupCreate(groupInput: GroupInput!): GroupTransactionPayload!
    groupDelete(groupId: ID!): GroupTransactionPayload!
    groupPublish(groupId: ID!): GroupTransactionPayload!
    groupRemoveCars(groupId: ID!, carId: ID!): GroupTransactionPayload!
    groupUnpublish(groupId: ID!): GroupTransactionPayload!
    groupUpdate(groupId: ID!, groupInput: GroupInput!): GroupTransactionPayload!
  }

  type GroupTransactionPayload {
    group: Group
    errors: [Errors]!
  }

  type Errors {
    message: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureField
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
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  input ImageInput {
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
      cars: () => [{ id: 1, color: 'blue', make: 'Toyota' }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
