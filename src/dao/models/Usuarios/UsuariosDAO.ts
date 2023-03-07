import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IUsuarios } from "./IUsuarios";

export class UsuariosDAO extends MongoDAOBase<IUsuarios>{
    constructor(conexion:IDBConnection){
        super("usuarios",conexion);
    }
}