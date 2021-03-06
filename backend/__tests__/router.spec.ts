import { expect } from 'chai';
import * as request from 'supertest';

import app from '../src/application'
import { sequelize } from "../src/database/sequelize";
import Event from "../src/model/Event";


describe('Server router', () => {
  it('should return a 404 response on invalid route', async () => {
    await request(app)
      .get("/thisisnotacorrectroute")
      .expect(404);
  })
  it("should return a 200 response, with array payload of length 0, when dummy params used", async () => {
    await sequelize.addModels([Event])
    const response = await request(app)
      .get("/api/events/dummy?id=dummy")
      .expect(200)
      .expect("Content-Type", /json/)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.equal(0)
  });
})
