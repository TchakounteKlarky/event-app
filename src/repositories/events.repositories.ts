import { Events } from "../models/Events.js";

export class EventRepositories{
    private events : Events[] = [];

    add(ev : Events){this.events.push(ev);}

    getAll() : Events[]{return [...this.events];}

    findById(id : string) : Events|undefined
        {return this.events.find( (e : Events) => id == e.id)}
    
    delete(id : string){
        const index = this.events.findIndex( (e:Events) => id == e.id);
        if(index == -1) return false;
        this.events.splice(index,1);
        return true;
    }

    update(id:string, upEvent : Partial<Events>){
         const index = this.events.findIndex((e:Events) => id == e.id);
         if(index == -1) return false;
         this.events[index] = {...this.events[index],...upEvent}
         return true;
    }

    countEvent() : number{return this.events.length;}
}