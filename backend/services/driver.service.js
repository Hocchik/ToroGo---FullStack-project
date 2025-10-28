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

export const doesLicenseBelongsToDriver = async (license) => {
  console.log(license)
  //---------------OJO---------------------------------------------------------------------
  //aquí se valida que la licencia exista, mas no se valida si le pertenece a la persona...
  const result = await pool.query(
    `select * from registered_drivers where license = $1`,
    [license]
  )

  if(result.rowCount > 0){
    return true;
  } else {
    return false;
  }
}

export const doesPlateBelongToVehicle = async (plate) => {
  //---------------OJO---------------------------------------------------------------------
  //aquí se valida que la placa exista, mas no se valida si el vehiculo le pertenece a la persona...
  const result = await pool.query(
    `SELECT * FROM registered_vehicles WHERE plate = $1`,
    [plate]
  );
  if(result.rowCount > 0){
    return true;
  } else {
    return false;
  }
}

