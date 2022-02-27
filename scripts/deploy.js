const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address)

    const Donation = await ethers.getContractFactory('Donation')
    const donation = await Donation.deploy();

    console.log('Token address:', donation.address)

    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}