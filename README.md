# Sozo inFashion - Sustainable Fashion Platform

## Project Overview

Sozo inFashion is a platform that combines sustainable fashion with blockchain technology to incentivize eco-friendly shopping choices. The platform allows users to submit receipts of sustainable fashion purchases and receive NFT rewards, which can be converted to VeBetterDAO ecosystem tokens.

### Key Features

- **Receipt Submission System**: Users can upload receipts from sustainable fashion purchases
- **AI-powered Receipt Verification**: Uses OpenAI GPT-Vision API to analyze and verify receipt authenticity
- **Blockchain Rewards**: ERC721 NFTs minted as proof of sustainable purchases
- **VeBetterDAO Integration**: Connects with the VeBetterDAO ecosystem for token rewards
- **RESTful API**: Comprehensive backend for managing users, products, and purchase data

## Project Structure

The project is organized using a monorepo approach with three main components:

### Frontend (`/apps/frontend`)

A modern React application built with:

- React 18+
- TypeScript
- Vite
- Chakra UI
- Axios for API communication

### Backend (`/apps/backend`)

An Express-based API server with:

- TypeScript
- MongoDB for data storage
- OpenAI GPT-Vision API integration
- RESTful API endpoints for users, products, and purchases
- Blockchain wallet integration

### Smart Contracts (`/apps/contracts`)

Solidity contracts for the blockchain components:

- SozoNFT: An ERC721 contract for issuing NFTs to users
- EcoEarn: A contract managing reward cycles and distribution through VeBetterDAO

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- MongoDB
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/sozo-app.git
cd sozo-app
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

   - Create `.env` files in both `/apps/frontend` and `/apps/backend` directories
   - Required variables for backend:
     - `MONGO_URI`: MongoDB connection string
     - `OPENAI_API_KEY`: API key for OpenAI
     - `RECAPTCHA_SECRET_KEY`: For reCAPTCHA verification

4. Start the development servers:

```bash
yarn dev
```

## API Reference

The backend provides a RESTful API with the following main endpoints:

### Users

- `GET /users`: List all users
- `GET /users/:email`: Get user by email
- `POST /users`: Create new user
- `PATCH /users/:id`: Update user
- `DELETE /users/:id`: Delete user

### Products

- `GET /products`: List all products
- `GET /products/:id`: Get product by ID
- `POST /products`: Create new product
- `PATCH /products/:id`: Update product
- `DELETE /products/:id`: Delete product

### Purchases

- `POST /purchases/create`: Create new purchase submission
- `POST /purchases/:purchaseId/process`: Process a purchase
- `GET /purchases/:purchaseId/status`: Get purchase status
- `GET /purchases/history`: Get purchase history

### Wallets

- `GET /wallets/:userId`: Get user's wallet
- `POST /wallets`: Create wallet
- `PATCH /wallets/:userId`: Update wallet
- `DELETE /wallets/:userId`: Delete wallet

## Smart Contracts

### SozoNFT

An ERC721 contract for issuing NFTs to users who verify sustainable purchases. Features include:

- Minting NFTs for verified sustainable purchases
- Linking NFTs to product IDs
- Ownership transfer capabilities

### EcoEarn

A contract that manages reward cycles and distribution through the VeBetterDAO ecosystem:

- Reward cycle management
- Submission verification
- Token distribution to participants
- Integration with VeBetterDAO's X2EarnRewardsPool

## Creating New Routes

To add new functionality to the backend:

1. Create a controller file in `apps/backend/src/controllers/`
2. Create a route file in `apps/backend/src/routes/`
3. Add the new route to the route list in `apps/backend/src/server.ts`

## Development

### Testing Data

To populate the database with test products:

```bash
node apps/backend/src/tests/utils/populate_products.ts
```

## License

This project is licensed under the MIT License.

## Contributors

- [Kyle Shervington](https://github.com/KShervington)
- [Zi Zheng](https://github.com/Zibilicious)
