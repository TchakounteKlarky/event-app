export class InscriptionRepositories {
    constructor() {
        this.inscriptions = [];
    }
    getAll() { return [...this.inscriptions]; }
    add(insc) { this.inscriptions.push(insc); }
    delete(idEvent, idUser) {
        const index = this.inscriptions.findIndex(u => idUser == u.userId && idEvent == u.eventId);
        if (index == -1)
            return false;
        this.inscriptions.splice(index, 1);
        return true;
    }
    exists(userId, eventId) {
        const insc = this.inscriptions.find(ins => ins.userId == userId && ins.eventId == eventId);
        if (!insc)
            return false;
        return true;
    }
    findById(id) { return this.inscriptions.find(u => u.id == id); }
    findUserById(userId) {
        return this.inscriptions.filter(insc => insc.userId == userId);
    }
    countInscriptions(id) {
        return this.inscriptions.filter(ins => ins.id = id).length;
    }
}
