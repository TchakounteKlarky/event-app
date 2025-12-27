import { Inscription } from "../models/Inscription.js";

export class InscriptionRepositories{ 

    private inscriptions : Inscription[] = [];
    

    getAll() : Inscription[]{return [...this.inscriptions];}

    
    add(insc : Inscription){this.inscriptions.push(insc);}
    
    delete(idEvent : string, idUser: string){
        const index = this.inscriptions.findIndex(u => idUser == u.userId && idEvent == u.eventId);
        if(index == -1) return false;
        this.inscriptions.splice(index,1);
        return true;
    }
    exists(userId: string,eventId : string) : boolean{
        const insc = this.inscriptions.find(ins =>ins.userId == userId && ins.eventId == eventId);
        if(!insc) return false;
        return true;
    }

    findById(id : string): Inscription| undefined {return this.inscriptions.find(u =>u.id == id)}

    findUserById(userId : string) : Inscription[] 
    {
        return this.inscriptions.filter(insc => insc.userId == userId);
    }
    countInscriptions(id : string) : number{
        return this.inscriptions.filter(ins =>ins.id = id).length;
    }

    
}