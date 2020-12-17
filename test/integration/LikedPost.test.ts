import { ethers } from "ethers";

const truffleAssert = require("truffle-assertions");
const contractJson = require("../../build/contracts/SmartContract.json");
const posts = require("./posts");
const config = require("../../config");

describe("Liked Post", () => {
  const NETWORK_ID = config.networkId;
  const URL = `http://${config.host}:${config.port}`;
  const abi = contractJson.abi;
  const address = contractJson.networks[`${NETWORK_ID}`].address;
  const jsonProv = new ethers.providers.JsonRpcProvider(URL);
  const contract = new ethers.Contract(address, abi, jsonProv.getSigner(0));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should increase quantity of likes if I like a post", async () => {
    const post = ethers.utils.formatBytes32String(posts[0]);

    const initialPost = (await contract.totalLikesFor(post)).toNumber();
    await contract.likePost(post);
    await contract.likePost(post);
    const finalPost = (await contract.totalLikesFor(post)).toNumber();

    expect(finalPost).toBe(initialPost + 2);
  });

  it("Should throw error if I try to like an inexistent post", async () => {
    const inexistentPost = ethers.utils.formatBytes32String("another post");

    await truffleAssert.reverts(
      contract.totalLikesFor(inexistentPost),
      "Post does not exists"
    );
  });
});
