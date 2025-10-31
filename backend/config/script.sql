CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  dni TEXT UNIQUE,
  phone TEXT UNIQUE,
  email TEXT UNIQUE,
  age INTEGER NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
);

CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE motorcycles (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES drivers(id),
  plate TEXT UNIQUE NOT NULL,
  color TEXT,
  soat TEXT,
  license TEXT
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  passenger_id INTEGER REFERENCES passengers(id),
  driver_id INTEGER REFERENCES drivers(id),
  origin TEXT,
  destination TEXT,
  status TEXT,
  fare NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure at least one contact method exists for a user
ALTER TABLE users ADD CONSTRAINT email_or_phone_not_null CHECK (email IS NOT NULL OR phone IS NOT NULL);