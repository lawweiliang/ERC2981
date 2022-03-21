// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NFT1155Royalty is ERC1155, ERC2981{

  constructor() ERC1155("https://liang.com/api/{id}.json"){

    //set loyalty 2% equal to 200 basis points
    _setDefaultRoyalty(_msgSender(), 200);
  }

  function mint(address to, uint256 tokenId, uint256 amountOfToken, bytes memory data) public {
    _mint(to, tokenId, amountOfToken, data);
  }

  //This function is to overide supportInterface function of ERC1155 and ERC2981l
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC2981) returns (bool) {
      return super.supportsInterface(interfaceId);
  }

}
