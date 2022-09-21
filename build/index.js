"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gen_nom_1 = require("./gen_nom");
const date_naissance_1 = require("./date_naissance");
let a = (0, gen_nom_1.importe_noms)("data/noms.txt");
let b = (0, gen_nom_1.importe_prenoms)("data/prenoms.txt");
/* for (let i = 0; i < 30; i++) {
    let n = Nom_vers_String(genere_nom(b, a));
    let d = Date_vers_String(date_naissance());

    console.log("> " + n + " - né le " + d);
} */
const nb_de_gens = 30;
const gens = Array.apply(null, Array(nb_de_gens))
    .map((x, i) => {
    let personne = (0, gen_nom_1.genere_nom)(b, a);
    let date = (0, date_naissance_1.date_naissance)();
    return {
        personne,
        naissance: date,
        carte_nom: (0, gen_nom_1.Nom_vers_String)(personne),
        carte_naissance: (0, date_naissance_1.Date_vers_String)(date)
    };
});
// Longueur maximale d'un patronyme
const maxlen = gens.map(e => e.carte_nom.length).sort((a, b) => b - a)[0];
gens.forEach(g => {
    console.log(`> ${g.carte_nom}${" ".repeat(maxlen - g.carte_nom.length)} - ${g.carte_naissance}`);
});
