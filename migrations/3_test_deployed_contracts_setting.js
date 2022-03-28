const CryptoZombies = artifacts.require("CryptoZombies");
const TEST_ADDRESS = process.env.TEST_ADDRESS;

module.exports = async function (deployer, network, accounts) {
  if (network == "ganache") {
    hellowkittyAddress = "0xBd40976feBe2aEFb58A9015d01a481D07B8Fc978";
    let ins = await CryptoZombies.deployed();
    await ins.setKittyContractAddress(hellowkittyAddress, {
      from: TEST_ADDRESS,
    });
  }
};
