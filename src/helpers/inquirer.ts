import inquirer, { Answers } from "inquirer";
import { QuestionCollection } from "inquirer";
import colors from "colors/safe.js";
import Tarea from "../models/tarea";
import { OpcionEnum } from "../enum/OpcionEnum.js";


const preguntas: QuestionCollection<Answers> = [
    {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: OpcionEnum.CREAR_TAREA,
                name: `${colors.green("1.")} Crear tarea`
            },
            {
                value: OpcionEnum.LISTAR_TAREAS,
                name: `${colors.green("2.")} Listar tareas`
            },
            {
                value: OpcionEnum.LISTAR_TAREAS_COMPLETADAS,
                name: `${colors.green("3.")} Listar tareas completadas`
            },
            {
                value: OpcionEnum.LISTAR_TAREAS_PENDIENTES,
                name: `${colors.green("4.")} Listar tareas pendientes`
            },
            {
                value: OpcionEnum.COMPLETAR_TAREA,
                name: `${colors.green("5.")} Completar tarea(s)`
            },
            {
                value: OpcionEnum.BORRAR_TAREA,
                name: `${colors.green("6.")} Borrar tarea`
            },
            {
                value: OpcionEnum.SALIR,
                name: `${colors.green("0.")} Salir`
            },
        ]
    }
];

export const menuInquirer = async(): Promise<OpcionEnum> => {
    console.clear();
    console.log(colors.green("==========================="));
    console.log(colors.white("   Seleccione una opción   "));
    console.log(colors.green("===========================\n"));

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

export const pausa = async(): Promise<void> => {

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

export const leerEntrada = async(mensaje: string): Promise<string> => {
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

export const obtenerTareasParaBorrar = async(tareas: Tarea[]): Promise<string> => {
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

export const confirmar = async(mensaje: string): Promise<boolean> => {
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

export const obtenerTareasConChecklist = async(tareas: Tarea[]): Promise<string[]> => {
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
