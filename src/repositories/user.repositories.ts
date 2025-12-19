import { User } from "../models/User.js";

export class UserRpositories{
    private users : User[] = [];

    getAll() : User[]{return [...this.users];}
 
    add(u : User): void{this.users.push(u);}

    delete(id : string){
        const index = this.users.findIndex(u => id == u.id);
        if(index == -1) return false;
        this.users.splice(index,1);
        return true;
    }

    findById(id : string): User| undefined {return this.users.find(u =>u.id == id);}
    findByMail(email : string) :User| undefined {return this.users.find(u =>u.email == email);}

    update(id : string, upUser : Partial<User>) : boolean{
        const index = this.users.findIndex(u => u.id = id);
        if(index ==-1) return false;
        this.users[index] = {...this.users[index],...upUser};
        return true;
    }

    countUsers() : number{return this.users.length;}

}