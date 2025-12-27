import { UserRpositories } from "../repositories/user.repositories.js";
import { generatedId } from "../utils/idGenerators.js";
import {isEmpty, validationsMail } from "../utils/validations.js";
import { User } from "../models/User.js";

export class UserServices {
    private readonly DOMAINE = 'saintjeaningenieur.org';
    constructor(
        private userRepos : UserRpositories

    ) { }
    createUser(
        email: string,
        nom: string
    ):{success : boolean,message : string,user ?: User}{
        if(isEmpty(email)){
            return{success : false, message : 'l\'email est obligatoire.'};
        }
        if(isEmpty(nom)){
            return {success: false,message : 'le nom est obligatoire.'};
        }
        console.log(validationsMail(email,this.DOMAINE));
        if(validationsMail(email,this.DOMAINE)){
            return {success : false,message : 'le domaine de l\'addresse est invalide.'};
        }
        const mail = this.userRepos.findByMail(email);
        if(mail){
            return{
                success : false,
                message : 'Un utilisateur avec cet email existe deja.'
            }
        }
        const user : User = {
            id : generatedId(),
            email : email.trim().toLowerCase(),
            nom : nom.trim()
        }

        this.userRepos.add(user);
        
        return{success : true,message : 'Utilisateur creé avec success!',user};
    }

    findUser(nom : string,mail : string):{success : boolean,message : string,user ?: User} {
        const user : User |undefined = this.userRepos.findByMail(mail);
        if(!user){
            return this.createUser(nom, mail)
        }
        return {success : true,message : 'Utilisateur creé avec success',user};
    }

    //findById(id : string): User|undefined{return this.userRepos.findById(id);}

    getAll(){return this.userRepos.getAll();}
}