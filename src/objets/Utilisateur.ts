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

    /** Connexion par mot de passe */
    deverrouille (mdp: string): Promise<boolean>;

}