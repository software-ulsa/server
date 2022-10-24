import { Rol } from "./entities/Rol";
import { Usuario } from "./entities/Usuario";
import { Especialista } from "./entities/Especialista";
import { Actividad } from "./entities/Actividad";
import { Curso } from "./entities/Curso";
import { Nota } from "./entities/Nota";
import { Publicidad } from "./entities/Publicidad";
import { Codigo } from "./entities/Codigo";

import { _token } from "./constants";
import * as argon2 from "argon2";

const jwt = require("jsonwebtoken");

export const createUsuarios = async () => {
  const adminFound = await Usuario.findOne({
    where: { correo: "admin@gmail.com" },
  });

  const userFound = await Usuario.findOne({
    where: { correo: "pitudo@gmail.com" },
  });

  const hashedPassword = await argon2.hash("t3mpor4l");

  if (!adminFound) {
    const adminRol = await Rol.save({
      nombre: "Administrador",
      descripcion: "Superusuario con todos los permisos",
    });

    try {
      const adminInsert = await Usuario.save({
        foto_perfil: "74f5c624ad4056684b2e083c56b5c3b4",
        nombre: "Administrador",
        ape_paterno: "De Los",
        ape_materno: "Dioses",
        correo: "admin@gmail.com",
        password: hashedPassword,
        telefono: "9514268601",
        edad: 100,
        matricula: "014419799",
        sexo: "Masculino",
        activo: true,
        id_rol: adminRol.id,
      });
      if (adminInsert) {
        let payload = {
          id: adminInsert.id,
          correo: "admin@gmail.com",
        };
        jwt.sign(payload, _token);
        console.log("Administrador creado");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!userFound) {
    const userRol = await Rol.save({
      nombre: "Usuario",
      descripcion: "Permiso solo para consumir la informacion",
    });

    try {
      const userInsert = await Usuario.save({
        foto_perfil: "74f5c624ad4056684b2e083c56b5c3b4",
        nombre: "Carlos",
        segundo_nombre: "Daniel",
        ape_paterno: "Valdez",
        ape_materno: "Martinez",
        correo: "pitudo@gmail.com",
        password: hashedPassword,
        telefono: "9514268601",
        edad: 100,
        matricula: "014419799",
        sexo: "Masculino",
        activo: true,
        id_rol: userRol.id,
      });

      if (userInsert) {
        let payload = {
          id: userInsert.id,
          correo: "pitudo@gmail.com",
        };
        jwt.sign(payload, _token);
        console.log("Usuario de prueba creado");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const createEspecialistas = async () => {
  const especialistaUno = await Especialista.findOne({
    where: { correo: "specOne@gmail.com" },
  });

  const especialistaDos = await Especialista.findOne({
    where: { correo: "specTwo@gmail.com" },
  });
  if (!especialistaUno) {
    try {
      const especialistaUnoInsert = await Especialista.save({
        nombre: "Juan",
        segundo_nombre: "Antonio",
        ape_paterno: "Perez",
        ape_materno: "Rodriguez",
        edad: 35,
        sexo: "Masculino",
        foto_especialista: "0c964b47b4c845fb697de37375ad51aa",
        especialidad: "Traumatologia",
        cedula: "123456789",
        area_especialidad: "Fisioterapia",
        telefono: "9514562431",
        telefono_casa: "5184692",
        correo: "specOne@gmail.com",
      });

      if (especialistaUnoInsert) console.log("Especialista 1 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }

  if (!especialistaDos) {
    try {
      const especialistaDosInsert = await Especialista.save({
        nombre: "Wanda",
        segundo_nombre: "Kimberly",
        ape_paterno: "Bolaños",
        ape_materno: "Hernandez",
        edad: 38,
        sexo: "Femenino",
        foto_especialista: "023c6c21d8db61412ba261c7fb8719c1",
        especialidad: "Traumatologia",
        cedula: "123456789",
        area_especialidad: "Fisioterapia",
        telefono: "9514562431",
        telefono_casa: "5184692",
        correo: "specTwo@gmail.com",
      });

      if (especialistaDosInsert) console.log("Especialista 2 de prueba creado");
    } catch (error) {
      console.error(error);
    }
  }
};

export const createCursos = async () => {
  try {
    const cursoUno = await Curso.save({
      titulo: "Curso para estrés",
      descripcion: "Maneja tu estrés de forma pro",
      icono: "06cae4e49120f43782a6fd4e418cd411",
    });

    if (cursoUno) {
      const actividadUnoCU = await Actividad.save({
        titulo: "Lee esto",
        descripcion: "Lee esta cosa que esta aca",
        peso: 50,
        url_media: "https://i.ebayimg.com/images/g/23cAAOSwLGpgUV--/s-l500.jpg",
        id_curso: cursoUno.id,
      });

      const actividadDosCU = await Actividad.save({
        titulo: "Lee esto",
        descripcion: "Lee esta cosa que esta aca",
        peso: 50,
        url_media:
          "https://supercandy.com.mx/wp-content/uploads/2021/08/sutodo-de-dulces-negocios.jpg",
        id_curso: cursoUno.id,
      });

      if (actividadUnoCU && actividadDosCU) {
        console.log("Curso 1 de prueba agregado.");
      }
    }

    const cursoDos = await Curso.save({
      titulo: "Curso para manejar",
      descripcion: "Aprende a manejar como el grandioso Checo Pérez",
      icono: "08260aa31ff09a543dc25853fc2d867d",
    });

    if (cursoDos) {
      const actividadUnoCD = await Actividad.save({
        titulo: "Lee esto",
        descripcion: "Lee esta cosa que esta aca",
        url_media:
          "https://img.europapress.es/fotoweb/fotonoticia_20160513064334_1200.jpg",
        peso: 50,
        id_curso: cursoUno.id,
      });

      const actividadDosCD = await Actividad.save({
        titulo: "Lee esto",
        descripcion: "Lee esta cosa que esta aca",
        url_media:
          "https://img.huffingtonpost.com/asset/5c8a5b86260000e104fe4041.jpeg?ops=1778_1000",
        peso: 50,
        id_curso: cursoUno.id,
      });

      if (actividadUnoCD && actividadDosCD) {
        console.log("Curso 2 de prueba agregado.");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const createNotas = async () => {
  try {
    const notaUno = await Nota.save({
      titulo: "Nota 1",
      tema: "Nota roja",
      foto_thumbnail:
        "https://dam.cocinafacil.com.mx/wp-content/uploads/2021/10/borrachitos.jpg",
      foto_principal:
        "https://d1zc67o3u1epb0.cloudfront.net/media/catalog/product/cache/23527bda4807566b561286b47d9060f4/1/2/12611_1.jpg",
      contenido: "Mataron al duvalin de fresa",
      palabras_clave: ["Tag 1", "Tag 2"],
    });

    if (notaUno) {
      console.log("Nota 1 de prueba insertada");
    }

    const notaDos = await Nota.save({
      titulo: "Nota 2",
      tema: "Nota roja",
      foto_thumbnail:
        "https://dulcesymasgt.com/wp-content/uploads/2020/04/FRUTITAS.jpeg",
      foto_principal: "https://m.media-amazon.com/images/I/710pp-IJBuL.jpg",
      contenido: "Mataron al duvalin de fresa",
      palabras_clave: ["Tag 1", "Tag 2"],
    });

    if (notaDos) {
      console.log("Nota 2 de prueba insertada");
    }
  } catch (error) {
    console.error(error);
  }
};

export const createPublicidad = async () => {
  try {
    const publicidadUno = await Publicidad.save({
      nombre: "Coca-Cola",
      dot_empresa: "Coca-Cola",
      descripcion: "Anuncio de Coca-Cola para navidad",
      email: "anuncio@coca-cola.com.mx",
      url: "https://www.coca-cola.com.mx/content/dam/one/mx/es/promociones/Home_600x750-header-banner-mobile01.jpg",
      fecha_inicio: new Date(),
      fecha_vencimiento: new Date(),
    });

    const publicidadDos = await Publicidad.save({
      nombre: "Pepsi",
      dot_empresa: "Pepsi",
      descripcion: "Anuncio de Pepsi para navidad",
      email: "anuncio@pepsi.com.mx",
      url: "https://diariolibre.blob.core.windows.net.optimalcdn.com/images/binrepository/shutterstock-1481415659_17053662_20210817230135.jpg",
      fecha_inicio: new Date(),
      fecha_vencimiento: new Date(),
    });

    if (publicidadUno) {
      console.log("Publicidad 1 de prueba insertada");
    }

    if (publicidadDos) {
      console.log("Publicidad 2 de prueba insertada");
    }
  } catch (error) {
    console.error(error);
  }
};
