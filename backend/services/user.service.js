import pool from '../config/dbConfig.js';

export const createUser = async ({ full_name, dni, age, email, password }) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, dni, age, email, password)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [full_name, dni, age, email, password]
  );
  return result.rows[0];
};

export const findUserByDNI = async (dni) => {
  const result = await pool.query(`SELECT * FROM users WHERE dni = $1`, [dni]);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};