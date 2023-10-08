import { guardarDb, leerDb } from "./helpers/db.js";
import { menuInquirer, pausa, leerEntrada, listarTareasParaBorrar, confirmar, listarTareasConChecklist } from "./helpers/inquirer.js";
import Tarea from "./models/tarea.js";
import Tareas from "./models/tareas.js";


const main = async() => {

    let opcion: string = "";
    const tareas: Tareas = new Tareas();

    const tareasDb: Array<Tarea> | null = leerDb();
    if (tareasDb) {
        tareas.cargarTareasDesdeArray(tareasDb);
    }

    do {
        opcion = await menuInquirer();
        
        switch (opcion) {
            case "1":
                const descripcion = await leerEntrada("Descripción:");
                tareas.crearTarea(descripcion);
                break;
            case "2":
                tareas.imprimirTodasLasTareas();
                break;
            case "3":
                tareas.imprimirTareasPorEstado(true);
                break;
            case "4":
                tareas.imprimirTareasPorEstado(false);
                break;
            case "5":
                const ids = await listarTareasConChecklist(tareas.getTodasLasTareas);
                tareas.cambiarEstadoDeTareas(ids);
                break;
            case "6":
                const id: string = await listarTareasParaBorrar(tareas.getTodasLasTareas);
                if (id !== "0") {
                    const ok: boolean = await confirmar("¿Está seguro de que desea borrarlo?");
                    if (ok) {
                        tareas.deleteTarea(id);
                        console.log("Tarea borrada correctamente");
                    }
                }
                break;
        }

        guardarDb(tareas.getTodasLasTareas);

        await pausa();
    } while (opcion !== "0");
}

main();
