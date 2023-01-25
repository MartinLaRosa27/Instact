const shortid = require("shortid");
const Block = require("../models/Block");

module.exports.postBlock = async (blocked, user) => {
  if (user !== null) {
    const existingBlock = await Block.findAll({
      where: {
        userId: user._id,
        blocked,
      },
    });
    if (existingBlock.length > 0) {
      throw new Error("The user already blocked him");
    }
    try {
      await Block.create({
        _id: shortid.generate(),
        userId: user._id,
        blocked,
      });
      return "The user is being blocked correctly";
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.deleteBlock = async (blocked, user) => {
  if (user !== null) {
    const existingBlock = await Block.findOne({
      where: {
        userId: user._id,
        blocked,
      },
    });
    if (!existingBlock) {
      throw new Error("The user don't block him");
    }
    try {
      await Block.destroy({
        where: {
          userId: user._id,
          blocked,
        },
      });
      return "The user has been unlocked";
    } catch (e) {
      console.log(e);
      throw new Error(e.errors[0].message);
    }
  }
  throw new Error("session expired");
};

module.exports.verifyBlock = async (id, user) => {
  if (user !== null) {
    const existingBlock = await Block.findOne({
      where: {
        userId: id,
        blocked: user._id,
      },
    });
    if (existingBlock) {
      return true;
    }
    return false;
  }
  throw new Error("session expired");
};
