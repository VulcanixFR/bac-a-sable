import { genere_nom, Nom, importe_prenoms, importe_noms, Nom_vers_String } from './gen_nom';
import { date_naissance, Date_vers_String } from './date_naissance';
import { Objet_vers_MD } from './exporte_tableau';

let a = importe_noms("data/noms.txt");
let b = importe_prenoms("data/prenoms.txt")

const nb_de_gens = 300;
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

const out = Objet_vers_MD(gens, [ 'carte_nom', 'carte_naissance', 'naissance' ], [ "Nom", "Date de naissance" ])

console.log(out)