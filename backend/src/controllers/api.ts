import * as express from "express";

import { EventsDAO, EventsRepo } from '../database/dao'

export const apiController = express.Router();

apiController.get("/api/events/:type", async (req, res) => {
  const eventsDAO = new EventsDAO(new EventsRepo());
  const event_type:string = req.params.type
  const care_recipient_id:string = req.query.id;
  const data:Array<string> = await eventsDAO.getEventsByType(care_recipient_id, event_type)
  res.status(200).json(data);
});
