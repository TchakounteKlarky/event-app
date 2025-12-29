import { EventsUi } from "./EventsUi.js";
import { FilterUi } from "./FilterUi.js";
import { InscriptionUi } from "./InscriptionUi.js";
export class AppUi {
    constructor(eventsService, insciptionsService, userService) {
        this.eventUi = new EventsUi(eventsService, (eventId) => this.inscriptionUi.display(eventId));
        this.inscriptionUi = new InscriptionUi(userService, eventsService, insciptionsService, () => this.eventUi.displayEvents());
        this.filterUi = new FilterUi(eventsService, (events) => this.eventUi.displayEvents(events));
    }
    init() {
        this.eventUi.displayEvents();
        console.log('✅ Application initialisée.');
    }
}
