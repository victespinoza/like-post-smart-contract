const SmartContract = artifacts.require("SmartContract");
const ethers = require("ethers");
const posts = require("../test/integration/posts");

module.exports = function (deployer) {
  deployer.deploy(
    SmartContract,
    posts.map((post) => ethers.utils.formatBytes32String(post))
  );
};
