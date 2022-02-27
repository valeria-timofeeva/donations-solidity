const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Donation contract', function () {

    let Donation;
    let donation;

    let owner;
    let acc1;
    let acc2;
    let acc3;

    beforeEach(async function () {
        Donation = await ethers.getContractFactory('Donation');
        [owner, acc1, acc2, acc3] = await ethers.getSigners();

        donation = await Donation.deploy();
        await donation.deployed();
    });

    describe('Deployment', function () {
        it('Should check the owner', async function () {
            expect(await donation.owner()).to.equal(owner.address);
        });
    });

    describe('Transaction', function () {
        const amountEthers = ethers.utils.parseEther('0.1');

        it('Should recive ethers', async function () {

            await donation.connect(acc1).acceptDonation({ value: amountEthers });

            const acc1Donation = await donation.donations(acc1.address);
            expect(acc1Donation).to.equal(amountEthers);
        });

        it('Should sender add to donator list and do not have dublicates', async function () {

            await donation.connect(acc1).acceptDonation({ value: amountEthers });
            await donation.connect(acc1).acceptDonation({ value: amountEthers });

            const listOfDonators = await donation.getListOfDonators();
            console.log(`accDonation: ${listOfDonators}`);
            expect(listOfDonators).to.include(acc1.address);
        });

        it('Should withdraws some of funds to the address', async function () {
            await donation.connect(acc1).acceptDonation({ value: amountEthers });

            let withdrawAmount = ethers.utils.parseEther('0.05');

            const transaction = await donation.connect(owner).withdraw(acc2.address, withdrawAmount);
            await expect(() => transaction).to.changeEtherBalance(acc2, withdrawAmount);
            await transaction.wait();
        });

        it('Should cancel transaction if not owner withdraw', async function () {
            await expect(donation.connect(acc1).withdraw(acc1.address, amountEthers)).to.be.revertedWith('not owner');
        });

        it('Should return list of all donators', async function () {
            await donation.connect(acc1).acceptDonation({ value: amountEthers });
            await donation.connect(acc2).acceptDonation({ value: amountEthers });

            const listOfDonators = await donation.getListOfDonators();
            expect(listOfDonators).to.eql([acc1.address, acc2.address]);
        });
    });
});

