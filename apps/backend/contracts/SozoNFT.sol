// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SozoNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to product ID
    mapping(uint256 => string) private _productIds;

    constructor() ERC721("Sozo Fashion NFT", "SOZO") {}

    function mintNFT(address recipient, string memory tokenURI, string memory productId)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _productIds[newTokenId] = productId;

        return newTokenId;
    }

    function getProductId(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _productIds[tokenId];
    }

    function transferNFT(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Not approved to transfer");
        safeTransferFrom(from, to, tokenId);
    }
}
