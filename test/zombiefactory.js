const zombiefactory = artifacts.require("Zombiefactory");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("zombiefactory", function (accounts) {
  it("should create zombie", async () => {
    const zombiefactoryInstance = await zombiefactory.deployed();
    await zombiefactoryInstance.createRandomZombie("pluck");
    assert.equal(await zombiefactoryInstance.checkZombieToOwner(0), accounts[0], "cannot create a zombie");
  });


});
