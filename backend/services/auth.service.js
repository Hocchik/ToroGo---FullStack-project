// ...existing code...
import {
  createUser,
  findUserByDNI,
  findUserByEmailOrPhone,
  logIn
} from './user.service.js';
import { createPassenger } from './passenger.service.js';
import {
  createDriver,
  validateDriverData
} from './driver.service.js';
import { getUserRoles } from './role.service.js';
import { generateToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';
// ...existing code...

export const registerUser = async (RegisterDto) => {
  const validation = await checkFormHasNoBlankGaps(RegisterDto);

  // si el form no ha sido completado, se le avisa al usuario que debe completarlo
  if (!validation.valid) {
    return validation;
  }

  // si el form está completo, se continua con el flujo:
  const { full_name, dni, age, email, phone, password, role } = RegisterDto;


  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    full_name,
    dni,
    age,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  // se puede eliminar
  if (role === 'passenger') {
    if (age < 18) {
      return {
        status: 400,
        data: { error: 'Minors must have a guardian' },
      };
    }
    await createPassenger({ user_id: user.id });
  }
  //------------------------

  // se puede eliminar
  if (role === 'driver') {
    await createDriver({ user_id: user.id });
  }
  //-------------------------

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
        phone: user.phone,
      },
    },
  };
};

export const loginUser = async (email, password) => {
  const does_user_exist = await logIn(email,password)

  if(!does_user_exist){
    return {
      valid: false,
      status: 400,
      data:{error : "El usuario no existe"} 
    }
  }

  return console.log("inicio de sesión exitoso!!!")
}

// función que verifica que el formulario en uso haya sido llenado completamente
const checkFormHasNoBlankGaps = async (RegisterDto) => {
const { email, phone, dni } = RegisterDto;

  if (!email && !phone) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Email or phone number is required' },
    };
  }

  if (!dni) {
    return {
      valid: false,
      status: 400,
      data: { error: 'DNI is required' },
    };
  }

  const existingUser = await findUserByDNI(dni);
  if (existingUser) {
    return { valid: false, status: 409, data: { error: 'DNI already registered' } };
  }

  return { valid: true };
};
// ...existing code...

export const registerDriver = async (RegisterDriverDto) => {
  const {
    full_name,
    dni,
    age,
    email,
    phone,
    password,
    role,
    license,
    plate,
  } = RegisterDriverDto;

  // verificamos se hayan llenado todos los campos del form
  const validation = await checkFormHasNoBlankGaps(RegisterDriverDto);

  // si el form no ha sido completado, se le avisa al usuario que debe completarlo
  if (!validation.valid) {
    console.log("Se tienen que completar todos los campos del form");
    return validation;
  }

  // si el form está completo, se continua con el flujo:

  /* 
     verificamos que la licencia exista y le pertenezca al driver al igual que
     la placa del vehiculo 
  */

  const is_data_valid = await validateDriverData(dni, license, plate);

  if (!is_data_valid) {
    return {
      valid: false,
      status: 400,
      data: {error: 'Invalid data'}
    }
  }

  // creamos el usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    full_name,
    dni,
    phone,
    email,
    age,
    password: hashedPassword,
    role,
  })

    // creamos al driver
    const driver = createDriver({
    user_id: user.id,
    license,
    plate,
    full_name,
  });
  
    return {
    status: 201,
    data: {
      message: 'Driver registered successfully',
      user: {
        id: user.id,
        full_name: user.full_name,
        dni: user.dni,
        email: user.email,
        phone: user.phone,
      },
      driver,
    },
  };
};
// ...existing code...