import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IFodaEntry, DefaultFodaEntry } from "./IFodaEntry";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { ObjectId } from "mongodb";

export class FodaEntryDao extends MongoDAOBase<IFodaEntry> {
    private fodaDao: IDataAccessObject;
    constructor(conexion: IDBConnection, fodaDao: IDataAccessObject){
        super("fodaentry", conexion);
        this.fodaDao = fodaDao;
    }
  }