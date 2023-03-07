//definir las funciones comunes, se normaliza a traves de aca..ayuda para prueba moc(no existe)
export interface IDataAccessObject {
    findAll: Function;
    findByID: Function;
    create: Function;
    update: Function;
    delete: Function;
    findByFilter: Function;
    findOneByFilter: Function;
    aggregate: Function;
    getConnection: Function;
    rawUpdate: Function;
  }