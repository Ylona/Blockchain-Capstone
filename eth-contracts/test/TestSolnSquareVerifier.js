// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('SolnSquareVerifier', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('test SolnSquareVerifier', function () {
    beforeEach(async function () {
      this.contract = await SolnSquareVerifier.new({from: account_one});
    })

    it('Test if a new solution can be added for contract', async function () {
      let proof = {
          "a": [
            "0x279ffde954af8819827d1d30404e651fd543337f5531f75256c11deb2a2373ee",
            "0x0000534ad061026a161874c031d5b78a6a6699db962a3ceb557f50e5c07db5a5"
          ],
          "b": [
            [
              "0x1d0fa612e31d7038819d2bb02509210cc92e0a78102d84bac37447f576271d3d",
              "0x1cde5214ed74ba8a3a329e64fa448905a9ced6238d18e087f579c5ac93bd8996"
            ],
            [
              "0x0004512e250f6f8047f56770030b06e1fe304357e1be9ceb983168d489a50472",
              "0x16f416eb0778a711f75f2b6cf2d294c3c66963ae708fa99019ec6141967da3ae"
            ]
          ],
          "c": [
            "0x00daf387db73ee52e1e2c92adfea4b65641fdb2b771e5416fd8b57d9acd0b2c8",
            "0x05e2d7335e16967009c404779ba99459c004fc02881ad1586723ce72f3ca2a40"
          ],
        "inputs": [
          "0x000000000000000000000000000000000000000000000000000000000001bba1",
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        ]
      }
      await this.contract.addSolution(account_two, proof.a, proof.b, proof.c, proof.inputs);
    })

    it('Test if an ERC721 token can be minted for contract', async function () {

      let proof = {
        "a": [
          "0x279ffde954af8819827d1d30404e651fd543337f5531f75256c11deb2a2373ee",
          "0x0000534ad061026a161874c031d5b78a6a6699db962a3ceb557f50e5c07db5a5"
        ],
        "b": [
          [
            "0x1d0fa612e31d7038819d2bb02509210cc92e0a78102d84bac37447f576271d3d",
            "0x1cde5214ed74ba8a3a329e64fa448905a9ced6238d18e087f579c5ac93bd8996"
          ],
          [
            "0x0004512e250f6f8047f56770030b06e1fe304357e1be9ceb983168d489a50472",
            "0x16f416eb0778a711f75f2b6cf2d294c3c66963ae708fa99019ec6141967da3ae"
          ]
        ],
        "c": [
          "0x00daf387db73ee52e1e2c92adfea4b65641fdb2b771e5416fd8b57d9acd0b2c8",
          "0x05e2d7335e16967009c404779ba99459c004fc02881ad1586723ce72f3ca2a40"
        ],
        "inputs": [
          "0x000000000000000000000000000000000000000000000000000000000001bba1",
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        ]
      }
      await this.contract.mintNewNFT(account_two, proof.a, proof.b, proof.c, proof.inputs, 0);
    })

  });

})