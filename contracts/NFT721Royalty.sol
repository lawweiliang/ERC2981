// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT721Royalty is ERC721, ERC2981{

  construct() ERC721('LiangNft', 'LNFT'){

    //set loyalty 2% equal to 200 basis points
    _setDefaultRoyalty(_sender(), 200);
  }

}
