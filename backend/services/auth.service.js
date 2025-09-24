import { createUser, findUserByDNI, findUserByEmail } from './user.service.js';
import { createPassenger } from './passenger.service.js';
import { createDriver } from './driver.service.js';
import { getUserRoles } from './role.service.js';
import { generateToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';

export const registerUser = async (RegisterDto) => {
  const { full_name, dni, age, email, password, role } = RegisterDto;

  const existingUser = await findUserByDNI(dni);
  if (existingUser) {
    return { status: 409, data: { error: 'DNI already registered' } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ full_name, dni, age, email, password: hashedPassword });

  if (role === 'passenger') {
    if (age < 18) {
      return { status: 400, data: { error: 'Minors must have a guardian' } };
    }
    await createPassenger({ user_id: user.id });
  }

  if (role === 'driver') {
    await createDriver(user.id);
  }

  const token = generateToken({
    userId: user.id,
    dni: user.dni,
    role,
  });

  return {
    status: 201,
    data: {
      message: 'User registered successfully',
      token,
      role,
      user: {
        id: user.id,
        full_name: user.full_name,
        dni: user.dni,
        email: user.email,
      },
    },
  };
};

export const loginUser = async (LoginDto) => {
  const { email, password } = LoginDto;
  const user = await findUserByEmail(email);
  if (!user) {
    return { status: 404, data: { error: 'User not found' } };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { status: 401, data: { error: 'Invalid credentials' } };
  }

  const roles = await getUserRoles(user.id);

  if (roles.length === 1) {
    const token = generateToken({
      userId: user.id,
      dni: user.dni,
      role: roles[0],
    });

    return {
      status: 200,
      data: {
        message: 'Login successful',
        token,
        role: roles[0],
        user: {
          id: user.id,
          full_name: user.full_name,
          dni: user.dni,
          email: user.email,
        },
      },
    };
  }

  return {
    status: 200,
    data: {
      message: 'Multiple roles detected',
      roles,
      user: {
        id: user.id,
        full_name: user.full_name,
        dni: user.dni,
        email: user.email,
      },
    },
  };
};

export const selectActiveRole = async (user, role) => {
  const { userId, dni } = user;
  const roles = await getUserRoles(userId);
  if (!roles.includes(role)) {
    return { status: 403, data: { error: 'Role not assigned to this user' } };
  }

  const token = generateToken({ userId, dni, role });

  return {
    status: 200,
    data: {
      message: `Role '${role}' activated`,
      token,
      role,
    },
  };
};