const request = require('supertest');
const app = require('../server');

describe('Recipe API Endpoints', () => {
  it('GET /api/health should return healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'healthy');
  });

  it('GET /api/recipes should return the recipe list', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /api/recipes should create a new recipe', async () => {
    const newRecipe = {
      name: 'Pancakes',
      ingredients: 'Flour\nMilk\nEggs',
      instructions: 'Mix and cook on griddle.',
      cookTime: '10 minutes'
    };
    const res = await request(app).post('/api/recipes').send(newRecipe);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Pancakes');
  });
});