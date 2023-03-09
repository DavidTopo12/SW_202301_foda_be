import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IUsuarios,DefaultUser } from "./IUsuarios";

export class UsuariosDAO extends MongoDAOBase<IUsuarios>{
    constructor(conexion:IDBConnection){
        super("usuarios",conexion);
    }
    public async create( user: Partial<IUsuarios>){
        const newUser = {...DefaultUser, ...user};
        return super.create(newUser);
      }
}