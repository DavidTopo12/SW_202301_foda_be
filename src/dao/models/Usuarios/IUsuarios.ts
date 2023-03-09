import { ObjectId } from "mongodb"
import { IAuditable } from "../IAuditable"

export enum EUsuarioState {
    "ACT" = "ACTIVO",
    "INA" = "INACTIVO",
    "BLOQ" = "BLOQUEADO"
}
export interface IUsuarios extends IAuditable {
    _id?: string | ObjectId,
    correo: string,
    nombre: string,
    password: string
    state: EUsuarioState,
    roles: string[],
    pswdExpires: Date;
    lastLogin?: Date;
    avatar?: string;

}

export const DefaultUser: IUsuarios = {
    correo: "",
    nombre: "",
    password: "",
    state: EUsuarioState.ACT,
    roles: ["public"],
    createdAt: new Date(),
    updatedAt: new Date(),
    pswdExpires: new Date()

}