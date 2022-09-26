import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import { Utilisateur } from '../../objets/Utilisateur';

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
                e.endsWith(".vcf") 
                && lstatSync(e).isFile()
            ).map(e => e.replace(".vcf", ""));

    }

    get_usr (uuid: string): Utilisateur | undefined {
        const F = `${this.path}/${uuid}.vcf`;
        if (!existsSync(F)) return undefined;

        const vCard = readFileSync(F);


    }

    set_usr (usr: Utilisateur): void {
        const F = `${this.path}/${usr.uuid}.vcf`;

    }

    

}
