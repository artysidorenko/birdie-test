import * as express from "express";

import getData from '../database/getData'

export const apiController = express.Router();

apiController.get('/api/events', async (req, res) => {
  const personID = req.query.id;
  const data = await getData(personID)
  res.status(200).json(data.map((elem:any)=>elem.payload));
});
