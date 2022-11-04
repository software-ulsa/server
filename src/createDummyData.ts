import { Rol } from "./entities/Rol";
import { Usuario } from "./entities/Usuario";
import { Especialista } from "./entities/Especialista";
import { Actividad } from "./entities/Actividad";
import { Curso } from "./entities/Curso";
import { Nota } from "./entities/Nota";
import { Publicidad } from "./entities/Publicidad";
import { Codigo } from "./entities/lookup/Codigo";

import { _token } from "./constants";
import * as argon2 from "argon2";
import { Domicilio } from "./entities/lookup/Domicilio";
import { Persona } from "./entities/Persona";
import { Especialidad } from "./entities/lookup/Especialidad";

const jwt = require("jsonwebtoken");

// export const createUsuarios = async () => {
//   const adminFound = await Usuario.findOne({
//     where: { correo: "admin@gmail.com" },
//   });

//   const userFound = await Usuario.findOne({
//     where: { correo: "pitudo@gmail.com" },
//   });

//   const hashedPassword = await argon2.hash("t3mpor4l");

//   if (!adminFound) {
//     const adminRol = await Rol.save({
//       nombre: "Administrador",
//       descripcion: "Superusuario con todos los permisos",
//     });

//     try {
//       const adminInsert = await Usuario.save({
//         foto_perfil: "74f5c624ad4056684b2e083c56b5c3b4",
//         nombre: "Administrador",
//         ape_paterno: "De Los",
//         ape_materno: "Dioses",
//         correo: "admin@gmail.com",
//         password: hashedPassword,
//         telefono: "9514268601",
//         edad: 100,
//         matricula: "014419799",
//         sexo: "Masculino",
//         activo: true,
//         id_rol: adminRol.id,
//       });
//       if (adminInsert) {
//         let payload = {
//           id: adminInsert.id,
//           correo: "admin@gmail.com",
//         };
//         jwt.sign(payload, _token);
//         console.log("Administrador creado");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   if (!userFound) {
//     const userRol = await Rol.save({
//       nombre: "Usuario",
//       descripcion: "Permiso solo para consumir la informacion",
//     });

//     try {
//       const userInsert = await Usuario.save({
//         foto_perfil: "74f5c624ad4056684b2e083c56b5c3b4",
//         nombre: "Carlos",
//         segundo_nombre: "Daniel",
//         ape_paterno: "Valdez",
//         ape_materno: "Martinez",
//         correo: "pitudo@gmail.com",
//         password: hashedPassword,
//         telefono: "9514268601",
//         edad: 100,
//         matricula: "014419799",
//         sexo: "Masculino",
//         activo: true,
//         id_rol: userRol.id,
//       });

//       if (userInsert) {
//         let payload = {
//           id: userInsert.id,
//           correo: "pitudo@gmail.com",
//         };
//         jwt.sign(payload, _token);
//         console.log("Usuario de prueba creado");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };

export const createEspecialistas = async () => {
  const especialistaRol = await Rol.save({
    nombre: "Especialista",
    descripcion: "Profesional de salud",
    permisos: ["chat"],
  });

  const especialidadUno = await Especialidad.save({
    nombre: "Traumatologia",
    tipo: "Medica",
  });

  const especialidadDos = await Especialidad.save({
    nombre: "Obstetricia",
    tipo: "Medica",
  });

  const especialistaUno = await Especialista.findOne({
    where: { usuario: { persona: { correo: "specOne@gmail.com" } } },
  });

  const especialistaDos = await Especialista.findOne({
    where: { usuario: { persona: { correo: "specTwo@gmail.com" } } },
  });

  const hashedPassword = await argon2.hash("t3mpor4l");

  const domicilioUnoInsert = await Domicilio.save({
    calle: "Av. de las Huertas",
    colonia: "Colonia Reforma",
    estado: "Oaxaca",
    codigo_postal: "68050",
  });

  const domicilioDosInsert = await Domicilio.save({
    calle: "Av. de las Huertas",
    colonia: "Colonia Reforma",
    estado: "Oaxaca",
    codigo_postal: "68050",
  });

  if (!especialistaUno) {
    try {
      const personaUnoInsert = await Persona.save({
        nombre: "Juan Antonio",
        ape_paterno: "Perez",
        ape_materno: "Rodriguez",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Masculino",
        telefono: "9514562431",
        correo: "specOne@gmail.com",
      });

      const usuarioUnoInsert = await Usuario.save({
        username: "specOne",
        password: hashedPassword,
        imagen: "0c964b47b4c845fb697de37375ad51aa",
        activo: true,
        rol_id: especialistaRol.id,
        persona_id: personaUnoInsert.id,
      });

      const especialistaUnoInsert = await Especialista.save({
        cedula_prof: "123456789",
        domicilio_id: domicilioUnoInsert.id,
        especialidad_id: especialidadUno.id,
        usuario_id: usuarioUnoInsert.id,
      });

      if (especialistaUnoInsert) console.log("Especialista 1 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }

  if (!especialistaDos) {
    try {
      const personaDosInsert = await Persona.save({
        nombre: "Wanda Kimberly",
        ape_paterno: "Bolaños",
        ape_materno: "Hernandez",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Femenino",
        telefono: "9514562431",
        correo: "specTwo@gmail.com",
      });

      const usuarioDosInsert = await Usuario.save({
        username: "specTwo",
        password: hashedPassword,
        imagen: "023c6c21d8db61412ba261c7fb8719c1",
        activo: true,
        rol_id: especialistaRol.id,
        persona_id: personaDosInsert.id,
      });

      const especialistaDosInsert = await Especialista.save({
        cedula_prof: "123456789",
        domicilio_id: domicilioDosInsert.id,
        especialidad_id: especialidadDos.id,
        usuario_id: usuarioDosInsert.id,
      });

      if (especialistaDosInsert) console.log("Especialista 2 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }
};
