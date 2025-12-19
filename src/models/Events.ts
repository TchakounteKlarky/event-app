
export enum categorieEvent{
    P = "PARRAINAGE",
    S = "SPORT",
    C = "CONFERENCE"
}

export interface Events{
    id : string;
    titre : string;
    description : string;
    date : Date;
    lieu : string;
    categorie : string;
    capacite : number;
}