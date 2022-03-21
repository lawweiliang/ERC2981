// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT721Royalty is ERC721, ERC2981{

  constructor() ERC721('LiangNft', 'LNFT'){

    //set loyalty 2% equal to 200 basis points
    _setDefaultRoyalty(_msgSender(), 200);
  }

  function mint(address to, uint256 tokenId) public {
    _safeMint(to, tokenId);
  }

  //This function is to overide supportInterface function of ERC721 and ERC2981l
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
      return super.supportsInterface(interfaceId);
  }


}
