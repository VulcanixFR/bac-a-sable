import fs from 'fs';

/*
	* Fonction permettant de génerer un nom 
	* à partir d'un fichier contenant des
	* noms de familler et d'un autre contenant
	* des prénoms, prénoms dont le genre est
	* indiqué.
*/
export type Nom = {
	nom: string;
	prenom: string;
	genre: 'H' | 'F' | 'M';
	complement?: string;
};

export function genere_nom (
	liste_prenoms: ({p:Nom["prenom"],g:Nom['genre']})[], 
	liste_noms: (Nom['nom'])[]
): Nom {
	const	rnd_pIndex = ~~(Math.random() * liste_prenoms.length),
		rnd_nIndex = ~~(Math.random() * liste_noms.length);

	return	{
		nom:	liste_noms[rnd_nIndex],
		prenom: liste_prenoms[rnd_pIndex].p,
		genre:	liste_prenoms[rnd_pIndex].g
	};
}

/* Fonction d'importation de prénoms
 * Ouvre le fichier indiqué et retourne
 * une liste des prénoms et leur genre. */
export function importe_prenoms (path: string): ({p:Nom["prenom"],g:Nom['genre']})[] {
	let data = fs.readFileSync(path, 'utf-8');
	return data.split('\n')
		.filter((e: string) => e.match(';'))
		.map((e: string) => {
			let t = e.split(';')
			return { p: t[0], g: G(t[1]) }
		});
}

/* Fonction d'importation de noms
 * Ouvre le fichier indiqué et retourne
 * une liste de noms. */
export function importe_noms (path: string): (Nom['nom'])[] {
	let data = fs.readFileSync(path, 'utf-8');
	return data.split('\n')
}


/* Fonction de transfert string -> H | F | M */
function G (s: string) {
	switch (s) {
		case 'H':
			return 'H'
		case 'F':
			return 'F'
		default:
			return 'M'
	}
}

/* Fonction permettant de transformer un nom en affichage */
export function Nom_vers_String (N: Nom): string {
    return `${
        N.genre == "H" && '👨' || (N.genre == "F" && '👩' ) || '🚁'
    } ${N.nom.toUpperCase()} ${N.prenom}`;
}
