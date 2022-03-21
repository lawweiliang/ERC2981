const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const nft721royaltyContract = artifacts.require('NFT721Royalty');

contract('Testing NFT721Royalty Contract', async ([alice, bob]) => {
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
    const tranReceipt = await nft721royaltyInstance.mint(alice, tokenId);
    const zeroAddress = '0x0000000000000000000000000000000000000000';
    expectEvent(tranReceipt, 'Transfer', { from: zeroAddress, to: alice, tokenId: tokenId });
  });

  it.only('royalty function', async () => {
    const tokenId = '20';
    const tranReceipt = await nft721royaltyInstance.mint(alice, tokenId);
    const salePrice = web3.utils.toWei('100', 'ether');
    let royaltyData = await nft721royaltyInstance.royaltyInfo(tokenId, salePrice);

    assert.equal(royaltyData[0], alice);
    //2% of 100 = 2
    assert.equal(web3.utils.fromWei(royaltyData[1], 'ether'), '2');
  });
});
