import { generatedId } from "../utils/idGenerators.js";
import { isEmpty, validationsMail } from "../utils/validations.js";
export class UserServices {
    constructor(userRepos) {
        this.userRepos = userRepos;
        this.DOMAINE = "@saintjeaningenieur.org";
    }
    createUser(email, nom) {
        if (isEmpty(email)) {
            return { success: false, message: 'l\'email est obligatoire.' };
        }
        if (isEmpty(nom)) {
            return { success: false, message: 'le nom est obligatoire.' };
        }
        console.log(`validation: ${validationsMail(email)}`);
        if (!validationsMail(email)) {
            return { success: false, message: 'le domaine de l\'addresse est invalide.' };
        }
        const mail = this.userRepos.findByMail(email);
        if (mail) {
            return {
                success: false,
                message: 'Un utilisateur avec cet email existe deja.'
            };
        }
        const user = {
            id: generatedId(),
            email: email.trim().toLowerCase(),
            nom: nom.trim()
        };
        this.userRepos.add(user);
        return { success: true, message: 'Utilisateur creé avec success!', user };
    }
    findUser(nom, mail) {
        const user = this.userRepos.findByMail(mail);
        if (!user) {
            return this.createUser(nom, mail);
        }
        return { success: true, message: 'Utilisateur creé avec success', user };
    }
    //findById(id : string): User|undefined{return this.userRepos.findById(id);}
    getAll() { return this.userRepos.getAll(); }
}
