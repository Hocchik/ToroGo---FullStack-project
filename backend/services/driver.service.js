import pool from '../config/dbConfig.js';

export const createDriver = async (user_id) => {
  const result = await pool.query(
    `INSERT INTO drivers (user_id) VALUES ($1) RETURNING *`,
    [user_id]
  );
  return result.rows[0];
};

// Puedes agregar más funciones aquí según lo necesites