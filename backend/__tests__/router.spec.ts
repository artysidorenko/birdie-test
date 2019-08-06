import app from '../src/application'
import * as request from 'supertest';


describe('Server router', () => {
  it('should return a 404 response on invalid route', async () => {
    await request(app)
      .get("/thisisnotacorrectroute")
      .expect(404);
  })
  it("should return a 200 response on api events route", async () => {
    await request(app)
      .get("/api/events")
      .expect(200);
  });
  it("should return a valid json object on api events route", async () => {
    await request(app)
      .get("/api/events")
      .expect("Content-Type", /json/);
  });
})
