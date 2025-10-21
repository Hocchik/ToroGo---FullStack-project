import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret'; // prefer env var

export const generateToken = (payload) => {
  if (!SECRET) throw new Error('JWT secret not configured');
  return jwt.sign(payload, SECRET, { expiresIn: '2h' });
};

export const verifyToken = (token) => {
  if (!SECRET) throw new Error('JWT secret not configured');
  return jwt.verify(token, SECRET);
};