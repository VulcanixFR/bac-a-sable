/* Fonction qui génère une date de naissance aléatoire */
export function date_naissance (): Date {

    const MAINTENANT = new Date();

    // Définis l'année de naissance [Max 105ans :D]
    const approx_age = ~~(Math.random() * 100); 
    
    //Choisis un mois (0 = Janvier)
    const mois = ~~(Math.random() * 11); 

    //Choisis un jour (31 Juin = 1er Juillet)
    const jour = ~~(Math.random() * 31); 

    // Tout le monde naît à midi selon moi
    return new Date(
        MAINTENANT.getFullYear() - approx_age,
        mois, jour, 12, 0, 0
    );

}

// Fonction qui transforme une date en un truc lisible
export function Date_vers_String (d: Date) {
    let date = new Intl.DateTimeFormat("default", {weekday: "long", year: "numeric", month: "long", day: "numeric"}).format(d);
    const MAINTENANT = new Date();
    return date + ` (${MAINTENANT.getFullYear() - d.getFullYear()} ans)`
}
