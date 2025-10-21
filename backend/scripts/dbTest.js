import pool from '../config/dbConfig.js';

const run = async () => {
  try {
    const res = await pool.query('SELECT NOW() as now');
    console.log('DB connected. Server time:', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:');
    console.error(err);
    process.exit(1);
  }
};

run();
