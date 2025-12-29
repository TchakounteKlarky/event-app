export class EventsUi {
    constructor(eventsService, onInscClick) {
        this.eventsService = eventsService;
        this.onInscClick = onInscClick;
        this.eventContain = document.getElementById('events-list');
        this.eventForm = document.getElementById('event-form');
        this.message = document.getElementById('event-message');
        this.initHeadphones();
    }
    initHeadphones() {
        this.eventForm.addEventListener('submit', e => this.manageSubmition(e));
    }
    manageSubmition(e) {
        e.preventDefault();
        const titre = document.getElementById('event-titre').value;
        const description = document.getElementById('event-description').value;
        const dateStr = document.getElementById('event-date').value;
        const lieu = document.getElementById('event-lieu').value;
        const categorie = document.getElementById('event-categorie').value;
        const capaciteStr = document.getElementById('event-capacite').value;
        const capacite = +capaciteStr;
        const date = new Date(dateStr);
        const rslt = this.eventsService.createEvent(titre, description, date, lieu, categorie, capacite);
        this.displayMessage(rslt.message, rslt.success);
        if (rslt.success) {
            this.eventForm.reset();
            this.displayEvents();
        }
    }
    displayMessage(message, success) {
        this.message.textContent = message;
        this.message.className = `message show ${success ? 'success' : 'error'} `;
        setTimeout(() => {
            this.message.classList.remove('show');
        }, 5000);
    }
    creerCarteEvenement(event) {
        const remainingPlaces = this.eventsService.remainingPls(event.id);
        const isFull = remainingPlaces == 0;
        const hasPassed = event.date < new Date();
        const dateFormatee = event.date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        return `
        <div class="event-card ${hasPassed ? 'passed' : ''}">
            <div class="event-card-header">
                <h3 class="event-card-title"> ${event.titre} </h3>
                <span class="event-card-badge"> ${event.categorie} </span>
            </div>

            <div class="event-card-body">
                <div class="event-card-info">
                    <div class="event-card-info-item">📅 ${dateFormatee} </div>
                    <div class="event-card-info-item">📍 ${event.lieu} </div>
                    <div class="event-card-info-item">👥 ${event.capacite} places max </div>
                </div>
                <p class="event-card-description"> ${event.description} </p>
            </div>

            <div class="event-card-footer">
                <span class="event-card-places ${isFull ? 'full' : 'available'}">
                    ${isFull ? '❌ Complet' : `✅${remainingPlaces} place(s) restante(s)`}
                </span>
                ${!hasPassed && !isFull ? `<button id="btn-inscr-${event.id}" class="btn btn-small btn-success"> S'inscrire</button>` :
            hasPassed ?
                `<span style="color: var(--text-light);"> Événement passé </span>` : ''}
            </div>
        </div>
        `;
    }
    displayEvents(events) {
        const evenements = events || this.eventsService.getAll();
        if (evenements.length == 0) {
            this.eventContain.innerHTML = '<p class = "empty-state>Aucun évènement toruvé.</p> ';
            return;
        }
        console.log(evenements);
        console.log(Array.isArray(evenements));
        this.eventContain.innerHTML = evenements.map(e => this.creerCarteEvenement(e)).join('');
        evenements.forEach(event => {
            const btn = document.getElementById(`btn-inscr-${event.id}`);
            if (btn) {
                btn.addEventListener('click', () => this.onInscClick(event.id));
            }
        });
    }
}
