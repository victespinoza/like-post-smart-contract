// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

library Post {
    struct post {
        bool exists;
        uint256 likes;
    }
}

contract SmartContract {
    using Post for Post.post;
    mapping(bytes32 => Post.post) public likesReceived;

    constructor(bytes32[] memory postNames) public {
        for (uint256 index = 0; index < postNames.length; index++) {
            bytes32 post = postNames[index];
            likesReceived[post].exists = true;
            likesReceived[post].likes = 0;
        }
    }

    event LogLike(address sender, bytes32 post);

    function requirePost(bytes32 post) private view {
        require(likesReceived[post].exists, "Post does not exists");
    }

    function totalLikesFor(bytes32 post) public view returns (uint256) {
        requirePost(post);
        return likesReceived[post].likes;
    }

    function likePost(bytes32 post) public {
        emit LogLike(msg.sender, post);
        requirePost(post);
        likesReceived[post].likes += 1;
    }
}
