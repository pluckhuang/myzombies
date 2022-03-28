const CryptoZombies = artifacts.require("CryptoZombies");

const TEST_ADDRESS = process.env.TEST_ADDRESS;

module.exports = async function (deployer, network, accounts) {
  if (network == "ganache") {
    await deployer.deploy(CryptoZombies, { from: accounts[2] });
  } else if (network == "test") {
    await deployer.deploy(CryptoZombies, { from: TEST_ADDRESS });
  } else {
    await deployer.deploy(CryptoZombies);
  }
};
