// Import necessary libraries
import request from 'supertest';
import mongoose from 'mongoose';
import { App } from '@/app';
import { UserRoute } from '@/routes/users.route';
import { ProductRoute } from '@/routes/products.route';
import { WalletRoute } from '@/routes/wallet.route';
import { PurchaseRoute } from '@/routes/purchase.route';

// Mock data for testing
const mockUserData = {
  username: `testuser_${Date.now()}`,
  email: `testuser_${Date.now()}@example.com`,
  password: 'password123',
  bio: 'This is a test user.',
};

const mockUserWithWalletData = {
  username: `walletuser_${Date.now()}`,
  email: `walletuser_${Date.now()}@example.com`,
  password: 'password123',
  bio: 'This is a test user with wallet.',
  walletAddress: `0x742d35Cc6634C0532925a3b844Bc454e4438f${Date.now().toString(16).slice(-3)}`,
};

const app = new App([new UserRoute(), new ProductRoute(), new WalletRoute(), new PurchaseRoute()]).getServer();

// Test suite for User API endpoints
describe('User API Endpoints', () => {
  let mockUserId = '';
  let mockUserWithWalletId = '';

  afterAll(async () => {
    // Clean up the test users
    if (mockUserId) {
      await request(app).delete(`/users/${mockUserId}`);
    }
    if (mockUserWithWalletId) {
      await request(app).delete(`/users/${mockUserWithWalletId}`);
      // Clean up the wallet as well
      await request(app).delete(`/wallets/${mockUserWithWalletId}`);
    }
    // Disconnect from the database after all tests are complete
    await mongoose.connection.close();
    console.log('Disconnected from DB after User tests');
  });

  // Test POST /users - Create a new user
  it('should create a new user', async () => {
    const response = await request(app).post('/users').send(mockUserData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body.user).toHaveProperty('username', mockUserData.username);
    mockUserId = response.body.user._id;
  });

  // Test POST /users - Create a new user with wallet
  it('should create a new user with wallet', async () => {
    const response = await request(app).post('/users').send(mockUserWithWalletData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body.user).toHaveProperty('username', mockUserWithWalletData.username);
    expect(response.body.user).toHaveProperty('walletAddress', mockUserWithWalletData.walletAddress);
    mockUserWithWalletId = response.body.user._id;

    // Verify wallet was created
    const walletResponse = await request(app).get(`/wallets/${mockUserWithWalletId}`);
    expect(walletResponse.statusCode).toBe(200);
    expect(walletResponse.body).toHaveProperty('address', mockUserWithWalletData.walletAddress);
    expect(walletResponse.body).toHaveProperty('user', mockUserWithWalletId);
    expect(walletResponse.body).toHaveProperty('balance', 0);
    expect(walletResponse.body).toHaveProperty('nftList');
    expect(Array.isArray(walletResponse.body.nftList)).toBe(true);
    expect(walletResponse.body.nftList).toHaveLength(0);
  });

  // Test GET /users - Retrieve list of users
  it('should retrieve a list of users', async () => {
    const response = await request(app).get('/users').query({ limit: 5 });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });

  // Test GET /users/:email - Retrieve a single user by email
  it('should retrieve a user by email', async () => {
    const userEmail = mockUserData.email;
    const response = await request(app).get(`/users/${userEmail}`);

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('email', userEmail);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    }
  });

  // Test PATCH /users/:id - Update user information
  it('should modify an existing user', async () => {
    const newUsername = `editedtestuser_${Date.now()}`;

    const response = await request(app).patch(`/users/${mockUserId}`).send({ username: newUsername });
    if (response.statusCode === 200) {
      expect(response.body.user).toHaveProperty('username', newUsername);
    } else if (response.statusCode === 400) {
      expect(response.body).toHaveProperty('message', 'Email already in use');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    }
  });

  // Test DELETE /users/:id - Delete a user
  it('should delete a user', async () => {
    const response = await request(app).delete(`/users/${mockUserId}`);
    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('message', 'User successfully removed');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    }
  });
});

// Mock data for testing
let mockProductData = {
  name: 'TestProductName',
  description: 'Description of product created for testing.',
  price: 13.37,
  imageUrl: 'http://example.com/test_product_image.jpg',
  tokenId: '777',
  contractAddress: '0x37xjkeb50eb47b4081727125e2e074h7785cke3',
  seller: '', // Will be set in beforeAll
};

let mockProductId = '';

// Test suite for product API endpoints
describe('Product API Endpoints', () => {
  let testUserId = '';
  beforeAll(async () => {
    // Connect to the in-memory database if needed, or use a testing database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB to perform Product tests');

    // Create a user for testing
    const userResponse = await request(app)
      .post('/users')
      .send({
        username: `productTestUser_${Date.now()}`,
        email: `producttest_${Date.now()}@example.com`,
        password: 'password123',
        walletAddress: `0x37xjkeb50ebf024081727125e2e074hfh95vv9m${Date.now().toString(16).slice(-3)}`,
      });
    testUserId = mockProductData.seller = userResponse.body.user._id;
  });

  afterAll(async () => {
    // Clean up test data
    if (testUserId) {
      await request(app).delete(`/users/${testUserId}`);
    }

    // Disconnect from the database after all tests are complete
    await mongoose.connection.close();
    console.log('Disconnected from DB after Product tests');
  });

  // Test POST /products - Create a new product
  it('should create a new product', async () => {
    const response = await request(app).post('/products').send(mockProductData);

    // assign id for later use
    mockProductId = response.body.product._id;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product created successfully');
    expect(response.body.product).toHaveProperty('name', mockProductData.name);
  });

  // Test GET /products - Retrieve list of products
  it('should retrieve a list of products', async () => {
    const response = await request(app).get('/products').query({ limit: 5 });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });

  // Test GET /products/:id - Retrieve a single product by id
  it('should retrieve a product by id', async () => {
    const response = await request(app).get(`/products/${mockProductId}`);

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('_id', mockProductId);
      expect(response.body).toHaveProperty('name', mockProductData.name);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    }
  });

  // Test PATCH /products/:id - Update product information
  it('should modify an existing product', async () => {
    const newproductname = `editedproduct_${Date.now()}`;

    const response = await request(app).patch(`/products/${mockProductId}`).send({ name: newproductname });

    if (response.statusCode === 200) {
      expect(response.body.product).toHaveProperty('name', newproductname);
      expect(response.body.product).toHaveProperty('_id', mockProductId);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    }
  });

  // Test DELETE /products/:id - Delete a product
  it('should delete a product', async () => {
    const response = await request(app).delete(`/products/${mockProductId}`);

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('message', 'Product successfully removed');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Product not found');
    }
  });
});

// Test suite for wallet API endpoints
describe('Wallet API Endpoints', () => {
  let testUserId: string;

  beforeAll(async () => {
    // Connect to the in-memory database if needed, or use a testing database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB to perform Wallet tests');

    // Create a new user for testing
    const userResponse = await request(app)
      .post('/users')
      .send({
        username: `walletTestUser_${Date.now()}`,
        email: `wallettest_${Date.now()}@example.com`,
        password: 'password123',
      });
    testUserId = userResponse.body.user._id;
  });

  afterAll(async () => {
    // Delete the test user
    await request(app).delete(`/users/${testUserId}`);

    // Disconnect from the database after all tests are complete
    await mongoose.connection.close();
    console.log('Disconnected from DB after Wallet tests');
  });

  // Test POST /wallet - Create a new wallet
  it('should create a new wallet', async () => {
    const response = await request(app).post('/wallets').send({ userId: testUserId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Wallet created successfully');
    expect(response.body.wallet).toHaveProperty('user', testUserId);
  });

  // Test GET /wallet/:userId - Retrieve wallet information
  it('should retrieve wallet information', async () => {
    const response = await request(app).get(`/wallets/${testUserId}`);

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('user', testUserId);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'No wallet found for this user');
    }
  });

  // Test PATCH /wallet/:userId - Update wallet information
  it('should update wallet information', async () => {
    const nftList = ['0x123', '0x456', '0x789'];

    const response = await request(app).patch(`/wallets/${testUserId}`).send({ nftList });

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('message', 'Wallet details have been updated!');
      expect(response.body.wallet).toHaveProperty('user', testUserId);
      expect(response.body.wallet).toHaveProperty('nftList', nftList);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'No wallet found for this user');
    }
  });

  // Test DELETE /wallet/:userId - Delete wallet
  it('should delete a wallet', async () => {
    const response = await request(app).delete(`/wallets/${testUserId}`);
    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('message', 'Wallet has been deleted');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'No wallet found for this user');
    }
  });
});

// Test suite for Purchase API endpoints
describe('Purchase API Endpoints', () => {
  let testUser: any;
  let testProduct: any;
  let testPurchaseId: string;

  beforeAll(async () => {
    console.log('Connected to DB to perform Purchase tests');
    await mongoose.connect(process.env.MONGO_URI);

    // Create a test user with wallet
    const userResponse = await request(app)
      .post('/users')
      .send({
        username: `purchaseTestUser_${Date.now()}`,
        email: `purchasetest_${Date.now()}@example.com`,
        password: 'testpass123',
        bio: 'Test user for purchase tests',
        walletAddress: `0x1234567890abcdef${Date.now().toString(16).slice(-3)}`, // Add wallet address directly
      });
    testUser = userResponse.body.user;

    // Create a test product
    const productResponse = await request(app).post('/products').send({
      name: 'Test NFT for Purchase',
      description: 'Test NFT created for purchase testing',
      price: 1.5,
      imageUrl: 'http://example.com/test_nft.jpg',
      tokenId: '12345',
      contractAddress: '0x1234567890abcdef',
      seller: testUser._id,
    });
    testProduct = productResponse.body.product;
  });

  afterAll(async () => {
    // Clean up: Delete test user, product, and related data
    if (testUser && testUser._id) {
      await request(app).delete(`/users/${testUser._id}`);
    }
    if (testProduct && testProduct._id) {
      await request(app).delete(`/products/${testProduct._id}`);
    }
    await mongoose.disconnect();
    console.log('Disconnected from DB after Purchase tests');
  });

  // Test POST /purchases/create - Create a new purchase
  it('should create a new purchase', async () => {
    const response = await request(app).post('/purchases/create').send({
      productId: testProduct._id,
      userId: testUser._id,
      amount: testProduct.price,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    testPurchaseId = response.body.data._id;
  });

  // Test GET /purchases/:id/status - Get purchase status
  it('should get purchase status', async () => {
    const response = await request(app).get(`/purchases/${testPurchaseId}/status`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  // Test POST /purchases/create - Invalid product
  it('should fail to create purchase with invalid product', async () => {
    const response = await request(app).post('/purchases/create').send({
      productId: new mongoose.Types.ObjectId(),
      userId: testUser._id,
      amount: 1.5,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Product not found');
  });

  // Test POST /purchases/create - User without wallet
  it('should fail to create purchase when user has no wallet', async () => {
    // Create a user without a wallet
    const noWalletUser = await request(app)
      .post('/users')
      .send({
        username: `nowalletuser_${Date.now()}`,
        email: `nowalletuser_${Date.now()}@example.com`,
        password: 'testpass123',
        bio: 'Test user without wallet',
      });

    const response = await request(app).post('/purchases/create').send({
      productId: testProduct._id,
      userId: noWalletUser.body.user._id,
      amount: testProduct.price,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Buyer must have a wallet address to purchase NFTs');

    // Clean up
    await request(app).delete(`/users/${noWalletUser.body.user._id}`);
  });

  // Test POST /purchases/:id/process - Process a purchase
  it('should process a purchase', async () => {
    // First create a purchase
    const createResponse = await request(app).post('/purchases/create').send({
      productId: testProduct._id,
      userId: testUser._id,
      amount: testProduct.price,
    });

    const purchaseId = createResponse.body.data._id;
    const response = await request(app).post(`/purchases/${purchaseId}/process`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Purchase processed successfully');
    expect(response.body).toHaveProperty('data');
  });

  // Test GET /purchases/history - Get purchase history for user
  it('should get purchase history for user', async () => {
    const response = await request(app).get(`/purchases/history?userId=${testUser._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test GET /purchases/history - Invalid user
  it('should fail to get purchase history for invalid user', async () => {
    const response = await request(app).get(`/purchases/history?userId=507f1f77bcf86cd799439011`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });
});
