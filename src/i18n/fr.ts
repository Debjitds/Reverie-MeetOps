/**
 * French (fr) static UI dictionary.
 *
 * Values transcribed from `.docs/french_text_translation.md`
 * (the single English → French reference specification), mapped onto the
 * app's existing dot-notation keys. Doc wording is preserved exactly where
 * specified (including "Fin des temps", "Dos", "Directeur", curly apostrophes
 * and « » quotes). The doc's "Welcome back, Admin" drops the dynamic name
 * because the JSX renders it (DashboardPage); the doc's logout-modal caps
 * are the UI's existing uppercase convention, kept here in title case.
 * The doc's delete-resource entry hardcodes "Room 14" but the calling code
 * interpolates "{name}", so the code's placeholder is preserved. Entries
 * without a doc match (auth form labels, a few toasts) use the doc's own
 * vocabulary. Interpolation placeholders ({resource}, {name}, {count},
 * {total_days}, {nativeName}, {error.message}, {bookingError.message}) must
 * match the calling code exactly. Keys missing here fall back to English.
 */
export const fr: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'MEETOPS',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'Tableau de bord',
  'nav.bookings': 'Réservations',
  'nav.calendar': 'Calendrier',
  'nav.resources': 'Ressources',
  'nav.users': 'Utilisateurs',
  'nav.notifications': 'Notifications',

  // ===== HEADER ROLES =====
  'navbar.admin': 'Admin',
  'navbar.manager': 'Directeur',
  'navbar.user': 'Utilisateur',
  'navbar.logout': 'Déconnexion',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'Confirmer la déconnexion',
  'logoutDialog.description':
    'Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre tableau de bord et à vos réservations.',
  'logoutDialog.cancel': 'Annuler',
  'logoutDialog.logout': 'Déconnexion',

  // ===== DASHBOARD =====
  'dashboard.title': 'Tableau de bord',
  'dashboard.welcome': 'Content de te revoir',
  'dashboard.totalBookings': 'Nombre total de réservations',
  'dashboard.pendingBookings': 'En attente',
  'dashboard.approvedBookings': 'Approuvé',
  'dashboard.rejectedBookings': 'Rejeté',
  'dashboard.upcomingBookings': 'Réservations à venir',
  'dashboard.noUpcomingBookings': 'Aucune réservation à venir',
  'dashboard.quickActions': 'Actions rapides',
  'dashboard.newBooking': 'Nouvelle réservation',
  'dashboard.viewAllBookings': 'Voir toutes les réservations',
  'dashboard.manageResources': 'Gérer les ressources',
  'dashboard.aiInsights': 'Perspectives de l’IA',
  'dashboard.chatWithAI': 'Discutez avec l’assistant IA',

  // ===== NOTIFICATIONS =====
  'notifications.title': 'Notifications',
  'notifications.markAllAsRead': 'Tout marquer comme lu',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'Assistant IA MeetOps',
  'chat.greeting':
    'Salut ! Je suis MeetOps AI. Je peux vous aider à réserver des salles, à vérifier les disponibilités et à gérer vos réservations.',
  'chat.examplePrompt': 'Essayez : « Réservez-moi une salle pour 5 personnes demain à 14h00. »',
  'chat.placeholder': 'Saisissez votre message...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'Réservations',
  'bookings.activeBookings': 'Réservations actives',
  'bookings.pastBookings': 'Réservations précédentes',
  'bookings.exportPDF': 'Exporter le PDF',
  'bookings.newBooking': 'Nouvelle réservation',
  'bookings.status': 'Statut',
  'bookings.allStatuses': 'Tous les statuts',
  'bookings.pending': 'En attente',
  'bookings.approved': 'Approuvé',
  'bookings.rejected': 'Rejeté',
  'bookings.cancelled': 'Annulé',
  'bookings.completed': 'Complété',
  'bookings.user': 'Utilisateur',
  'bookings.allUsers': 'Tous les utilisateurs',
  'bookings.search': 'Recherche',
  'bookings.searchPlaceholder': 'Recherche par ressource, objectif ou utilisateur...',
  'bookings.resource': 'Ressource',
  'bookings.purpose': 'But',
  'bookings.date': 'Date',
  'bookings.startTime': 'Heure de début',
  'bookings.endTime': 'Fin des temps',
  'bookings.type': 'Type',
  'bookings.actions': 'Actions',
  'bookings.view': 'Voir',
  'bookings.viewDetails': 'Voir les détails',
  'bookings.multiDay': 'Plusieurs jours',
  'bookings.singleDay': 'Journée unique',
  'bookings.noActiveBookings': 'Aucune réservation active trouvée',
  'bookings.noPastBookings': 'Aucune réservation antérieure trouvée',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'Exporter les réservations au format PDF',
  'bookings.exportDescription': 'Sélectionnez les filtres pour exporter l’historique des réservations',
  'bookings.startDate': 'Date de début',
  'bookings.endDate': 'Date de fin',
  'bookings.exportButton': 'Exporter au format PDF',
  'bookings.cancelButton': 'Annuler',

  // ===== PAGINATION =====
  'bookings.previous': 'Précédent',
  'bookings.next': 'Suivant',
  'bookings.page': 'Page',
  'bookings.of': 'sur',

  // ===== NEW BOOKING =====
  'newBooking.title': 'Nouvelle réservation',
  'newBooking.subtitle': 'Créer une nouvelle réservation de ressources',
  'newBooking.step1Title': 'Étape 1 : Sélectionner la ressource',
  'newBooking.step1Description': 'Choisissez la ressource que vous souhaitez réserver',
  'newBooking.step2Title': 'Étape 2 : Sélectionner la date et l’heure',
  'newBooking.step2Description': 'Choisissez quand vous souhaitez réserver {resource}',
  'newBooking.step3Title': 'Étape 3 : Détails de la réservation',
  'newBooking.step3Description': 'Veuillez fournir des informations supplémentaires concernant votre réservation.',
  'newBooking.bookingType': 'Type de réservation',
  'newBooking.singleDay': 'Journée unique',
  'newBooking.multiDay': 'Plusieurs jours',
  'newBooking.startDate': 'Date de début',
  'newBooking.endDate': 'Date de fin',
  'newBooking.startTime': 'Heure de début',
  'newBooking.endTime': 'Fin des temps',
  'newBooking.totalDays': 'Nombre total de jours',
  'newBooking.timeSlotAvailable': 'Créneau horaire disponible',
  'newBooking.purposeLabel': 'But',
  'newBooking.purposePlaceholder': 'Par exemple, réunion d’équipe, présentation au client',
  'newBooking.attendeesLabel': 'Participants (facultatif)',
  'newBooking.attendeesPlaceholder': 'Veuillez saisir les noms des participants séparés par des virgules.',
  'newBooking.generateAgendaButton': 'Générer un agenda avec l’IA',
  'newBooking.bookingSummary': 'Résumé de la réservation',
  'newBooking.createBooking': 'Créer une réservation',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': 'Détails de la réservation',
  'bookingDetails.resource': 'Ressource',
  'bookingDetails.location': 'Emplacement',
  'bookingDetails.startTime': 'Heure de début',
  'bookingDetails.endTime': 'Fin des temps',
  'bookingDetails.purpose': 'But',
  'bookingDetails.attendees': 'Participants',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'Calendrier',
  'calendar.subtitle': 'Afficher toutes les réservations de ressources',
  'calendar.month': 'Mois',
  'calendar.week': 'Semaine',
  'calendar.day': 'Jour',
  'calendar.agenda': 'Ordre du jour',
  'calendar.today': 'Aujourd’hui',
  'calendar.back': 'Dos',
  'calendar.next': 'Suivant',
  'calendar.legend': 'Légende',
  'calendar.approved': 'Approuvé',
  'calendar.pending': 'En attente',
  'calendar.rejected': 'Rejeté',
  'calendar.cancelled': 'Annulé',

  // ===== RESOURCES PAGE =====
  'resources.title': 'Ressources',
  'resources.addResource': 'Ajouter une ressource',
  'resources.name': 'Nom',
  'resources.location': 'Emplacement',
  'resources.capacity': 'Capacité',
  'resources.description': 'Description',
  'resources.actions': 'Actions',
  'resources.addTitle': 'Ajouter une nouvelle ressource',
  'resources.editTitle': 'Modifier la ressource',
  'resources.addDescription': 'Créer une nouvelle ressource pour la réservation',
  'resources.editDescription': 'Mise à jour des informations sur les ressources',
  'resources.namePlaceholder': 'Saisissez le nom de la ressource',
  'resources.locationPlaceholder': 'Saisissez l’emplacement',
  'resources.descriptionPlaceholder': 'Saisissez la description',
  'resources.create': 'Créer',
  'resources.update': 'Mise à jour',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'Supprimer la ressource',
  'resources.deleteDescription': 'Êtes-vous sûr de vouloir supprimer « {name} » ? Cette action est irréversible.',

  // ===== USERS PAGE =====
  'users.title': 'Utilisateurs',
  'users.name': 'Nom',
  'users.email': 'E-mail',
  'users.role': 'Rôle',
  'users.joined': 'Adhésion',
  'users.actions': 'Actions',
  'users.changeRole': 'Changer de rôle',
  'users.changeRoleTitle': 'Modifier le rôle de l’utilisateur',
  'users.currentRole': 'Rôle actuel',
  'users.newRole': 'Nouveau rôle',
  'users.updateRole': 'Mise à jour',
  'users.searchPlaceholder': 'Rechercher des utilisateurs...',
  'users.admin': 'Administrateur',
  'users.manager': 'Directeur',
  'users.user': 'Utilisateur',

  // ===== COMMON =====
  'common.cancel': 'Annuler',
  'common.back': 'Dos',
  'common.next': 'Suivant',
  'common.previous': 'Précédent',
  'common.today': 'Aujourd’hui',
  'common.view': 'Voir',
  'common.viewDetails': 'Voir les détails',
  'common.search': 'Recherche',
  'common.filter': 'Filtre',
  'common.date': 'Date',
  'common.name': 'Nom',
  'common.description': 'Description',
  'common.delete': 'Supprimer',
  'common.remove': 'Retirer',
  'common.edit': 'Modifier',
  'common.create': 'Créer',
  'common.update': 'Mise à jour',
  'common.actions': 'Actions',
  'common.status': 'Statut',

  // ===== AUTHENTICATION =====
  'auth.appName': 'MEETOPS',
  'auth.subtitle': 'Système de gestion des réservations de ressources',
  'auth.welcome': 'Bienvenue',
  'auth.loginOrRegister': 'Connectez-vous ou créez un nouveau compte',
  'auth.loginTab': 'Connexion',
  'auth.registerTab': 'Inscription',
  'auth.fullName': 'Nom complet',
  'auth.fullNamePlaceholder': 'Saisissez votre nom complet',
  'auth.username': 'Nom d’utilisateur',
  'auth.usernameRegisterPlaceholder': 'Lettres, chiffres et traits de soulignement uniquement',
  'auth.password': 'Mot de passe',
  'auth.passwordRegisterPlaceholder': 'Au moins 8 caractères avec lettres et chiffres',
  'auth.confirmPassword': 'Confirmer le mot de passe',
  'auth.confirmPasswordPlaceholder': 'Saisissez à nouveau le mot de passe',
  'auth.termsAgreement': 'J’accepte le contrat d’utilisation et la politique de confidentialité',
  'auth.registerButton': 'S’inscrire',
  'auth.usernameLoginPlaceholder': 'Saisissez votre nom d’utilisateur',
  'auth.passwordLoginPlaceholder': 'Saisissez votre mot de passe',
  'auth.forgotPassword': 'Mot de passe oublié ?',
  'auth.loginButton': 'Connexion',
  'auth.fetchUserInfoFailed': 'Impossible de récupérer les informations de l’utilisateur : {error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'Veuillez saisir le nom d’utilisateur et le mot de passe',
  'login.usernameFormat': 'Le nom d’utilisateur ne peut contenir que des lettres, des chiffres et des traits de soulignement',
  'login.loginFailed': 'Échec de la connexion : {error.message}',
  'login.loginSuccess': 'Connexion réussie',
  'login.fillAllFields': 'Veuillez remplir tous les champs requis',
  'login.passwordMinLength': 'Le mot de passe doit contenir au moins 8 caractères',
  'login.passwordRequirements': 'Le mot de passe doit contenir des lettres et des chiffres',
  'login.passwordsDoNotMatch': 'Les mots de passe ne correspondent pas',
  'login.agreeToTermsRequired': 'Veuillez accepter le contrat d’utilisation et la politique de confidentialité',
  'login.registrationFailed': 'Échec de l’inscription : {error.message}',
  'login.registrationSuccess': 'Inscription réussie ! Vous pouvez maintenant vous connecter.',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'Veuillez remplir tous les champs requis',
  'register.usernameFormat': 'Le nom d’utilisateur ne peut contenir que des lettres, des chiffres et des traits de soulignement',
  'register.passwordMinLength': 'Le mot de passe doit contenir au moins 8 caractères',
  'register.passwordRequirements': 'Le mot de passe doit contenir des lettres et des chiffres',
  'register.passwordsDoNotMatch': 'Les mots de passe ne correspondent pas',
  'register.agreeToTermsRequired': 'Veuillez accepter le contrat d’utilisation et la politique de confidentialité',
  'register.registrationFailed': 'Échec de l’inscription : {error.message}',
  'register.registrationSuccess': 'Inscription réussie ! Redirection vers le tableau de bord...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'Veuillez saisir votre nom d’utilisateur',
  'resetPassword.usernameFormat': 'Le nom d’utilisateur ne peut contenir que des lettres, des chiffres et des traits de soulignement',
  'resetPassword.sendFailed': 'Échec de l’envoi du lien de réinitialisation : {error.message}',
  'resetPassword.sendSuccess': 'Lien de réinitialisation envoyé ! Vérifiez votre e-mail.',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': 'Veuillez saisir un objectif',
  'newBooking.resourceRequired': 'Veuillez sélectionner une ressource',
  'newBooking.dateRequired': 'Veuillez sélectionner une date',
  'newBooking.startTimeRequired': 'Veuillez sélectionner une heure',
  'newBooking.invalidTimeRange': 'L’heure de fin doit être postérieure à l’heure de début',
  'newBooking.conflictDetected': 'Ce créneau horaire est déjà réservé',
  'newBooking.createFailed': 'Échec de la création de la réservation : {bookingError.message}',
  'newBooking.createSuccess': 'Réservation créée avec succès',
  'newBooking.multiDayCreateFailed': 'Échec de la création de la réservation de plusieurs jours',
  'newBooking.multiDayCreateSuccess': 'Réservation de plusieurs jours créée avec succès ! ({total_days} jours)',
  'newBooking.generalCreateFailed': 'Échec de la création de la réservation',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'Veuillez sélectionner les dates de début et de fin pour l’exportation',
  'bookings.noBookingsForFilters': 'Aucune réservation trouvée pour les filtres sélectionnés',
  'bookings.exportSuccess': '{count} réservations exportées en PDF',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': 'Introuvable',
  'toast.approveMultiDayFailed': 'Échec de l’approbation de la réservation de plusieurs jours : {error.message}',
  'toast.approveFailed': 'Échec de l’approbation de la réservation : {error.message}',
  'toast.bookingApproved': 'Réservation approuvée avec succès',
  'toast.rejectMultiDayFailed': 'Échec du rejet de la réservation de plusieurs jours : {error.message}',
  'toast.rejectFailed': 'Échec du rejet de la réservation : {error.message}',
  'toast.bookingRejected': 'Réservation rejetée avec succès',
  'toast.cancelMultiDayFailed': 'Échec de l’annulation de la réservation de plusieurs jours : {error.message}',
  'toast.cancelFailed': 'Échec de l’annulation de la réservation : {error.message}',
  'toast.bookingCancelled': 'Réservation annulée avec succès',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'Ce champ est obligatoire',
  'toast.resourceUpdateFailed': 'Échec de la mise à jour de la ressource : {error.message}',
  'toast.resourceUpdated': 'Ressource mise à jour avec succès',
  'toast.resourceCreateFailed': 'Échec de la création de la ressource : {error.message}',
  'toast.resourceCreated': 'Ressource créée avec succès',
  'resources.deleteWarning': 'Impossible de supprimer une ressource avec des réservations actives',
  'toast.resourceDeleteFailed': 'Échec de la suppression de la ressource : {error.message}',
  'toast.resourceDeleted': 'Ressource supprimée avec succès',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'Échec de la mise à jour du rôle de l’utilisateur : {error.message}',
  'toast.userRoleChanged': 'Rôle de l’utilisateur mis à jour avec succès',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': 'Langue mise à jour avec succès !',
  'language.updateFailed': 'Échec de la mise à jour de la langue. Veuillez réessayer.',
  'language.changedTo': 'Langue changée en {nativeName}',
  'language.changeFailed': 'Échec du changement de langue. Veuillez réessayer.',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'Échec de l’envoi du message. Veuillez réessayer.',
  'common.somethingWentWrong': 'Une erreur s’est produite',
  'toast.operationSuccess': 'Opération effectuée avec succès',
  'toast.operationFailed': 'L’opération a échoué',
};
