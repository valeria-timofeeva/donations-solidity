require('@nomiclabs/hardhat-waffle');
require('solidity-coverage');
require('dotenv').config();
require('./tasks/acceptDonation');
require('./tasks/withdraw');
require('./tasks/getListOfDonators');
require('./tasks/donationFrom');

module.exports = {
  solidity: '0.8.12',
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`]
    }
  }
};