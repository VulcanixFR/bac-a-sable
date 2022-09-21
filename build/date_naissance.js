"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date_vers_String = exports.date_naissance = void 0;
/* Fonction qui génère une date de naissance aléatoire */
function date_naissance() {
    const MAINTENANT = new Date();
    // Définis l'année de naissance [Max 105ans :D]
    const approx_age = 15 + ~~(Math.random() * 90);
    //Choisis un mois (0 = Janvier)
    const mois = ~~(Math.random() * 11);
    //Choisis un jour (31 Juin = 1er Juillet)
    const jour = ~~(Math.random() * 31);
    // Tout le monde naît à midi selon moi
    return new Date(MAINTENANT.getFullYear() - approx_age, mois, jour, 12, 0, 0);
}
exports.date_naissance = date_naissance;
// Fonction qui transforme une date en un truc lisible
function Date_vers_String(d, options, locale = "default") {
    options = options || { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat(locale, options).format(d);
}
exports.Date_vers_String = Date_vers_String;
