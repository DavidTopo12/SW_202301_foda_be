import express from 'express';
const router = express.Router();
import { IUsuarios } from '@dao/models/Usuarios/IUsuarios';
import { MongoDBConn } from '@dao/MongoDBConn';
import { UsuariosDAO } from '@dao/models/Usuarios/UsuariosDAO';
import { Usuarios } from '@libs/Usuarios/Usuarios';

const usuariosDao = new UsuariosDAO(MongoDBConn);
let usuariosModel:Usuarios;
usuariosDao.init().then(()=>{
    usuariosModel = new Usuarios(usuariosDao);
});

router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll": { "method": "get", "url": "usuarios/all" },
        "getById": { "method": "get", "url": "usuarios/byid/:id" },
        "new": { "method": "post", "url": "usuarios/new" },
        "update": { "method": "put", "url": "usuarios/upd/:id" },
        "delete": { "method": "delete", "url": "usuarios/del/:id" }
    };
    res.status(200).json(jsonUrls);
});

//ALL USUARIOS
router.get('/all', async(_req, res) => {
     res.status(200).json(await usuariosModel.getAllUsers());
});

//BUSCAR POR ID
router.get('/byid/:id',async (req, res) => {
    const { id: codigo } = req.params;
    const usuarioss = await usuariosModel.getUserbyId(codigo);
    if (usuarioss) {
        return res.status(200).json(usuarioss);
    }
    return res.status(404).json({ "error": "No se encontró el usuario" });
});

//NUEVO USUARIO
router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
        codigo='NA',
        nombre = "David",
        correo = "daviddsalgado849@gmail.com",
        password = "1234"
    } = req.body;

    const newUsuario: IUsuarios = {
        codigo,
        nombre,
        correo,
        password
    };
    if (usuariosModel.adduser(newUsuario)) {
        return res.status(200).json({ "created": true });
    }
    return res.status(404).json(
        { "error": "Error al agregar un usuario" }
    );
})

//ACTUALIZAR USUARIO
router.put('/upd/:id',async (req, res) => {
    const { id } = req.params;
    const {
        correo = "----NotReceived------",
        nombre = "----NotReceived------",
        password = "----NotReceived------",
        codigo=""
    } = req.body;

    const updateUserr: IUsuarios = {
        codigo,
        nombre,
        correo,
        password
    };
    if (await usuariosModel.updateUser(id, updateUserr)) {
        return res
            .status(200)
            .json({ "updated": true });
    }
    return res
        .status(404)
        .json(
            {
                "error": "Error al actualizar"
            }
        );
});

//ELIMINAR USUARIO
router.delete('/del/:id', async(req, res) => {
    const { id: codigo } = req.params;
    if (await usuariosModel.deleteUser(codigo)) {
        return res.status(200).json({ "deleted": true });
    }
    return res.status(404).json({ "error": "no se pudo eliminar usuario" });
});


export default router;