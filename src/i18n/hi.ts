/**
 * Hindi (hi) static UI dictionary.
 *
 * Values transcribed from `.docs/hindi_text_translation.md`
 * (the English → Hindi reference specification), mapped onto the app's
 * existing dot-notation keys. Screenshot-derived wording (e.g. बुकिंग के,
 * दंतकथा) is preserved exactly as specified. Do not reword entries.
 * Keys missing here fall back to English automatically (see ./index.ts).
 */
export const hi: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'मीटऑप्स',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'डैशबोर्ड',
  'nav.bookings': 'बुकिंग के',
  'nav.calendar': 'कैलेंडर',
  'nav.resources': 'संसाधन',
  'nav.users': 'उपयोगकर्ताओं',
  'nav.notifications': 'सूचनाएँ',

  // ===== HEADER ROLES =====
  'navbar.admin': 'व्यवस्थापक',
  'navbar.manager': 'प्रबंधक',
  'navbar.user': 'उपयोगकर्ता',
  'navbar.logout': 'लॉगआउट',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'लॉगआउट की पुष्टि करें',
  'logoutDialog.description':
    'क्या आप वाकई लॉग आउट करना चाहते हैं? डैशबोर्ड और बुकिंग देखने के लिए आपको दोबारा साइन इन करना होगा।',
  'logoutDialog.cancel': 'रद्द करना',
  'logoutDialog.logout': 'लॉगआउट',

  // ===== DASHBOARD =====
  'dashboard.title': 'डैशबोर्ड',
  'dashboard.welcome': 'वापसी पर स्वागत है',
  'dashboard.totalBookings': 'कुल बुकिंग',
  'dashboard.pendingBookings': 'लंबित',
  'dashboard.approvedBookings': 'अनुमत',
  'dashboard.rejectedBookings': 'अस्वीकार कर दिया',
  'dashboard.upcomingBookings': 'आगामी बुकिंग',
  'dashboard.noUpcomingBookings': 'कोई आगामी बुकिंग नहीं है',
  'dashboard.quickActions': 'त्वरित कार्रवाइयाँ',
  'dashboard.newBooking': 'नई बुकिंग',
  'dashboard.viewAllBookings': 'सभी बुकिंग देखें',
  'dashboard.manageResources': 'संसाधनों का प्रबंधन करें',
  'dashboard.aiInsights': 'एआई इनसाइट्स',
  'dashboard.chatWithAI': 'एआई असिस्टेंट से चैट करें',

  // ===== NOTIFICATIONS =====
  'notifications.title': 'सूचनाएँ',
  'notifications.markAllAsRead': 'सभी को पढ़ा हुआ मार्क करें',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'मीटऑप्स एआई सहायक',
  'chat.greeting':
    'नमस्कार! मैं मीटऑप्स एआई हूँ। मैं कमरे बुक करने, उपलब्धता जाँचने और आपकी बुकिंग प्रबंधित करने में आपकी मदद कर सकता हूँ।',
  'chat.examplePrompt': 'यह आज़माएँ: "कल दोपहर 2 बजे मेरे लिए 5 लोगों के लिए एक कमरा बुक कर दें"',
  'chat.placeholder': 'अपना संदेश टाइप करें...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'बुकिंग के',
  'bookings.activeBookings': 'सक्रिय बुकिंग',
  'bookings.pastBookings': 'पिछली बुकिंग',
  'bookings.exportPDF': 'पीडीएफ निर्यात करें',
  'bookings.newBooking': 'नई बुकिंग',
  'bookings.status': 'स्थिति',
  'bookings.allStatuses': 'सभी स्थितियाँ',
  'bookings.pending': 'लंबित',
  'bookings.approved': 'अनुमत',
  'bookings.rejected': 'अस्वीकार कर दिया',
  'bookings.cancelled': 'रद्द कर दिया गया',
  'bookings.completed': 'पूरा होना',
  'bookings.user': 'उपयोगकर्ता',
  'bookings.allUsers': 'सभी उपयोगकर्ता',
  'bookings.search': 'खोज',
  'bookings.searchPlaceholder': 'संसाधन, उद्देश्य या उपयोगकर्ता के आधार पर खोजें...',
  'bookings.resource': 'संसाधन',
  'bookings.purpose': 'उद्देश्य',
  'bookings.date': 'तारीख',
  'bookings.startTime': 'समय शुरू',
  'bookings.endTime': 'अंत समय',
  'bookings.type': 'प्रकार',
  'bookings.actions': 'कार्रवाई',
  'bookings.view': 'देखना',
  'bookings.viewDetails': 'विवरण देखें',
  'bookings.multiDay': 'मल्टी डे',
  'bookings.singleDay': 'एकल दिन',
  'bookings.noActiveBookings': 'कोई सक्रिय बुकिंग नहीं मिली',
  'bookings.noPastBookings': 'कोई पूर्व बुकिंग नहीं मिली',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'बुकिंग को पीडीएफ में निर्यात करें',
  'bookings.exportDescription': 'बुकिंग इतिहास निर्यात करने के लिए फ़िल्टर चुनें',
  'bookings.startDate': 'आरंभ करने की तिथि',
  'bookings.endDate': 'अंतिम तिथि',
  'bookings.exportButton': 'पीडीएफ निर्यात करें',
  'bookings.cancelButton': 'रद्द करना',

  // ===== PAGINATION =====
  'bookings.previous': 'पिछले',
  'bookings.next': 'अगला',
  'bookings.page': 'पृष्ठ',
  'bookings.of': 'का',

  // ===== NEW BOOKING =====
  'newBooking.title': 'नई बुकिंग',
  'newBooking.subtitle': 'नया संसाधन बुकिंग बनाएँ',
  'newBooking.step1Title': 'चरण 1: संसाधन का चयन करें',
  'newBooking.step1Description': 'वह संसाधन चुनें जिसे आप बुक करना चाहते हैं',
  'newBooking.step2Title': 'चरण 2: दिनांक और समय चुनें',
  'newBooking.step2Description': 'आप {resource} को कब बुक करना चाहते हैं, यह चुनें',
  'newBooking.step3Title': 'चरण 3: बुकिंग विवरण',
  'newBooking.step3Description': 'अपनी बुकिंग के बारे में अतिरिक्त जानकारी प्रदान करें',
  'newBooking.bookingType': 'बुकिंग प्रकार',
  'newBooking.singleDay': 'एकल दिन',
  'newBooking.multiDay': 'मल्टी डे',
  'newBooking.startDate': 'आरंभ करने की तिथि',
  'newBooking.endDate': 'अंतिम तिथि',
  'newBooking.startTime': 'समय शुरू',
  'newBooking.endTime': 'अंत समय',
  'newBooking.totalDays': 'कुल दिन',
  'newBooking.timeSlotAvailable': 'समय उपलब्ध है',
  'newBooking.purposeLabel': 'उद्देश्य',
  'newBooking.purposePlaceholder': 'उदाहरण के लिए, टीम मीटिंग, क्लाइंट प्रेजेंटेशन',
  'newBooking.attendeesLabel': 'उपस्थित लोग (वैकल्पिक)',
  'newBooking.attendeesPlaceholder': 'उपस्थित लोगों के नाम अल्पविराम से अलग करके दर्ज करें',
  'newBooking.generateAgendaButton': 'एआई की मदद से एजेंडा तैयार करें',
  'newBooking.bookingSummary': 'बुकिंग सारांश',
  'newBooking.createBooking': 'बुकिंग बनाएँ',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': 'बुकिंग विवरण',
  'bookingDetails.resource': 'संसाधन',
  'bookingDetails.location': 'जगह',
  'bookingDetails.startTime': 'समय शुरू',
  'bookingDetails.endTime': 'अंत समय',
  'bookingDetails.purpose': 'उद्देश्य',
  'bookingDetails.attendees': 'उपस्थित लोग',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'कैलेंडर',
  'calendar.subtitle': 'सभी संसाधन बुकिंग देखें',
  'calendar.month': 'महीना',
  'calendar.week': 'सप्ताह',
  'calendar.day': 'दिन',
  'calendar.agenda': 'कार्यसूची',
  'calendar.today': 'आज',
  'calendar.back': 'पीछे',
  'calendar.next': 'अगला',
  'calendar.legend': 'दंतकथा',
  'calendar.approved': 'अनुमत',
  'calendar.pending': 'लंबित',
  'calendar.rejected': 'अस्वीकार कर दिया',
  'calendar.cancelled': 'रद्द कर दिया गया',

  // ===== RESOURCES PAGE =====
  'resources.title': 'संसाधन',
  'resources.addResource': 'संसाधन जोड़ें',
  'resources.name': 'नाम',
  'resources.location': 'जगह',
  'resources.capacity': 'क्षमता',
  'resources.description': 'विवरण',
  'resources.actions': 'कार्रवाई',
  'resources.addTitle': 'नया संसाधन जोड़ें',
  'resources.editTitle': 'संसाधन संपादित करें',
  'resources.addDescription': 'बुकिंग के लिए एक नया संसाधन बनाएँ',
  'resources.editDescription': 'संसाधन जानकारी अपडेट करें',
  'resources.namePlaceholder': 'संसाधन का नाम दर्ज करें',
  'resources.locationPlaceholder': 'स्थान दर्ज करें',
  'resources.descriptionPlaceholder': 'विवरण दर्ज करें',
  'resources.create': 'बनाएँ',
  'resources.update': 'अद्यतन',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'संसाधन हटाएँ',
  'resources.deleteDescription':
    'क्या आप वाकई "{name}" को हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।',

  // ===== USERS PAGE =====
  'users.title': 'उपयोगकर्ताओं',
  'users.name': 'नाम',
  'users.email': 'ईमेल',
  'users.role': 'भूमिका',
  'users.joined': 'शामिल हुए',
  'users.actions': 'कार्रवाई',
  'users.changeRole': 'भूमिका बदलें',
  'users.changeRoleTitle': 'उपयोगकर्ता की भूमिका बदलें',
  'users.currentRole': 'वर्तमान भूमिका',
  'users.newRole': 'नई भूमिका',
  'users.updateRole': 'भूमिका बदलें',
  'users.searchPlaceholder': 'उपयोगकर्ताओं को खोजें...',
  'users.admin': 'व्यवस्थापक',
  'users.manager': 'प्रबंधक',
  'users.user': 'उपयोगकर्ता',

  // ===== COMMON =====
  'common.cancel': 'रद्द करना',
  'common.back': 'पीछे',
  'common.next': 'अगला',
  'common.previous': 'पिछले',
  'common.today': 'आज',
  'common.view': 'देखना',
  'common.viewDetails': 'विवरण देखें',
  'common.search': 'खोज',
  'common.filter': 'फ़िल्टर',
  'common.date': 'तारीख',
  'common.name': 'नाम',
  'common.description': 'विवरण',
  'common.delete': 'हटाएँ',
  'common.remove': 'मिटाना',
  'common.edit': 'संपादित करें',
  'common.create': 'बनाएँ',
  'common.update': 'अद्यतन',
  'common.actions': 'कार्रवाई',
  'common.status': 'स्थिति',

  // ===== AUTHENTICATION =====
  'auth.appName': 'मीटऑप्स',
  'auth.subtitle': 'संसाधन बुकिंग प्रबंधन प्रणाली',
  'auth.welcome': 'स्वागत है',
  'auth.loginOrRegister': 'लॉगिन करें या एक नया अकाउंट बनाएँ',
  'auth.loginTab': 'लॉगिन',
  'auth.registerTab': 'पंजीकरण करें',
  'auth.fullName': 'पूरा नाम',
  'auth.fullNamePlaceholder': 'अपना पूरा नाम लिखें',
  'auth.username': 'उपयोगकर्ता नाम',
  'auth.usernameRegisterPlaceholder': 'केवल अक्षर, संख्या और अंडरस्कोर',
  'auth.password': 'पासवर्ड',
  'auth.passwordRegisterPlaceholder': 'कम से कम 8 अक्षर और संख्याएँ',
  'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
  'auth.confirmPasswordPlaceholder': 'पासवर्ड फिर से दर्ज करें',
  'auth.termsAgreement':
    'मैं उपयोगकर्ता समझौते और गोपनीयता नीति से सहमत हूँ (कृपया कानूनी आवश्यकताओं का पालन करने के लिए इन दस्तावेज़ों को संशोधित करें)',
  'auth.registerButton': 'पंजीकरण करें',
  'auth.usernameLoginPlaceholder': 'उपयोगकर्ता नाम लिखें',
  'auth.passwordLoginPlaceholder': 'पासवर्ड लिखें',
  'auth.forgotPassword': 'पासवर्ड भूल गए?',
  'auth.loginButton': 'लॉगिन',
  'auth.fetchUserInfoFailed': 'उपयोगकर्ता की जानकारी प्राप्त करने में विफल: {error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'कृपया उपयोगकर्ता नाम और पासवर्ड दर्ज करें',
  'login.usernameFormat': 'उपयोगकर्ता नाम में केवल अक्षर, संख्या और अंडरस्कोर हो सकते हैं',
  'login.loginFailed': 'लॉगिन विफल: {error.message}',
  'login.loginSuccess': 'लॉगिन सफल हुआ',
  'login.fillAllFields': 'कृपया सभी आवश्यक फ़ील्ड भरें',
  'login.passwordMinLength': 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए',
  'login.passwordRequirements': 'पासवर्ड में अक्षर और संख्या दोनों होने चाहिए',
  'login.passwordsDoNotMatch': 'पासवर्ड मेल नहीं खाते',
  'login.agreeToTermsRequired': 'कृपया उपयोगकर्ता समझौते और गोपनीयता नीति से सहमत हों',
  'login.registrationFailed': 'पंजीकरण विफल: {error.message}',
  'login.registrationSuccess': 'पंजीकरण सफल हुआ! अब आप लॉगिन कर सकते हैं।',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'कृपया सभी आवश्यक फ़ील्ड भरें',
  'register.usernameFormat': 'उपयोगकर्ता नाम में केवल अक्षर, संख्या और अंडरस्कोर हो सकते हैं',
  'register.passwordMinLength': 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए',
  'register.passwordRequirements': 'पासवर्ड में अक्षर और संख्या दोनों होने चाहिए',
  'register.passwordsDoNotMatch': 'पासवर्ड मेल नहीं खाते',
  'register.agreeToTermsRequired': 'कृपया उपयोगकर्ता समझौते और गोपनीयता नीति से सहमत हों',
  'register.registrationFailed': 'पंजीकरण विफल: {error.message}',
  'register.registrationSuccess': 'पंजीकरण सफल हुआ! डैशबोर्ड पर भेजा जा रहा है...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'कृपया अपना उपयोगकर्ता नाम दर्ज करें',
  'resetPassword.usernameFormat': 'उपयोगकर्ता नाम में केवल अक्षर, संख्या और अंडरस्कोर हो सकते हैं',
  'resetPassword.sendFailed': 'रीसेट लिंक भेजने में विफल: {error.message}',
  'resetPassword.sendSuccess': 'पासवर्ड रीसेट लिंक भेज दिया गया है! कृपया अपना ईमेल जाँचें।',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': 'कृपया एक उद्देश्य दर्ज करें',
  'newBooking.resourceRequired': 'कृपया एक संसाधन चुनें',
  'newBooking.dateRequired': 'कृपया एक तारीख चुनें',
  'newBooking.startTimeRequired': 'कृपया प्रारंभ समय चुनें',
  'newBooking.invalidTimeRange': 'अंत समय, प्रारंभ समय के बाद होना चाहिए',
  'newBooking.conflictDetected': 'यह समय स्लॉट पहले से बुक है',
  'newBooking.createFailed': 'बुकिंग बनाने में विफल: {bookingError.message}',
  'newBooking.createSuccess': 'बुकिंग सफलतापूर्वक बनाई गई!',
  'newBooking.multiDayCreateFailed': 'मल्टी डे बुकिंग बनाने में विफल',
  'newBooking.multiDayCreateSuccess': 'मल्टी डे बुकिंग सफलतापूर्वक बनाई गई! ({total_days} दिन)',
  'newBooking.generalCreateFailed': 'बुकिंग बनाने में विफल',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'कृपया निर्यात के लिए प्रारंभ और अंतिम तारीख चुनें',
  'bookings.noBookingsForFilters': 'चयनित फ़िल्टर के लिए कोई बुकिंग नहीं मिली',
  'bookings.exportSuccess': '{count} बुकिंग पीडीएफ में निर्यात की गईं',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': 'नहीं मिला',
  'toast.approveMultiDayFailed': 'मल्टी डे बुकिंग को अनुमोदित करने में विफल: {error.message}',
  'toast.approveFailed': 'बुकिंग को अनुमोदित करने में विफल: {error.message}',
  'toast.bookingApproved': 'बुकिंग सफलतापूर्वक अनुमोदित हुई',
  'toast.rejectMultiDayFailed': 'मल्टी डे बुकिंग को अस्वीकार करने में विफल: {error.message}',
  'toast.rejectFailed': 'बुकिंग को अस्वीकार करने में विफल: {error.message}',
  'toast.bookingRejected': 'बुकिंग सफलतापूर्वक अस्वीकार की गई',
  'toast.cancelMultiDayFailed': 'मल्टी डे बुकिंग रद्द करने में विफल: {error.message}',
  'toast.cancelFailed': 'बुकिंग रद्द करने में विफल: {error.message}',
  'toast.bookingCancelled': 'बुकिंग सफलतापूर्वक रद्द की गई',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'यह फ़ील्ड आवश्यक है',
  'toast.resourceUpdateFailed': 'संसाधन अपडेट करने में विफल: {error.message}',
  'toast.resourceUpdated': 'संसाधन सफलतापूर्वक अपडेट हुआ',
  'toast.resourceCreateFailed': 'संसाधन बनाने में विफल: {error.message}',
  'toast.resourceCreated': 'संसाधन सफलतापूर्वक बनाया गया',
  'resources.deleteWarning': 'सक्रिय बुकिंग वाले संसाधन को हटाया नहीं जा सकता',
  'toast.resourceDeleteFailed': 'संसाधन हटाने में विफल: {error.message}',
  'toast.resourceDeleted': 'संसाधन सफलतापूर्वक हटा दिया गया',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'भूमिका अपडेट करने में विफल: {error.message}',
  'toast.userRoleChanged': 'उपयोगकर्ता की भूमिका सफलतापूर्वक बदल दी गई',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': 'भाषा सफलतापूर्वक अपडेट की गई!',
  'language.updateFailed': 'भाषा अपडेट करने में विफल। कृपया पुनः प्रयास करें।',
  'language.changedTo': 'भाषा {nativeName} में बदल दी गई',
  'language.changeFailed': 'भाषा बदलने में विफल। कृपया पुनः प्रयास करें।',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।',
  'common.somethingWentWrong': 'कुछ गलत हो गया',
  'toast.operationSuccess': 'कार्य सफलतापूर्वक पूरा हुआ',
  'toast.operationFailed': 'कार्य विफल हुआ',
};
