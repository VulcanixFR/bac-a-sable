import { genere_nom, Nom, importe_prenoms, importe_noms, Nom_vers_String } from './gen_nom';
import { date_naissance, Date_vers_String } from './date_naissance';

let a = importe_noms("data/noms.txt");
let b = importe_prenoms("data/prenoms.txt")

const nb_de_gens = 30;
const gens = Array.apply(null, Array(nb_de_gens))
                  .map((x, i) => { 
                      let personne = genere_nom(b, a);
                      let date = date_naissance();
                      return {
                          personne,
                          naissance: date,
                          carte_nom: Nom_vers_String(personne),
                          carte_naissance: Date_vers_String(date)
                      } 
                  });

// Longueur maximale d'un patronyme
const maxlen  = gens.map(e => e.carte_nom.length).sort((a, b) => b - a)[0],
      maxlen2 = gens.map(e => e.carte_naissance.length).sort((a, b) => b - a)[0];

console.log(`Nom${" ".repeat(maxlen-3)} | Date de naissance`);
console.log(`${'-'.repeat(maxlen)}-|-${'-'.repeat(maxlen2)}`);

gens.forEach(g => {
    console.log(`${g.carte_nom}${" ".repeat(maxlen - g.carte_nom.length)} | ${g.carte_naissance}`);
});
