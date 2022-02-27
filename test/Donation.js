const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Donation contract', function () {

    let Donation;
    let donation;

    let owner;
    let acc1;
    let acc2;
    let acc3;

    beforEach(async function () {
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
});

describe('Transaction', function () {
    const amountEthers = ethers.utils.parseEther('0.1');

    it('Should recive ethers', async function () {

        await donation.connect(acc1).donate({ value: testAmount });

        const acc1Donation = await donations.donations(acc1.address);
        expect(acc1Donation).to.equal(amountEthers);
    });

    it('Should sender add to donator list and do not have dublicates', async function () {

        await donation.connect(acc1).donate({ value: testAmount });
        await donation.connect(acc1).donate({ value: testAmount });

        const allDonators = await donation.getListOfDonators();
        console.log(`accDonation: ${allDonators}`);
        expect(await donations.allDonators()).to.include(acc1.address);
    });

    it('Should withdraws some of funds to the address', async function () {
        await donation.connect(addr1).donate({ value: amountEthers });

        let withdrawAmount = ethers.utils.parseEther('0.05');

        const transaction = await donation.connect(owner).withdraw(acc2.address, withdrawAmount);
        await expect(() => transaction).to.changeEtherBalance(acc2, withdrawAmount);
        await transaction.wait();
    });

    it('Should cancel transaction if not owner withdraw', async function () {
        await expect(donation.connect(acc1).withdraw(acc1.address, amountEthers)).to.be.revertedWith('Only owner can withdraw funds.');
    });

    it('Should return list of all donators', async function () {
        await donation.connect(acc1).donate({ value: amountEthers });
        await donation.connect(acc2).donate({ value: amountEthers });

        const listOfDonators = await donation.allDonators();
        expect(listOfDonators).to.eql([acc1.address, acc2.address]);
    });
});