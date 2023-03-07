//importamos la interface
import { IDBConnection } from "./IDBConnection";

//importamos el objeto que nos permitirá hacer la conexión(de la libreria mongodb)
import { MongoClient } from 'mongodb';

//Variables de ambiente, guardar solamente donde se hace el proceso
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://sw202301_userdavid:eltopoperro12@clusterdasz.3p1irla.mongodb.net/test';
const mongoDBName = process.env.MONGO_DB_NAME || 'sw202301';


//exportar una clase
export class MongoDBConn implements IDBConnection {
    static connection:MongoClient = null;
      private constructor(){}
    getConnection(): Promise<any> {
        throw new Error("Method not implemented.");
    }
      public static async getConnection(){
          if(!this.connection){
        this.connection = await MongoClient.connect(mongoURI);
          }
      return this.connection.db(mongoDBName);
      }
  }