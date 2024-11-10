// Import necessary libraries
import request from 'supertest';
import mongoose from 'mongoose';
import { App } from '@/app';
import { UserRoute } from '@/routes/users.route';
import { ProductRoute } from '@/routes/products.route';

// Mock data for testing
const mockUserData = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123',
  bio: 'This is a test user.',
};

let mockUserId = '';

const app = new App([new UserRoute(), new ProductRoute()]).getServer();

// Test suite for User API endpoints
describe('User API Endpoints', () => {
  afterAll(async () => {
    // Disconnect from the database after all tests are complete
    await mongoose.connection.close();
    console.log('Disconnected from DB after User tests');
  });

  // Test POST /users - Create a new user
  it('should create a new user', async () => {
    const response = await request(app).post('/users').send(mockUserData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('msg', 'User created successfully');
    expect(response.body.user).toHaveProperty('username', mockUserData.username);
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

    // assign id for later use
    mockUserId = response.body._id;

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('email', userEmail);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found');
    }
  });

  // Test PATCH /users/:id - Update user information
  it('should modify an existing user', async () => {
    const newUsername = 'editedtestuser';

    const response = await request(app).patch(`/users/${mockUserId}`).send({ username: newUsername });
    if (response.statusCode === 200) {
      expect(response.body.user).toHaveProperty('username', newUsername);
    } else if (response.statusCode === 400) {
      expect(response.body).toHaveProperty('msg', 'Email already in use');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found');
    }
  });

  // Test DELETE /users/:id - Delete a user
  it('should delete a user', async () => {
    const response = await request(app).delete(`/users/${mockUserId}`);
    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('msg', 'User successfully removed');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found');
    }
  });
});

// Mock data for testing
const mockProductData = {
  name: 'TestProductName',
  description: 'Description of product created for testing.',
  price: 13.37,
  imageUrl: 'http://example.com/test_product_image.jpg',
  nftId: 'unique-nft-id-1337',
  seller: '66e76191c87d92bfc5b68348', // Needs to be the _id of a user already in the database
};

let mockProductId = '';

// Test suite for product API endpoints
describe('Product API Endpoints', () => {
  beforeAll(async () => {
    // Connect to the in-memory database if needed, or use a testing database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB to perform Product tests');
  });

  afterAll(async () => {
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
    expect(response.body).toHaveProperty('msg', 'Product created successfully');
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
      expect(response.body).toHaveProperty('msg', 'Product not found');
    }
  });

  // Test PATCH /products/:id - Update product information
  it('should modify an existing product', async () => {
    const newproductname = 'editedtestproduct';

    const response = await request(app).patch(`/products/${mockProductId}`).send({ name: newproductname });

    if (response.statusCode === 200) {
      expect(response.body.product).toHaveProperty('name', newproductname);
      expect(response.body.product).toHaveProperty('_id', mockProductId);
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'Product not found');
    }
  });

  // Test DELETE /products/:id - Delete a product
  it('should delete a product', async () => {
    const response = await request(app).delete(`/products/${mockProductId}`);

    if (response.statusCode === 200) {
      expect(response.body).toHaveProperty('msg', 'Product successfully removed');
    } else {
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('msg', 'Product not found');
    }
  });
});
