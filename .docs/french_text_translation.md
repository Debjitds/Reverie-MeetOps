# French Text Translation — MeetOps

## Purpose

Use this file as the **single translation reference for the French (`fr`) locale** of MeetOps.

The French translation must:
- Use natural, professional French.
- Preserve the existing meaning and UI hierarchy.
- Match the concise, functional tone visible in the French screenshots.
- Preserve placeholders, variables, numbers, dates, times, room names, user names, emails, IDs, and dynamic database values.
- Translate static interface text only.
- Use consistent terminology throughout the application.

---

# 1. Global / Branding

| English | French |
|---|---|
| MEETOPS | MEETOPS |
| Admin | Admin |
| Administrator | Administrateur |
| User | Utilisateur |
| Manager | Directeur |
| Dashboard | Tableau de bord |
| Reservations | Réservations |
| Calendar | Calendrier |
| Resources | Ressources |
| Users | Utilisateurs |
| Search | Recherche |
| Notifications | Notifications |
| Actions | Actions |
| Status | Statut |
| Role | Rôle |
| Location | Emplacement |
| Capacity | Capacité |
| Description | Description |
| Name | Nom |
| Email | E-mail |
| Date | Date |
| Start Time | Heure de début |
| End Time | Fin des temps |
| Type | Type |
| Purpose | But |
| Resource | Ressource |

---

# 2. Sidebar Navigation

| English | French |
|---|---|
| Dashboard | Tableau de bord |
| Bookings | Réservations |
| Reservations | Réservations |
| Calendar | Calendrier |
| Resources | Ressources |
| Users | Utilisateurs |

---

# 3. Header / Account

| English | French |
|---|---|
| Admin | Admin |
| Administrator | Administrateur |
| User | Utilisateur |
| Logout | Déconnexion |
| Confirm Logout | Confirmer la déconnexion |
| Cancel | Annuler |
| Notifications | Notifications |
| Mark all as read | Tout marquer comme lu |

---

# 4. Reservations Page

## Page Header

| English | French |
|---|---|
| Bookings | Réservations |
| Reservations | Réservations |
| Export PDF | Exporter le PDF |
| Export to PDF | Exporter au format PDF |
| New Booking | Nouvelle réservation |
| New Reservation | Nouvelle réservation |

## Filters

| English | French |
|---|---|
| Status | Statut |
| User | Utilisateur |
| Search | Recherche |
| All statuses | Tous les statuts |
| All users | Tous les utilisateurs |
| Search by resource, purpose or user... | Recherche par ressource, objectif ou utilisateur... |

## Reservation Sections

| English | French |
|---|---|
| Active Bookings | Réservations actives |
| Active Reservations | Réservations actives |
| Previous Bookings | Réservations précédentes |
| Previous Reservations | Réservations précédentes |
| Current Bookings | Réservations actuelles |

## Table Headers

| English | French |
|---|---|
| Resource | Ressource |
| User | Utilisateur |
| Purpose | But |
| Date | Date |
| Start Time | Heure de début |
| End Time | Fin des temps |
| Type | Type |
| Status | Statut |
| Action | Actions |
| Actions | Actions |
| View | Voir |
| View Details | Voir les détails |

## Empty States

| English | French |
|---|---|
| No active bookings found | Aucune réservation active trouvée |
| No previous bookings found | Aucune réservation antérieure trouvée |
| No active reservations found | Aucune réservation active trouvée |
| No previous reservations found | Aucune réservation antérieure trouvée |
| No bookings found | Aucune réservation trouvée |

---

# 5. Reservation Statuses

These translations must be used consistently everywhere, including filters, badges, tables, calendars, summaries, notifications, and dialogs.

| English | French |
|---|---|
| Pending | En attente |
| Approved | Approuvé |
| Rejected | Rejeté |
| Cancelled | Annulé |
| Completed | Complété |
| All statuses | Tous les statuts |

---

# 6. Reservation Types

| English | French |
|---|---|
| Single Day | Journée unique |
| One Day | Journée unique |
| Multiple Days | Plusieurs jours |
| Multi-Day | Plusieurs jours |
| Several Days | Plusieurs jours |

Preferred UI wording:

`Multiple Days` → `Plusieurs jours`

---

# 7. Booking Details / Reservation Summary

| English | French |
|---|---|
| Booking Summary | Résumé de la réservation |
| Reservation Summary | Résumé de la réservation |
| Resource | Ressource |
| Location | Emplacement |
| Booking Type | Type de réservation |
| Reservation Type | Type de réservation |
| Start Date | Date de début |
| End Date | Date de fin |
| Total Days | Nombre total de jours |
| Total Number of Days | Nombre total de jours |
| Time | Temps |
| Available Time Slot | Créneau horaire disponible |
| Available Time | Temps disponible |

---

# 8. New Reservation — Step 1

## Page

| English | French |
|---|---|
| New Booking | Nouvelle réservation |
| New Reservation | Nouvelle réservation |
| Create a new resource booking | Créer une nouvelle réservation de ressources |
| Create a new resource reservation | Créer une nouvelle réservation de ressources |

## Step Indicator

| English | French |
|---|---|
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |

## Step 1

| English | French |
|---|---|
| Step 1: Select Resource | Étape 1 : Sélectionner la ressource |
| Select Resource | Sélectionner la ressource |
| Choose the resource you want to reserve | Choisissez la ressource que vous souhaitez réserver |
| Next | Suivant |
| Continue | Suivant |

## Resource Cards

Static labels:

| English | French |
|---|---|
| Capacity | Capacité |
| Seminar Room | Salle de séminaire |
| Special room for Guests | Salle spéciale pour les invités |
| Meeting Room with Projector | Salle de réunion avec projecteur |
| Meeting room for Online Clients | Salle de réunion pour les clients en ligne |
| Meeting With Online Clients | Réunion avec des clients en ligne |
| Small Meetings | Petites réunions |

Do not translate dynamic values such as:

- `Room 10`
- `Room 11`
- `Room 12`
- `Room 13`
- `Room 14`
- `Room 15`
- `2nd Floor`
- `1st Floor`

unless those values are explicitly stored as translatable static UI text.

---

# 9. New Reservation — Step 2

## Step 2 Header

| English | French |
|---|---|
| Step 2: Select Date and Time | Étape 2 : Sélectionner la date et l’heure |
| Select Date and Time | Sélectionner la date et l’heure |
| Choose when you want to reserve {resource} | Choisissez quand vous souhaitez réserver {resource} |

Preserve `{resource}` exactly.

## Reservation Type

| English | French |
|---|---|
| Booking Type | Type de réservation |
| Reservation Type | Type de réservation |
| Single Day | Journée unique |
| Multiple Days | Plusieurs jours |
| One Day | Journée unique |
| Several Days | Plusieurs jours |

## Date Fields

| English | French |
|---|---|
| Start Date | Date de début |
| End Date | Date de fin |
| Start Time | Heure de début |
| End Time | Fin des temps |
| Total Days | Nombre total de jours |
| Total Number of Days | Nombre total de jours |
| Available Time Slot | Créneau horaire disponible |
| Time Slot Available | Créneau horaire disponible |

## Actions

| English | French |
|---|---|
| Back | Dos |
| Previous | Précédent |
| Next | Suivant |

---

# 10. New Reservation — Step 3

## Step Header

| English | French |
|---|---|
| Step 3: Reservation Details | Étape 3 : Détails de la réservation |
| Booking Details | Détails de la réservation |
| Reservation Details | Détails de la réservation |
| Please provide additional information about your reservation. | Veuillez fournir des informations supplémentaires concernant votre réservation. |

## Purpose

| English | French |
|---|---|
| Purpose | But |
| Example: Team Meeting, Client Presentation | Par exemple, réunion d’équipe, présentation au client |
| Generate Agenda with AI | Générer un agenda avec l’IA |
| Generate an Agenda with AI | Générer un agenda avec l’IA |

## Participants

| English | French |
|---|---|
| Attendees (Optional) | Participants (facultatif) |
| Participants (Optional) | Participants (facultatif) |
| Enter attendee names separated by commas. | Veuillez saisir les noms des participants séparés par des virgules. |

## Actions

| English | French |
|---|---|
| Back | Dos |
| Create Booking | Créer une réservation |
| Create Reservation | Créer une réservation |

---

# 11. Reservation Summary

| English | French |
|---|---|
| Booking Summary | Résumé de la réservation |
| Reservation Summary | Résumé de la réservation |
| Resource | Ressource |
| Location | Emplacement |
| Booking Type | Type de réservation |
| Reservation Type | Type de réservation |
| Start Date | Date de début |
| End Date | Date de fin |
| Total Days | Nombre total de jours |
| Total Number of Days | Nombre total de jours |
| Time | Temps |

---

# 12. Calendar

## Page

| English | French |
|---|---|
| Calendar | Calendrier |
| View all resource bookings | Afficher toutes les réservations de ressources |
| View all resource reservations | Afficher toutes les réservations de ressources |

## Calendar Controls

| English | French |
|---|---|
| Today | Aujourd’hui |
| Previous | Dos |
| Back | Dos |
| Next | Suivant |
| Month | Mois |
| Week | Semaine |
| Day | Jour |
| Agenda | Ordre du jour |

## Weekdays

| English | French |
|---|---|
| Monday | Lun. |
| Tuesday | Mar. |
| Wednesday | Mer. |
| Thursday | Jeu. |
| Friday | Ven. |
| Saturday | Sam. |
| Sunday | Dim. |

Preferred abbreviated calendar labels:

`MON` → `LUN.`  
`TUE` → `MAR.`  
`WED` → `MER.`  
`THU` → `JEU.`  
`FRI` → `VEN.`  
`SAT` → `SAM.`  
`SUN` → `DIM.`

## Legend

| English | French |
|---|---|
| Legend | Légende |
| Approved | Approuvé |
| Pending | En attente |
| Rejected | Rejeté |
| Cancelled | Annulé |

---

# 13. Export Reservations to PDF

## Modal

| English | French |
|---|---|
| Export Bookings to PDF | Exporter les réservations au format PDF |
| Export Reservations to PDF | Exporter les réservations au format PDF |
| Select filters to export booking history | Sélectionnez les filtres pour exporter l’historique des réservations |
| Start Date | Date de début |
| End Date | Date de fin |
| Cancel | Annuler |
| Export PDF | Exporter au format PDF |
| Export to PDF | Exporter au format PDF |

Keep date picker values and dates dynamic.

---

# 14. Resources

## Page

| English | French |
|---|---|
| Resources | Ressources |
| Add Resource | Ajouter une ressource |
| Add New Resource | Ajouter une nouvelle ressource |

## Table

| English | French |
|---|---|
| Name | Nom |
| Location | Emplacement |
| Capacity | Capacité |
| Description | Description |
| Action | Actions |

## Delete Resource

| English | French |
|---|---|
| Delete Resource | Supprimer la ressource |
| Are you sure you want to delete "Room 14"? This action cannot be undone. | Êtes-vous sûr de vouloir supprimer « Room 14 » ? Cette action est irréversible. |
| Cancel | Annuler |
| Delete | Supprimer |

Keep `Room 14` dynamic.

## Edit Resource

| English | French |
|---|---|
| Edit Resource | Modifier la ressource |
| Update Resource Information | Mise à jour des informations sur les ressources |
| Update Resource Details | Mise à jour des informations sur les ressources |
| Name | Nom |
| Description | Description |
| Location | Emplacement |
| Capacity | Capacité |
| Update | Mise à jour |
| Cancel | Annuler |

## Add Resource

| English | French |
|---|---|
| Add New Resource | Ajouter une nouvelle ressource |
| Create a new resource for booking | Créer une nouvelle ressource pour la réservation |
| Name | Nom |
| Description | Description |
| Location | Emplacement |
| Capacity | Capacité |
| Enter resource name | Saisissez le nom de la ressource |
| Enter description | Saisissez la description |
| Enter location | Saisissez l’emplacement |
| Create | Créer |
| Cancel | Annuler |

---

# 15. Users

## Page

| English | French |
|---|---|
| Users | Utilisateurs |
| Search | Recherche |
| Search users... | Rechercher des utilisateurs... |

## Table

| English | French |
|---|---|
| Name | Nom |
| Email | E-mail |
| Role | Rôle |
| Joined | Adhésion |
| Actions | Actions |
| Change Role | Changer de rôle |

## User Role Modal

| English | French |
|---|---|
| Change User Role | Modifier le rôle de l'utilisateur |
| Update the role for {name} | Mise à jour du rôle de {name} |
| Current Role | Rôle actuel |
| New Role | Nouveau rôle |

Preserve `{name}` dynamically.

## Roles

| English | French |
|---|---|
| User | Utilisateur |
| Manager | Directeur |
| Administrator | Administrateur |

---

# 16. Dashboard

## Page

| English | French |
|---|---|
| Dashboard | Tableau de bord |
| Welcome back, Admin | Content de te revoir, Admin |

## Statistics

| English | French |
|---|---|
| Total Bookings | Nombre total de réservations |
| Total Reservations | Nombre total de réservations |
| Pending | En attente |
| Approved | Approuvé |
| Rejected | Rejeté |

## Sections

| English | French |
|---|---|
| Upcoming Bookings | Réservations à venir |
| Upcoming Reservations | Réservations à venir |
| No upcoming bookings | Aucune réservation à venir |
| No upcoming reservations | Aucune réservation à venir |
| Quick Actions | Actions rapides |
| New Booking | Nouvelle réservation |
| New Reservation | Nouvelle réservation |
| View All Bookings | Voir toutes les réservations |
| View All Reservations | Voir toutes les réservations |
| Manage Resources | Gérer les ressources |
| AI Insights | Perspectives de l’IA |
| AI Information | Informations sur l’IA |
| Chat with AI Assistant | Discutez avec l’assistant IA |

---

# 17. AI Assistant

## Assistant Titles

| English | French |
|---|---|
| MeetOps AI Assistant | Assistant IA MeetOps |
| MeetOps AI | MeetOps AI |
| AI Assistant | Assistant IA |
| AI Insights | Perspectives de l’IA |
| AI Information | Informations sur l’IA |

## Example Assistant Text

English concept:

"Hi! I am MeetOps AI. I can help you reserve rooms, check availability and manage your bookings."

French:

"Salut ! Je suis MeetOps AI. Je peux vous aider à réserver des salles, à vérifier les disponibilités et à gérer vos réservations."

English concept:

"Try asking: “Reserve a room for 5 people tomorrow at 14:00.”"

French:

"Essayez : « Réservez-moi une salle pour 5 personnes demain à 14h00. »"

## Chat Input

| English | French |
|---|---|
| Type your message... | Saisissez votre message... |
| Enter your message... | Saisissez votre message... |
| Send | Envoyer |

Do not translate dynamically generated AI responses through static translation keys unless the application explicitly provides localized AI responses.

---

# 18. Notifications

## Notification Panel

| English | French |
|---|---|
| Notifications | Notifications |
| Mark all as read | Tout marquer comme lu |

## Notification Examples

Translate static notification templates naturally:

| English | French |
|---|---|
| New multi-day booking request for 4 days | Nouvelle demande de réservation pour plusieurs jours : 4 jours |
| New multi-day booking request for 5 days | Nouvelle demande de réservation pour plusieurs jours : 5 jours |
| New multi-day booking request for 16 days | Nouvelle demande de réservation pour plusieurs jours : 16 jours |
| Your booking for Room 10 has been approved | Votre réservation pour la Room 10 a été approuvée |

Keep room names, numbers, dates, and dynamic values unchanged.

---

# 19. Logout Confirmation

## Modal

| English | French |
|---|---|
| Confirm Logout | CONFIRMER LA DÉCONNEXION |
| Are you sure you want to logout? | Êtes-vous sûr de vouloir vous déconnecter ? |
| You will need to sign in again to access your dashboard and bookings. | Vous devrez vous reconnecter pour accéder à votre tableau de bord et à vos réservations. |
| Cancel | ANNULER |
| Logout | DÉCONNEXION |

For the modal shown in the screenshots, preserve the existing uppercase visual convention where the UI already uses uppercase labels.

---

# 20. Buttons / Common Actions

| English | French |
|---|---|
| Back | Dos |
| Previous | Précédent |
| Next | Suivant |
| Continue | Continuer |
| Cancel | Annuler |
| Create | Créer |
| Update | Mise à jour |
| Delete | Supprimer |
| Add | Ajouter |
| Edit | Modifier |
| View | Voir |
| View Details | Voir les détails |
| Save | Enregistrer |
| Close | Fermer |
| Send | Envoyer |
| Export PDF | Exporter le PDF |
| Export to PDF | Exporter au format PDF |
| Logout | Déconnexion |
| Change Role | Changer de rôle |

---

# 21. Common Form Labels

| English | French |
|---|---|
| Required | Obligatoire |
| Optional | Facultatif |
| Name | Nom |
| Description | Description |
| Location | Emplacement |
| Capacity | Capacité |
| Resource | Ressource |
| User | Utilisateur |
| Purpose | But |
| Participants | Participants |
| Start Date | Date de début |
| End Date | Date de fin |
| Start Time | Heure de début |
| End Time | Fin des temps |

---

# 22. Toast Notifications

These are explicitly included so toast messages must also be localized.

## Booking / Reservation

| English Toast | French Toast |
|---|---|
| Booking created successfully | Réservation créée avec succès |
| Reservation created successfully | Réservation créée avec succès |
| Booking updated successfully | Réservation mise à jour avec succès |
| Reservation updated successfully | Réservation mise à jour avec succès |
| Booking cancelled successfully | Réservation annulée avec succès |
| Reservation cancelled successfully | Réservation annulée avec succès |
| Booking approved successfully | Réservation approuvée avec succès |
| Booking rejected successfully | Réservation rejetée avec succès |
| Booking deleted successfully | Réservation supprimée avec succès |
| Reservation deleted successfully | Réservation supprimée avec succès |

## Resource

| English Toast | French Toast |
|---|---|
| Resource created successfully | Ressource créée avec succès |
| Resource updated successfully | Ressource mise à jour avec succès |
| Resource deleted successfully | Ressource supprimée avec succès |

## User / Role

| English Toast | French Toast |
|---|---|
| Role updated successfully | Rôle mis à jour avec succès |
| User role updated successfully | Rôle de l’utilisateur mis à jour avec succès |

## Authentication

| English Toast | French Toast |
|---|---|
| Logged out successfully | Déconnexion réussie |
| Login successful | Connexion réussie |
| Session expired | Votre session a expiré |

## Errors

| English Toast | French Toast |
|---|---|
| Something went wrong | Une erreur s’est produite |
| Failed to create booking | Échec de la création de la réservation |
| Failed to update booking | Échec de la mise à jour de la réservation |
| Failed to delete booking | Échec de la suppression de la réservation |
| Failed to create resource | Échec de la création de la ressource |
| Failed to update resource | Échec de la mise à jour de la ressource |
| Failed to delete resource | Échec de la suppression de la ressource |
| Failed to update role | Échec de la mise à jour du rôle |
| Please try again | Veuillez réessayer |

---

# 23. Validation Messages

| English | French |
|---|---|
| This field is required | Ce champ est obligatoire |
| Please enter a name | Veuillez saisir un nom |
| Please enter a description | Veuillez saisir une description |
| Please enter a location | Veuillez saisir un emplacement |
| Please enter a purpose | Veuillez saisir un objectif |
| Please select a resource | Veuillez sélectionner une ressource |
| Please select a date | Veuillez sélectionner une date |
| Please select a time | Veuillez sélectionner une heure |
| Invalid date | Date invalide |
| Invalid time | Heure invalide |
| End date must be after start date | La date de fin doit être postérieure à la date de début |
| End time must be after start time | L’heure de fin doit être postérieure à l’heure de début |

---

# 24. Empty / Loading / Generic Messages

| English | French |
|---|---|
| No data found | Aucune donnée trouvée |
| No results found | Aucun résultat trouvé |
| Nothing found | Rien trouvé |
| No bookings found | Aucune réservation trouvée |
| No reservations found | Aucune réservation trouvée |
| Loading... | Chargement... |
| Please wait... | Veuillez patienter... |
| No upcoming reservations | Aucune réservation à venir |

---

# 25. Confirmation Dialogs

## Generic Delete

| English | French |
|---|---|
| Delete | Supprimer |
| Cancel | Annuler |
| This action cannot be undone. | Cette action est irréversible. |
| Are you sure? | Êtes-vous sûr ? |

## Resource Delete

Use:

`Êtes-vous sûr de vouloir supprimer « {resourceName} » ? Cette action est irréversible.`

Preserve `{resourceName}` dynamically.

## Logout

Use:

`Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre tableau de bord et à vos réservations.`

---

# 26. Calendar / Date Localization

When translating calendar UI:

- Keep numeric dates unchanged.
- Keep years unchanged.
- Keep times unchanged unless the application's existing locale formatter explicitly localizes them.
- Translate month names and weekday labels only through the localization system.
- Do not hardcode translated dates inside components.

Month names:

| English | French |
|---|---|
| January | janvier |
| February | février |
| March | mars |
| April | avril |
| May | mai |
| June | juin |
| July | juillet |
| August | août |
| September | septembre |
| October | octobre |
| November | novembre |
| December | décembre |

---

# 27. Dynamic Data Rules

The following must remain dynamic and MUST NOT be statically translated:

- Room names
- User names
- Email addresses
- Booking purposes entered by users
- Resource descriptions entered by users
- Dates
- Times
- Numbers
- Reservation IDs
- Database values
- API values
- User-generated content

Examples:

`Room 14` → keep as `Room 14`

`Admin` as database/user data → keep dynamic unless it is specifically a UI role label.

`Meeting With Online Clients` as resource description stored in the database → do not automatically replace the database value with a translated value.

---

# 28. Placeholder Rules

Never translate or modify placeholders/variables such as:

`{resource}`  
`{name}`  
`{user}`  
`{room}`  
`{days}`  
`{date}`  
`{time}`  
`{count}`  
`{id}`

Examples:

English:
`Choose when you want to reserve {resource}`

French:
`Choisissez quand vous souhaitez réserver {resource}`

English:
`Update the role for {name}`

French:
`Mise à jour du rôle de {name}`

---

# 29. Tone and Translation Style

Use:
- Professional French
- Clear SaaS terminology
- Concise UI wording
- Natural French sentence structure
- Consistent terminology

Avoid:
- Literal awkward translations
- Unnecessary English words
- Excessively formal language
- Different translations for the same UI concept
- Translation of dynamic database values

Preferred terminology:

`Booking / Reservation` → `Réservation`

`Resource` → `Ressource`

`Dashboard` → `Tableau de bord`

`Pending` → `En attente`

`Approved` → `Approuvé`

`Rejected` → `Rejeté`

`Cancelled` → `Annulé`

`Completed` → `Complété`

`User` → `Utilisateur`

`Manager` → `Directeur`

`Administrator` → `Administrateur`

---

# 30. Final Implementation Requirement

The French locale must be fully functional across the application.

Changing the language to French must update all static UI text, including:

- Sidebar
- Header
- Dashboard
- Reservations
- Filters
- Statuses
- Calendar
- Calendar controls
- New reservation Step 1
- New reservation Step 2
- New reservation Step 3
- Reservation summary
- PDF export modal
- Resources
- Resource creation modal
- Resource edit modal
- Resource deletion confirmation
- Users
- Role change modal
- Logout confirmation
- Notifications
- Empty states
- Validation messages
- Error messages
- Confirmation dialogs
- Buttons
- AI assistant static text
- Toast notifications
- Pagination controls
- Language selector

Do not modify application behavior while implementing the translation.

The translation must use the application's existing i18n architecture and preserve all existing functionality.