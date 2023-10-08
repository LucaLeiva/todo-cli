
import { v4 as uuidv4 } from "uuid";


export default class Tarea {
    id: string;
    descripcion: string;
    completadoEn?: string | null;

    constructor(descripcion: string) {
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadoEn = null;
    }
}
