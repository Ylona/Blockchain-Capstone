pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is UnicornERC721Token, Verifier {


    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        address to;
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
        uint256[2] input;
        bool registed;
    }

    // TODO define an array of the above struct

    Solution[] solutions;


    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions;



    // TODO Create an event to emit when a solution is added
    event AddSolution(
        address to,
        uint256[2] a,
        uint256[2][2] b,
        uint256[2] c,
        uint256[2] input
    );



    // TODO Create a function to add the solutions to the array and emit the event

    function addSolution(
        address to,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(to, a, b, c, input));
        require(!uniqueSolutions[key].registed, "Solution not unique");
        require(super.verifyTx(a, b, c, input), "Tx could not be verified");

        Solution memory newSolution = Solution({
        to : to,
        a : a,
        b : b,
        c : c,
        input : input,
        registed : true
        });
        solutions.push(newSolution);
        uniqueSolutions[key] = newSolution;

        emit AddSolution(to, a, b, c, input);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly

    function mintNewNFT(
        address to,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input,
        uint256 tokenId
    ) public {
        addSolution(to, a, b, c, input);
        super.mint(to, tokenId);
    }

}


























