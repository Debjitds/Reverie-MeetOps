/**
 * Spanish (es) static UI dictionary.
 *
 * Values transcribed from `.docs/spanish_text_translation.md`
 * (the English → Spanish reference specification), mapped onto the app's
 * existing dot-notation keys. Doc wording is preserved exactly where
 * specified (including "Fin de los tiempos" and "Terminado", which the doc
 * marks as the intended screenshot wording). The doc's "Welcome back," drops
 * the trailing comma because the JSX renders it (DashboardPage). The doc's
 * delete-resource entry uses "{resource}" but the calling code interpolates
 * "{name}", so the code's placeholder is preserved. Entries without a doc
 * match (auth form labels, a few toasts) use the doc's own vocabulary.
 * Interpolation placeholders ({resource}, {name}, {count}, {total_days},
 * {nativeName}, {error.message}, {bookingError.message}) must match the
 * calling code exactly. Keys missing here fall back to English (see ./index.ts).
 */
export const es: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'MeetOps',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'Panel',
  'nav.bookings': 'Reservas',
  'nav.calendar': 'Calendario',
  'nav.resources': 'Recursos',
  'nav.users': 'Usuarios',
  'nav.notifications': 'Notificaciones',

  // ===== HEADER ROLES =====
  'navbar.admin': 'Administrador',
  'navbar.manager': 'Gerente',
  'navbar.user': 'Usuario',
  'navbar.logout': 'Cerrar sesión',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'Confirmar cierre de sesión',
  'logoutDialog.description':
    '¿Seguro que quieres cerrar sesión? Tendrás que volver a iniciar sesión para acceder a tu panel y a tus reservas.',
  'logoutDialog.cancel': 'Cancelar',
  'logoutDialog.logout': 'Cerrar sesión',

  // ===== DASHBOARD =====
  'dashboard.title': 'Panel',
  'dashboard.welcome': 'Bienvenido de nuevo',
  'dashboard.totalBookings': 'Reservas totales',
  'dashboard.pendingBookings': 'Pendiente',
  'dashboard.approvedBookings': 'Aprobado',
  'dashboard.rejectedBookings': 'Rechazado',
  'dashboard.upcomingBookings': 'Próximas reservas',
  'dashboard.noUpcomingBookings': 'No hay reservas próximas',
  'dashboard.quickActions': 'Acciones rápidas',
  'dashboard.newBooking': 'Nueva reserva',
  'dashboard.viewAllBookings': 'Ver todas las reservas',
  'dashboard.manageResources': 'Gestionar recursos',
  'dashboard.aiInsights': 'Información sobre IA',
  'dashboard.chatWithAI': 'Chatea con el asistente de IA',

  // ===== NOTIFICATIONS =====
  'notifications.title': 'Notificaciones',
  'notifications.markAllAsRead': 'Marcar todo como leído',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'Asistente de IA de MeetOps',
  'chat.greeting':
    '¡Hola! Soy MeetOps AI. Puedo ayudarte a reservar salas, consultar la disponibilidad y gestionar tus reservas.',
  'chat.examplePrompt': 'Prueba diciendo: «Reserva una sala para 5 personas mañana a las 14:00».',
  'chat.placeholder': 'Escribe tu mensaje...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'Reservas',
  'bookings.activeBookings': 'Reservas activas',
  'bookings.pastBookings': 'Reservas anteriores',
  'bookings.exportPDF': 'Exportar PDF',
  'bookings.newBooking': 'Nueva reserva',
  'bookings.status': 'Estado',
  'bookings.allStatuses': 'Todos los estados',
  'bookings.pending': 'Pendiente',
  'bookings.approved': 'Aprobado',
  'bookings.rejected': 'Rechazado',
  'bookings.cancelled': 'Cancelado',
  'bookings.completed': 'Terminado',
  'bookings.user': 'Usuario',
  'bookings.allUsers': 'Todos los usuarios',
  'bookings.search': 'Buscar',
  'bookings.searchPlaceholder': 'Buscar por recurso, propósito o usuario...',
  'bookings.resource': 'Recurso',
  'bookings.purpose': 'Objetivo',
  'bookings.date': 'Fecha',
  'bookings.startTime': 'Hora de inicio',
  'bookings.endTime': 'Fin de los tiempos',
  'bookings.type': 'Tipo',
  'bookings.actions': 'Acciones',
  'bookings.view': 'Vista',
  'bookings.viewDetails': 'Ver detalles',
  'bookings.multiDay': 'Varios días',
  'bookings.singleDay': 'Día único',
  'bookings.noActiveBookings': 'No se encontraron reservas activas',
  'bookings.noPastBookings': 'No se encontraron reservas anteriores',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'Exportar reservas a PDF',
  'bookings.exportDescription': 'Seleccione los filtros para exportar el historial de reservas.',
  'bookings.startDate': 'Fecha de inicio',
  'bookings.endDate': 'Fecha de finalización',
  'bookings.exportButton': 'Exportar PDF',
  'bookings.cancelButton': 'Cancelar',

  // ===== PAGINATION =====
  'bookings.previous': 'Anterior',
  'bookings.next': 'Próximo',
  'bookings.page': 'Página',
  'bookings.of': 'de',

  // ===== NEW BOOKING =====
  'newBooking.title': 'Nueva reserva',
  'newBooking.subtitle': 'Crear una nueva reserva de recursos',
  'newBooking.step1Title': 'Paso 1: Seleccionar recurso',
  'newBooking.step1Description': 'Elige el recurso que deseas reservar',
  'newBooking.step2Title': 'Paso 2: Seleccionar fecha y hora',
  'newBooking.step2Description': 'Elige cuándo quieres reservar {resource}',
  'newBooking.step3Title': 'Paso 3: Detalles de la reserva',
  'newBooking.step3Description': 'Proporcione información adicional sobre su reserva',
  'newBooking.bookingType': 'Tipo de reserva',
  'newBooking.singleDay': 'Día único',
  'newBooking.multiDay': 'Varios días',
  'newBooking.startDate': 'Fecha de inicio',
  'newBooking.endDate': 'Fecha de finalización',
  'newBooking.startTime': 'Hora de inicio',
  'newBooking.endTime': 'Fin de los tiempos',
  'newBooking.totalDays': 'Días totales',
  'newBooking.timeSlotAvailable': 'Horario disponible',
  'newBooking.purposeLabel': 'Objetivo',
  'newBooking.purposePlaceholder': 'Por ejemplo: Reunión de equipo, Presentación al cliente',
  'newBooking.attendeesLabel': 'Asistentes (opcional)',
  'newBooking.attendeesPlaceholder': 'Introduzca los nombres de los asistentes separados por comas.',
  'newBooking.generateAgendaButton': 'Generar agenda con IA',
  'newBooking.bookingSummary': 'Resumen de la reserva',
  'newBooking.createBooking': 'Crear reserva',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': 'Detalles de la reserva',
  'bookingDetails.resource': 'Recurso',
  'bookingDetails.location': 'Ubicación',
  'bookingDetails.startTime': 'Hora de inicio',
  'bookingDetails.endTime': 'Fin de los tiempos',
  'bookingDetails.purpose': 'Objetivo',
  'bookingDetails.attendees': 'Asistentes',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'Calendario',
  'calendar.subtitle': 'Ver todas las reservas de recursos',
  'calendar.month': 'Mes',
  'calendar.week': 'Semana',
  'calendar.day': 'Día',
  'calendar.agenda': 'Orden del día',
  'calendar.today': 'Hoy',
  'calendar.back': 'Atrás',
  'calendar.next': 'Próximo',
  'calendar.legend': 'Leyenda',
  'calendar.approved': 'Aprobado',
  'calendar.pending': 'Pendiente',
  'calendar.rejected': 'Rechazado',
  'calendar.cancelled': 'Cancelado',

  // ===== RESOURCES PAGE =====
  'resources.title': 'Recursos',
  'resources.addResource': 'Agregar recurso',
  'resources.name': 'Nombre',
  'resources.location': 'Ubicación',
  'resources.capacity': 'Capacidad',
  'resources.description': 'Descripción',
  'resources.actions': 'Acciones',
  'resources.addTitle': 'Agregar nuevo recurso',
  'resources.editTitle': 'Editar recurso',
  'resources.addDescription': 'Crear un nuevo recurso para reservas',
  'resources.editDescription': 'Actualizar la información de los recursos',
  'resources.namePlaceholder': 'Introduzca el nombre del recurso',
  'resources.locationPlaceholder': 'Introduzca la ubicación',
  'resources.descriptionPlaceholder': 'Introduzca una descripción',
  'resources.create': 'Crear',
  'resources.update': 'Actualizar',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'Eliminar recurso',
  'resources.deleteDescription': '¿Seguro que quieres eliminar "{name}"? Esta acción no se puede deshacer.',

  // ===== USERS PAGE =====
  'users.title': 'Usuarios',
  'users.name': 'Nombre',
  'users.email': 'Correo electrónico',
  'users.role': 'Rol',
  'users.joined': 'Unido',
  'users.actions': 'Acciones',
  'users.changeRole': 'Cambiar de rol',
  'users.changeRoleTitle': 'Cambiar rol de usuario',
  'users.currentRole': 'Rol actual',
  'users.newRole': 'Nuevo rol',
  'users.updateRole': 'Actualizar',
  'users.searchPlaceholder': 'Buscar usuarios...',
  'users.admin': 'Administrador',
  'users.manager': 'Gerente',
  'users.user': 'Usuario',

  // ===== COMMON =====
  'common.cancel': 'Cancelar',
  'common.back': 'Atrás',
  'common.next': 'Próximo',
  'common.previous': 'Anterior',
  'common.today': 'Hoy',
  'common.view': 'Vista',
  'common.viewDetails': 'Ver detalles',
  'common.search': 'Buscar',
  'common.filter': 'Filtrar',
  'common.date': 'Fecha',
  'common.name': 'Nombre',
  'common.description': 'Descripción',
  'common.delete': 'Borrar',
  'common.remove': 'Eliminar',
  'common.edit': 'Editar',
  'common.create': 'Crear',
  'common.update': 'Actualizar',
  'common.actions': 'Acciones',
  'common.status': 'Estado',

  // ===== AUTHENTICATION =====
  'auth.appName': 'MeetOps',
  'auth.subtitle': 'Sistema de gestión de reservas de recursos',
  'auth.welcome': 'Bienvenido',
  'auth.loginOrRegister': 'Inicia sesión o crea una nueva cuenta',
  'auth.loginTab': 'Iniciar sesión',
  'auth.registerTab': 'Registrarse',
  'auth.fullName': 'Nombre completo',
  'auth.fullNamePlaceholder': 'Introduzca su nombre completo',
  'auth.username': 'Nombre de usuario',
  'auth.usernameRegisterPlaceholder': 'Solo letras, números y guiones bajos',
  'auth.password': 'Contraseña',
  'auth.passwordRegisterPlaceholder': 'Mínimo 8 caracteres con letras y números',
  'auth.confirmPassword': 'Confirmar contraseña',
  'auth.confirmPasswordPlaceholder': 'Vuelva a introducir la contraseña',
  'auth.termsAgreement': 'Acepto el Acuerdo de usuario y la Política de privacidad',
  'auth.registerButton': 'Registrarse',
  'auth.usernameLoginPlaceholder': 'Introduzca el nombre de usuario',
  'auth.passwordLoginPlaceholder': 'Introduzca la contraseña',
  'auth.forgotPassword': '¿Olvidaste tu contraseña?',
  'auth.loginButton': 'Iniciar sesión',
  'auth.fetchUserInfoFailed': 'No se pudo obtener la información del usuario: {error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'Introduzca el nombre de usuario y la contraseña',
  'login.usernameFormat': 'El nombre de usuario solo puede contener letras, números y guiones bajos',
  'login.loginFailed': 'Error de inicio de sesión: {error.message}',
  'login.loginSuccess': 'Inicio de sesión correcto',
  'login.fillAllFields': 'Complete todos los campos requeridos',
  'login.passwordMinLength': 'La contraseña debe tener al menos 8 caracteres',
  'login.passwordRequirements': 'La contraseña debe contener letras y números',
  'login.passwordsDoNotMatch': 'Las contraseñas no coinciden',
  'login.agreeToTermsRequired': 'Acepte el Acuerdo de usuario y la Política de privacidad',
  'login.registrationFailed': 'Error de registro: {error.message}',
  'login.registrationSuccess': '¡Registro exitoso! Ahora puede iniciar sesión.',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'Complete todos los campos requeridos',
  'register.usernameFormat': 'El nombre de usuario solo puede contener letras, números y guiones bajos',
  'register.passwordMinLength': 'La contraseña debe tener al menos 8 caracteres',
  'register.passwordRequirements': 'La contraseña debe contener letras y números',
  'register.passwordsDoNotMatch': 'Las contraseñas no coinciden',
  'register.agreeToTermsRequired': 'Acepte el Acuerdo de usuario y la Política de privacidad',
  'register.registrationFailed': 'Error de registro: {error.message}',
  'register.registrationSuccess': '¡Registro exitoso! Redirigiendo al panel...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'Introduzca su nombre de usuario',
  'resetPassword.usernameFormat': 'El nombre de usuario solo puede contener letras, números y guiones bajos',
  'resetPassword.sendFailed': 'No se pudo enviar el enlace de restablecimiento: {error.message}',
  'resetPassword.sendSuccess': '¡Enlace de restablecimiento enviado! Revise su correo electrónico.',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': 'Introduzca un objetivo',
  'newBooking.resourceRequired': 'Seleccione un recurso',
  'newBooking.dateRequired': 'Selecciona una fecha válida',
  'newBooking.startTimeRequired': 'Selecciona una hora válida',
  'newBooking.invalidTimeRange': 'La hora de inicio debe ser anterior a la hora de finalización',
  'newBooking.conflictDetected': 'Se detectó un conflicto de reserva',
  'newBooking.createFailed': 'No se pudo crear la reserva: {bookingError.message}',
  'newBooking.createSuccess': 'Reserva creada correctamente',
  'newBooking.multiDayCreateFailed': 'No se pudo crear la reserva de varios días',
  'newBooking.multiDayCreateSuccess': '¡Reserva de varios días creada correctamente! ({total_days} días)',
  'newBooking.generalCreateFailed': 'No se pudo crear la reserva',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'Seleccione las fechas de inicio y fin para exportar',
  'bookings.noBookingsForFilters': 'No se encontraron reservas para los filtros seleccionados',
  'bookings.exportSuccess': '{count} reservas exportadas a PDF',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': 'No encontrado',
  'toast.approveMultiDayFailed': 'No se pudo aprobar la reserva de varios días: {error.message}',
  'toast.approveFailed': 'No se pudo aprobar la reserva: {error.message}',
  'toast.bookingApproved': 'Reserva aprobada correctamente',
  'toast.rejectMultiDayFailed': 'No se pudo rechazar la reserva de varios días: {error.message}',
  'toast.rejectFailed': 'No se pudo rechazar la reserva: {error.message}',
  'toast.bookingRejected': 'Reserva rechazada correctamente',
  'toast.cancelMultiDayFailed': 'No se pudo cancelar la reserva de varios días: {error.message}',
  'toast.cancelFailed': 'No se pudo cancelar la reserva: {error.message}',
  'toast.bookingCancelled': 'Reserva cancelada correctamente',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'Este campo es obligatorio',
  'toast.resourceUpdateFailed': 'No se pudo actualizar el recurso: {error.message}',
  'toast.resourceUpdated': 'Recurso actualizado correctamente',
  'toast.resourceCreateFailed': 'No se pudo crear el recurso: {error.message}',
  'toast.resourceCreated': 'Recurso creado correctamente',
  'resources.deleteWarning': 'No se puede eliminar un recurso con reservas activas',
  'toast.resourceDeleteFailed': 'No se pudo eliminar el recurso: {error.message}',
  'toast.resourceDeleted': 'Recurso eliminado correctamente',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'No se pudo actualizar el rol del usuario: {error.message}',
  'toast.userRoleChanged': 'Rol del usuario actualizado correctamente',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': '¡Idioma actualizado correctamente!',
  'language.updateFailed': 'No se pudo actualizar el idioma. Inténtalo de nuevo.',
  'language.changedTo': 'Idioma cambiado a {nativeName}',
  'language.changeFailed': 'No se pudo cambiar el idioma. Inténtalo de nuevo.',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
  'common.somethingWentWrong': 'Algo salió mal',
  'toast.operationSuccess': 'Operación completada correctamente',
  'toast.operationFailed': 'La operación falló',
};
