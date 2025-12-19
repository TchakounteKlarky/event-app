import { EventsServices } from "../services/events.services.js";
import { InscriptionsServices } from "../services/inscriptions.services.js";
import { UserServices } from "../services/user.services.js";

export class InscriptionUi{
    private form : HTMLFormElement;
    private section : HTMLElement;
    private message : HTMLElement;
    private titleElement : HTMLElement;
    private cancelBtn : HTMLButtonElement;
    private eventIdActuel : string | null = null;

    constructor(
        private userService : UserServices,
        private eventService : EventsServices,
        private inscService : InscriptionsServices,
        private onInscriptionComplete : () =>void
    ){
        this.section = document.getElementById('inscription-section')!;
        this.form = document.getElementById('inscription-form') as HTMLFormElement;
        this.message = document.getElementById('inscription-message')!;
        this.cancelBtn = document.getElementById('inscription-cancel') as HTMLButtonElement;
        this.titleElement = document.getElementById('inscription-event-title')!;

        this.initHeadphones();
    }

    initHeadphones() : void{
        this.cancelBtn.addEventListener('click',() => this.masquer());
        this.form.addEventListener('submit', e =>this.manageSubmitionInscription(e));
    }

    masquer(){
        this.section.style.display = 'none';
        this.eventIdActuel = null;
    }

    display(eventId : string) : void{
        const event = this.eventService.findById(eventId);

        if(!event) return;

        this.eventIdActuel = eventId;
        this.titleElement.textContent = event.titre;
        this.section.style.display = 'block';
        this.form.reset();
        this.message.classList.remove('show');
        this.section.scrollIntoView({behavior : 'smooth'});
    }

    manageSubmitionInscription(e : Event) : void{
        e.preventDefault();

        if(!this.eventIdActuel) return;

        const nom = (document.getElementById('user-nom') as HTMLInputElement).value;
        const email = (document.getElementById('user-email') as HTMLInputElement).value;

        const userrlst = this.userService.findUser(nom,email);

        if(!userrlst.success || !userrlst.user){
            this.displayMessage(userrlst.message,userrlst.success);
            return;
        }

        const inscResult = this.inscService.createInscription(userrlst.user.id,this.eventIdActuel);

        this.displayMessage(inscResult.message,inscResult.success);

        if(inscResult.success){
            setTimeout(() => {
                this.masquer();
                this.onInscriptionComplete();
            },2000);
        }

    }

    displayMessage(message : string,success : boolean){
        this.message.innerHTML = message;
        this.message.className = `message show ${success ? 'success' : 'error'}`;

        setTimeout(() =>{
            this.message.className = 'message';
        },5000);
    }



}