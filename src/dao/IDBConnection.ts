export interface IDBConnection{
    getConnection() : Promise<any>
}

/*de esta forma, cualquier instancia o conexion que enviemos 
a un modelo de datos, va a tener la misma estructura*/

//interface es para decirle que todo lo que implemente IDBConnection va a tener el metodo GETCONNECTION()