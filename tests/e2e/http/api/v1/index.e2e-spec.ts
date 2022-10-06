import request from 'supertest';
import { App } from '../../util/app';

describe('API V1: Index (/api/v1/)', () => {
  it("should return 'Hello World!'", async () => {
    const response = await request(App).get('/api/v1/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('welcome to the api');
  });
});
