import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "events",
  timestamps: false
})
export default class Event extends Model<Event> {
  @PrimaryKey
  @Column
  public id!: string;

  @Column
  public payload_as_text!: string;

  @Column
  public visit_id!: string;

  @Column
  public caregiver_id!: string;

  @CreatedAt
  @Column
  public timestamp!: Date;

  @Column
  public event_type!: string;

  @Column
  public care_recipient_id!: string;
}
