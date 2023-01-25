const {
  postUser,
  userAuthentication,
  getUserByName,
  getUserInformation,
  pathUserImg,
  getUserPersonalImg,
  getUserByNameStrict,
} = require("../controllers/userController");
const {
  postPublication,
  getMyPublications,
  deletePublication,
  getPublicationByName,
} = require("../controllers/publicationController");
const {
  postTracing,
  deleteTracing,
  getUserFollowing,
  getUserFollowers,
} = require("../controllers/tracingController");
const {
  deleteBlock,
  postBlock,
  verifyBlock,
} = require("../controllers/blockController");
const { auth } = require("../middleware/auth");

module.exports.resolvers = {
  Query: {
    // User:
    getUserByName: (root, { username }, context) => {
      return getUserByName(username, context.user);
    },

    getUserByNameStrict: (root, { username }, context) => {
      return getUserByNameStrict(username, context.user);
    },

    getUserInformation: (root, {}, context) => {
      return getUserInformation(context.user);
    },

    getUserPersonalImg: (root, {}, context) => {
      return getUserPersonalImg(context.user);
    },

    // Tracing:
    getUserFollowing: (root, {}, context) => {
      return getUserFollowing(context.user);
    },

    getUserFollowers: (root, {}, context) => {
      return getUserFollowers(context.user);
    },

    // auth:
    auth: (root, { token }, context) => {
      return auth(token);
    },

    // Publication:
    getMyPublications: (root, {}, context) => {
      return getMyPublications(context.user);
    },

    getPublicationByName: (root, { username }, context) => {
      return getPublicationByName(username, context.user);
    },

    // Block:
    verifyBlock: (root, { blocked }, context) => {
      return verifyBlock(blocked, context.user);
    },
  },

  Mutation: {
    // User:
    postUser: (root, { input }, context) => {
      return postUser(input);
    },

    userAuthentication: (root, { input }, context) => {
      return userAuthentication(input);
    },

    pathUserImg: (root, { image }, context) => {
      return pathUserImg(image, context.user);
    },

    // Publication:
    postPublication: (root, { input }, context) => {
      return postPublication(input, context.user);
    },

    deletePublication: (root, { id }, context) => {
      return deletePublication(id, context.user);
    },

    // Tracing:
    postTracing: (root, { following }, context) => {
      return postTracing(following, context.user);
    },

    deleteTracing: (root, { following }, context) => {
      return deleteTracing(following, context.user);
    },

    // Block:
    postBlock: (root, { blocked }, context) => {
      return postBlock(blocked, context.user);
    },

    deleteBlock: (root, { blocked }, context) => {
      return deleteBlock(blocked, context.user);
    },
  },
};
