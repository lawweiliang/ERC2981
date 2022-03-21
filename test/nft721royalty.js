const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const nft721royaltyContract = artifacts.require('NFT721Royalty');

contract('Testing NFT721Royalty Contract', async ([owner, walletAlice]) => {
  let nft721royaltyInstance;

  beforeEach(async () => {
    nft721royaltyInstance = await nft721royaltyContract.new();
  });

  it('deployed contract', async () => {
    assert.equal(await nft721royaltyInstance.name(), 'LiangNft');
    assert.equal(await nft721royaltyInstance.symbol(), 'LNFT');
    assert.equal(await nft721royaltyInstance.supportsInterface('0x2a55205a'), true);
  });

  it('mint token', async () => {
    const tokenId = '20';
    const tranReceipt = await nft721royaltyInstance.mint(walletAlice, tokenId, { from: owner });
    const zeroAddress = '0x0000000000000000000000000000000000000000';
    expectEvent(tranReceipt, 'Transfer', { from: zeroAddress, to: walletAlice, tokenId: tokenId });
  });

  it('royalty function', async () => {
    const tokenId = '20';
    const tranReceipt = await nft721royaltyInstance.mint(walletAlice, tokenId, { from: owner });
    const salePrice = web3.utils.toWei('100', 'ether');

    // 0 -> artist/owner address, 1-> royalty received
    let royaltyData = await nft721royaltyInstance.royaltyInfo(tokenId, salePrice);

    assert.equal(royaltyData[0], owner);
    //2% of 100 = 2
    assert.equal(web3.utils.fromWei(royaltyData[1], 'ether'), '2');
  });
});
