const MyNFT = artifacts.require("MyNFT");
// const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(MyNFT);
  const myNFT = await MyNFT.deployed()

  // Deploy EthSwap
  // await deployer.deploy(EthSwap, token.address);
  // const ethSwap = await EthSwap.deployed()

  // Transfer all tokens to EthSwap (1 million)
  // await token.transfer(ethSwap.address, '1000000000000000000000000')
};
