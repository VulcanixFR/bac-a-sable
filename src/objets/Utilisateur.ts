import { Nom } from "../gen_nom";

/* 
    Structure représentant un utilisateur stocké dans une base de données 
*/
export type Utilisateur = {
    
    /** Identifiant unique propre à l'utilisateur */
    uuid: string;

    /** Patronyme de l'utilisateur */
    nom: Nom;

    /** Date et lieu de naissance */
    naissance: { 
        date: Date,
        lieu?: string
    };

    /** Liste des adresses liées au compte */
    emails: string[];

    /** email principal = Indice dans la liste "emails" */
    email: number;  

    /** Avatars liés à l'utilisateur */
    avatars: string[];

    /** Avatar principal = Indice dans la liste "avatars" */
    avatar: number;

    /** Pseudonyme */
    pseudonyme?: string;

    /** Rôles donnés à l'utilisateur */
    roles: string[];

    /** Groupes dont fait partie l'utilisateur */
    groupes: string[];

    /** Numéros de téléphone de l'utilisateur */
    telephone: { nom: string, numero: string }[]

    /** Mot de passe */
    mdp: string;

};

/** Informations minimales données sur un utilisateur */
export type Utilisateur_Minimal = {
    uuid: string;
    pseudonyme: string;
    avatars: Utilisateur['avatars'];
    avatar: number;
    roles: string[];
    nom: { genre: Nom['genre'] }
};


/** Interface */
export interface iUtilisateur {

    /*
        Propriétés.
        Toutes en lecture seule,
        modification via fonctions dédiées
    */    

    /** Identifiant unique propre à l'utilisateur */
    readonly uuid: string;

    /** Patronyme de l'utilisateur */
    readonly nom: Nom;

    /** Date et lieu de naissance */
    readonly naissance: { 
        date: Date,
        lieu?: string
    };

    /** Liste des adresses liées au compte */
    readonly emails: string[];

    /** email principal */
    readonly email: string;  

    /** Avatars liés à l'utilisateur */
    readonly avatars: string[];

    /** avatar principal */
    readonly avatar: string;  

    /** Pseudonyme */
    readonly pseudonyme: string;

    /** Rôles donnés à l'utilisateur */
    readonly roles: string[];

    /** Groupes dont fait partie l'utilisateur */
    readonly groupes: string[];

    /** Numéros de téléphone de l'utilisateur */
    readonly telephone: { nom: string, numero: string }[]

    /** Mot de passe */
    readonly mdp: string;

    /*
        Fonctions de modification.
        Retourne l'utilisateur lui-même.
        Elles n'affectent pas directement la base de données,
        pour cela .sync() doit être appelé
    */  

    /** Nom */
    def_nom_nom (nom: Nom["nom"]): iUtilisateur;
    def_nom_prenom (prenom: Nom['prenom']): iUtilisateur;
    def_nom_genre (genre: Nom['genre']): iUtilisateur;
    def_nom_complement (compl: Nom["complement"]): iUtilisateur;

    /** Naissance */
    def_naissance_date (date: Date): iUtilisateur;
    def_naissance_lieu (lieu: string | undefined): iUtilisateur;

    /** Email */
    ajoute_email (email: string): iUtilisateur;
    supprime_email (email: string): iUtilisateur;
    supprime_email (indice: number): iUtilisateur;
    def_email (indice: number): iUtilisateur; /** Définis l'email principal */
    
    /** Avatars */
    ajoute_avatar (avatar: string): iUtilisateur;
    supprime_avatar (avatar: string): iUtilisateur;
    supprime_avatar (indice: number): iUtilisateur;
    def_avatar (indice: number): iUtilisateur; /** Définis l"avatar principal */

    /** Pseudonyme */
    def_pseudonyme (pseudo: string | undefined): iUtilisateur;

    /** Roles */
    ajoute_role (role: string): iUtilisateur;
    supprime_role (role: string): iUtilisateur;
    supprime_role (indice: number): iUtilisateur;
    
    /** Groupes */
    ajoute_groupe (groupe: string): iUtilisateur;
    supprime_groupe (groupe: string): iUtilisateur;
    supprime_groupe (indice: number): iUtilisateur;

    /** Téléphone */
    ajoute_telephone (nom: string, numero: string): iUtilisateur;
    supprime_telephone (numero: string): iUtilisateur;
    supprime_telephone (indice: number): iUtilisateur;

    /** Mot de passe */
    def_mdp (mdp: string): iUtilisateur;
    
    /** applique un objet utilisateur sur la class */
    applique (usr: Utilisateur): iUtilisateur

    /*
        Fonctions feuilles (i.e. ne retournent pas l'utilisateur)
        Permettent de valider une action dans la base de données.
    */

    /** 
     *  Synchronise l'utilisateur avec la base de données
     *  - Effectue les modifications
     *  - Récupère les groupes
     */
    sync (): Promise<boolean>;

    /** Supprime l'utilisateur */
    supprime(): Promise<boolean>;

    /** Prévisualise les changements */
    previsu(): Utilisateur;

    /** Donne l'utilisateur brut */
    brut (): Utilisateur;

    /** Donne l'utilisateur minimal */
    minimal (): Utilisateur_Minimal;

    /** Connexion par mot de passe */
    deverrouille (mdp: string): Promise<boolean>;

}

export class cUtilisateur implements iUtilisateur {

    private usr_temp: Utilisateur;

    constructor (private usr: Utilisateur) {
        this.usr_temp = JSON.parse(JSON.stringify(usr)); // Copie
    }

    // Props

    get uuid () {
        return this.usr.uuid;
    }

    get nom () {
        return { ...this.usr.nom };
    }

    get naissance () {
        return { ...this.usr.naissance };
    };

    get emails () {
        return [ ...this.usr.emails ];
    };

    get email () {
        return this.usr.emails[this.usr.email];
    }

    get avatars () {
        return [ ...this.usr.avatars ];
    }

    get avatar () {
        return this.usr.avatars[this.usr.avatar];
    }

    get pseudonyme () {
        return this.usr.pseudonyme 
                || ( this.usr.nom.nom.toUpperCase() + " " + this.usr.nom.prenom );
    }

    get roles () {
        return [...this.usr.roles];
    }

    get groupes () {
        return [...this.usr.groupes];
    }

    get telephone () {
        return JSON.parse(JSON.stringify(this.usr.telephone));
    }

    get mdp () {
        return this.usr.mdp;
    }

    // Modification

    def_nom_nom (nom: Nom["nom"]): iUtilisateur {
        this.usr_temp.nom.nom = nom;
        return this;
    }
    def_nom_prenom (prenom: Nom["prenom"]): iUtilisateur {
        this.usr_temp.nom.prenom = prenom;
        return this;
    }
    def_nom_genre (genre: Nom["genre"]): iUtilisateur {
        this.usr_temp.nom.genre = genre;
        return this;
    }
    def_nom_complement (complement: Nom["complement"]): iUtilisateur {
        this.usr_temp.nom.complement = complement;
        return this;
    }

    def_naissance_date(date: Date): iUtilisateur {
        this.usr_temp.naissance.date = date;
        return this;
    }
    def_naissance_lieu(lieu: string | undefined): iUtilisateur {
        this.usr_temp.naissance.lieu = lieu;
        return this;
    }        

    ajoute_email(email: string): iUtilisateur {
        this.usr_temp.emails.push(email);
        return this;
    }
    supprime_email(email: string): iUtilisateur;
    supprime_email(indice: number): iUtilisateur;
    supprime_email(indice: unknown): iUtilisateur {
        if (typeof indice == "number") {
            delete this.usr_temp.emails[indice];
            this.usr_temp.emails = this.usr_temp.emails.filter(e => e);
        } else {
            this.usr_temp.emails = this.usr_temp.emails.filter(e => e != indice);
        }
        return this;
    }
    def_email(indice: number): iUtilisateur {
        this.usr_temp.email = indice;
        return this;
    }

    ajoute_avatar(avatar: string): iUtilisateur {
        this.usr_temp.avatars.push(avatar);
        return this;
    }
    supprime_avatar(avatar: string): iUtilisateur;
    supprime_avatar(indice: number): iUtilisateur;
    supprime_avatar(indice: unknown): iUtilisateur {
        if (typeof indice == "number") {
            delete this.usr_temp.avatars[indice];
            this.usr_temp.avatars = this.usr_temp.avatars.filter(e => e);
        } else {
            this.usr_temp.avatars = this.usr_temp.avatars.filter(e => e != indice);
        }
        return this;
    }
    def_avatar(indice: number): iUtilisateur {
        this.usr_temp.avatar = indice;
        return this;
    }

    def_pseudonyme(pseudo: string | undefined): iUtilisateur {
        this.usr_temp.pseudonyme = pseudo;
        return this;
    }

    ajoute_role(role: string): iUtilisateur {
        this.usr_temp.roles.push(role);
        return this;
    }
    supprime_role(role: string): iUtilisateur;
    supprime_role(indice: number): iUtilisateur;
    supprime_role(indice: unknown): iUtilisateur {
        if (typeof indice == "number") {
            delete this.usr_temp.roles[indice];
            this.usr_temp.roles = this.usr_temp.roles.filter(e => e);
        } else {
            this.usr_temp.roles = this.usr_temp.roles.filter(e => e != indice);
        }
        return this;
    }
    
    ajoute_groupe(groupe: string): iUtilisateur {
        this.usr_temp.groupes.push(groupe);
        return this;
    }
    supprime_groupe(groupe: string): iUtilisateur;
    supprime_groupe(indice: number): iUtilisateur;
    supprime_groupe(indice: unknown): iUtilisateur {
        if (typeof indice == "number") {
            delete this.usr_temp.groupes[indice];
            this.usr_temp.groupes = this.usr_temp.groupes.filter(e => e);
        } else {
            this.usr_temp.groupes = this.usr_temp.groupes.filter(e => e != indice);
        }
        return this;
    }

    ajoute_telephone(nom: string, numero: string): iUtilisateur {
        this.usr_temp.telephone.push({ nom, numero });
        return this;
    }
    supprime_telephone(numero: string): iUtilisateur;
    supprime_telephone(indice: number): iUtilisateur;
    supprime_telephone(indice: unknown): iUtilisateur {
        if (typeof indice == "number") {
            delete this.usr_temp.telephone[indice];
            this.usr_temp.telephone = this.usr_temp.telephone.filter(e => e);
        } else {
            this.usr_temp.telephone = this.usr_temp.telephone.filter(e => e != indice);
        }
        return this;
    }

    def_mdp(mdp: string): iUtilisateur {
        this.usr_temp.mdp = mdp; // Oui ça stocke en clair de base.
        return this;
    }

    applique(usr: Utilisateur): iUtilisateur {
        this.usr = usr;
        this.usr_temp = JSON.parse(JSON.stringify(usr));
        return this;
    }

    async sync (): Promise<boolean> {
        this.usr = this.previsu();
        return true;
    }

    async supprime(): Promise<boolean> {
        return true;
    }

    previsu(): Utilisateur {
        return JSON.parse(JSON.stringify(this.usr_temp));
    }

    brut(): Utilisateur {
        return JSON.parse(JSON.stringify(this.usr));
    }

    minimal(): Utilisateur_Minimal {
        return {
            avatar: this.usr.avatar,
            avatars: this.avatars,
            nom: { genre: this.nom.genre },
            pseudonyme: this.pseudonyme,
            roles: this.roles,
            uuid: this.uuid
        }
    }

    async deverrouille(mdp: string): Promise<boolean> {
        return mdp == this.usr.mdp; // Oui c'est stocké en clair.
    }

}