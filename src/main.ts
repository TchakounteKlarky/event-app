
/**
 * Point d'entrée principal de l'application
 */

import { EventRepositories } from "./repositories/events.repositories.js";
import { InscriptionRepositories } from "./repositories/inscriptions.repositories.js";
import { UserRpositories } from "./repositories/user.repositories.js";
import { EventsServices } from "./services/events.services.js";
import { InscriptionsServices } from "./services/inscriptions.services.js";
import { UserServices } from "./services/user.services.js";
import { AppUi } from "./ui/AppUi.js";

// ========== 1. Initialisation des Repositories ==========
const eventRepository = new EventRepositories();
const userRepository = new UserRpositories();
const inscriptionRepository = new InscriptionRepositories();

// ========== 2. Initialisation des Services ==========
const eventService = new EventsServices(eventRepository, inscriptionRepository);
const userService = new UserServices(userRepository);
const inscriptionService = new InscriptionsServices(
  inscriptionRepository,
  userRepository,
  eventRepository
  
);

// ========== 3. Initialisation de l'interface utilisateur ==========
const app = new AppUi(eventService, inscriptionService, userService);

// ========== 4. Démarrage de l'application ==========
// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  
  // Optionnel : Ajouter quelques événements de démonstration
  ajouterDonneesDemo();
});

/**
 * Ajoute quelques événements de démonstration (optionnel)
 */
function ajouterDonneesDemo(): void {
  // Événement 1
  // eventService.createEvent(
  //   'Conférence TypeScript Avancé',
  //   'Découvrez les fonctionnalités avancées de TypeScript : types conditionnels, génériques, mapped types...',
  //   new Date('2025-12-20T14:00:00'),
  //   'Amphithéâtre A - Bâtiment Sciences',
  //   'conférence',
  //   50
  // );

  // Événement 2
  eventService.createEvent(
    'Tournoi de Football Inter-Promotions',
    'Venez supporter ou participer au grand tournoi annuel ! Inscriptions par équipe de 7 joueurs.',
    new Date('2025-12-18T16:00:00'),
    'Stade Universitaire',
    'sport',
    100
  );

  // Événement 3
  // eventService.createEvent(
  //   'Atelier Développement Web Moderne',
  //   'Apprenez à créer des applications web modernes avec HTML, CSS et JavaScript. Pas de prérequis nécessaire.',
  //   new Date('2025-12-22T10:00:00'),
  //   'Salle Informatique B102',
  //   'atelier',
  //   25
  // );

  // Événement 4 (dans le passé pour tester l'affichage)
  // eventService.createEvent(
  //   'Séminaire Intelligence Artificielle',
  //   'Retour sur les avancées récentes en IA et machine learning.',
  //   new Date('2025-12-10T09:00:00'),
  //   'Amphithéâtre C',
  //   'conférence',
  //   80
  // );

  // Événement 5
  // eventService.createEvent(
  //   'Soirée Jeux de Société',
  //   'Détente et convivialité autour de jeux de société variés. Ambiance garantie !',
  //   new Date('2025-12-19T19:00:00'),
  //   'Foyer Étudiant',
  //   'autre',
  //   30
  // );

  console.log('✅ 5 événements de démonstration ajoutés');
  console.log(eventService.getAll());
  
  // Rafraîchir l'affichage avec les nouvelles données
  app.init();
}