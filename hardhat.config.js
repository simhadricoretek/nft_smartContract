require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/NxZRcT_3sLzR0BgMV8J6xQzvlkaLocTp",
      accounts: [
        `0x94244b6f8467e347c69eb6953a113aab35bf36386058201c492e16932c389b8e`,
      ],
    },
  },
};
