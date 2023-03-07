import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEmpresa } from "./IEmpresas";

export class EmpresasDAO extends MongoDAOBase<IEmpresa>{
    constructor(conexion:IDBConnection){
        super("empresas", conexion);               
    }
}