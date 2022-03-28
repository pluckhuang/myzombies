const Migrations = artifacts.require("Migrations");
const TEST_ADDRESS = process.env.TEST_ADDRESS;

module.exports = async function (deployer, network) {
  if (network == "ganache") {
    await deployer.deploy(Migrations, { from: accounts[2] });
  } else if (network == "test") {
    await deployer.deploy(Migrations, { from: TEST_ADDRESS });
  } else {
    await deployer.deploy(Migrations);
  }
};
