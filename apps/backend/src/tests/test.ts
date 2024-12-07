// Import necessary libraries
import request from 'supertest';
import mongoose from 'mongoose';
import { App } from '@/app';
import { UserRoute } from '@/routes/users.route';
import { ProductRoute } from '@/routes/products.route';
import { WalletRoute } from '@/routes/wallet.route';

// Helper function to generate unique test data
const generateUniqueTestData = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return {
    username: `testuser_${timestamp}_${random}`,
    email: `testuser_${timestamp}_${random}@example.com`,
    password: 'password123',
    bio: 'This is a test user.',
    walletAddress: '0x' + timestamp.toString(16) + random.toString(16).padEnd(40 - timestamp.toString(16).length - random.toString(16).length, '0'),
  };
};

const generateUniqueProductData = (sellerId: string) => ({
  name: `TestProduct_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
  description: 'Description of product created for testing.',
  price: 13.37,
  imageUrl: 'http://example.com/test_product_image.jpg',
  tokenId: `token_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
  contractAddress: '0x1234567890123456789012345678901234567890',
  seller: sellerId,
});

let mockUserId = '';
const app = new App([new UserRoute(), new ProductRoute(), new WalletRoute()]).getServer();

// Global test setup and teardown
beforeAll(async () => {
  try {
    // Set test timeout to 10 seconds
    jest.setTimeout(10000);
    
    // Ensure we're connected to the test database
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to test database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from test database');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
});

// Helper function to clean up test data
async function cleanupTestData() {
  if (mockUserId) {
    try {
      await request(app).delete(`/users/${mockUserId}`);
    } catch (error) {
      console.error('Error cleaning up test user:', error);
    }
  }
}

// Test suite for User API endpoints
describe('User API Endpoints', () => {
  afterEach(async () => {
    await cleanupTestData();
  });

  // Test POST /users - Create a new user
  it('should create a new user', async () => {
    const testData = generateUniqueTestData();
    const response = await request(app).post('/users').send(testData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body.user).toHaveProperty('username', testData.username);
    mockUserId = response.body.user._id;

    // Update user with wallet address
    const walletResponse = await request(app).patch(`/users/${mockUserId}`).send({
      walletAddress: testData.walletAddress,
    });
    expect(walletResponse.statusCode).toBe(200);
    expect(walletResponse.body.user).toHaveProperty('walletAddress', testData.walletAddress);
  });

  // Test GET /users - Retrieve list of users
  it('should retrieve a list of users', async () => {
    const response = await request(app).get('/users').query({ limit: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Users retrieved successfully');
    expect(response.body).toHaveProperty('users');
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  // Test GET /users/:id - Retrieve a single user by id
  it('should retrieve a user by id', async () => {
    // First create a user to retrieve
    const testData = generateUniqueTestData();
    const createResponse = await request(app).post('/users').send(testData);
    mockUserId = createResponse.body.user._id;

    const response = await request(app).get(`/users/${mockUserId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User retrieved successfully');
    expect(response.body.user).toHaveProperty('_id', mockUserId);
  });

  // Test PATCH /users/:id - Update user information
  it('should modify an existing user', async () => {
    // First create a user to modify
    const testData = generateUniqueTestData();
    const createResponse = await request(app).post('/users').send(testData);
    mockUserId = createResponse.body.user._id;

    const newUsername = 'editedtestuser_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
    const response = await request(app).patch(`/users/${mockUserId}`).send({ username: newUsername });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('username', newUsername);
  });

  // Test DELETE /users/:id - Delete a user
  it('should delete a user', async () => {
    // First create a user to delete
    const testData = generateUniqueTestData();
    const createResponse = await request(app).post('/users').send(testData);
    const userIdToDelete = createResponse.body.user._id;

    const response = await request(app).delete(`/users/${userIdToDelete}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('msg', 'User successfully removed');
  });
});

// Test suite for Product API endpoints
describe('Product API Endpoints', () => {
  let testUserId: string;

  beforeEach(async () => {
    // Create a test user for product tests
    const testData = generateUniqueTestData();
    const userResponse = await request(app).post('/users').send(testData);
    testUserId = userResponse.body.user._id;
  });

  afterEach(async () => {
    // Clean up test user
    if (testUserId) {
      try {
        await request(app).delete(`/users/${testUserId}`);
      } catch (error) {
        console.error('Error cleaning up test user:', error);
      }
    }
  });

  // Test POST /products - Create a new product
  it('should create a new product', async () => {
    const productData = generateUniqueProductData(testUserId);
    const response = await request(app).post('/products').send(productData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Product created successfully');
    expect(response.body.product).toHaveProperty('name', productData.name);
    expect(response.body.product).toHaveProperty('seller', testUserId);
  });

  // Test GET /products - Retrieve list of products
  it('should retrieve a list of products', async () => {
    const response = await request(app).get('/products').query({ limit: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Products retrieved successfully');
    expect(response.body).toHaveProperty('products');
    expect(Array.isArray(response.body.products)).toBe(true);
  });
});

// Test suite for Wallet API endpoints
describe('Wallet API Endpoints', () => {
  let testUserId: string;

  beforeEach(async () => {
    // Create a test user for wallet tests
    const testData = generateUniqueTestData();
    const userResponse = await request(app).post('/users').send(testData);
    testUserId = userResponse.body.user._id;
  });

  afterEach(async () => {
    // Clean up test user
    if (testUserId) {
      try {
        await request(app).delete(`/users/${testUserId}`);
      } catch (error) {
        console.error('Error cleaning up test user:', error);
      }
    }
  });

  // Test PATCH /wallet/:id - Update wallet address
  it('should update wallet address', async () => {
    const walletAddress = '0x' + Date.now().toString(16) + Math.floor(Math.random() * 1000000).toString(16).padEnd(40, '0');
    const response = await request(app).patch(`/wallet/${testUserId}`).send({ walletAddress });
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('walletAddress', walletAddress);
  });

  // Test GET /wallet/:id - Get wallet information
  it('should get wallet information', async () => {
    // First update the wallet address
    const walletAddress = '0x' + Date.now().toString(16) + Math.floor(Math.random() * 1000000).toString(16).padEnd(40, '0');
    await request(app).patch(`/wallet/${testUserId}`).send({ walletAddress });

    // Then retrieve the wallet information
    const response = await request(app).get(`/wallet/${testUserId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty('walletAddress', walletAddress);
  });
});
