import fs from "fs";
import Tarea from "../models/tarea";


const path = "./build/db/data.json";

export const guardarDb = (data: any) => {
    fs.writeFileSync(path, JSON.stringify(data), { flag: "w" });
}

export const leerDb = (): Array<Tarea> | null => {
    if (!fs.existsSync(path)) {
        return null;
    }

    const info = fs.readFileSync(path, { encoding: "utf-8" });

    return JSON.parse(info);
}
