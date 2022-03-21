const nft1155Royalty = artifacts.require('NFT1155Royalty');

module.exports = async (deployer, network) => {
  await deployer.deploy(nft1155Royalty);
};
