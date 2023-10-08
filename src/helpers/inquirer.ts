import inquirer, { Answers } from "inquirer";
import { QuestionCollection } from "inquirer";
import colors from "colors/safe.js";
import Tarea from "../models/tarea";


const preguntas: QuestionCollection<Answers> = [
    {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: "1",
                name: `${colors.green("1.")} Crear tarea`
            },
            {
                value: "2",
                name: `${colors.green("2.")} Listar tareas`
            },
            {
                value: "3",
                name: `${colors.green("3.")} Listar tareas completadas`
            },
            {
                value: "4",
                name: `${colors.green("4.")} Listar pendientes`
            },
            {
                value: "5",
                name: `${colors.green("5.")} Completar tarea(s)`
            },
            {
                value: "6",
                name: `${colors.green("6.")} Borrar tarea`
            },
            {
                value: "0",
                name: `${colors.green("0.")} Salir`
            },
        ]
    }
];

export const menuInquirer = async(): Promise<string> => {
    console.clear();
    console.log(colors.green("==========================="));
    console.log(colors.white("   Seleccione una opción   "));
    console.log(colors.green("===========================\n"));

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

export const pausa = async() => {

    const pregunta: QuestionCollection<Answers> = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${colors.green("enter")} para continuar`
        }
    ]

    console.log("\n");
    await inquirer.prompt(pregunta);
}

export const leerEntrada = async(mensaje: string) => {
    const pregunta: QuestionCollection<Answers> = [
        {
            type: "input",
            name: "descripcion",
            message: mensaje,
            validate: (input: string) => {
                if (input.length === 0) {
                    return "Por favor ingrese un valor"
                }
                return true;
            }
        }
    ];

    const { descripcion } = await inquirer.prompt(pregunta);

    return descripcion;
}

export const listarTareasParaBorrar = async(tareas: Array<Tarea>): Promise<string> => {
    const elecciones: Array<Answers> = tareas.map((tarea, index) => {
        const idx = colors.green(`${index + 1}`);
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    });

    elecciones.unshift({
        value: "0",
        name: `${colors.green("0.")} Cancelar`
    });

    const preguntas: QuestionCollection<Answers> = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices: elecciones
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

export const confirmar = async(mensaje: string) => {
    const pregunta: QuestionCollection<Answers> = [
        {
            type: "confirm",
            name: "ok",
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);

    return ok;
}

export const listarTareasConChecklist = async(tareas: Array<Tarea>) => {
    const elecciones: Array<Answers> = tareas.map((tarea, index) => {
        const idx = colors.green(`${index + 1}`);
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (!!tarea.completadoEn) ? true: false
        }
    });

    const pregunta: QuestionCollection<Answers> = [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices: elecciones
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}
