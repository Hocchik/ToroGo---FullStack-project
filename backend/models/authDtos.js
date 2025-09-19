export class User {
  constructor({ id, full_name, dni, age, email, password }) {
    this.id = id;
    this.full_name = full_name;
    this.dni = dni;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

export class LoginDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterDto {
  constructor({ full_name, dni, age, email, password, role }) {
    this.full_name = full_name; //Nombre completo
    this.dni = dni; // Documento de identidad unico
    this.age = age; // Edad numero
    this.email = email; // Correo electronico
    this.password = password; // Contraseña
    this.role = role; // Rol del usuario
    this.guardian_id = null;
  }
}