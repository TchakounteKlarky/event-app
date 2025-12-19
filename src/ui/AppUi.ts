import { EventsServices } from "../services/events.services.js";
import { InscriptionsServices } from "../services/inscriptions.services.js";
import { UserServices } from "../services/user.services.js";
import { EventsUi } from "./EventsUi.js";
import { FilterUi } from "./FilterUi.js";
import { InscriptionUi } from "./InscriptionUi.js";

export class AppUi{
    private eventUi : EventsUi;
    private inscriptionUi : InscriptionUi;
    private filterUi : FilterUi;

    constructor(
        eventsService : EventsServices,
        insciptionsService : InscriptionsServices,
        userService : UserServices
    ){
        this.eventUi = new EventsUi(
            eventsService,
            (eventId) => this.inscriptionUi.display(eventId)
        );

        this.inscriptionUi = new InscriptionUi(
            userService,
            eventsService,
            insciptionsService,
            () => this.eventUi.displayEvents()
        );

        this.filterUi = new FilterUi(
            eventsService,
            (events)  => this.eventUi.displayEvents(events)
        )
    }
    
    init(): void{
        this.eventUi.displayEvents();
        console.log('✅ Application initialisée.');
    }
}