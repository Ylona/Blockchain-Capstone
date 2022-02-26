var UnicornERC721Token = artifacts.require('UnicornERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const numberOfTokens_one = 10;
    const numberOfTokens_two = 5;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await UnicornERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            for(let i = 0; i<numberOfTokens_one; i++){
                await this.contract.mint(account_one, i);
            }
            for(let i = numberOfTokens_one; i< numberOfTokens_one + numberOfTokens_two; i++){
                await this.contract.mint(account_two, i);
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, numberOfTokens_one + numberOfTokens_two, "Total supply should be 15");

        })

        it('should get token balance', async function () {
            let tokenBalance_one = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance_one, numberOfTokens_one , "Balance of account one should be 10");

        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenUri = await this.contract.tokenURI(1);
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token Uri not correct");
        })

        it('should transfer token from one owner to another', async function () {
            await this.contract.transferFrom(account_one, account_two, 0);
            let owner = await this.contract.ownerOf(0);
            assert.equal(owner, account_two, "Account two should own token 0")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await UnicornERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let blocked = false;
            try{
                await this.contract.mint(account_two, 20, {from: account_two});

            } catch (e){
                blocked = true
            }
            assert.equal(blocked, true, "Account two should not be able to mint tokens");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "Account one should be owner");
        })

    });
})