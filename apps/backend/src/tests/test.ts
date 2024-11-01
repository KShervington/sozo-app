// Import necessary libraries
import request from 'supertest';
import mongoose from 'mongoose';
import { App } from '@/app';
import { UserRoute } from '@/routes/users.route';

// Mock data for testing
const mockUserData = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123',
  bio: 'This is a test user.',
};

let mockUserId = '';

const app = new App([new UserRoute()]).getServer();

// Test suite for User API endpoints
describe('User API Endpoints', () => {
  // beforeAll(async () => {
  //   // Connect to the in-memory database if needed, or use a testing database
  //   await mongoose.connect(process.env.MONGO_URI);
  // });

  afterAll(async () => {
    // Disconnect from the database after all tests are complete
    await mongoose.connection.close();
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

  // Additional tests can be added here for PATCH, DELETE, etc.
});