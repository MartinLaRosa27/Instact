const { gql } = require("apollo-server");

module.exports.typeDefs = gql`
  type User {
    _id: String!
    email: String
    image: String
    fullName: String
    username: String
    following: String
  }

  type UserInformation {
    publicationsQ: Int
    followingQ: Int
    followersQ: Int
  }

  type UserFollowing {
    _id: String
    username: String
    image: String
  }

  scalar Date
  type Publication {
    _id: String!
    username: String
    description: String
    image: String
    createdAt: Date
  }

  input userInput {
    email: String!
    password: String!
    fullName: String
    username: String
  }

  input publicationInput {
    description: String!
    image: String!
  }

  type Query {
    auth(token: String): User
    getUserByName(username: String): [User]
    getUserByNameStrict(username: String): User
    getMyPublications: [Publication]
    getPublicationByName(username: String!): [Publication]
    getUserInformation: UserInformation
    getUserFollowing: [UserFollowing]
    getUserFollowers: [UserFollowing]
    getUserPersonalImg: User
  }

  type Mutation {
    postUser(input: userInput): String
    userAuthentication(input: userInput): String
    postPublication(input: publicationInput): String
    postTracing(following: String): String
    deleteTracing(following: String): String
    deletePublication(id: String): String
    pathUserImg(image: String!): String
  }
`;
