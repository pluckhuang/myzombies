var cryptoZombies;
var userAccount;
var accounts;

async function startApp() {
  const web3 = await getWeb3();
  accounts = await web3.eth.getAccounts();
  cryptoZombies = await getContract(web3);
  userAccount = accounts[0];
}

function checkData() {
  console.log("click!");
  checkStatus();
}

async function account1_create() {
  await createRandomZombie("pluckhuang0", accounts[0]);
}

async function account2_create() {
  await createRandomZombie("pluckhuang1", accounts[0]);
}

async function transferData() {
  let to = document.getElementById("toAccount").value;
  let waitTransTokenId = document.getElementById("transTokenId").value;
  console.log(to, waitTransTokenId);
  ret = await transferFrom(userAccount, to, waitTransTokenId);
}

async function checkStatus() {
  let zombies_length = await balanceOf(userAccount);

  let zombies_ids = await getZombiesByOwner(userAccount);

  document.getElementById("account").innerHTML = userAccount;

  document.getElementById("zombies_length").innerHTML = zombies_length;

  await displayZombies(zombies_ids);
}

const displayZombies = async (ids) => {
  $("#zombies").empty();
  for (id of ids) {
    zombie = await getZombieDetails(id);
    $("#zombies").append(`<div class="zombie">
            <ul>
            <li>TokenId: ${id}</li>
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

const createRandomZombie = async (name, userAccount) => {
  $("#txStatus").text(
    "Creating new zombie on the blockchain. This may take a while..."
  );

  ret = await cryptoZombies.methods
    .createRandomZombie(name)
    .send({ from: userAccount, gas: 5000000 });
  console.log(ret);
  // .on("receipt", function (receipt) {
  //   $("#txStatus").text("Successfully created " + name + "!");

  //   getZombiesByOwner(userAccount).then(displayZombies);
  // })
  // .on("error", function (error) {
  //   $("#txStatus").text(error);
  // });
};

// function feedOnKitty(zombieId, kittyId) {
//   $("#txStatus").text("Eating a kitty. This may take a while...");
//   return cryptoZombies.methods
//     .feedOnKitty(zombieId, kittyId)
//     .send({ from: userAccount })
//     .on("receipt", function (receipt) {
//       $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
//       getZombiesByOwner(userAccount).then(displayZombies);
//     })
//     .on("error", function (error) {
//       $("#txStatus").text(error);
//     });
// }

// function levelUp(zombieId) {
//   $("#txStatus").text("Leveling up your zombie...");
//   return cryptoZombies.methods
//     .levelUp(zombieId)
//     .send({
//       from: userAccount,
//       value: web3.utils.toWei("0.001", "ether"),
//     })
//     .on("receipt", function (receipt) {
//       $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
//     })
//     .on("error", function (error) {
//       $("#txStatus").text(error);
//     });
// }

const getZombieDetails = async (id) => {
  return await cryptoZombies.methods.zombies(id).call();
};

const balanceOf = async (address) => {
  return await cryptoZombies.methods.balanceOf(address).call();
};

const getZombiesByOwner = async (owner) => {
  return await cryptoZombies.methods.getZombiesByOwner(owner).call();
};

const transferFrom = async (from, to, tokenId) => {
  return await cryptoZombies.methods
    .safeTransferFrom(from, to, tokenId)
    .send({ from: from });
};

startApp();
