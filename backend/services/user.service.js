import pool from '../config/dbConfig.js';

export const createUser = async ({ full_name, dni, age, email, phone, password }) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, dni, age, email, phone, password)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [full_name, dni, age, email, phone, password]
  );
  console.log("resultado:......",result);
  return result.rows[0];
};

export const logIn = async (email, password) => {
  const result = await pool.query(
    `SELECT* FROM `
  );
}

export const findUserByDNI = async (dni) => {
  const result = await pool.query(`SELECT * FROM users WHERE dni = $1`, [dni]);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export const findUserByPhone = async (phone) => {
  const result = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
  return result.rows[0];
};

export const findUserByEmailOrPhone = async (identifier) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1 OR phone = $1',
    [identifier]
  );
  return result.rows[0];
};
