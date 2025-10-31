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

// Registrar pasajeros
export const registerPassenger = async (RegisterPassengerDto) => {
  const validation = await validateData(RegisterPassengerDto, "PASSENGER");

  // si el form no ha sido completado, se le avisa al usuario que debe completarlo
  if (!validation.valid) {
    return validation;
  }

  // si el form está completo, se continua con el flujo:
  const { full_name, dni, age, email, phone, password, role } = RegisterPassengerDto;


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

  // // se puede eliminar
  // if (role === 'passenger') {
  //   if (age < 18) {
  //     return {
  //       status: 400,
  //       data: { error: 'Minors must have a guardian' },
  //     };
  //   }
  //   await createPassenger({ user_id: user.id });
  // }
  // //------------------------

  // // se puede eliminar
  // if (role === 'driver') {
  //   await createDriver({ user_id: user.id });
  // }
  // //-------------------------

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

// Registrar conductores
export const registerDriver = async (RegisterDriverDto) => {
  const {
    name,
    lastName,
    dni,
    age,
    email,
    phone,
    password,
    role,
    license,
    plate,
  } = RegisterDriverDto;

  /*
    validaciones de los campos
  */

  // verificamos se hayan llenado todos los campos del form correctament
  const validation = await validateData(RegisterDriverDto, "DRIVER");


  // si el form no ha sido completado, se le avisa al usuario que debe completarlo
  if (!validation.valid) {
    console.log("Se tienen que completar todos los campos del form");
    return validation;
  }

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

// Inicio de sesión (pasajeros y conductores)
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

// Funcion que valida que los campos de los formularios de registro de pasajeros y conductores hayan sido llenados correctamente
const validateData = async (RegisterDto, rol) => {

  /*
    Validaciones generales ------------------------------------------------------------
  */
  
  const {dni, phone, email, age, password, role, name, last_name} = RegisterDto;
  
  // Eliminamos espacios vacios del DNI
  // Validamos que el campo del DNI haya sido completado.
  // Validamos que el DNI solo tenga números
  // Validamos que el DNI tenga 8 caracteres.
  // Validamos que el DNI ingresado no exista en la bd

  dni.trim();

  if (!dni) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un DNI' },
    };
  }

  if(!/^\d+$/.test(dni)) {
    return {
      valid: false,
      status: 400,
      data: {error: 'El DNI no puede contener letras, solo números'}
    }
  }
  
  if(dni.length != 8) {
    return new Error("El DNI debe tener 8 digitos");
  }

  const existingUser = await findUserByDNI(dni);
  if (existingUser) {
    return { 
      valid: false,
      status: 409,
      data: { error: 'DNI ya registrado' } };
  }

  // Eliminamos espacios vacios del phone
  // Validamos que el campo phone haya sido completado
  // Validamos que se incluya antes del phone el código de Perú (+51)
  // Validamos que phone empiece con 9
  // Validamos que phone tenga 9 digitos
  // Validamos que phone solo tenga números

  phone.trim();

  if(!phone) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un número de teléfono'}
    }
  }

  if(phone.substring(0,2) != '+51') {
    return {
      valid: false,
      status: 400,
      data: { error: 'Antes del número de teléfono debe incluir el código de Perú (+51)'}
    }
  }

  if(phone[3] != '9' && phone.substring(3, phone.length-1).length != 9) {
    return {
      valid: false,
      status: 400,
      data: { error: 'El número de teléfono debe iniciar con 9 y debe tener 9 digitos'}
    }
  }

  // Eliminamos espacios vacios del email
  // Validamos que el campo del email haya sido completado
  // Validamos que el campo incluya el @
  if (!email) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un correo electrónico' },
    };
  }

  if(!email.includes("@")) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar un correo electrónico válido' },
    };
  }

  // Validamos que el campo age haya sido completado
  // Validamos que el usuario sea mayor de edad (>=18)

  if(!age) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar su edad' }
    };
  }

  if(edad < 18) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ser mayor de edad para poder registrarse' }
    };
  }

  // Validamos que el campo password haya sido completado
  if(!password) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar una contraseña' }
    };
  }

  // Validamos que el campo name y last_name hayan sido completados
  if(!name || !last_name) {
    return {
      valid: false,
      status: 400,
      data: { error: 'Debe ingresar su nombre y apellido' }
    };
  }


  //------------------------------------------------------------------------------------

  if(role == "DRIVER") {
    const { dni, phone, email, age, password, role, name, last_name, license, plate } = RegisterDto;

    // Validaciones de la placa y la licencia
    // ...

    // Si pasa las validaciones, @returns {valid = true} 
     return {
      valid: true,
      status: 200,
      data: { message: 'Validacion exitosa' }
    };
  }

  // Si role == 'PASSENGER' y ha pasado todas las validaciones, @returns {valid = true}
  return {
      valid: true,
      status: 200,
      data: { message: 'Validacion exitosa' }
    };

}


// ...existing code...