// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SozoNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    // Mapping from token ID to product ID
    mapping(uint256 => string) private _productIds;

    constructor() ERC721("Sozo Fashion NFT", "SOZO") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory tokenURI, string memory productId)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _productIds[newTokenId] = productId;

        return newTokenId;
    }

    function getProductId(uint256 tokenId) public view returns (string memory) {
        if (_ownerOf(tokenId) == address(0)) revert("Token does not exist");
        return _productIds[tokenId];
    }

    function transferNFT(address from, address to, uint256 tokenId) public {
        if (!isApprovedOrOwner(msg.sender, tokenId)) revert("Not approved to transfer");
        safeTransferFrom(from, to, tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || isApprovedForAll(owner, spender) || getApproved(tokenId) == spender);
    }
}
