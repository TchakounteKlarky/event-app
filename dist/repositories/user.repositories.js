export class UserRpositories {
    constructor() {
        this.users = [];
    }
    getAll() { return [...this.users]; }
    add(u) { this.users.push(u); }
    delete(id) {
        const index = this.users.findIndex(u => id == u.id);
        if (index == -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
    findById(id) { return this.users.find(u => u.id == id); }
    findByMail(email) { return this.users.find(u => u.email == email); }
    update(id, upUser) {
        const index = this.users.findIndex(u => u.id = id);
        if (index == -1)
            return false;
        this.users[index] = { ...this.users[index], ...upUser };
        return true;
    }
    countUsers() { return this.users.length; }
}
