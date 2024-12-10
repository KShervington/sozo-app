const { ethers } = require('ethers');

// Generate a random wallet
const wallet = ethers.Wallet.createRandom();

console.log('Wallet generated successfully!');
console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
console.log('Mnemonic:', wallet.mnemonic.phrase);
