const CryptoZombies = artifacts.require("CryptoZombies");

module.exports = async function (deployer, network, accounts) {
  if (network == "ganache") {
    await deployer.deploy(CryptoZombies, { from: accounts[2] });
  } else {
    await deployer.deploy(CryptoZombies, { from: accounts[0] });
  }
};
