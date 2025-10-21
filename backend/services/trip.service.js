import pool from '../config/dbConfig.js';

/**
 * Trip service
 * Functions:
 * - createTrip
 * - getTripById
 * - updateTripStatus
 * - assignDriverToTrip (transactional)
 * - cancelTrip
 * - getTripsByUser (with pagination)
 */

export const createTrip = async ({ passenger_id, origin, destination, fare }) => {
  const result = await pool.query(
    `INSERT INTO trips (passenger_id, origin, destination, status, fare)
     VALUES ($1, $2, $3, 'pending', $4) RETURNING *`,
    [passenger_id, origin, destination, fare]
  );
  return result.rows[0];
};

export const getTripById = async (id) => {
  const result = await pool.query(`SELECT * FROM trips WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateTripStatus = async (trip_id, status, driver_id = null) => {
  const result = await pool.query(
    `UPDATE trips SET status = $1, driver_id = $2 WHERE id = $3 RETURNING *`,
    [status, driver_id, trip_id]
  );
  return result.rows[0];
};

export const assignDriverToTrip = async (trip_id, driver_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1 FOR UPDATE', [trip_id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.status !== 'pending') throw new Error('Trip is not pending');

    const updateRes = await client.query(
      'UPDATE trips SET driver_id = $1, status = $2 WHERE id = $3 RETURNING *',
      [driver_id, 'in_progress', trip_id]
    );
    await client.query('COMMIT');
    return updateRes.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const cancelTrip = async (trip_id) => {
  const result = await pool.query(
    `UPDATE trips SET status = 'cancelled' WHERE id = $1 RETURNING *`,
    [trip_id]
  );
  return result.rows[0];
};

export const getTripsByUser = async (user_id, role, page = 1, limit = 20) => {
  const column = role === 'passenger' ? 'passenger_id' : 'driver_id';
  const offset = (page - 1) * limit;
  const result = await pool.query(
    `SELECT * FROM trips WHERE ${column} = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
    [user_id, limit, offset]
  );
  return result.rows;
};
 