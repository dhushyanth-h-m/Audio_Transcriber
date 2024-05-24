// server.test.js
const request = require('supertest');
const app = require('./server'); // Assuming server.js exports the app

describe('Server', () => {
  it('should be running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app).post('/transcribe');
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('No file uploaded.');
  });

  // Add more tests as needed
});