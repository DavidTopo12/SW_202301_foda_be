import express from 'express';
const router = express.Router();

import { IUser, Users } from '@libs/Usuarios/Usuarios';

const usuariosModel = new Users();

usuariosModel.adduser({
    codigo: '',
    correo: 'davidsalgado849@gmail.com',
    nombre: 'david',
    password: 'hola',

});

//ALL USUARIOS
router.get('/all', (_req, res) => {
    res.status(200).json(usuariosModel.getAllUsers());
});

router.get('/byid/:id', (req, res) => {
    const { id: codigo } = req.params;
    const usuarioss = usuariosModel.getUserbyId(codigo);
    if (usuarioss) {
        return res.status(200).json(usuarioss);
    }
    return res.status(404).json({ "error": "No se encontró el usuario" });
});


router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
        correo = "alejazela1294@gmail.com",
        nombre = "aleja",
        password = "1234"
    } = req.body;

    const newUsuario: IUser = {
        codigo: "",
        correo,
        nombre,
        password
    };
    if (usuariosModel.adduser(newUsuario)) {
        return res.status(200).json({ "created": true });
    }
    return res.status(404).json(
        { "error": "Error al agregar un usuario" }
    );
})

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const {
        correo = "zelaaleja1284@gmail.com",
        nombre = "zelaya",
        password = "3423423"
    } = req.body;

    const updateUserr: IUser = {
        codigo: id,
        correo,
        nombre,
        password
    };
    if (usuariosModel.updateUser(updateUserr)) {
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

router.delete('/del/:id', (req, res) => {
    const { id: codigo } = req.params;
    if (usuariosModel.deleteUser(codigo)) {
        return res.status(200).json({ "deleted": true });
    }
    return res.status(404).json({ "error": "no se pudo eliminar usuario" });
});
export default router;