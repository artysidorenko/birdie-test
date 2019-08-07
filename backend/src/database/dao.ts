import * as Bluebird from 'bluebird';
import Event from "../model/Event";

// need a wrapper to access static Event.findAll method from EventsDAO
export class EventsRepo {
  public findAll (args:any): Bluebird<Event[]> {
    return Event.findAll(args)
  };
}
/* tslint:disable:max-classes-per-file */
export class EventsDAO {
  private repo: EventsRepo;
  constructor(repo:EventsRepo) {
    this.repo = repo
  }

  public async getEvents (id:string) {
    const events = await this.repo.findAll({
      where: { care_recipient_id: id }
    });
    const results:string[] = events.map(elem => JSON.parse(elem.payload_as_text));
    return results;
  }

  public async getEventsByType (id:string, type:string) {
    const events = await this.repo.findAll({
      where: { care_recipient_id: id, event_type: type }
    });
    const results:string[] = events.map(elem => JSON.parse(elem.payload_as_text));
    return results;
  }
}