export class InscriptionUi {
    constructor(userService, eventService, inscService, onInscriptionComplete) {
        this.userService = userService;
        this.eventService = eventService;
        this.inscService = inscService;
        this.onInscriptionComplete = onInscriptionComplete;
        this.eventIdActuel = null;
        this.section = document.getElementById('inscription-section');
        this.form = document.getElementById('inscription-form');
        this.message = document.getElementById('inscription-message');
        this.cancelBtn = document.getElementById('inscription-cancel');
        this.titleElement = document.getElementById('inscription-event-title');
        this.initHeadphones();
    }
    initHeadphones() {
        this.cancelBtn.addEventListener('click', () => this.masquer());
        this.form.addEventListener('submit', e => this.manageSubmitionInscription(e));
    }
    masquer() {
        this.section.style.display = 'none';
        this.eventIdActuel = null;
    }
    display(eventId) {
        const event = this.eventService.findById(eventId);
        if (!event)
            return;
        this.eventIdActuel = eventId;
        this.titleElement.textContent = event.titre;
        this.section.style.display = 'block';
        this.form.reset();
        this.message.classList.remove('show');
        this.section.scrollIntoView({ behavior: 'smooth' });
    }
    manageSubmitionInscription(e) {
        e.preventDefault();
        if (!this.eventIdActuel)
            return;
        const nom = document.getElementById('user-nom').value;
        const email = document.getElementById('user-email').value;
        const userrlst = this.userService.findUser(nom, email);
        if (!userrlst.success || !userrlst.user) {
            this.displayMessage(userrlst.message, userrlst.success);
            return;
        }
        const inscResult = this.inscService.createInscription(userrlst.user.id, this.eventIdActuel);
        this.displayMessage(inscResult.message, inscResult.success);
        if (inscResult.success) {
            setTimeout(() => {
                this.masquer();
                this.onInscriptionComplete();
            }, 2000);
        }
    }
    displayMessage(message, success) {
        this.message.innerHTML = message;
        this.message.className = `message show ${success ? 'success' : 'error'}`;
        setTimeout(() => {
            this.message.className = 'message';
        }, 5000);
    }
}
