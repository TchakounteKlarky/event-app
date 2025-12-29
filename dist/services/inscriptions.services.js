import { generatedId } from "../utils/idGenerators.js";
import { datePassee } from "../utils/validations.js";
export class InscriptionsServices {
    constructor(suscibeRepo, userRepo, eventRepo) {
        this.suscibeRepo = suscibeRepo;
        this.userRepo = userRepo;
        this.eventRepo = eventRepo;
    }
    createInscription(userId, eventId) {
        const user = this.userRepo.findById(userId);
        if (!user)
            return { success: false, message: 'Cet utilisateur n existe pas!' };
        const event = this.eventRepo.findById(eventId);
        if (!event)
            return { success: false, message: 'evenement introuvan$ble.' };
        if (datePassee(event.date)) {
            return { success: false, message: 'Cet evenment est deja passé.' };
        }
        if (this.suscibeRepo.exists(userId, eventId)) {
            return { success: false, message: 'Inscription deja existante!' };
        }
        const nbrInsc = this.suscibeRepo.countInscriptions(eventId);
        if (nbrInsc > event.capacite) {
            return { success: false, message: 'Nombre maximum d\' inscriptions atteintes.' };
        }
        const register = {
            id: generatedId(),
            userId,
            eventId,
            dateInscription: new Date()
        };
        this.suscibeRepo.add(register);
        return { success: true, message: `Inscription de ${event.titre} validee avec success!`, insc: register };
    }
    countInsc() { return this.suscibeRepo.getAll().length; }
    getAllInsc() {
        return this.suscibeRepo.getAll();
    }
}
