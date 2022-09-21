"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nom_vers_String = exports.importe_noms = exports.importe_prenoms = exports.genere_nom = void 0;
const fs_1 = __importDefault(require("fs"));
function genere_nom(liste_prenoms, liste_noms) {
    const rnd_pIndex = ~~(Math.random() * liste_prenoms.length), rnd_nIndex = ~~(Math.random() * liste_noms.length);
    return {
        nom: liste_noms[rnd_nIndex],
        prenom: liste_prenoms[rnd_pIndex].p,
        genre: liste_prenoms[rnd_pIndex].g
    };
}
exports.genere_nom = genere_nom;
/* Fonction d'importation de prénoms
 * Ouvre le fichier indiqué et retourne
 * une liste des prénoms et leur genre. */
function importe_prenoms(path) {
    let data = fs_1.default.readFileSync(path, 'utf-8');
    return data.split('\n')
        .filter((e) => e.match(';'))
        .map((e) => {
        let t = e.split(';');
        return { p: t[0], g: G(t[1]) };
    });
}
exports.importe_prenoms = importe_prenoms;
/* Fonction d'importation de noms
 * Ouvre le fichier indiqué et retourne
 * une liste de noms. */
function importe_noms(path) {
    let data = fs_1.default.readFileSync(path, 'utf-8');
    return data.split('\n');
}
exports.importe_noms = importe_noms;
/* Fonction de transfert string -> H | F | M */
function G(s) {
    switch (s) {
        case 'H':
            return 'H';
        case 'F':
            return 'F';
        default:
            return 'M';
    }
}
/* Fonction permettant de transformer un nom en affichage */
function Nom_vers_String(N) {
    return `${N.genre == "H" && '👨' || (N.genre == "F" && '👩') || '🚁'} ${N.nom.toUpperCase()} ${N.prenom}`;
}
exports.Nom_vers_String = Nom_vers_String;
