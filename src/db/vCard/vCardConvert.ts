import { Utilisateur } from "../../objets/Utilisateur";

export function Utilisateur_Vers_vCard (usr: Utilisateur): string {

    const vCard = [
        "BEGIN:VCARD",
        "VERSION:4.0",
        "KIND:individual"
    ];

    // Nom
    let nom = usr.nom;
    vCard.push(`FN:${nom.nom} ${nom.prenom}`);
    vCard.push(`N:${nom.nom};${nom.prenom};;;`);
    if (usr.pseudonyme) 
        vCard.push(`NICKNAME:${usr.pseudonyme}`);
    vCard.push(`GENDER:${nom.genre == "H" && 'M' || (nom.genre == "F" && 'F' ) || ('O;' + nom.complement)}`)
    
    // UUID
    vCard.push(`UID;VALUE=text:${usr.uuid}`);

    // Email
    for (let m of usr.emails) 
        vCard.push(`EMAIL:${m}`);

    // Naissance
    vCard.push(`BDAY:${usr.naissance.date.toISOString()}`);

    // Avatar
    vCard.push(`PHOTO:${usr.avatars[usr.avatar]}`)

    // Téléphone
    for (let t of usr.telephone) 
        vCard.push(`TEL;VALUE=uri:${t.numero}`);

    // Reste [ Avatars, Roles, Groupes, tel.nom[], MDP, naissance.lieu ]
    let notes = [
        usr.avatars,
        usr.roles,
        usr.groupes,
        usr.telephone.map(e => e.nom)
    ].map(e => e.join('|'));
    notes.push(usr.mdp)
    notes.push(usr.naissance.lieu || '');
    vCard.push(`NOTE:${notes}`);

    //Retour
    vCard.push("END:VCARD");
    return vCard.join("\n");

}