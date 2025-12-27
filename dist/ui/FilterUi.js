export class FilterUi {
    constructor(eventService, onFilterChange) {
        this.eventService = eventService;
        this.onFilterChange = onFilterChange;
        this.categorieSelect = document.getElementById('filter-categorie');
        this.dateSelect = document.getElementById('filter-date');
        this.resetBtn = document.getElementById('filter-reset');
        this.initHeadphones();
    }
    initHeadphones() {
        this.categorieSelect.addEventListener('change', () => this.applyFilters());
        this.dateSelect.addEventListener('change', () => this.applyFilters());
        this.resetBtn.addEventListener('click', () => this.resetFilters());
    }
    applyFilters() {
        let events = this.eventService.getAll();
        const categorie = this.categorieSelect.value;
        if (categorie) {
            events = this.eventService.filterByCategories(categorie);
        }
        const dateStr = this.dateSelect.value;
        if (dateStr == 'avenir') {
            events = events.filter(e => e.date >= new Date());
        }
        else if (dateStr == 'passes') {
            events = events.filter(e => e.date <= new Date());
        }
        this.onFilterChange(events);
    }
    resetFilters() {
        this.categorieSelect.value = '';
        this.dateSelect.value = 'tous';
        this.applyFilters();
    }
}
