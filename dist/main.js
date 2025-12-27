import { EventRepositories } from "./repositories/events.repositories.js";
import { InscriptionRepositories } from "./repositories/inscriptions.repositories.js";
import { UserRpositories } from "./repositories/user.repositories.js";
import { EventsServices } from "./services/events.services.js";
import { InscriptionsServices } from "./services/inscriptions.services.js";
import { UserServices } from "./services/user.services.js";
import { AppUi } from "./ui/AppUi.js";
// ========== Initialisation des Repositories ==========
const eventRepository = new EventRepositories();
const userRepository = new UserRpositories();
const inscriptionRepository = new InscriptionRepositories();
// ========== Initialisation des Services ==========
const eventService = new EventsServices(eventRepository, inscriptionRepository);
const userService = new UserServices(userRepository);
const inscriptionService = new InscriptionsServices(inscriptionRepository, userRepository, eventRepository);
// ========== Initialisation de l'interface utilisateur ==========
const app = new AppUi(eventService, inscriptionService, userService);
// ========== Démarrage de l'application ==========
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    ajouterDonneesDemo();
});
/**
 * Ajoute quelques événements de démonstration (optionnel)
 */
function ajouterDonneesDemo() {
    eventService.createEvent('Tournoi de Football Inter-Promotions', 'Venez supporter ou participer au grand tournoi annuel ! Inscriptions par équipe de 7 joueurs.', new Date('2026-12-18T16:00:00'), 'Stade Universitaire', 'sport', 100);
    eventService.createEvent('Soirée Jeux de Société', 'Détente et convivialité autour de jeux de société variés. Ambiance garantie !', new Date('2025-12-19T19:00:00'), 'Foyer Étudiant', 'autre', 30);
    console.log('✅ 5 événements de démonstration ajoutés');
    console.log(eventService.getAll());
    // Rafraîchir l'affichage avec les nouvelles données
    app.init();
}
