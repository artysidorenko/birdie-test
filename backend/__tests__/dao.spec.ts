import * as SequelizeMock from "sequelize-mock";
import * as Bluebird from "bluebird";
import { expect } from "chai";

import { EventsDAO } from "../src/database/dao";
import Event from "../src/model/Event";

let eventsDAO: EventsDAO;

beforeEach(() => {
  const dbMock = new SequelizeMock();
  const modelMock = dbMock.define("events", {
    id: "id_test",
    payload_as_text: "payload_as_text_test",
    visit_id: "visit_id_test",
    caregiver_id: "caregiver_id_test",
    timestamp: "timestamp_test",
    event_type: "event_type_test",
    care_recipient_id: "care_recipient_id_test"
  });

  class mockRepo {
    findAll(args: any): Bluebird<Event[]> {
      return modelMock.findAll(args);
    }
  }
  eventsDAO = new EventsDAO(new mockRepo());
})

describe("Test Sequelize Mocking", () => {
  it("should get the correct payload from mock db", async () => {
    const payload = await eventsDAO.getEventsByType(
      "care_recipient_id_test",
      "event_type_test"
    );
    expect(payload).to.be.an('array')
    expect(payload[0]).equal("payload_as_text_test");
  });
});
