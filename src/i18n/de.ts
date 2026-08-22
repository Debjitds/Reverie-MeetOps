/**
 * German (de / de-DE) static UI dictionary.
 *
 * Values transcribed from `.docs/german_text_translation.md`
 * (the single English → German reference specification), mapped onto the
 * app's existing dot-notation keys. Doc wording is preserved exactly where
 * specified (including "Armaturenbrett", "Sicht", "Stornieren", "Vollendet",
 * "Verfügbare Zeitsätze" and „ " quotes). The doc's "Welcome back, Admin"
 * drops the dynamic name because the JSX renders it (DashboardPage); the
 * doc's delete-resource entry hardcodes "Room 14" but the calling code
 * interpolates "{name}", so the code's placeholder is preserved. Entries
 * without a doc match (auth form labels, a few toasts) use the doc's own
 * vocabulary. Interpolation placeholders ({resource}, {name}, {count},
 * {total_days}, {nativeName}, {error.message}, {bookingError.message}) must
 * match the calling code exactly. Keys missing here fall back to English.
 */
export const de: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'MEETOPS',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'Armaturenbrett',
  'nav.bookings': 'Buchungen',
  'nav.calendar': 'Kalender',
  'nav.resources': 'Ressourcen',
  'nav.users': 'Benutzer',
  'nav.notifications': 'Benachrichtigungen',

  // ===== HEADER ROLES =====
  'navbar.admin': 'Administrator',
  'navbar.manager': 'Manager',
  'navbar.user': 'Benutzer',
  'navbar.logout': 'Abmelden',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'Abmeldung bestätigen',
  'logoutDialog.description':
    'Sind Sie sicher, dass Sie sich abmelden möchten? Sie müssen sich erneut anmelden, um auf Ihr Dashboard und Ihre Buchungen zugreifen zu können.',
  'logoutDialog.cancel': 'Stornieren',
  'logoutDialog.logout': 'Abmelden',

  // ===== DASHBOARD =====
  'dashboard.title': 'Armaturenbrett',
  'dashboard.welcome': 'Willkommen zurück',
  'dashboard.totalBookings': 'Gesamtbuchungen',
  'dashboard.pendingBookings': 'Ausstehend',
  'dashboard.approvedBookings': 'Genehmigt',
  'dashboard.rejectedBookings': 'Abgelehnt',
  'dashboard.upcomingBookings': 'Bevorstehende Buchungen',
  'dashboard.noUpcomingBookings': 'Keine anstehenden Buchungen',
  'dashboard.quickActions': 'Schnellaktionen',
  'dashboard.newBooking': 'Neubuchung',
  'dashboard.viewAllBookings': 'Alle Buchungen anzeigen',
  'dashboard.manageResources': 'Ressourcen verwalten',
  'dashboard.aiInsights': 'KI-Einblicke',
  'dashboard.chatWithAI': 'Chatten Sie mit dem KI-Assistenten',

  // ===== NOTIFICATIONS =====
  'notifications.title': 'Benachrichtigungen',
  'notifications.markAllAsRead': 'Alle als gelesen markieren',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'MeetOps KI-Assistent',
  'chat.greeting':
    'Hallo! Ich bin MeetOps KI. Ich kann Ihnen helfen, Räume zu buchen, die Verfügbarkeit zu prüfen und Ihre Buchungen zu verwalten.',
  'chat.examplePrompt': 'Versuchen Sie es mit: „Buchen Sie morgen um 14:00 Uhr einen Raum für 5 Personen.“',
  'chat.placeholder': 'Geben Sie Ihre Nachricht ein...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'Buchungen',
  'bookings.activeBookings': 'Aktive Buchungen',
  'bookings.pastBookings': 'Vergangene Buchungen',
  'bookings.exportPDF': 'PDF exportieren',
  'bookings.newBooking': 'Neubuchung',
  'bookings.status': 'Status',
  'bookings.allStatuses': 'Alle Status',
  'bookings.pending': 'Ausstehend',
  'bookings.approved': 'Genehmigt',
  'bookings.rejected': 'Abgelehnt',
  'bookings.cancelled': 'Abgesagt',
  'bookings.completed': 'Vollendet',
  'bookings.user': 'Benutzer',
  'bookings.allUsers': 'Alle Benutzer',
  'bookings.search': 'Suchen',
  'bookings.searchPlaceholder': 'Suche nach Ressource, Zweck oder Benutzer...',
  'bookings.resource': 'Ressource',
  'bookings.purpose': 'Zweck',
  'bookings.date': 'Datum',
  'bookings.startTime': 'Startzeit',
  'bookings.endTime': 'Endzeit',
  'bookings.type': 'Typ',
  'bookings.actions': 'Aktionen',
  'bookings.view': 'Sicht',
  'bookings.viewDetails': 'Details anzeigen',
  'bookings.multiDay': 'Mehrtägig',
  'bookings.singleDay': 'Einzelner Tag',
  'bookings.noActiveBookings': 'Keine aktiven Buchungen gefunden',
  'bookings.noPastBookings': 'Keine früheren Buchungen gefunden',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'Buchungen als PDF exportieren',
  'bookings.exportDescription': 'Wählen Sie Filter aus, um den Buchungsverlauf zu exportieren',
  'bookings.startDate': 'Startdatum',
  'bookings.endDate': 'Enddatum',
  'bookings.exportButton': 'PDF exportieren',
  'bookings.cancelButton': 'Stornieren',

  // ===== PAGINATION =====
  'bookings.previous': 'Vorherige',
  'bookings.next': 'Nächste',
  'bookings.page': 'Seite',
  'bookings.of': 'von',

  // ===== NEW BOOKING =====
  'newBooking.title': 'Neubuchung',
  'newBooking.subtitle': 'Neue Ressourcenbuchung erstellen',
  'newBooking.step1Title': 'Schritt 1: Ressource auswählen',
  'newBooking.step1Description': 'Wählen Sie die Ressource aus, die Sie buchen möchten',
  'newBooking.step2Title': 'Schritt 2: Datum und Uhrzeit auswählen',
  'newBooking.step2Description': 'Wählen Sie aus, wann Sie {resource} buchen möchten',
  'newBooking.step3Title': 'Schritt 3: Buchungsdetails',
  'newBooking.step3Description': 'Bitte geben Sie zusätzliche Informationen zu Ihrer Buchung an.',
  'newBooking.bookingType': 'Buchungsart',
  'newBooking.singleDay': 'Einzelner Tag',
  'newBooking.multiDay': 'Mehrtägig',
  'newBooking.startDate': 'Startdatum',
  'newBooking.endDate': 'Enddatum',
  'newBooking.startTime': 'Startzeit',
  'newBooking.endTime': 'Endzeit',
  'newBooking.totalDays': 'Gesamtzahl der Tage',
  'newBooking.timeSlotAvailable': 'Verfügbare Zeitsätze',
  'newBooking.purposeLabel': 'Zweck',
  'newBooking.purposePlaceholder': 'z. B. Teambesprechung, Kundenpräsentation',
  'newBooking.attendeesLabel': 'Teilnehmer (Optional)',
  'newBooking.attendeesPlaceholder': 'Geben Sie die Namen der Teilnehmer durch Kommas getrennt ein.',
  'newBooking.generateAgendaButton': 'Agenda mit KI generieren',
  'newBooking.bookingSummary': 'Buchungsübersicht',
  'newBooking.createBooking': 'Buchung erstellen',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': 'Buchungsdetails',
  'bookingDetails.resource': 'Ressource',
  'bookingDetails.location': 'Standort',
  'bookingDetails.startTime': 'Startzeit',
  'bookingDetails.endTime': 'Endzeit',
  'bookingDetails.purpose': 'Zweck',
  'bookingDetails.attendees': 'Teilnehmer',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'Kalender',
  'calendar.subtitle': 'Alle Ressourcenbuchungen anzeigen',
  'calendar.month': 'Monat',
  'calendar.week': 'Woche',
  'calendar.day': 'Tag',
  'calendar.agenda': 'Agenda',
  'calendar.today': 'Heute',
  'calendar.back': 'Zurück',
  'calendar.next': 'Nächste',
  'calendar.legend': 'Legende',
  'calendar.approved': 'Genehmigt',
  'calendar.pending': 'Ausstehend',
  'calendar.rejected': 'Abgelehnt',
  'calendar.cancelled': 'Abgesagt',

  // ===== RESOURCES PAGE =====
  'resources.title': 'Ressourcen',
  'resources.addResource': 'Ressource hinzufügen',
  'resources.name': 'Name',
  'resources.location': 'Standort',
  'resources.capacity': 'Kapazität',
  'resources.description': 'Beschreibung',
  'resources.actions': 'Aktionen',
  'resources.addTitle': 'Neue Ressource hinzufügen',
  'resources.editTitle': 'Ressource bearbeiten',
  'resources.addDescription': 'Erstellen Sie eine neue Ressource für die Buchung',
  'resources.editDescription': 'Ressourceninformationen aktualisieren',
  'resources.namePlaceholder': 'Ressourcennamen eingeben',
  'resources.locationPlaceholder': 'Standort eingeben',
  'resources.descriptionPlaceholder': 'Beschreibung eingeben',
  'resources.create': 'Erstellen',
  'resources.update': 'Aktualisieren',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'Ressource löschen',
  'resources.deleteDescription': 'Möchten Sie „{name}“ wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',

  // ===== USERS PAGE =====
  'users.title': 'Benutzer',
  'users.name': 'Name',
  'users.email': 'E-Mail',
  'users.role': 'Rolle',
  'users.joined': 'Beigetreten',
  'users.actions': 'Aktionen',
  'users.changeRole': 'Rolle ändern',
  'users.changeRoleTitle': 'Benutzerrolle ändern',
  'users.currentRole': 'Aktuelle Rolle',
  'users.newRole': 'Neue Rolle',
  'users.updateRole': 'Aktualisieren',
  'users.searchPlaceholder': 'Benutzer suchen...',
  'users.admin': 'Administrator',
  'users.manager': 'Manager',
  'users.user': 'Benutzer',

  // ===== COMMON =====
  'common.cancel': 'Stornieren',
  'common.back': 'Zurück',
  'common.next': 'Nächste',
  'common.previous': 'Vorherige',
  'common.today': 'Heute',
  'common.view': 'Sicht',
  'common.viewDetails': 'Details anzeigen',
  'common.search': 'Suchen',
  'common.filter': 'Filter',
  'common.date': 'Datum',
  'common.name': 'Name',
  'common.description': 'Beschreibung',
  'common.delete': 'Löschen',
  'common.remove': 'Entfernen',
  'common.edit': 'Bearbeiten',
  'common.create': 'Erstellen',
  'common.update': 'Aktualisieren',
  'common.actions': 'Aktionen',
  'common.status': 'Status',

  // ===== AUTHENTICATION =====
  'auth.appName': 'MEETOPS',
  'auth.subtitle': 'Ressourcenbuchungsverwaltungssystem',
  'auth.welcome': 'Willkommen',
  'auth.loginOrRegister': 'Melden Sie sich an oder erstellen Sie ein neues Konto',
  'auth.loginTab': 'Anmelden',
  'auth.registerTab': 'Registrieren',
  'auth.fullName': 'Vollständiger Name',
  'auth.fullNamePlaceholder': 'Geben Sie Ihren vollständigen Namen ein',
  'auth.username': 'Benutzername',
  'auth.usernameRegisterPlaceholder': 'Nur Buchstaben, Zahlen und Unterstriche',
  'auth.password': 'Passwort',
  'auth.passwordRegisterPlaceholder': 'Mindestens 8 Zeichen mit Buchstaben und Zahlen',
  'auth.confirmPassword': 'Passwort bestätigen',
  'auth.confirmPasswordPlaceholder': 'Passwort erneut eingeben',
  'auth.termsAgreement': 'Ich stimme der Nutzervereinbarung und der Datenschutzerklärung zu',
  'auth.registerButton': 'Registrieren',
  'auth.usernameLoginPlaceholder': 'Benutzername eingeben',
  'auth.passwordLoginPlaceholder': 'Passwort eingeben',
  'auth.forgotPassword': 'Passwort vergessen?',
  'auth.loginButton': 'Anmelden',
  'auth.fetchUserInfoFailed': 'Benutzerinformationen konnten nicht abgerufen werden: {error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'Bitte geben Sie Benutzername und Passwort ein',
  'login.usernameFormat': 'Der Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten',
  'login.loginFailed': 'Anmeldung fehlgeschlagen: {error.message}',
  'login.loginSuccess': 'Erfolgreich angemeldet',
  'login.fillAllFields': 'Bitte füllen Sie alle erforderlichen Felder aus',
  'login.passwordMinLength': 'Das Passwort muss mindestens 8 Zeichen lang sein',
  'login.passwordRequirements': 'Das Passwort muss Buchstaben und Zahlen enthalten',
  'login.passwordsDoNotMatch': 'Die Passwörter stimmen nicht überein',
  'login.agreeToTermsRequired': 'Bitte stimmen Sie der Nutzervereinbarung und der Datenschutzerklärung zu',
  'login.registrationFailed': 'Registrierung fehlgeschlagen: {error.message}',
  'login.registrationSuccess': 'Registrierung erfolgreich! Sie können sich jetzt anmelden.',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'Bitte füllen Sie alle erforderlichen Felder aus',
  'register.usernameFormat': 'Der Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten',
  'register.passwordMinLength': 'Das Passwort muss mindestens 8 Zeichen lang sein',
  'register.passwordRequirements': 'Das Passwort muss Buchstaben und Zahlen enthalten',
  'register.passwordsDoNotMatch': 'Die Passwörter stimmen nicht überein',
  'register.agreeToTermsRequired': 'Bitte stimmen Sie der Nutzervereinbarung und der Datenschutzerklärung zu',
  'register.registrationFailed': 'Registrierung fehlgeschlagen: {error.message}',
  'register.registrationSuccess': 'Registrierung erfolgreich! Weiterleitung zum Armaturenbrett...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'Bitte geben Sie Ihren Benutzernamen ein',
  'resetPassword.usernameFormat': 'Der Benutzername darf nur Buchstaben, Zahlen und Unterstriche enthalten',
  'resetPassword.sendFailed': 'Senden des Reset-Links fehlgeschlagen: {error.message}',
  'resetPassword.sendSuccess': 'Link zum Zurücksetzen des Passworts gesendet! Bitte prüfen Sie Ihre E-Mails.',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': 'Zweck ist erforderlich',
  'newBooking.resourceRequired': 'Bitte wählen Sie eine Ressource aus',
  'newBooking.dateRequired': 'Bitte wählen Sie ein Datum aus',
  'newBooking.startTimeRequired': 'Startzeit ist erforderlich',
  'newBooking.invalidTimeRange': 'Die Endzeit muss nach der Startzeit liegen',
  'newBooking.conflictDetected': 'Dieses Zeitfenster ist nicht verfügbar',
  'newBooking.createFailed': 'Buchung konnte nicht erstellt werden: {bookingError.message}',
  'newBooking.createSuccess': 'Buchung erfolgreich erstellt',
  'newBooking.multiDayCreateFailed': 'Mehrtägige Buchung konnte nicht erstellt werden',
  'newBooking.multiDayCreateSuccess': 'Mehrtägige Buchung erfolgreich erstellt! ({total_days} Tage)',
  'newBooking.generalCreateFailed': 'Buchung konnte nicht erstellt werden',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'Bitte wählen Sie Start- und Enddatum für den Export aus',
  'bookings.noBookingsForFilters': 'Keine Buchungen für den ausgewählten Datumsbereich gefunden',
  'bookings.exportSuccess': '{count} Buchungen als PDF exportiert',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': 'Nicht gefunden',
  'toast.approveMultiDayFailed': 'Mehrtägige Buchung konnte nicht genehmigt werden: {error.message}',
  'toast.approveFailed': 'Buchung konnte nicht genehmigt werden: {error.message}',
  'toast.bookingApproved': 'Buchung erfolgreich genehmigt',
  'toast.rejectMultiDayFailed': 'Mehrtägige Buchung konnte nicht abgelehnt werden: {error.message}',
  'toast.rejectFailed': 'Buchung konnte nicht abgelehnt werden: {error.message}',
  'toast.bookingRejected': 'Buchung erfolgreich abgelehnt',
  'toast.cancelMultiDayFailed': 'Mehrtägige Buchung konnte nicht abgesagt werden: {error.message}',
  'toast.cancelFailed': 'Buchung konnte nicht abgesagt werden: {error.message}',
  'toast.bookingCancelled': 'Buchung erfolgreich abgesagt',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'Dieses Feld ist erforderlich',
  'toast.resourceUpdateFailed': 'Ressource konnte nicht aktualisiert werden: {error.message}',
  'toast.resourceUpdated': 'Ressource erfolgreich aktualisiert',
  'toast.resourceCreateFailed': 'Ressource konnte nicht erstellt werden: {error.message}',
  'toast.resourceCreated': 'Ressource erfolgreich erstellt',
  'resources.deleteWarning': 'Ressourcen mit aktiven Buchungen können nicht gelöscht werden',
  'toast.resourceDeleteFailed': 'Ressource konnte nicht gelöscht werden: {error.message}',
  'toast.resourceDeleted': 'Ressource erfolgreich gelöscht',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'Benutzerrolle konnte nicht aktualisiert werden: {error.message}',
  'toast.userRoleChanged': 'Benutzerrolle erfolgreich aktualisiert',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': 'Sprache erfolgreich aktualisiert!',
  'language.updateFailed': 'Sprache konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.',
  'language.changedTo': 'Sprache auf {nativeName} geändert',
  'language.changeFailed': 'Sprache konnte nicht geändert werden. Bitte versuchen Sie es erneut.',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
  'common.somethingWentWrong': 'Etwas ist schiefgelaufen',
  'toast.operationSuccess': 'Vorgang erfolgreich abgeschlossen',
  'toast.operationFailed': 'Vorgang fehlgeschlagen',
};
