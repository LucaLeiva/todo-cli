import colors from "colors/safe.js";
import * as readline from "readline";


export const mostrarMenu = (): Promise<string> => {

    return new Promise((resolve) => {
        console.clear();
        console.log(colors.green("==========================="));
        console.log(colors.green("   Seleccione una opción   "));
        console.log(colors.green("===========================\n"));

        console.log(`${colors.green("1.")} Crear tarea`);
        console.log(`${colors.green("2.")} Listar tareas`);
        console.log(`${colors.green("3.")} Listar tareas completadas`);
        console.log(`${colors.green("4.")} Listar tareas pendientes`);
        console.log(`${colors.green("5.")} Completar tarea(s)`);
        console.log(`${colors.green("6.")} Borrar tarea`);
        console.log(`${colors.green("0.")} Salir\n`);

        const leerLinea = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        leerLinea.question('Seleccione una opción: ', (respuesta) => {
            leerLinea.close();

            resolve(respuesta);
        });
    })
}

export const pausa = () => {

    return new Promise(resolve => {
        const leerLinea = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        leerLinea.question(`\nPresione ${colors.green("ENTER")} para continuar\n`, (respuesta) => {
            leerLinea.close();

            resolve(respuesta);
        });
    });
}
