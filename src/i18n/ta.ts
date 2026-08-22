/**
 * Tamil (ta) static UI dictionary.
 *
 * Values transcribed from `.docs/tamil_text_translation.md`
 * (the English → Tamil reference specification), mapped onto the app's
 * existing dot-notation keys. Doc wording is preserved exactly where
 * specified. The doc's "Welcome back, Admin" drops the dynamic name here
 * because the JSX renders it separately (DashboardPage). Entries without a
 * doc match (auth form labels, a few toasts) use the doc's own vocabulary.
 * Interpolation placeholders ({resource}, {name}, {count}, {total_days},
 * {nativeName}, {error.message}, {bookingError.message}) must match the
 * calling code exactly. Keys missing here fall back to English (see ./index.ts).
 */
export const ta: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'மீட்ஓப்ஸ்',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'டாஷ்போர்டு',
  'nav.bookings': 'முன்பதிவுகள்',
  'nav.calendar': 'காலண்டர்',
  'nav.resources': 'வளங்கள்',
  'nav.users': 'பயனர்கள்',
  'nav.notifications': 'அறிவிப்புகள்',

  // ===== HEADER ROLES =====
  'navbar.admin': 'நிர்வாகி',
  'navbar.manager': 'மேலாளர்',
  'navbar.user': 'பயனர்',
  'navbar.logout': 'வெளியேறு',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'வெளியேறுவதை உறுதிப்படுத்து',
  'logoutDialog.description':
    'நீங்கள் வெளியேற விரும்புகிறீர்களா? உங்கள் டாஷ்போர்டு மற்றும் முன்பதிவு தகவல்களை அணுக மீண்டும் உள்நுழைய வேண்டும்.',
  'logoutDialog.cancel': 'ரத்து செய்',
  'logoutDialog.logout': 'வெளியேறு',

  // ===== DASHBOARD =====
  'dashboard.title': 'டாஷ்போர்டு',
  'dashboard.welcome': 'மீண்டும் வரவேற்கிறோம்',
  'dashboard.totalBookings': 'மொத்த முன்பதிவுகள்',
  'dashboard.pendingBookings': 'நிலுவையில்',
  'dashboard.approvedBookings': 'அங்கீகரிக்கப்பட்டது',
  'dashboard.rejectedBookings': 'நிராகரிக்கப்பட்டது',
  'dashboard.upcomingBookings': 'வரவிருக்கும் முன்பதிவுகள்',
  'dashboard.noUpcomingBookings': 'வரவிருக்கும் முன்பதிவுகள் இல்லை',
  'dashboard.quickActions': 'விரைவான செயல்கள்',
  'dashboard.newBooking': 'புதிய முன்பதிவு',
  'dashboard.viewAllBookings': 'அனைத்து முன்பதிவுகளையும் காண்க',
  'dashboard.manageResources': 'வளங்களை நிர்வகிக்கவும்',
  'dashboard.aiInsights': 'AI நுண்ணறிவுகள்',
  'dashboard.chatWithAI': 'AI உதவியாளருடன் உரையாடுங்கள்',

  // ===== NOTIFICATIONS =====
  'notifications.title': 'அறிவிப்புகள்',
  'notifications.markAllAsRead': 'அனைத்தையும் படித்ததாகக் குறி',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'மீட்ஓப்ஸ் AI உதவியாளர்',
  'chat.greeting':
    'வணக்கம்! நான் MeetOps AI. அறைகளைக் கண்டறியவும், கிடைப்பைச் சரிபார்க்கவும், உங்கள் முன்பதிவுகளை நிர்வகிக்கவும் உங்களுக்கு உதவ முடியும்.',
  'chat.examplePrompt': 'இவ்வாறு கேட்கவும்: “நாளை பிற்பகல் 2 மணிக்கு 5 பேருக்கான அறையை முன்பதிவு செய்யுங்கள்.”',
  'chat.placeholder': 'உங்கள் செய்தியை உள்ளிடுங்கள்...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'முன்பதிவுகள்',
  'bookings.activeBookings': 'செயலிலுள்ள முன்பதிவுகள்',
  'bookings.pastBookings': 'கடந்த முன்பதிவுகள்',
  'bookings.exportPDF': 'PDF-ஐ ஏற்றுமதி செய்',
  'bookings.newBooking': 'புதிய முன்பதிவு',
  'bookings.status': 'நிலை',
  'bookings.allStatuses': 'அனைத்து நிலைகளும்',
  'bookings.pending': 'நிலுவையில்',
  'bookings.approved': 'அங்கீகரிக்கப்பட்டது',
  'bookings.rejected': 'நிராகரிக்கப்பட்டது',
  'bookings.cancelled': 'ரத்து செய்யப்பட்டது',
  'bookings.completed': 'நிறைவு செய்யப்பட்டது',
  'bookings.user': 'பயனர்',
  'bookings.allUsers': 'அனைத்து பயனர்களும்',
  'bookings.search': 'தேடல்',
  'bookings.searchPlaceholder': 'வளம், நோக்கம் அல்லது பயனர் அடிப்படையில் தேடவும்...',
  'bookings.resource': 'வளம்',
  'bookings.purpose': 'நோக்கம்',
  'bookings.date': 'தேதி',
  'bookings.startTime': 'தொடக்க நேரம்',
  'bookings.endTime': 'முடிவு நேரம்',
  'bookings.type': 'வகை',
  'bookings.actions': 'செயல்கள்',
  'bookings.view': 'பார்வை',
  'bookings.viewDetails': 'விவரங்களைக் காண்க',
  'bookings.multiDay': 'பல நாள்',
  'bookings.singleDay': 'ஒரு நாள்',
  'bookings.noActiveBookings': 'செயலிலுள்ள முன்பதிவுகள் எதுவும் காணப்படவில்லை',
  'bookings.noPastBookings': 'கடந்த முன்பதிவுகள் எதுவும் காணப்படவில்லை',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'முன்பதிவுகளை PDF ஆக ஏற்றுமதி செய்யவும்',
  'bookings.exportDescription': 'முன்பதிவு வரலாற்றை ஏற்றுமதி செய்ய தேதி வரம்பைத் தேர்ந்தெடுக்கவும்',
  'bookings.startDate': 'தொடக்க தேதி',
  'bookings.endDate': 'முடிவு தேதி',
  'bookings.exportButton': 'PDF-ஐ ஏற்றுமதி செய்',
  'bookings.cancelButton': 'ரத்து செய்',

  // ===== PAGINATION =====
  'bookings.previous': 'திரும்பு',
  'bookings.next': 'அடுத்து',
  'bookings.page': 'பக்கம்',
  'bookings.of': '/',

  // ===== NEW BOOKING =====
  'newBooking.title': 'புதிய முன்பதிவு',
  'newBooking.subtitle': 'புதிய வள முன்பதிவை உருவாக்கவும்',
  'newBooking.step1Title': 'படி 1: வளத்தைத் தேர்ந்தெடுக்கவும்',
  'newBooking.step1Description': 'முன்பதிவு செய்ய விரும்பும் வளத்தைத் தேர்ந்தெடுக்கவும்',
  'newBooking.step2Title': 'படி 2: தேதி மற்றும் நேரத்தைத் தேர்ந்தெடுக்கவும்',
  'newBooking.step2Description': '{resource}-ஐ எப்போது முன்பதிவு செய்ய விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்',
  'newBooking.step3Title': 'படி 3: முன்பதிவு விவரங்கள்',
  'newBooking.step3Description': 'உங்கள் முன்பதிவு பற்றிய கூடுதல் தகவல்களை வழங்கவும்',
  'newBooking.bookingType': 'முன்பதிவு வகை',
  'newBooking.singleDay': 'ஒரு நாள்',
  'newBooking.multiDay': 'பல நாள்',
  'newBooking.startDate': 'தொடக்க தேதி',
  'newBooking.endDate': 'முடிவு தேதி',
  'newBooking.startTime': 'தொடக்க நேரம்',
  'newBooking.endTime': 'முடிவு நேரம்',
  'newBooking.totalDays': 'மொத்த நாட்கள்',
  'newBooking.timeSlotAvailable': 'நேரம் கிடைக்கிறது',
  'newBooking.purposeLabel': 'நோக்கம்',
  'newBooking.purposePlaceholder': 'எ.கா: குழு கூட்டம், வாடிக்கையாளர் முன்வைப்பு',
  'newBooking.attendeesLabel': 'பங்கேற்பாளர்கள் (விருப்பத்தேர்வு)',
  'newBooking.attendeesPlaceholder': 'பங்கேற்பாளர்களின் பெயர்களை காற்புள்ளியால் பிரித்து உள்ளிடவும்.',
  'newBooking.generateAgendaButton': 'AI மூலம் அஜெண்டாவை உருவாக்கு',
  'newBooking.bookingSummary': 'முன்பதிவு சுருக்கம்',
  'newBooking.createBooking': 'முன்பதிவை உருவாக்கு',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': 'முன்பதிவு விவரங்கள்',
  'bookingDetails.resource': 'வளம்',
  'bookingDetails.location': 'இடம்',
  'bookingDetails.startTime': 'தொடக்க நேரம்',
  'bookingDetails.endTime': 'முடிவு நேரம்',
  'bookingDetails.purpose': 'நோக்கம்',
  'bookingDetails.attendees': 'பங்கேற்பாளர்கள்',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'காலண்டர்',
  'calendar.subtitle': 'அனைத்து வள முன்பதிவுகளையும் காண்க',
  'calendar.month': 'மாதம்',
  'calendar.week': 'வாரம்',
  'calendar.day': 'நாள்',
  'calendar.agenda': 'அட்டவணை',
  'calendar.today': 'இன்று',
  'calendar.back': 'திரும்பு',
  'calendar.next': 'அடுத்து',
  'calendar.legend': 'குறியீடு',
  'calendar.approved': 'அங்கீகரிக்கப்பட்டது',
  'calendar.pending': 'நிலுவையில்',
  'calendar.rejected': 'நிராகரிக்கப்பட்டது',
  'calendar.cancelled': 'ரத்து செய்யப்பட்டது',

  // ===== RESOURCES PAGE =====
  'resources.title': 'வளங்கள்',
  'resources.addResource': 'வளத்தைச் சேர்க்கவும்',
  'resources.name': 'பெயர்',
  'resources.location': 'இடம்',
  'resources.capacity': 'கொள்ளளவு',
  'resources.description': 'விளக்கம்',
  'resources.actions': 'செயல்கள்',
  'resources.addTitle': 'புதிய வளத்தைச் சேர்க்கவும்',
  'resources.editTitle': 'வளத்தைத் திருத்தவும்',
  'resources.addDescription': 'முன்பதிவுக்கான புதிய வளத்தை உருவாக்கவும்',
  'resources.editDescription': 'வளத் தகவலைப் புதுப்பிக்கவும்',
  'resources.namePlaceholder': 'வளத்தின் பெயரை உள்ளிடவும்',
  'resources.locationPlaceholder': 'இடத்தை உள்ளிடவும்',
  'resources.descriptionPlaceholder': 'விளக்கத்தை உள்ளிடவும்',
  'resources.create': 'உருவாக்கு',
  'resources.update': 'புதுப்பி',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'வளத்தை நீக்கு',
  'resources.deleteDescription': '"{name}"-ஐ நீக்க விரும்புகிறீர்களா? இந்தச் செயலை மீண்டும் மாற்ற முடியாது.',

  // ===== USERS PAGE =====
  'users.title': 'பயனர்கள்',
  'users.name': 'பெயர்',
  'users.email': 'மின்னஞ்சல்',
  'users.role': 'பங்கு',
  'users.joined': 'இணைந்தது',
  'users.actions': 'செயல்கள்',
  'users.changeRole': 'பங்கு மாற்றம்',
  'users.changeRoleTitle': 'பயனர் பங்கை மாற்றவும்',
  'users.currentRole': 'தற்போதைய பங்கு',
  'users.newRole': 'புதிய பங்கு',
  'users.updateRole': 'பங்கை மாற்று',
  'users.searchPlaceholder': 'பயனர்களைத் தேடுங்கள்...',
  'users.admin': 'நிர்வாகி',
  'users.manager': 'மேலாளர்',
  'users.user': 'பயனர்',

  // ===== COMMON =====
  'common.cancel': 'ரத்து செய்',
  'common.back': 'திரும்பு',
  'common.next': 'அடுத்து',
  'common.previous': 'திரும்பு',
  'common.today': 'இன்று',
  'common.view': 'பார்வை',
  'common.viewDetails': 'விவரங்களைக் காண்க',
  'common.search': 'தேடல்',
  'common.filter': 'வடிகட்டி',
  'common.date': 'தேதி',
  'common.name': 'பெயர்',
  'common.description': 'விளக்கம்',
  'common.delete': 'நீக்கு',
  'common.remove': 'அகற்று',
  'common.edit': 'திருத்து',
  'common.create': 'உருவாக்கு',
  'common.update': 'புதுப்பி',
  'common.actions': 'செயல்கள்',
  'common.status': 'நிலை',

  // ===== AUTHENTICATION =====
  'auth.appName': 'மீட்ஓப்ஸ்',
  'auth.subtitle': 'வள முன்பதிவு மேலாண்மை அமைப்பு',
  'auth.welcome': 'வரவேற்கிறோம்',
  'auth.loginOrRegister': 'உள்நுழையுங்கள் அல்லது புதிய கணக்கை உருவாக்குங்கள்',
  'auth.loginTab': 'உள்நுழைவு',
  'auth.registerTab': 'பதிவு',
  'auth.fullName': 'முழு பெயர்',
  'auth.fullNamePlaceholder': 'உங்கள் முழு பெயரை உள்ளிடுங்கள்',
  'auth.username': 'பயனர்பெயர்',
  'auth.usernameRegisterPlaceholder': 'எழுத்துகள், எண்கள் மற்றும் அண்டர்ஸ்கோர் மட்டும்',
  'auth.password': 'கடவுச்சொல்',
  'auth.passwordRegisterPlaceholder': 'குறைந்தது 8 எழுத்துகள் (எழுத்துகள் மற்றும் எண்கள்)',
  'auth.confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்து',
  'auth.confirmPasswordPlaceholder': 'கடவுச்சொல்லை மீண்டும் உள்ளிடுங்கள்',
  'auth.termsAgreement': 'பயனர் ஒப்பந்தம் மற்றும் தனியுரிமைக் கொள்கையை ஒப்புக்கொள்கிறேன்',
  'auth.registerButton': 'பதிவு செய்',
  'auth.usernameLoginPlaceholder': 'பயனர்பெயரை உள்ளிடுங்கள்',
  'auth.passwordLoginPlaceholder': 'கடவுச்சொல்லை உள்ளிடுங்கள்',
  'auth.forgotPassword': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
  'auth.loginButton': 'உள்நுழை',
  'auth.fetchUserInfoFailed': 'பயனர் தகவலைப் பெற முடியவில்லை: {error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'பயனர்பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடுங்கள்',
  'login.usernameFormat': 'பயனர்பெயரில் எழுத்துகள், எண்கள் மற்றும் அண்டர்ஸ்கோர் மட்டுமே இருக்க முடியும்',
  'login.loginFailed': 'உள்நுழைவு தோல்வியடைந்தது: {error.message}',
  'login.loginSuccess': 'உள்நுழைவு வெற்றிகரமாக முடிந்தது',
  'login.fillAllFields': 'அனைத்து தேவையான புலங்களையும் நிரப்புங்கள்',
  'login.passwordMinLength': 'கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்',
  'login.passwordRequirements': 'கடவுச்சொல்லில் எழுத்துகள் மற்றும் எண்கள் இரண்டும் இருக்க வேண்டும்',
  'login.passwordsDoNotMatch': 'கடவுச்சொற்கள் பொருந்தவில்லை',
  'login.agreeToTermsRequired': 'பயனர் ஒப்பந்தம் மற்றும் தனியுரிமைக் கொள்கையை ஒப்புக்கொள்ளுங்கள்',
  'login.registrationFailed': 'பதிவு தோல்வியடைந்தது: {error.message}',
  'login.registrationSuccess': 'பதிவு வெற்றிகரமாக முடிந்தது! இப்போது உள்நுழையலாம்.',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'அனைத்து தேவையான புலங்களையும் நிரப்புங்கள்',
  'register.usernameFormat': 'பயனர்பெயரில் எழுத்துகள், எண்கள் மற்றும் அண்டர்ஸ்கோர் மட்டுமே இருக்க முடியும்',
  'register.passwordMinLength': 'கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்',
  'register.passwordRequirements': 'கடவுச்சொல்லில் எழுத்துகள் மற்றும் எண்கள் இரண்டும் இருக்க வேண்டும்',
  'register.passwordsDoNotMatch': 'கடவுச்சொற்கள் பொருந்தவில்லை',
  'register.agreeToTermsRequired': 'பயனர் ஒப்பந்தம் மற்றும் தனியுரிமைக் கொள்கையை ஒப்புக்கொள்ளுங்கள்',
  'register.registrationFailed': 'பதிவு தோல்வியடைந்தது: {error.message}',
  'register.registrationSuccess': 'பதிவு வெற்றிகரமாக முடிந்தது! டாஷ்போர்டுக்கு அனுப்பப்படுகிறீர்கள்...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'உங்கள் பயனர்பெயரை உள்ளிடுங்கள்',
  'resetPassword.usernameFormat': 'பயனர்பெயரில் எழுத்துகள், எண்கள் மற்றும் அண்டர்ஸ்கோர் மட்டுமே இருக்க முடியும்',
  'resetPassword.sendFailed': 'மீட்டமை இணைப்பை அனுப்ப முடியவில்லை: {error.message}',
  'resetPassword.sendSuccess': 'கடவுச்சொல் மீட்டமை இணைப்பு அனுப்பப்பட்டது! உங்கள் மின்னஞ்சலைச் சரிபார்க்கவும்.',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': 'ஒரு நோக்கத்தை உள்ளிடுங்கள்',
  'newBooking.resourceRequired': 'ஒரு வளத்தைத் தேர்ந்தெடுக்கவும்',
  'newBooking.dateRequired': 'ஒரு தேதியைத் தேர்ந்தெடுக்கவும்',
  'newBooking.startTimeRequired': 'தொடக்க நேரத்தைத் தேர்ந்தெடுக்கவும்',
  'newBooking.invalidTimeRange': 'முடிவு நேரம் தொடக்க நேரத்திற்குப் பிறகு இருக்க வேண்டும்',
  'newBooking.conflictDetected': 'இந்த நேரம் ஏற்கனவே முன்பதிவு செய்யப்பட்டுள்ளது',
  'newBooking.createFailed': 'முன்பதிவை உருவாக்க முடியவில்லை: {bookingError.message}',
  'newBooking.createSuccess': 'முன்பதிவு வெற்றிகரமாக உருவாக்கப்பட்டது',
  'newBooking.multiDayCreateFailed': 'பல நாள் முன்பதிவை உருவாக்க முடியவில்லை',
  'newBooking.multiDayCreateSuccess': 'பல நாள் முன்பதிவு வெற்றிகரமாக உருவாக்கப்பட்டது! ({total_days} நாட்கள்)',
  'newBooking.generalCreateFailed': 'முன்பதிவை உருவாக்க முடியவில்லை',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'ஏற்றுமதி செய்ய தொடக்க மற்றும் முடிவு தேதிகளைத் தேர்ந்தெடுக்கவும்',
  'bookings.noBookingsForFilters': 'தேர்ந்தெடுத்த வடிகட்டிகளுக்கு முன்பதிவுகள் எதுவும் காணப்படவில்லை',
  'bookings.exportSuccess': '{count} முன்பதிவுகள் PDF-க்கு ஏற்றுமதி செய்யப்பட்டன',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': 'காணப்படவில்லை',
  'toast.approveMultiDayFailed': 'பல நாள் முன்பதிவை அங்கீகரிக்க முடியவில்லை: {error.message}',
  'toast.approveFailed': 'முன்பதிவை அங்கீகரிக்க முடியவில்லை: {error.message}',
  'toast.bookingApproved': 'முன்பதிவு வெற்றிகரமாக அங்கீகரிக்கப்பட்டது',
  'toast.rejectMultiDayFailed': 'பல நாள் முன்பதிவை நிராகரிக்க முடியவில்லை: {error.message}',
  'toast.rejectFailed': 'முன்பதிவை நிராகரிக்க முடியவில்லை: {error.message}',
  'toast.bookingRejected': 'முன்பதிவு வெற்றிகரமாக நிராகரிக்கப்பட்டது',
  'toast.cancelMultiDayFailed': 'பல நாள் முன்பதிவை ரத்து செய்ய முடியவில்லை: {error.message}',
  'toast.cancelFailed': 'முன்பதிவை ரத்து செய்ய முடியவில்லை: {error.message}',
  'toast.bookingCancelled': 'முன்பதிவு வெற்றிகரமாக ரத்து செய்யப்பட்டது',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'இந்த புலம் தேவை',
  'toast.resourceUpdateFailed': 'வளத்தைப் புதுப்பிக்க முடியவில்லை: {error.message}',
  'toast.resourceUpdated': 'வளம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
  'toast.resourceCreateFailed': 'வளத்தை உருவாக்க முடியவில்லை: {error.message}',
  'toast.resourceCreated': 'வளம் வெற்றிகரமாக உருவாக்கப்பட்டது',
  'resources.deleteWarning': 'செயலிலுள்ள முன்பதிவுகள் உள்ள வளத்தை நீக்க முடியாது',
  'toast.resourceDeleteFailed': 'வளத்தை நீக்க முடியவில்லை: {error.message}',
  'toast.resourceDeleted': 'வளம் வெற்றிகரமாக நீக்கப்பட்டது',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'பயனர் பங்கைப் புதுப்பிக்க முடியவில்லை: {error.message}',
  'toast.userRoleChanged': 'பயனர் பங்கு வெற்றிகரமாக புதுப்பிக்கப்பட்டது',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': 'மொழி வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
  'language.updateFailed': 'மொழியைப் புதுப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
  'language.changedTo': 'மொழி {nativeName} ஆக மாற்றப்பட்டது',
  'language.changeFailed': 'மொழியை மாற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'செய்தியை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
  'common.somethingWentWrong': 'ஏதோ தவறு ஏற்பட்டது',
  'toast.operationSuccess': 'செயல் வெற்றிகரமாக முடிந்தது',
  'toast.operationFailed': 'செயல் தோல்வியடைந்தது',
};
