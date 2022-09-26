import { existsSync, lstatSync, mkdirSync, readdirSync } from 'fs';

/**
 * Une base de données utilisant ... des vCards ...
 * Je sais pas pourquoi je m'inflige ça, franchement ...
 */
export class vCardUserDB {

    usrList: string[] = [];

    constructor (private path: string) {

        this.init_dossier();

    }

    init_dossier () {
        const path = this.path;

        // Création du dossier si inexistant
        if (!existsSync(path)) { 
            mkdirSync(path, { recursive: true });
        } else if (!lstatSync(path).isDirectory()) {
            throw path + " n'est pas un dossier !";
        }
        
        // Liste des vCard déjà présentes
        this.usrList = readdirSync(path)
            .filter(e =>    
                e.endsWith(".vCard") 
                && lstatSync(e).isFile()
            ).map(e => e.replace(".vCard", ""));

    }

}
