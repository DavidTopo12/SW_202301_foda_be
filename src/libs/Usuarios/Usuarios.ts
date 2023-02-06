export interface IUser {
    codigo: string,
    correo: string,
    nombre: string,
    password: string,
    roles?: string,
    created?: Date,
    lastSession?: Date
}

export class Users {
    private usuarios: IUser[];
    constructor() {
        this.usuarios = [];
    }
    getAllUsers() {
        return this.usuarios;
    }
    getUserbyId(codigo: string) {
        const userToReturn = this.usuarios.find((us) => {
            return us.codigo === codigo;
        });
        return userToReturn;
    }
    adduser(newUser: IUser){
        const date = new Date();
        const newOne: IUser = {
            ...newUser,
            codigo: (Math.random()*1000).toString() + new Date().getTime().toString(),
            roles: 'Usuario',
            created: date,
            lastSession: date
        }
        this.usuarios.push(newOne);
        return true;
    }

    updateUser(updateUsers: IUser){
        let updatedUser = false;
        const newUsuario: IUser[] = this.usuarios.map((us) =>{
            if(us.codigo == updateUsers.codigo){
                updatedUser =true;
                return {...us, ...updateUsers, updatedUser: new Date()};
            }
            return us;
        });
        this.usuarios = newUsuario;
        return updatedUser;
    }

    deleteUser(codigo : string){
        const UserToDelete = this.usuarios.find((us)=>{
            return us.codigo === codigo;
        });
        if(UserToDelete){
            const NewUsuarios: IUser[] = this.usuarios.filter((us)=>{
                return us.codigo !== codigo;
            });
            this.usuarios = NewUsuarios;
            return true;
        }
        return false;
    }

}