import { readFileSync, writeFileSync } from "fs";

type obj<T> = {[key: string]: T};
export type str_obj = obj<string>;
export type tab_str_obj = string[][];

export function exporte_csv (donnes: tab_str_obj, path: string) {
    const toWrite = donnes.map(e => e.join("; ")).join("\n");
    writeFileSync(path, toWrite, "utf-8")
}

export function importe_csv (path: string): tab_str_obj {
    const F = readFileSync(path, "utf-8");
    return F.split('\n').map(l => l.split('; '));
}

export function auto_convert_obj (data: str_obj[]): tab_str_obj {

    if (!data.length) return [];
    
    const keys = Object.keys(data[0]);

    let out = [ keys ];
    for (let o of data) {
        out.push(keys.map(i => o[i]));
    }

    return out;

}

export function auto_convert_tab (data: tab_str_obj): str_obj[] {

    if (data.length < 2) return [];

    const keys = <string[]>data.shift();
    const out = data.map(e => {
        let o: str_obj = {};
        for (let i in e) {
            o[<string>keys[i]] = e[i];
        }
        return o;
    });

    return out;

}