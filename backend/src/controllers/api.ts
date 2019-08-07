import * as express from "express";

import { EventsDAO, EventsRepo } from '../database/dao'

export const apiController = express.Router();

apiController.get("/api/events/:type", async (req, res) => {
  const eventsDAO = new EventsDAO(new EventsRepo());
  const type:string = req.params.type
  const recipient:string = req.query.id;
  const data: string[] = await eventsDAO.getEventsByType(
    recipient,
    type
  );
  res.status(200).json(data);
});

apiController.get('/api/events', async (req, res) => {
  const eventsDAO = new EventsDAO(new EventsRepo());
  const recipient: string = req.query.id;
  const data: string[] = await eventsDAO.getEvents(
    recipient
  );
  res.status(200).json(data);
});
