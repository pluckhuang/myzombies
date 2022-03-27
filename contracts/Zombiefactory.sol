// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ZombieFactory is Ownable, ERC721URIStorage {
    event NewZombie(uint256 zombieId, string name, uint256 dna, address owner);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 dnaDigits = 16;
    uint256 dnaModulus = 10**dnaDigits;
    uint256 cooldownTime = 1 days;

    struct Zombie {
        string name;
        uint256 dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
        uint16 price;
    }

    Zombie[] public zombies;

    constructor() ERC721("ZombieItem", "ZTM") {}

    function _createZombie(
        string memory _name,
        uint256 _dna,
        string memory tokenURI
    ) internal returns (uint256) {
        zombies.push(
            Zombie(
                _name,
                _dna,
                1,
                uint32(block.timestamp + cooldownTime),
                0,
                0,
                1
            )
        );

        uint256 zombieId = _tokenIds.current();
        _mint(msg.sender, zombieId);
        _setTokenURI(zombieId, tokenURI);

        emit NewZombie(zombieId, _name, _dna, msg.sender);
        _tokenIds.increment();

        return zombieId;
    }

    function _generateRandomDna(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public returns (uint256) {
        require(
            balanceOf(msg.sender) == 0,
            "everyone just can create a zombie."
        );
        uint256 randDna = _generateRandomDna(_name);
        randDna = randDna - (randDna % 100);
        return _createZombie(_name, randDna, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.safeTransferFrom(from, to, tokenId, "");
    }

    function checkZombieToOwner(uint256 zombieId)
        public
        view
        returns (address)
    {
        return ownerOf(zombieId);
    }
}
