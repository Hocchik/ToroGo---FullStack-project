import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const { Pool } = pkg;

// Load .env located in backend/ directory regardless of CWD
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Helper to mask sensitive values for logs
const mask = (value) => {
  if (!value) return '(empty)';
  const s = String(value);
  if (s.length <= 4) return '****';
  return `${s.slice(0, 2)}...${s.slice(-2)}`;
};

// Prefer a full DATABASE_URL if provided (e.g. postgres://user:pass@host:5432/dbname)
// Otherwise, fall back to individual env vars.
let pool;
if (process.env.DATABASE_URL) {
  if (typeof process.env.DATABASE_URL !== 'string') {
    throw new Error('DATABASE_URL must be a string. Check your environment variables.');
  }
  // Optional: quick parse to validate format without printing secrets
  try {
    // eslint-disable-next-line no-undef
    const url = new URL(process.env.DATABASE_URL);
    if (!url.protocol.startsWith('postgres')) {
      throw new Error('DATABASE_URL does not look like a postgres URL');
    }
  } catch (err) {
    throw new Error(`Invalid DATABASE_URL: ${err.message}`);
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  const config = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mototaxi_app',
    password: process.env.DB_PASS === undefined ? undefined : String(process.env.DB_PASS),
    port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 5432,
  };

  // Validate password type for clearer error messages
  if (config.password !== undefined && typeof config.password !== 'string') {
    throw new Error(`DB password must be a string. Current type: ${typeof config.password}`);
  }

  // Helpful hint: if password is missing, the connection may fail
  if (!config.password) {
    // do not throw; allow empty password but warn
    console.warn('[dbConfig] Warning: DB password is empty. If your DB requires a password, set DB_PASS or DATABASE_URL in .env');
  }

  // Print a minimal connection summary (no secrets)
  console.info(`[dbConfig] connecting to pg://${config.user}@${config.host}:${config.port}/${config.database} (password: ${config.password ? mask(config.password) : '(empty)'})`);

  pool = new Pool(config);
}

export default pool;
