import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-truffle5';
import '@vechain/sdk-hardhat-plugin';
import { VECHAIN_URL_SOLO } from '@vechain/hardhat-vechain';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from the contracts .env file
dotenv.config({ path: resolve(__dirname, '.env') });

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.20',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        vechain_solo: {
            url: VECHAIN_URL_SOLO,
            accounts: {
                mnemonic: process.env.MNEMONIC,
                count: 10,
                path: "m/44'/818'/0'/0",
            },
            gas: 10000000,
            timeout: 180000,
        },
        vechain: {
            url: process.env.BLOCKCHAIN_RPC_URL,
            accounts: {
                mnemonic: process.env.MNEMONIC,
                count: 1,
                path: "m/44'/818'/0'/0",
            },
            gas: 10000000,
            timeout: 180000,
            network_id: "0x27"  // Chain tag for testnet
        }
    }
};

export default config;
