export function validationsMail(mail) {
    //const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${domaine.replace(/\./g,'\\.')}$`);
    return mail.trim().endsWith("@saintjeaningenieur.org");
    //return regex.test(mail);
}
export function isEmpty(chaine) {
    return !chaine || chaine.trim().length == 0;
}
export function datePassee(date) {
    return date < new Date();
}
