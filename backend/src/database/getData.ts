import pool from './connection'

async function getData (personID: String) {
  const data = await pool.query(
    'SELECT `payload` FROM `events` WHERE `care_recipient_id` = ?',
    [personID]
  );
  return data;
}

export default getData;