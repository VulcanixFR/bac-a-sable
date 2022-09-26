import { genere_nom, importe_prenoms, importe_noms, Nom_vers_String } from './gen_nom';
import { date_naissance, Date_vers_String } from './date_naissance';
import { Objet_vers_MD } from './exporte_tableau';
import { Utilisateur } from './objets/Utilisateur';
import { Utilisateur_Vers_vCard } from './db/vCard/vCardConvert';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

let a = importe_noms("data/noms.txt");
let b = importe_prenoms("data/prenoms.txt")

const nb_de_gens = 10;
const gens = Array.apply(null, Array(nb_de_gens))
                  .map((x, i) => { 
                      let personne = genere_nom(b, a);
                      let date = date_naissance();
                      
                      let usr: Utilisateur = {
                        avatar: 0,
                        avatars: [ `https://vulcanix.ghosthub.fr/sandbox/src/img/${
                            personne.genre == "H" && 'extension.svg' 
                            || (personne.genre == "F" && 'folder.svg' ) 
                            || 'text-x-php.svg'
                        }` ],
                        email: 0,
                        emails: [ `${personne.prenom}.${personne.nom}@${["truc.fr", "bidule.com", "mail.io", "bruh.tk"][i%4]}` ],
                        groupes: [],
                        mdp: "1234",
                        naissance: { date },
                        nom: personne,
                        roles: [],
                        telephone: [],
                        uuid: i.toString()
                      }

                      return usr;
                  });

gens[4].pseudonyme = "Popol";
gens[4].telephone.push({nom: "Maison", numero: "0102030405"});

if (!existsSync('databases/vCard')) mkdirSync("databases/vCard", { recursive: true });

for (let g in gens) {
    let vCard = Utilisateur_Vers_vCard(gens[g]);
    console.log(`${g}.vCard <- ${Nom_vers_String(gens[g].nom)}`);
    writeFileSync(`databases/vCard/${g}.vcf`, vCard, 'utf-8');
}

// const out = Objet_vers_MD(gens, [ 'carte_nom', 'carte_naissance', 'naissance' ], [ "Nom", "Date de naissance" ])

// console.log(out)