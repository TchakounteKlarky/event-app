import { generatedId } from "../utils/idGenerators.js";
import { isEmpty } from "../utils/validations.js";
export class EventsServices {
    constructor(evtRepo, suscribeRepo) {
        this.evtRepo = evtRepo;
        this.suscribeRepo = suscribeRepo;
    }
    createEvent(titre, description, date, lieu, categorie, capacite) {
        if (isEmpty(titre)) {
            return { success: false, message: 'le titre est obligatoire' };
        }
        if (isEmpty(description)) {
            return { success: false, message: 'la description est obligatoire' };
        }
        if (isEmpty(lieu)) {
            return { success: false, message: 'le lieu est obligatoire' };
        }
        if (capacite <= 0)
            return { success: false, message: 'la capacite doit etre positive.' };
        const event = {
            id: generatedId(),
            titre: titre.trim(),
            description: description.trim(),
            date,
            lieu: lieu.trim(),
            categorie,
            capacite
        };
        this.evtRepo.add(event);
        return { success: true, message: 'Evenement creer avec succes', event };
    }
    findById(evtId) { return this.evtRepo.findById(evtId); }
    filterByCategories(categorie) {
        return this.evtRepo.getAll().filter(c => c.categorie == categorie);
    }
    getAll() {
        return this.evtRepo.getAll();
    }
    remainingPls(eventId) {
        const event = this.evtRepo.findById(eventId);
        if (!event)
            return 0;
        const nbrInscrit = this.suscribeRepo.countInscriptions(eventId);
        return Math.max(0, event.capacite - nbrInscrit);
    }
    pastEvents() {
        const all = this.evtRepo.getAll();
        const now = new Date();
        return all.filter((evt) => evt.date < now);
    }
    isFull(eventId) {
        const event = this.evtRepo.findById(eventId);
        if (!event) {
            return false;
        }
        const nbrInsc = this.suscribeRepo.countInscriptions(eventId);
        return event.capacite >= nbrInsc;
    }
}
