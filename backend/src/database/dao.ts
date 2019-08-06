import Event from "../model/Event";
import * as Bluebird from "bluebird";

// need a wrapper to access static Event.findAll method from EventsDAO
export class EventsRepo {
  findAll (args:any): Bluebird<Event[]> {
    return Event.findAll(args)
  };
}

export class EventsDAO {
  private repo: EventsRepo;
  constructor(repo:EventsRepo) {
    this.repo = repo
  }

  async getEventsByType (care_recipient_id:string, event_type:string) {
    const events = await this.repo.findAll({
      where: { care_recipient_id: care_recipient_id, event_type: event_type }
    });
    const results:Array<string> = events.map(elem => elem.payload_as_text);
    return results;
  }
}