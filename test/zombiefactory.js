const zombiefactory = artifacts.require("Zombiefactory");
const utils = require("./helpers/utils");
const zombieNames = ["Zombie 1", "Zombie 2"];

contract("Zombiefactory", function (accounts) {
    let [alice, bob] = accounts;
    let zombiefactoryInstance;
    beforeEach(async () => {
        zombiefactoryInstance = await zombiefactory.new();
    });
  it("everyone should create zombie", async () => {
    const result = await zombiefactoryInstance.createRandomZombie(zombieNames[0], {from: alice});
    assert.equal(result.receipt.status, true);
    assert.equal(result.logs[0].args.name,zombieNames[0]);
  });
  it("everyone should only create a zombie", async () => {
    await zombiefactoryInstance.createRandomZombie(zombieNames[0], {from: alice});
    await utils.shouldThrow(zombiefactoryInstance.createRandomZombie(zombieNames[1], {from: alice}));
  });
});
