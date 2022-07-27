// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Moch USDT token which inherits from OZ ERC20
contract USDT is ERC20 {

    // DEFINE: General constructor which mints the moch USDT token
    constructor(uint256 _fixedSupply) ERC20('Tether', 'USDT') {
        // Mint Token and convert ether to wei
        _mint(msg.sender, _fixedSupply);
    
    }
}