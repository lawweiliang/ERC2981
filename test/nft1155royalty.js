const { BN, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const nft1155royaltyContract = artifacts.require('NFT1155Royalty');

contract('Testing NFT1155Royalty Contract', async ([owner, walletAlice]) => {
  let nft1155royaltyInstance;

  beforeEach(async () => {
    nft1155royaltyInstance = await nft1155royaltyContract.new();
  });

  it('deployed contract', async () => {
    assert.equal(await nft1155royaltyInstance.supportsInterface('0x2a55205a'), true);
  });

  it('mint token', async () => {
    const tokenId = '20';
    const tokenAmount = '100';
    const tranReceipt = await nft1155royaltyInstance.mint(walletAlice, tokenId, tokenAmount, '0x', { from: owner });
    const zeroAddress = '0x0000000000000000000000000000000000000000';
    expectEvent(tranReceipt, 'TransferSingle', { operator: owner, from: zeroAddress, to: walletAlice, id: tokenId, value: tokenAmount });
  });

  it('royalty function', async () => {
    const tokenId = '20';
    const tokenAmount = '100';
    const tranReceipt = await nft1155royaltyInstance.mint(walletAlice, tokenId, tokenAmount, '0x');
    const salePrice = web3.utils.toWei('100', 'ether');
    let royaltyData = await nft1155royaltyInstance.royaltyInfo(tokenId, salePrice);

    assert.equal(royaltyData[0], owner);

    //2% of 100 = 2
    assert.equal(web3.utils.fromWei(royaltyData[1], 'ether'), '2');
  });
});
