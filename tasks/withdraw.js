require("@nomiclabs/hardhat-ethers");

const contractAddress = '0x2E65Ff62B56E30581CdaC82c1c4cd3C75bAbeADe';
const Donations = require('./Donation.json');

task('withdraw', 'Ethers withdraw')
    .addParam('address', 'The receiving address')
    .addParam('amount', 'The ethers amount')
    .setAction(async (taskArgs) => {

        console.log('Withdrawing...');
        const [owner] = await ethers.getSigners();
        const donations = new ethers.Contract(
            contractAddress,
            Donations.abi,
            owner
        );

        const result = await donations.withdraw(taskArgs.address, taskArgs.amount);
        result.wait();
        console.log('Succsesfull');
    });