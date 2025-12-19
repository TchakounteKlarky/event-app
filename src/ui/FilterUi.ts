import { Events } from "../models/Events.js";
import { EventsServices } from "../services/events.services.js";

export class FilterUi{
        private categorieSelect : HTMLSelectElement;
        private dateSelect : HTMLSelectElement;
        private resetBtn : HTMLButtonElement
        
        constructor(
            private eventService : EventsServices,
            private onFilterChange : (events : Events[]) =>void
        ){
            this.categorieSelect = document.getElementById('filter-categorie') as HTMLSelectElement;
            this.dateSelect = document.getElementById('filter-date') as HTMLSelectElement;
            this.resetBtn = document.getElementById('filter-reset')as HTMLButtonElement;

            this.initHeadphones();
        }

        initHeadphones(){
            this.categorieSelect.addEventListener('change',() =>this.applyFilters());
            this.dateSelect.addEventListener('change',() =>this.applyFilters());
            this.resetBtn.addEventListener('click',() =>this.resetFilters());
        }

        applyFilters(){
            let events = this.eventService.getAll();

            const categorie = this.categorieSelect.value;
            if(categorie) {
                events = this.eventService.filterByCategories(categorie);
            }

            const dateStr = this.dateSelect.value;
            if(dateStr == 'avenir'){
                events = events.filter(e => e.date >= new Date());
            }
            else if(dateStr == 'passes'){
                events = events.filter(e => e.date <= new Date());
            }

            this.onFilterChange(events);
        }

        private resetFilters() : void{
            this.categorieSelect.value = '';
            this.dateSelect.value = 'tous';
            this.applyFilters();
        }


}
