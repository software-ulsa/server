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

      const pacienteRol = await Rol.save({
        nombre: "PACIENTE",
        descripcion: "Estudiante de la Universidad La Salle Oaxaca",
        permisos: [],
      });

      const especialistaRol = await Rol.save({
        nombre: "ESPECIALISTA",
        descripcion: "Profesional de salud",
        permisos: ["CURSOS", "NOTAS"],
      });

      const usuarioRol = await Rol.save({
        nombre: "USUARIO",
        descripcion: "Miembro de ASAP - A safe place",
        permisos: ["NOTAS"],
      });
    } catch (error) {
      console.log("Error al crear los roles");
    }
  }
};

export const createCarreras = async () => {
  const carreraFound = await Carrera.findOne({
    where: { abreviatura: "Ing. de Software" },
  });

  if (!carreraFound) {
    try {
      const carreras = [
        {
          nombre: "Ingenieria de Software y Sistemas Computacionales",
          abreviatura: "Ing. de Software",
        },
        {
          nombre: "Ingenieria Electr??nica y de Telecomunicaciones",
          abreviatura: "Ing. Electr??nica",
        },
        {
          nombre: "Licenciatura en Negocios Internacionales",
          abreviatura: "Negocios Internacionales",
        },
        { nombre: "Licenciatura en Nutrici??n", abreviatura: "Nutrici??n" },
        { nombre: "Licenciatura en Fisioterapia", abreviatura: "Fisioterapia" },
        { nombre: "Licenciatura en Enfermer??a", abreviatura: "Enfermer??a" },
        { nombre: "Ingenier??a Civil", abreviatura: "Ing. Civil" },
        { nombre: "Ingenier??a Industrial", abreviatura: "Ing. Industrial" },
        {
          nombre: "Licenciatura en Administraci??n Tur??stica",
          abreviatura: "Administraci??n Tur??stica",
        },
        { nombre: "Licenciatura en Gastronom??a", abreviatura: "Gastronom??a" },
        {
          nombre: "Licenciatura en Contadur??a P??blica y Finanzas",
          abreviatura: "Contadur??a P??blica y Finanzas",
        },
        {
          nombre: "Licenciatura en Ciencias del Deporte",
          abreviatura: "Ciencias del Deporte",
        },
        ,
        {
          nombre: "Licenciatura en Derecho",
          abreviatura: "Derecho",
        },
        { nombre: "Bachillerato", abreviatura: "Bachillerato" },
      ];

      carreras.forEach(async (carrera) => {
        await Carrera.save({
          nombre: carrera.nombre,
          abreviatura: carrera.abreviatura,
        });
      });
    } catch (error) {
      console.log("Error al crear las carreras.");
    }
  }
};

export const createCategorias = async () => {
  const categoriaFound = await Categoria.findOne({
    where: { nombre: "Tecnolog??a" },
  });

  if (!categoriaFound) {
    const categorias = [
      {
        nombre: "Desarrollo Personal",
        descripcion:
          "Desarrollar el potencial humano de acuerdo con el comportamiento de cada persona.",
      },
      {
        nombre: "Tecnolog??a",
        descripcion:
          "Todo lo relacionado a la tecnolog??a moderna y sus avances",
      },
      {
        nombre: "Espiritualidad",
        descripcion:
          "Pueden estar conectados a temas como religi??n, meditaci??n, terapias naturales y otros asuntos relacionados.",
      },
      {
        nombre: "Arte",
        descripcion:
          "Mejorar la imaginaci??n y creatividad humana para la expresi??n de emociones.",
      },
      {
        nombre: "Finanzas",
        descripcion:
          "Tener una idea m??s amplia de como de tener una relaci??n sana con el dinero.",
      },
      {
        nombre: "M??sica",
        descripcion:
          "Usar la m??sica como lenguaje universal y apreciarla de una manera incentivada",
      },
    ];
    try {
      categorias.forEach(async (categoria) => {
        await Categoria.save({
          nombre: categoria.nombre,
          descripcion: categoria.descripcion,
        });
      });
    } catch (error) {
      console.log("Error al crear las categorias");
    }
  }
};

export const createEspecialidades = async () => {
  const especialidadFound = await Especialidad.findOne({
    where: { nombre: "Traumatolog??a" },
  });

  if (!especialidadFound) {
    try {
      await Especialidad.save({
        nombre: "Psicolog??a",
        tipo: "Educativa",
      });
      await Especialidad.save({
        nombre: "Pediatr??a",
        tipo: "M??dica",
      });
    } catch (error) {
      console.log("Error al crear las especialidades");
    }
  }
};

export const createAdmin = async () => {
  const adminRol = await Rol.findOne({ where: { nombre: "ADMINISTRADOR" } });
  const adminFound = await Usuario.findOne({ where: { username: "S4A" } });
  const adminPassword = await argon2.hash("123");

  const asapPwdOne = await argon2.hash("alex");
  const asapPwdTwo = await argon2.hash("jafet");
  const asapPwdThree = await argon2.hash("daniel");

  if (!adminFound) {
    try {
      const S4APersona = await Persona.save({
        nombre: "Software4All",
        ape_paterno: "-",
        ape_materno: "-",
        fecha_nac: new Date(),
        sexo: "Masculino",
        telefono: "9514562431",
        correo: "software4all@gmail.com",
      });

      const S4AAdmin = await Usuario.save({
        username: "S4A",
        password: adminPassword,
        imagen: "s4aLogoBlack.jpeg",
        activo: true,
        rol_id: adminRol.id,
        persona_id: S4APersona.id,
      });

      const TPPersona = await Persona.save({
        nombre: "TriangleProgramming",
        ape_paterno: "-",
        ape_materno: "-",
        fecha_nac: new Date(),
        sexo: "Masculino",
        telefono: "9518523417",
        correo: "triangleprogramming@gmail.com",
      });

      const TPAdmin = await Usuario.save({
        username: "TP",
        password: adminPassword,
        imagen: "tpLogo.jpeg",
        activo: true,
        rol_id: adminRol.id,
        persona_id: TPPersona.id,
      });

      const asapPersonal = [
        {
          nombre: "Alex",
          ape_paterno: "Santiago",
          ape_materno: "Barrios",
          fecha_nac: "11-07-2001",
          sexo: "Masculino",
          telefono: "9511940435",
          correo: "alex@gmail.com",
          username: "alex07",
          password: asapPwdOne,
          imagen: "AlexImage.png",
        },
        {
          nombre: "Jafet Fernando",
          ape_paterno: "Ramos",
          ape_materno: "Ruiz",
          fecha_nac: "12-10-2001",
          sexo: "Masculino",
          telefono: "9510334175",
          correo: "jafet@gmail.com",
          username: "jafet10",
          password: asapPwdTwo,
          imagen: "JafetImage.png",
        },
        {
          nombre: "Daniel Antonio",
          ape_paterno: "Diaz",
          ape_materno: "Rojas",
          fecha_nac: "02-18-2001",
          sexo: "Masculino",
          telefono: "9515048667",
          correo: "daniel@gmail.com",
          username: "daniel18",
          password: asapPwdThree,
          imagen: "DanielImage.png",
        },
      ];

      asapPersonal.forEach(async (personal) => {
        const asapPersona = await Persona.save({
          nombre: personal.nombre,
          ape_paterno: personal.ape_paterno,
          ape_materno: personal.ape_materno,
          fecha_nac: new Date(personal.fecha_nac),
          sexo: personal.sexo,
          telefono: personal.telefono,
          correo: personal.correo,
        });

        const asapUsuario = await Usuario.save({
          username: personal.username,
          password: personal.password,
          imagen: personal.imagen,
          activo: true,
          rol_id: adminRol.id,
          persona_id: asapPersona.id,
        });
      });
    } catch (error) {
      console.log(error);
      console.log("Error al crear los administradores");
    }
  }
};

export const createUsuarios = async () => {
  const usuarioRol = await Rol.findOne({ where: { nombre: "USUARIO" } });
  const usuarioUno = await Usuario.findOne({
    where: { username: "felipe23" },
  });

  const usuarioPwdOne = await argon2.hash("felipe");
  const usuarioPwdTwo = await argon2.hash("octavio");
  const usuarioPwdThree = await argon2.hash("ricardo");
  const usuarioPwdFour = await argon2.hash("alejandra");

  if (!usuarioUno) {
    try {
      const usuarios = [
        {
          nombre: "Felipe de Jes??s",
          ape_paterno: "Soriano",
          ape_materno: "Silva",
          fecha_nac: "05-23-1999",
          sexo: "Masculino",
          telefono: "9512340942",
          correo: "felipe_sorsilv@gmail.com",
          username: "felipe23",
          password: usuarioPwdOne,
          imagen: "Usuario1.png",
        },
        {
          nombre: "Octavio Agustin",
          ape_paterno: "Celaya",
          ape_materno: "Ojeda",
          fecha_nac: "10-07-2001",
          sexo: "Masculino",
          telefono: "9512423410",
          correo: "octagod@gmail.com",
          username: "octavio10",
          password: usuarioPwdTwo,
          imagen: "Usuario2.png",
        },
        {
          nombre: "??ngel Ricardo",
          ape_paterno: "Ch??vez",
          ape_materno: "Velasco",
          fecha_nac: "05-25-2001",
          sexo: "Masculino",
          telefono: "9512200369",
          correo: "richard_parker@gmail.com",
          username: "ricardo25",
          password: usuarioPwdThree,
          imagen: "Usuario3.png",
        },
        {
          nombre: "Alejandra",
          ape_paterno: "Vadillo",
          ape_materno: "Ram??rez",
          fecha_nac: "09-29-2000",
          sexo: "Femenino",
          telefono: "9515006082",
          correo: "alejandra_vadillo@gmail.com",
          username: "alejandra29",
          password: usuarioPwdFour,
          imagen: "Usuario4.png",
        },
      ];

      usuarios.forEach(async (usuario) => {
        const usuarioPersona = await Persona.save({
          nombre: usuario.nombre,
          ape_paterno: usuario.ape_paterno,
          ape_materno: usuario.ape_materno,
          fecha_nac: new Date(usuario.fecha_nac),
          sexo: usuario.sexo,
          telefono: usuario.telefono,
          correo: usuario.correo,
        });

        const usuarioInsert = await Usuario.save({
          username: usuario.username,
          password: usuario.password,
          imagen: usuario.imagen,
          activo: true,
          rol_id: usuarioRol.id,
          persona_id: usuarioPersona.id,
        });
      });
    } catch (error) {
      console.error("Error al crear los usuarios");
    }
  }
};

export const createPacientes = async () => {
  const carreras = await Carrera.find();
  const pacienteRol = await Rol.findOne({ where: { nombre: "PACIENTE" } });
  const pacienteUno = await Usuario.findOne({
    where: { username: "Juanito10" },
  });

  const usuarioPwdOne = await argon2.hash("juan");
  const usuarioPwdTwo = await argon2.hash("jorge");
  const usuarioPwdThree = await argon2.hash("ricardo");
  const usuarioPwdFour = await argon2.hash("alejandra");
  const usuarioPwdFive = await argon2.hash("alejandra");
  const usuarioPwdSix = await argon2.hash("alejandra");

  if (!pacienteUno) {
    try {
      const usuarios = [
        {
          nombre: "Juan Manuel",
          ape_paterno: "Robles",
          ape_materno: "Estrada",
          fecha_nac: "09-15-2001",
          sexo: "Masculino",
          telefono: "9511306990",
          correo: "juan_estrada@gmail.com",
          username: "Juanito10",
          password: usuarioPwdOne,
          imagen: "Paciente1.png",
          matricula: "014403915",
          carrera_id: carreras.find(
            (carrera) => carrera.nombre === "Licenciatura en Derecho"
          ).id,
        },
        {
          nombre: "Carlos Alberto",
          ape_paterno: "Cruz",
          ape_materno: "Cruz",
          fecha_nac: "12-07-1999",
          sexo: "Masculino",
          telefono: "9511699088",
          correo: "carlobeto@gmail.com",
          username: "Carlos159",
          password: usuarioPwdTwo,
          imagen: "Paciente2.png",
          matricula: "014400392",
          carrera_id: carreras.find(
            (carrera) =>
              carrera.nombre === "Licenciatura en Negocios Internacionales"
          ).id,
        },
        {
          nombre: "Jorge Alfredo",
          ape_paterno: "Ch??vez",
          ape_materno: "Ortiz",
          fecha_nac: "04-12-2000",
          sexo: "Masculino",
          telefono: "9511489000",
          correo: "jorgeAlfredo@gmail.com",
          username: "JorgeVO",
          password: usuarioPwdThree,
          imagen: "Paciente3.png",
          matricula: "014421799",
          carrera_id: carreras.find(
            (carrera) =>
              carrera.nombre === "Licenciatura en Ciencias del Deporte"
          ).id,
        },
        {
          nombre: "Alondra",
          ape_paterno: "Ruiz",
          ape_materno: "P??rez",
          fecha_nac: "06-21-1998",
          sexo: "Femenino",
          telefono: "9515302586",
          correo: "alondra@gmail.com",
          username: "Alondra29",
          password: usuarioPwdFour,
          imagen: "Paciente4.png",
          matricula: "014403915",
          carrera_id: carreras.find(
            (carrera) => carrera.nombre === "Licenciatura en Gastronom??a"
          ).id,
        },

        {
          nombre: "Zaira Yamile",
          ape_paterno: "L??pez",
          ape_materno: "Hern??ndez",
          fecha_nac: "12-01-2000",
          sexo: "Femenino",
          telefono: "9512560931",
          correo: "zaira@gmail.com",
          username: "Zaira26",
          password: usuarioPwdFive,
          imagen: "Paciente5.png",
          matricula: "014421620",
          carrera_id: carreras.find(
            (carrera) =>
              carrera.nombre === "Licenciatura en Negocios Internacionales"
          ).id,
        },
        {
          nombre: "Armando",
          ape_paterno: "Alaya",
          ape_materno: "L??pez",
          fecha_nac: "02-25-2000",
          sexo: "Masculino",
          telefono: "9513506893",
          correo: "armando@gmail.com",
          username: "Armando80",
          password: usuarioPwdSix,
          imagen: "Paciente6.png",
          matricula: "014421736",
          carrera_id: carreras.find(
            (carrera) =>
              carrera.nombre === "Licenciatura en Contadur??a P??blica y Finanzas"
          ).id,
        },
      ];

      usuarios.forEach(async (usuario) => {
        const usuarioPersona = await Persona.save({
          nombre: usuario.nombre,
          ape_paterno: usuario.ape_paterno,
          ape_materno: usuario.ape_materno,
          fecha_nac: new Date(usuario.fecha_nac),
          sexo: usuario.sexo,
          telefono: usuario.telefono,
          correo: usuario.correo,
        });

        const usuarioInsert = await Usuario.save({
          username: usuario.username,
          password: usuario.password,
          imagen: usuario.imagen,
          activo: true,
          rol_id: pacienteRol.id,
          persona_id: usuarioPersona.id,
        });

        const pacienteInsert = await Paciente.save({
          carrera_id: usuario.carrera_id,
          matricula: usuario.matricula,
          usuario_id: usuarioInsert.id,
        });
      });
    } catch (error) {
      console.error("Error al crear los usuarios");
    }
  }
};

export const createEspecialistas = async () => {
  const especialidad = await Especialidad.findOne({
    where: { nombre: "Psicolog??a" },
  });
  const especialistaRol = await Rol.findOne({
    where: { nombre: "ESPECIALISTA" },
  });
  const especialistaUno = await Especialista.findOne({
    where: { usuario: { username: "Diego05" } },
  });

  const especialistaDos = await Especialista.findOne({
    where: { usuario: { username: "" } },
  });

  const hashedPassword = await argon2.hash("diego");
  const hashedPasswordTwo = await argon2.hash("salma");

  if (!especialistaUno) {
    try {
      const personaUnoInsert = await Persona.save({
        nombre: "Diego",
        ape_paterno: "Escudero",
        ape_materno: "S??nchez",
        fecha_nac: new Date("07-13-2001"),
        sexo: "Masculino",
        telefono: "9511693228",
        correo: "diego05@gmail.com",
      });

      const usuarioUnoInsert = await Usuario.save({
        username: "Diego05",
        password: hashedPassword,
        imagen: "Especialista1.png",
        activo: true,
        rol_id: especialistaRol.id,
        persona_id: personaUnoInsert.id,
      });

      const domicilioUnoInsert = await Domicilio.save({
        calle: "BLVD M??dico Militar",
        colonia: "Mi Ranchito",
        estado: "Oaxaca",
        codigo_postal: "68200",
      });

      const especialistaUnoInsert = await Especialista.save({
        cedula_prof: "123456789",
        domicilio_id: domicilioUnoInsert.id,
        especialidad_id: especialidad.id,
        usuario_id: usuarioUnoInsert.id,
      });
    } catch (error) {
      console.error("Error al insertar especialista 1");
    }
  }

  if (!especialistaDos) {
    try {
      const personaDosInsert = await Persona.save({
        nombre: "Salma Daniela",
        ape_paterno: "S??nchez",
        ape_materno: "Flores",
        fecha_nac: new Date("03-01-2001"),
        sexo: "Femenino",
        telefono: "9515702802",
        correo: "salmaDaniela@gmail.com",
      });

      const usuarioDosInsert = await Usuario.save({
        username: "Salma07",
        password: hashedPasswordTwo,
        imagen: "Especialista2.png",
        activo: true,
        rol_id: especialistaRol.id,
        persona_id: personaDosInsert.id,
      });

      const domicilioDosInsert = await Domicilio.save({
        calle: "Av. Independencia",
        colonia: "Centro",
        estado: "Oaxaca",
        codigo_postal: "68000",
      });

      const especialistaDosInsert = await Especialista.save({
        cedula_prof: "123456789",
        domicilio_id: domicilioDosInsert.id,
        especialidad_id: especialidad.id,
        usuario_id: usuarioDosInsert.id,
      });
    } catch (error) {
      console.error("Error al insertar especialista 2");
    }
  }
};

export const createCursos = async () => {
  const categoria = await Categoria.findOne({
    where: { nombre: "Tecnolog??a" },
  });

  const cursoFound = await Curso.findOne({
    where: { titulo: "Bienvenid@ a ASAP" },
  });

  if (!cursoFound) {
    try {
      const cursoWelcome = await Curso.save({
        titulo: "Bienvenid@ a ASAP",
        descripcion:
          "En este curso te damos la bienvenida a ASAP, la mejor red para cuidar de la salud mental",
        objetivo: "Aprender??s a c??mo usar un curso",
        fecha_inicio: new Date("02-07-2001"),
        fecha_fin: new Date("02-11-2022"),
        duracion: 8,
        activo: true,
        imagen: "",
        categoria_id: categoria?.id || 1,
        palabras_clave: ["ASAP", "Bienvenida", "Curso", "Introducci??n"],
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
    } catch (error) {
      console.log(error);
      console.log("Error al crear el curso de bienvenida");
    }
  }
};

export const createNotas = async () => {
  const notaFound = await Nota.findOne({ where: { titulo: "Apoco si pa" } });
  const autorUno = await Usuario.findOne({ where: { username: "S4A" } });
  const autorDos = await Usuario.findOne({ where: { username: "TP" } });
  if (!notaFound) {
    try {
      const notaUnoInsert = await Nota.save({
        titulo: "Bienvenid@ a ASAP",
        contenido:
          "<p><strong>En este espacio podr??s compartir tus pensamientos, todas las notas pasan por un proceso de revisi??n por lo que no se publicar??n directamente</strong></p><p><em><strong>Esperamos que lo disfrutes</strong></em></p><p><em><strong>Atte. El equipo de desarrollo ASAP</strong></em></p>",
        imagen: "",
        estado: "Aceptado",
        tema: "Instrucciones b??sicas",
        palabras_clave: ["Bienvenida", "Bienvenido", "ASAP"],
        usuario_id: autorUno.id,
      });

      const notaDosInsert = await Nota.save({
        titulo: "Bienvenid@ a todos",
        contenido:
          "<p><strong>Hola, ??C??mo est??n?</strong></p><p><em>Sean bienvenidos a la plataforma ASAP. En donde pueden visualizar variedad de cursos y cuidar la salud mental para todas esas personas que lo requieran.</em></p>",
        imagen: "",
        estado: "Aceptado",
        tema: "Nota de bienvenida",
        palabras_clave: ["Bienvenidos", "ASAFEPLACE", "ASAP", "Aplicacion"],
        usuario_id: autorDos.id,
      });
    } catch (error) {
      console.log("Error al crear las notas");
    }
  }
};
