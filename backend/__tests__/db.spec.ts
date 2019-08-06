import { Sequelize } from "sequelize-typescript";
import { expect } from "chai";
import Event from "../src/model/Event";

beforeEach(() => {
  const sequelize = new Sequelize({dialect: 'mysql'});
  sequelize.addModels([Event]);
})

describe('Event model', () => {
  it('has the correct name', () => {
    expect(Event.tableName).to.equal('events')

  })
  it('has the full set of expected attributes', () => {
    const properties = [
      "id",
      "payload_as_text",
      "visit_id",
      "caregiver_id",
      "timestamp",
      "event_type",
      "care_recipient_id"
    ];
    properties.forEach(property => {
      expect(Event.rawAttributes).to.haveOwnProperty(property)
    })
  })
  it("has the primary key attribute 'id'", () => {
    expect(Event.primaryKeyAttribute).to.equal('id')
  })
  

});