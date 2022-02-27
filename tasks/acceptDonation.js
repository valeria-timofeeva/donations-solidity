require("@nomiclabs/hardhat-ethers");

const contractAddress = '0x2E65Ff62B56E30581CdaC82c1c4cd3C75bAbeADe';
const Donations = require('./Donation.json');

task('acceptDonations', 'Donate ethers')
    .addParam('amount', 'Amount in wei')
    .setAction(async (taskArgs) => {
        
        console.log('Accepting...');
        const [owner] = await ethers.getSigners();
        const donations = new ethers.Contract(
            contractAddress,
            Donations.abi,
            owner
        );

        const result = await donations.acceptDonation({ value: taskArgs.amount });
        result.wait();
        console.log('Succsesfull');
    });