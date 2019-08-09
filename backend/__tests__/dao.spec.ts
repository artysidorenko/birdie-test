import * as Bluebird from 'bluebird';
import { expect } from 'chai';
import * as SequelizeMock from "sequelize-mock";

import { EventsDAO } from "../src/database/dao";
import Event from "../src/model/Event";

let eventsDAO: EventsDAO;

// tslint:disable: object-literal-sort-keys
// tslint:disable: no-console

beforeEach(() => {
  const dbMock = new SequelizeMock();
  const modelMock = dbMock.define("events", {
    id: "id_test",
    payload_as_text: "{ \"test\": \"payload_as_text\" }",
    visit_id: "visit_id_test",
    caregiver_id: "caregiver_id_test",
    timestamp: "timestamp_test",
    event_type: "event_type_test",
    care_recipient_id: "care_recipient_id_test"
  });

  class MockRepo {
    public findAll(args: any): Bluebird<Event[]> {
      return modelMock.findAll(args);
    }
  }
  eventsDAO = new EventsDAO(new MockRepo());
})

describe("Test Sequelize Mocking", () => {
  it("should get the correct payload from mock db, as a json array", async () => {
    console.log('TEST')
    const payload = await eventsDAO.getEventsByType(
      "care_recipient_id_test",
      "event_type_test"
    );
    console.log(payload)
    expect(payload).to.be.an('array')
    expect(payload[0]).to.deep.equal({test: 'payload_as_text'});
  });
});
