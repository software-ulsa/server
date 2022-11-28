import { _token } from "./constants";
import * as argon2 from "argon2";

import { Rol } from "./entities/Rol";
import { Persona } from "./entities/Persona";
import { Usuario } from "./entities/Usuario";
import { Codigo } from "./entities/lookup/Codigo";
import { Especialista } from "./entities/Especialista";

import { Curso } from "./entities/Curso";
import { Actividad } from "./entities/Actividad";
import { Nota } from "./entities/Nota";
import { Publicidad } from "./entities/Publicidad";

import { Domicilio } from "./entities/lookup/Domicilio";
import { Especialidad } from "./entities/lookup/Especialidad";
import { Paciente } from "./entities/Paciente";
import { Carrera } from "./entities/lookup/Carrera";
import { Categoria } from "./entities/lookup/Categoria";
import { Historial } from "./entities/relation/Historial";
import { Suscripcion } from "./entities/relation/Suscripcion";

const jwt = require("jsonwebtoken");

export const createRoles = async () => {
  const adminFound = await Rol.findOne({ where: { nombre: "ADMINISTRADOR" } });

  if (!adminFound) {
    try {
      const adminRol = await Rol.save({
        nombre: "ADMINISTRADOR",
        descripcion: "Superusuario con todos los permisos",
        permisos: ["*"],
      });
      if (adminRol) console.log("Admin Rol de prueba creado");

      const usuarioRol = await Rol.save({
        nombre: "USUARIO",
        descripcion: "Miembro de ASAP - A safe place",
        permisos: ["PUBLICIDADES", "NOTAS", "CURSOS", "ROLES"],
      });
      if (usuarioRol) console.log("Usuario Rol de prueba creado");

      const pacienteRol = await Rol.save({
        nombre: "PACIENTE",
        descripcion: "Estudiante de la Universidad La Salle Oaxaca",
        permisos: [],
      });
      if (pacienteRol) console.log("Paciente Rol de prueba creado");

      const especialistaRol = await Rol.save({
        nombre: "ESPECIALISTA",
        descripcion: "Profesional de salud",
        permisos: ["CURSOS"],
      });
      if (especialistaRol) console.log("Especialista Rol de prueba creado");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createCarreras = async () => {
  const carreraFound = await Carrera.findOne({
    where: { abreviatura: "Ing. de Software" },
  });

  if (!carreraFound) {
    try {
      const carreraUno = await Carrera.save({
        nombre: "Ingenieria de Software y Sistemas Computacionales",
        abreviatura: "Ing. de Software",
      });
      if (carreraUno) console.log("Carrera 1 de prueba creada");

      const carreraDos = await Carrera.save({
        nombre: "Ingenieria Electronica y de Telecomunicaciones",
        abreviatura: "Ing. Electronica",
      });
      const carreraTres = await Carrera.save({
        nombre: "Bachillerato",
        abreviatura: "Bachi",
      });
      const carreraCuatro = await Carrera.save({
        nombre: "Licenciatura en comunicación",
        abreviatura: "LC",
      });
      const carreraCinco = await Carrera.save({
        nombre: "Licenciatura en derecho",
        abreviatura: "LD",
      });
      const carreraSeis = await Carrera.save({
        nombre: "Licenciatura en Adminstración de Empresas",
        abreviatura: "LAE",
      });
      const carreraSiete = await Carrera.save({
        nombre: "Licenciatura en Gastronomía",
        abreviatura: "LG",
      });
      const carreraOcho = await Carrera.save({
        nombre: "Licenciatura en Psicología",
        abreviatura: "LP",
      });
      const carreraNueve = await Carrera.save({
        nombre: "Licenciatura en ",
        abreviatura: "LP",
      });
      if (carreraDos) console.log("Carrera 2 de prueba creada");
      if (carreraTres) console.log("Carrera 3 de prueba creada");
      if (carreraCuatro) console.log("Carrera 4 de prueba creada");
      if (carreraCinco) console.log("Carrera 5 de prueba creada");
      if (carreraSeis) console.log("Carrera 6 de prueba creada");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createCategorias = async () => {
  const categoriaFound = await Categoria.findOne({
    where: { nombre: "Salud y belleza" },
  });

  if (!categoriaFound) {
    try {
      const categoriaUno = await Categoria.save({
        nombre: "Salud y belleza",
        descripcion: "Todo lo relacionado a la salud física y cuidado personal",
      });
      if (categoriaUno) console.log("Categoria 1 de prueba creada");

      const categoriaDos = await Categoria.save({
        nombre: "Social",
        descripcion: "Todo lo relacionado a las relaciones interpersonales",
      });
      if (categoriaDos) console.log("Categoria 2 de prueba creada");

      const categoriaTres = await Categoria.save({
        nombre: "Tecnología",
        descripcion: "Todo lo relacionado al desarrollo web",
      });
      if (categoriaTres) console.log("Categoria 3 de prueba creada");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createEspecialidades = async () => {
  const especialidadFound = await Especialidad.findOne({
    where: { nombre: "Traumatología" },
  });

  if (!especialidadFound) {
    try {
      const especialidadUno = await Especialidad.save({
        nombre: "Traumatología",
        tipo: "Médica",
      });
      if (especialidadUno) console.log("Especialidad 1 de prueba creada");

      const especialidadDos = await Especialidad.save({
        nombre: "Obstetricia",
        tipo: "Médica",
      });
      if (especialidadDos) console.log("Especialidad 2 de prueba creada");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createAdmin = async () => {
  const adminFound = await Usuario.findOne({ where: { username: "admin" } });
  const hashedPassword = await argon2.hash("123");

  if (!adminFound) {
    try {
      const personaAdminInsert = await Persona.save({
        nombre: "Administrador",
        ape_paterno: "Administrador",
        ape_materno: "Administrador",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Femenino",
        telefono: "9514562431",
        correo: "admin@gmail.com",
      });

      const usuarioAdminInsert = await Usuario.save({
        username: "admin",
        password: hashedPassword,
        imagen: "157-1575410_react-js-logo-png-transparent-png.png",
        activo: true,
        rol_id: 1,
        persona_id: personaAdminInsert.id,
      });

      if (usuarioAdminInsert) console.log("Administrador creado");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createUsuarios = async () => {
  const usuarioUno = await Usuario.findOne({
    where: { persona: { correo: "userOne@gmail.com" } },
  });

  const usuarioDos = await Usuario.findOne({
    where: { persona: { correo: "userTwo@gmail.com" } },
  });

  const hashedPassword = await argon2.hash("123");

  if (!usuarioUno) {
    try {
      const personaUnoInsert = await Persona.save({
        nombre: "Carlos Daniel",
        ape_paterno: "Valdez",
        ape_materno: "Martinez",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Masculino",
        telefono: "9514562431",
        correo: "userOne@gmail.com",
      });

      const usuarioUnoInsert = await Usuario.save({
        username: "daniboy",
        password: hashedPassword,
        imagen: "0c964b47b4c845fb697de37375ad51aa",
        activo: true,
        rol_id: 2,
        persona_id: personaUnoInsert.id,
      });
      if (usuarioUnoInsert) console.log("Usuario 1 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }

  if (!usuarioDos) {
    try {
      const personaDosInsert = await Persona.save({
        nombre: "Jairo Esteban",
        ape_paterno: "Martinez",
        ape_materno: "Portillo",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Masculino",
        telefono: "9514562431",
        correo: "userTwo@gmail.com",
      });

      const usuarioDosInsert = await Usuario.save({
        username: "jairoBoss",
        password: hashedPassword,
        imagen: "023c6c21d8db61412ba261c7fb8719c1",
        activo: true,
        rol_id: 2,
        persona_id: personaDosInsert.id,
      });

      if (usuarioDosInsert) console.log("Usuario 2 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }
};

export const createPacientes = async () => {
  const pacienteUno = await Paciente.findOne({
    where: { usuario: { persona: { correo: "pacientOne@gmail.com" } } },
  });

  const pacienteDos = await Paciente.findOne({
    where: { usuario: { persona: { correo: "pacientTwo@gmail.com" } } },
  });

  const hashedPassword = await argon2.hash("123");

  if (!pacienteUno) {
    try {
      const personaUnoInsert = await Persona.save({
        nombre: "Azucena",
        ape_paterno: "Reyes",
        ape_materno: "Santiago",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Femenino",
        telefono: "9514562431",
        correo: "pacientOne@gmail.com",
      });

      const usuarioUnoInsert = await Usuario.save({
        username: "azucena",
        password: hashedPassword,
        imagen: "0c964b47b4c845fb697de37375ad51aa",
        activo: true,
        rol_id: 3,
        persona_id: personaUnoInsert.id,
      });

      const pacienteUnoInsert = await Paciente.save({
        usuario_id: usuarioUnoInsert.id,
        carrera_id: 1,
        matricula: "014419799",
      });

      if (pacienteUnoInsert) console.log("Paciente 1 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }

  if (!pacienteDos) {
    try {
      const personaDosInsert = await Persona.save({
        nombre: "Gerardo",
        ape_paterno: "Crisanto",
        ape_materno: "Ulloa",
        fecha_nac: new Date("2002-01-28"),
        sexo: "Masculino",
        telefono: "9514562431",
        correo: "pacientTwo@gmail.com",
      });

      const usuarioDosInsert = await Usuario.save({
        username: "geraGOD",
        password: hashedPassword,
        imagen: "023c6c21d8db61412ba261c7fb8719c1",
        activo: true,
        rol_id: 3,
        persona_id: personaDosInsert.id,
      });

      const pacienteDosInsert = await Paciente.save({
        usuario_id: usuarioDosInsert.id,
        carrera_id: 2,
        matricula: "014419799",
      });

      if (pacienteDosInsert) console.log("Paciente 2 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }
};

export const createEspecialistas = async () => {
  const especialistaUno = await Especialista.findOne({
    where: { usuario: { persona: { correo: "specOne@gmail.com" } } },
  });

  const especialistaDos = await Especialista.findOne({
    where: { usuario: { persona: { correo: "specTwo@gmail.com" } } },
  });

  const hashedPassword = await argon2.hash("123");

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
        imagen: "7dd5cb88c04e68880c7d9485e53fc47f",
        activo: true,
        rol_id: 4,
        persona_id: personaUnoInsert.id,
      });

      const domicilioUnoInsert = await Domicilio.save({
        calle: "Av. de las Huertas",
        colonia: "Colonia Reforma",
        estado: "Oaxaca",
        codigo_postal: "68050",
      });

      const especialistaUnoInsert = await Especialista.save({
        cedula_prof: "123456789",
        domicilio_id: domicilioUnoInsert.id,
        especialidad_id: 1,
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
        imagen: "31a7c52e26086b1f6f23aaac4a12aef1",
        activo: true,
        rol_id: 4,
        persona_id: personaDosInsert.id,
      });

      const domicilioDosInsert = await Domicilio.save({
        calle: "Av. de las Huertas",
        colonia: "Colonia Reforma",
        estado: "Oaxaca",
        codigo_postal: "68050",
      });

      const especialistaDosInsert = await Especialista.save({
        cedula_prof: "123456789",
        domicilio_id: domicilioDosInsert.id,
        especialidad_id: 2,
        usuario_id: usuarioDosInsert.id,
      });

      if (especialistaDosInsert) console.log("Especialista 2 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }
};

export const createCursos = async () => {
  const cursoFound = await Curso.findOne({
    where: { titulo: "Aprende React 1" },
  });

  if (!cursoFound) {
    try {
      const cursoWelcome = await Curso.save({
        titulo: `Bienvenid@ a ASAP`,
        descripcion:
          "En este curso te damos la bienvenida a ASAP, la mejor red para cuidar de la salud mental",
        objetivo: "Aprenderás a cómo usar un curso",
        fecha_inicio: new Date("02-07-2001"),
        fecha_fin: new Date("02-11-2022"),
        duracion: 8,
        activo: true,
        imagen: "25f8298506fc7ceeaed210db62bd83b8",
        categoria_id: 3,
        palabras_clave: ["ASAP", "Bienvenida", "Curso", "Introducción"],
      });

      if (cursoWelcome) {
        const actividadUno = await Actividad.save({
          titulo: "ASAP, tu lugar seguro",
          descripcion:
            "Puedes ver y observar el contenido que los especialistas publican, agendar citas con ellos, etc.",
          url_media: "https://www.youtube.com/watch?v=8SbUC-UaAxE",
          curso_id: cursoWelcome.id,
        });
      }

      for (let i = 1; i <= 10; i++) {
        const cursoInsert = await Curso.save({
          titulo: `Aprende React ${i}`,
          descripcion:
            "En este curso gratuito de React (8 horas) aprenderás paso a paso todo lo que necesitas saber para comenzar a crear proyectos interactivos.",
          objetivo:
            "Aprenderás por qué es tan importante para el desarrollo web y por qué deberías aprenderlo.",
          fecha_inicio: new Date("02-07-2001"),
          fecha_fin: new Date("02-11-2022"),
          duracion: 8,
          activo: true,
          imagen: "",
          categoria_id: 3,
          palabras_clave: ["React", "Tecnologia", "Desarrollo Web"],
        });

        if (cursoInsert) {
          console.log(`Curso ${i} de prueba creado`);
          const actividadUno = await Actividad.save({
            titulo: "Conceptos Básicos de React",
            descripcion:
              "Veamos algunos conceptos esenciales que necesitarás para comenzar a trabajar con React",
            url_media: "https://www.youtube.com/watch?v=8SbUC-UaAxE",
            curso_id: cursoInsert.id,
          });
          if (actividadUno) console.log(`Actividad 1 del curso ${i} de prueba creado`);

          const actividadDos = await Actividad.save({
            titulo: "Estructura de una Aplicación de React",
            descripcion: "Cómo crear una aplicación de React con el comando npx create-react-app.",
            url_media: "https://www.youtube.com/watch?v=8SbUC-UaAxE",
            curso_id: cursoInsert.id,
          });
          if (actividadDos) console.log(`Actividad 2 del curso ${i} de prueba creado`);

          const actividadTres = await Actividad.save({
            titulo: "Enrutamiento en React",
            descripcion: "¿Cómo agregar dinamismo a tu sistema?",
            url_media: "https://www.youtube.com/watch?v=8SbUC-UaAxE",
            curso_id: cursoInsert.id,
          });
          if (actividadTres) console.log(`Actividad 3 del curso ${i} de prueba creado`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const createNotas = async () => {
  const notaFound = await Nota.findOne({ where: { titulo: "Apoco si pa" } });

  if (!notaFound) {
    try {
      const notaCuatroInsert = await Nota.save({
        titulo: "Bienvenid@ a ASAP",
        contenido:
          "<div><b>En este espacio podrás compartir tus pensamientos, todas las notas pasan por un proceso de revisión por lo que no se publicarán directamente</b></div><div><b><i>Esperamos que lo disfrutes</i></b></div><div><b><i><br></i></b></div><div><b><i>Atte. El equipo de desarrollo ASAP</i></b></div>",
        imagen: "25f8298506fc7ceeaed210db62bd83b8",
        estado: "Pendiente",
        tema: "Instrucciones básicas",
        palabras_clave: ["Bienvenida", "Bienvenido", "ASAP"],
        usuario_id: 1,
      });

      const notaUnoInsert = await Nota.save({
        titulo: "El día de hoy me encuentro bien",
        contenido:
          "<div><b>El día de hoy he sentido que la brisa tocó mi rostró, permitiéndo tomar un tiempo y disfrutal la vida</b></div><div><b><i>Les dejo esta postal</i></b></div><div><b><i><br></i></b></div><div><b><i>Saludos</i></b></div>",
        imagen: "67b6ab820df13e5d67441f0bc88d388c",
        estado: "Aceptado",
        tema: "Vida",
        palabras_clave: ["Felicidad", "Plenitud", "Paisaje"],
        usuario_id: 1,
      });
      if (notaUnoInsert) console.log("Nota 1 de prueba creada");

      const notaDosInsert = await Nota.save({
        titulo: "Lago asombroso",
        contenido:
          "<div><b>El día de ayer me encontraba de paseo y pude observar este lindo lago, se los comparto.</b></div><div><b><i>Bendecido lunes</i></b></div><div><b><i><br></i></b></div>",
        imagen: "7557129ef4364c89b28490263c4b83f7",
        estado: "Rechazado",
        tema: "Lago",
        palabras_clave: ["Lago", "Paisaje", "Agua"],
        usuario_id: 1,
      });
      if (notaDosInsert) console.log("Nota 2 de prueba creada");

      const notaTresInsert = await Nota.save({
        titulo: "Pájaros en el alambre",
        contenido:
          "<div><b>Como el famoso dicho, esta mañana observe pájaros en el alambre. </b></div><div><b><i><br></i></b></div><div><b><i>Bendecido Jueves</i></b></div>",
        imagen: "e576b89c435c56b7d616b9c59a5deb91",
        estado: "Aceptado",
        tema: "Pájaros",
        palabras_clave: ["Pájaros", "Alambre", "Paisaje", "Plumas"],
        usuario_id: 1,
      });
      if (notaTresInsert) console.log("Nota 3 de prueba creada");

      if (notaCuatroInsert) console.log("Nota 4 de prueba creada");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createActividadesCompletadas = async () => {
  const pacienteUno = await Paciente.findOne({
    where: { usuario: { persona: { correo: "pacientOne@gmail.com" } } },
  });

  const actividadCompleted = await Historial.find({
    where: { paciente_id: pacienteUno!.id, curso_id: 1 },
  });

  if (actividadCompleted.length === 0) {
    try {
      const suscripcion = await Suscripcion.save({
        fecha_inicio: new Date(),
        valoracion: 0,
        paciente_id: pacienteUno!.id,
        curso_id: 1,
        progreso: Number((2 / 3) * 100),
      });

      const actOneCompleted = await Historial.save({
        curso_id: 1,
        paciente_id: pacienteUno!.id,
        actividad_id: 1,
        fecha_completado: new Date(),
      });

      const actThreeCompleted = await Historial.save({
        curso_id: 1,
        paciente_id: pacienteUno!.id,
        actividad_id: 3,
        fecha_completado: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }
};
