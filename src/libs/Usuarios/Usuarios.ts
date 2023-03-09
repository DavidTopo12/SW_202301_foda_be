import { IDataAccessObject } from "@dao/IDataAccessObject";
import { Security } from "@utils/Security";
import { UsuariosDAO } from "@server/dao/models/Usuarios/UsuariosDAO";

export class Usuarios {
    private dao: UsuariosDAO;
    constructor(dao: IDataAccessObject) {
        this.dao = dao as UsuariosDAO;
    }
    
    getAllUsers() {
        return this.dao.findAll();
    }
    
    getUserbyId(codigo: string) {
        return this.dao.findByID(codigo);
    }

    public async newUser(email: string, password: string) {
        try {
            const newUser = {
                email,
                password: Security.encodePassword(password),
                pswdExpires: new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000))
            };
            const result = await this.dao.create(newUser);
            const rt = await this.dao.findOneByFilter({ _id: result?.insertedId });
            delete rt.password;
            return rt;
        } catch (ex) {
            console.error('newFoda error:', ex);
            return null;
        }
    }

    deleteUser(codigo: string) {
        return this.dao.delete(codigo);
    }

    /* public async newUser(email: string, password: string) {
    try {
      const newUser = {
        email,
        password: Security.encodePassword(password),
        pswdExpires: new Date(new Date().getTime()+(3 * 30 * 24 * 60 * 60 * 1000))
      };
      const result = await this.userDao.create(newUser);
      const rt = await this.userDao.findOneByFilter({ _id: result?.insertedId });
      delete rt.password;
      return rt;
    } catch (ex) {
      console.error('newFoda error:', ex);
      return null;
    }
  }*/
}