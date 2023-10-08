import { OpcionEnum } from "./enum/OpcionEnum.js";
import { guardarDb, leerDb } from "./helpers/db.js";
import { menuInquirer, pausa, leerEntrada, obtenerTareasParaBorrar, confirmar, obtenerTareasConChecklist } from "./helpers/inquirer.js";
import Tarea from "./models/tarea.js";
import Tareas from "./models/tareas.js";


const main = async() => {

    let opcion: OpcionEnum;
    const tareas: Tareas = new Tareas();

    const tareasDb: Tarea[] | null = leerDb();
    if (tareasDb) {
        tareas.cargarTareasDesdeArray(tareasDb);
    }

    do {
        opcion = await menuInquirer();

        switch (opcion) {
            case OpcionEnum.CREAR_TAREA:
                const descripcion = await leerEntrada("Descripción:");
                tareas.crearTarea(descripcion);
                break;
            case OpcionEnum.LISTAR_TAREAS:
                tareas.imprimirTodasLasTareas();
                break;
            case OpcionEnum.LISTAR_TAREAS_COMPLETADAS:
                tareas.imprimirTareasPorEstado(true);
                break;
            case OpcionEnum.LISTAR_TAREAS_PENDIENTES:
                tareas.imprimirTareasPorEstado(false);
                break;
            case OpcionEnum.COMPLETAR_TAREA:
                const ids = await obtenerTareasConChecklist(tareas.getTodasLasTareas);
                tareas.cambiarEstadoDeTareas(ids);
                break;
            case OpcionEnum.BORRAR_TAREA:
                const id: string = await obtenerTareasParaBorrar(tareas.getTodasLasTareas);
                if (id !== "0") {
                    const ok: boolean = await confirmar("¿Está seguro de que desea borrarlo?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada correctamente");
                    }
                }
                break;
        }

        guardarDb(tareas.getTodasLasTareas);

        await pausa();
    } while (opcion !== OpcionEnum.SALIR);
}

main();
