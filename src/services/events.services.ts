import { EventRepositories } from "../repositories/events.repositories.js";
import { InscriptionRepositories } from "../repositories/inscriptions.repositories.js";
import { generatedId } from "../utils/idGenerators.js";
import { isEmpty } from "../utils/validations.js";
import {Events } from "../models/Events.js";

export class EventsServices {
    constructor(
        private evtRepo: EventRepositories,
        private suscribeRepo : InscriptionRepositories
    ) { }

    createEvent(
        titre: string,
        description: string,
        date: Date,
        lieu: string,
        categorie: string,
        capacite: number
    ) : {success : boolean;message : string;event ?: Events }
    {
        if(isEmpty(titre)){
            return {success : false,message: 'le titre est obligatoire'};
        }

        if(isEmpty(description)){
            return {success : false,message: 'la description est obligatoire'};
        }

        if(isEmpty(lieu)){
            return {success : false,message: 'le lieu est obligatoire'};
        }

        if(capacite <= 0) return {success : false,message: 'la capacite doit etre positive.'};
        
        const event : Events = {
            id : generatedId(),
            titre : titre.trim(),
            description : description.trim(),
            date,
            lieu : lieu.trim(),
            categorie,
            capacite
        };

        this.evtRepo.add(event);
        
        return {success : true, message : 'Evenement creer avec succes',event};
    }

    findById(evtId : string): Events |undefined{return this.evtRepo.findById(evtId);}

    filterByCategories(categorie : string) : Events[]{
        return this.evtRepo.getAll().filter(c =>c.categorie == categorie);
    }

    getAll() : Events[] {
        return this.evtRepo.getAll();
    }

    remainingPls(eventId : string){
        const event : Events|undefined = this.evtRepo.findById(eventId);
        if(!event) return 0;
        const nbrInscrit = this.suscribeRepo.countInscriptions(eventId);

        return Math.max(0, event.capacite - nbrInscrit);
    }

    pastEvents() : Events[] {
        const all = this.evtRepo.getAll();
        const now = new Date()
        return all.filter((evt : Events) => evt.date < now);
    }

    isFull(eventId : string): boolean{
        const event = this.evtRepo.findById(eventId);
        if(!event){
            return false;
        }
        const nbrInsc = this.suscribeRepo.countInscriptions(eventId);
        return event.capacite >= nbrInsc;
    }

    // deleteEvent(eventId : string){
    //     const event = this.evtRepo.findById(eventId);
    //     if(!event) return{success : false,message : 'Evenement introuvable'}
    //     const nbr = this.suscribeRepo.countInscriptions(eventId);
    //     if(nbr >0){
    //         return{
    //             success : false,
    //             message : 'Cet evenement a des inscriptions en cours.'
    //         }
    //     }
    //     const titre = event.titre
    //     this.evtRepo.delete(event.id);
    //     return{success : true, message : `${titre} supprime avec succes.`};
    // }
}