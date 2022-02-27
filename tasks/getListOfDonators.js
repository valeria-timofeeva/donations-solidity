require("@nomiclabs/hardhat-ethers");

const contractAddress = '0x2E65Ff62B56E30581CdaC82c1c4cd3C75bAbeADe';
const Donations = require('./Donation.json');

task('getListOfDonators', 'List of Donators')
    .setAction(async (taskArgs) => {

        console.log('Loading...');
        const [owner] = await ethers.getSigners();
        const donations = new ethers.Contract(
            contractAddress,
            Donations.abi,
            owner
        );

        const result = await donations.getListOfDonators();
        console.log('List of Donators:', result);
    });