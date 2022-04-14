// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";     // increment token ids 
import "@openzeppelin/contracts/access/Ownable.sol";     // sets up access control on our smart contract
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// npm install @openzeppelin/contracts

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    constructor() ERC721("MyNFT", "NFT") {}     // SC Name and symbol

    event TokenIds (uint id, address indexed owner);


    function mintNFT(address recipient, string memory tokenURI)  //  address receiving NFT minted,  metadata-tokenuri , 
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit TokenIds(newItemId , msg.sender);

        return newItemId;     //  id if NFT minted
    }
}

// uniqueness of metadata not enforced
