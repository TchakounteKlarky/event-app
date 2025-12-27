import { EventRepositories } from "../repositories/events.repositories.js";
import { InscriptionRepositories } from "../repositories/inscriptions.repositories.js";
import { UserRpositories } from "../repositories/user.repositories.js";
import { generatedId } from "../utils/idGenerators.js";
import { datePassee } from "../utils/validations.js";
import { Inscription } from "../models/Inscription.js";
import { User } from "../models/User.js";

export class InscriptionsServices{
    constructor(
        private suscibeRepo : InscriptionRepositories,
        private userRepo : UserRpositories,
        private eventRepo : EventRepositories
    ){}

    createInscription(
        userId : string,
        eventId : string
    ) : {success : boolean,message : string, insc ?: Inscription}
    {
        const user : User|undefined = this.userRepo.findById(userId);
        if(!user) return {success : false,message : 'Cet utilisateur n existe pas!'};

        const event = this.eventRepo.findById(eventId);
        if(!event)return {success : false,message : 'evenement introuvan$ble.'};

        if(datePassee(event.date) ){
            return{success : false,message : 'Cet evenment est deja passé.'};
        }

        if(this.suscibeRepo.exists(userId,eventId)){
            return {success : false,message : 'Inscription deja existante!'}
        }
        const nbrInsc = this.suscibeRepo.countInscriptions(eventId);
        if(nbrInsc > event.capacite){
            return {success : false,message : 'Nombre maximum d\' inscriptions atteintes.'}
        }

        const register : Inscription|undefined = {
            id : generatedId(),
            userId,
            eventId,
            dateInscription : new Date()
        };
        
        this.suscibeRepo.add(register);

        return{success:true,message :`Inscription de ${event.titre} validee avec success!`,insc : register};
    }

    countInsc():number{return this.suscibeRepo.getAll().length;}

    getAllInsc(){
        return this.suscibeRepo.getAll();
    }

    // unsubscribedUser(userId : string,eventId : string){
    //     const insc = this.suscibeRepo.exists(userId,eventId);
    //     if(!insc) return {success : false,message : 'Cet utilisateur n\'est pas inscrit.'};
    //     const deleted = this.suscibeRepo.delete(userId,eventId);
    //     if(deleted) return {success : false, message : 'desinscription reussie.'};
    //     return{success : true,message : 'Erreur lors de la desiscription'};
    // }

    // ObtainInscPerEvent(idUser : string) : Array<{inscription : Inscription,event : any}>{
    //     const insc = this.suscibeRepo.findUserById(idUser);
        
    //     return insc.map(insc =>({
    //         inscription : insc,
    //         event : this.eventRepo.findById(idUser)
    //     }))
    // }

    // hasSubscribed(userId : string,eventId : string) : boolean{
    //     return this.suscibeRepo.exists(userId,eventId);
    // }


}