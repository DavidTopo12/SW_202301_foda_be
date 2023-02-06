//nos permite definir que tipo de datos nos va a permitir ese objeto 
export interface IEmpresa {
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;

}


export class Empresas {
    private empresas: IEmpresa[];
    constructor() {
        this.empresas = [];
    }
    getAll() {
        return this.empresas;
    }

    getbyID(codigo: string) {
        const empresaToReturn = this.empresas.find((emp) => {
            return emp.codigo === codigo;
        });
        return empresaToReturn;
    }

    add(nuevaEmpresa: IEmpresa) {
        const date = new Date();
        const nueva: IEmpresa = {
            ...nuevaEmpresa,
            codigo: (Math.random() * 1000).toString() + new Date().getTime().toString(),
            created: date,
            updated: date
        }
        this.empresas.push(nueva);
        return true;
    }

    update(updateEmpresa: IEmpresa) {
        let updated = false;
        const newEmpresas: IEmpresa[] = this.empresas.map((emp) => {
            if (emp.codigo == updateEmpresa.codigo) {
                updated = true;
                return { ...emp, ...updateEmpresa, updated: new Date() };
            }
            return emp;
        });
        this.empresas = newEmpresas;
        return updated;

    }

    delete(codigo: string) {
        const EmpresatoDelete = this.empresas.find((emp) => {
            return emp.codigo === codigo;
        });
        if (EmpresatoDelete) {
            const NewEmpresas: IEmpresa[] = this.empresas.filter((emp) => {
                return emp.codigo !== codigo;
            });
            this.empresas = NewEmpresas;
            return true;
        }
        return false;
    }
}