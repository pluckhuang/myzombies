var cryptoZombies;
var userAccount;

async function startApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  cryptoZombies = await getContract(web3);

  //   var accountInterval = setInterval(async() => {
  //     if (accounts[0] !== userAccount) {
  //       userAccount = accounts[0];

  //       zombies = await getZombiesByOwner(userAccount);
  //       await displayZombies(zombies);
  //     }
  //   }, 100);
  userAccount = accounts[0];

  //   cryptoZombies.events
  //     .Transfer({ filter: { _to: userAccount } })
  //     .on("data", function (event) {
  //       let data = event.returnValues;
  //       zombies = await getZombiesByOwner(userAccount);
  //       await displayZombies(zombies);
  //     })
  //     .on("error", console.error);

  console.log(await displayZombies([0, 1]));
}

const displayZombies = async (ids) => {
  $("#zombies").empty();
  for (id of ids) {
    zombie = await getZombieDetails(id);
    $("#zombies").append(`<div class="zombie">
            <ul>
            <li>Name: ${zombie.name}</li>
            <li>DNA: ${zombie.dna}</li>
            <li>Level: ${zombie.level}</li>
            <li>Wins: ${zombie.winCount}</li>
            <li>Losses: ${zombie.lossCount}</li>
            <li>Ready Time: ${zombie.readyTime}</li>
            </ul>
        </div>`);
  }
};

const createRandomZombie = async (name) => {
  $("#txStatus").text(
    "Creating new zombie on the blockchain. This may take a while..."
  );

  ret = await cryptoZombies.methods
    .createRandomZombie(name)
    .send({ from: userAccount });
  console.log(ret);
  // .on("receipt", function (receipt) {
  //   $("#txStatus").text("Successfully created " + name + "!");

  //   getZombiesByOwner(userAccount).then(displayZombies);
  // })
  // .on("error", function (error) {
  //   $("#txStatus").text(error);
  // });
};

function feedOnKitty(zombieId, kittyId) {
  $("#txStatus").text("Eating a kitty. This may take a while...");
  return cryptoZombies.methods
    .feedOnKitty(zombieId, kittyId)
    .send({ from: userAccount })
    .on("receipt", function (receipt) {
      $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
      getZombiesByOwner(userAccount).then(displayZombies);
    })
    .on("error", function (error) {
      $("#txStatus").text(error);
    });
}

function levelUp(zombieId) {
  $("#txStatus").text("Leveling up your zombie...");
  return cryptoZombies.methods
    .levelUp(zombieId)
    .send({
      from: userAccount,
      value: web3.utils.toWei("0.001", "ether"),
    })
    .on("receipt", function (receipt) {
      $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
    })
    .on("error", function (error) {
      $("#txStatus").text(error);
    });
}

const getZombieDetails = async (id) => {
  return await cryptoZombies.methods.zombies(id).call();
};

const balanceOf = async (address) => {
  return await cryptoZombies.methods.balanceOf(address).call();
};

const getZombiesByOwner = async (owner) => {
  return await cryptoZombies.methods.getZombiesByOwner(owner).call();
};

const displayGreeting = async (greeting, contract) => {
  greeting = await contract.methods.sayHello().call();
  $("h2").html(greeting);
};

startApp();
