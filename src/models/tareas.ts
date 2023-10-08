import Tarea from "./tarea.js";
import colors from "colors/safe.js";


// mi listado de tareas tendra como clave un UUID, pero
// su contenido es del tipo tarea
interface IListado {
    [key: string]: Tarea;
}


export default class Tareas {
    listado: IListado;

    constructor() {
        this.listado = {};
    }

    public get getTodasLasTareas(): Array<Tarea> {
        const todasLasTareas: Array<Tarea> = [];

        Object.keys(this.listado)
            .forEach(key => {
                todasLasTareas.push(this.listado[key])
            });

        return todasLasTareas;
    }

    public cargarTareasDesdeArray(tareas: Array<Tarea>) {
        tareas.forEach(tarea => {
            this.listado[tarea.id] = tarea;
        })
    }

    public crearTarea(descripcion: string) {
        const tarea = new Tarea(descripcion);
        this.listado[tarea.id] = tarea;
    }

    public imprimirTodasLasTareas() {
        this.getTodasLasTareas.forEach((tarea, index) => {
            console.log("\n");

            const idx = colors.green(`${index + 1}.`);
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn)
                                    ? colors.green("Completada")
                                    : colors.red("Pendiente");

            console.log(`${idx} ${descripcion} :: ${estado}`);
        });
    }

    public imprimirTareasPorEstado(completadas: boolean) {
        console.log("\n");

        this.getTodasLasTareas
            .filter(tarea => !!tarea.completadoEn == completadas)
            .forEach((tarea, index) => {
                const idx = colors.green(`${index + 1}.`);
                const { descripcion, completadoEn } = tarea;
                const estado = (completadoEn) ? colors.green(completadoEn)
                                        : colors.red("Pendiente");

                console.log(`${idx} ${descripcion} :: ${estado}`);
            })
    }

    public deleteTarea(id: string) {
        if (this.listado[id]) {
            delete this.listado[id];
        }
    }

    public cambiarEstadoDeTareas(ids: Array<string>) {
        ids.forEach(id => {
            const tarea = this.listado[id];
            if (!!!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.getTodasLasTareas.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this.listado[tarea.id].completadoEn = null;
            }
        });
    }
}
