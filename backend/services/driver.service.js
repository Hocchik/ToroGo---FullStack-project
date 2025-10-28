import pool from '../config/dbConfig.js';

export const createDriver = async (driver) => {
  const {user_id, license, plate, full_name} = driver;
  const result = await pool.query(
    `INSERT INTO drivers (user_id, license, plate, full_name) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, license, plate, full_name]
  );
  return result.rows[0];
};

export const finbyId = async (id) => {
  const result = await pool.query(
    `SELECT id FROM drivers WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

// Puedes agregar más funciones aquí según lo necesites

export const validateDriverData = async(dni, license, plate) => {
  // Validar licencia con el DNI
  const driverResult = await pool.query(
    `SELECT * FROM registered_drivers WHERE license = $1 AND dni = $2`,
    [license, dni]
  );

  if (driverResult.rowCount === 0) {
    throw new Error('La licencia no pertenece al DNI proporcionado.');
  }

  // Validar placa asociada a la licencia
  const vehicleResult = await pool.query(
    `SELECT * FROM registered_vehicles WHERE license = $1 AND plate = $2`,
    [license, plate]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error('La placa no pertenece a la licencia proporcionada.');
  }

  // Todo correcto
  return true;
}
