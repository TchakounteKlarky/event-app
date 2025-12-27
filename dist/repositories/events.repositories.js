export class EventRepositories {
    constructor() {
        this.events = [];
    }
    add(ev) { this.events.push(ev); }
    getAll() { return [...this.events]; }
    findById(id) { return this.events.find((e) => id == e.id); }
    delete(id) {
        const index = this.events.findIndex((e) => id == e.id);
        if (index == -1)
            return false;
        this.events.splice(index, 1);
        return true;
    }
    update(id, upEvent) {
        const index = this.events.findIndex((e) => id == e.id);
        if (index == -1)
            return false;
        this.events[index] = { ...this.events[index], ...upEvent };
        return true;
    }
    countEvent() { return this.events.length; }
}
