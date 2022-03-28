# 项目说明

## 版本使用

合约使用 solidity 0.8.13

### 使用套件

基于 openzeppelin ownerable、erc 721 开发，使用 truffle/ganache 搭建项目，进行测试、部署，实现了一个僵尸对战游戏。

#### 主要使用语言特性为

- 结构体, 多继承, 修饰符, 使用库, 事件, 接口, hashing-with-Keccak256 等。

#### 主要游戏内容为

- 每个玩家仅可以创建一个 🧟‍♀️。

- 每个 🧟‍♂️ 拥有自己的属性，主要包括：

```属性
    struct Zombie {
        string name;  // 姓名
        uint256 dna;  // dna 字符片段
        uint32 level;  //  等级
        uint32 readyTime;  // 攻击冷却时间
        uint16 winCount;  // 攻击获胜次数
        uint16 lossCount;  // 攻击失败次数
        uint16 price;  // 自身价格
    }
```

- 每个玩家可以送出自己的 🧟‍♀️ 給其他人。

- 每个玩家可以让自己的 🧟‍♀️ 攻击其他人的 🧟‍♀️，根据概率获胜还是失败。获胜后生成新的 dna，从而为自己生成新的 🧟‍♀️。

- 每个僵尸可以升级，2 级可以改名，20 级可以更改 dna。

- 每个僵尸的 dna，根据设计由 16 位数字组成，不同位置数字决定手、腿、头、眼睛等外观。

- 每个僵尸还可以吃掉 kitty。为自己生成新的末尾位为 99 的 🧟‍♀️。

#### 项目结构为

```text
.
├── build      // 编译目录
│   └── contracts  // 合约 abi json
├── client     // dapp 前端目录， 使用 contracts abi 和 钱包 provider
│   ├── bs-config.json   // lite server 配置
│   ├── index.html  //
│   ├── package-lock.json
│   ├── package.json
│   └── src
├── contracts    //  合约目录
│   ├── CryptoZombies.sol
│   ├── Migrations.sol
│   ├── ZombieAttack.sol
│   ├── ZombieFactory.sol
│   ├── ZombieFeeding.sol
│   └── ZombieHelper.sol
├── migrations   // 迁移目录
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── package-lock.json
├── package.json
├── readme.md
├── test     // 测试用例目录
│   ├── CryptoZombies.js  // 具体用例
│   └── helpers
└── truffle-config.js

```

#### 使用说明：

1. 启动 ganache 测试网络
1. truffle migrate --network ganache 部署合约
1. cd client 目录，npm install 安装依赖，node start 启动 web 前端，即可以与链端交互。
1. web 前端目前功能：

```text
1. 根据钱包生成🧟‍♀️。
2. 送出自己的🧟‍♀️給其他钱包。
3. 查看自己钱包地址所拥有的🧟‍♀️信息。
```

#### 注意

目前随机数生成使用 keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))，未使用 chainlink。

#### 详细参考

- <https://solidity-by-example.org/>
- <https://cryptozombies.io/>
