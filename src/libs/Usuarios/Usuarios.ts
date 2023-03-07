import { IUsuarios } from "@dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Usuarios {
    //private usuarios: IUsuarios[];
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
        //this.usuarios = [];

    }
    getAllUsers() {
        return this.dao.findAll();
    }
    getUserbyId(codigo: string) {
        return this.dao.findByID(codigo);
    }
    adduser(newUser: IUsuarios) {
        const date = new Date();
        const newOne: IUsuarios = {
            ...newUser,
            created: date,
            lastSession: date
        }
        return this.dao.create(newOne);
    }

    updateUser(codigo: string, updateUsers: IUsuarios) {
        const updateObject = { ...updateUsers, updated: new Date() };
        return this.dao.update(codigo, updateObject);
    }

    deleteUser(codigo: string) {
        return this.dao.delete(codigo);
    }

}