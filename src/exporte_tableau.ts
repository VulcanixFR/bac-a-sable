/** Décompose un objet en double tableau de string, renvoie aussi la largeux max de chaque colonne */
function decompOBJ (o: {[key: string]: any}[], keys: string[], nom_col: string[] = []): { corps: string[][], larg_col: number[] } {
    //On initialise la largeur max des colonnes au minimum de celle de ses titres
    const larg_col: number[] = keys.map((k, i) => (nom_col[i] || k).length); 

    //On transforme l'objet en double tableau de string
    const corps: string[][] = [];
    for (let l of o) {
        const ligne = keys.map((k, i) => {
            let val: string;
            // On agit selon le type de variable
            switch (typeof l[k]) {
                case 'bigint':
                case "function":
                case 'number':
                    val = l[k].toString();
                    break;
                case "boolean":
                    val = (l[k] && 'Oui') || 'Non';
                    break;
                case 'object':
                    val = `\`${JSON.stringify(l[k])}\``;
                    break;
                case 'string':
                    val = l[k];
                    break
                default:
                    val = "[N/A]"
            }
            // On met à jour la largeux max de la colonne i
            if (val.length > larg_col[i]) { 
                larg_col[i] = val.length; 
            }
            return val;
        });
        corps.push(ligne);
    }

    return { corps, larg_col }
}

/*  Prend un objet et le transforme en tableau Markdown.
    L'ordre des colonnes est défini par l'array "keys". */
export function Objet_vers_MD (o: {[key: string]: any}[], keys: string[], nom_col: string[] = []): string {

    const { corps, larg_col } = decompOBJ(o, keys, nom_col);
    
    //On crée l'entête du tableau
    const entete: string = keys.map((k, i) => { 
        const n = nom_col[i] || k;
        return `${n}${' '.repeat(larg_col[i] - n.length)}` 
    }).join(' |'); 
    const lignetraits: string = keys.map((_, i) => `${'-'.repeat(larg_col[i])}`).join('-|');

    let out = corps.map(ln => ln.map((v, i) => `${v}${' '.repeat(larg_col[i] - v.length)}`).join(' |'))

    //On retourne le tout joint par un petit retour à la ligne [LF]
    return [ entete, lignetraits, ...out ].join('\n');
}
