
export function validationsMail(mail : string,domaine : string) : boolean{
    const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${domaine.replace(/\./g,'\\.')}$`);
    return regex.test(mail);
}

export function isEmpty(chaine : string):boolean{
    return !chaine || chaine.trim().length ==0;
}

export function datePassee(date : Date){
    return date < new Date();
}