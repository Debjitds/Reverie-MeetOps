/**
 * Arabic (ar / ar-SA) static UI dictionary — RTL locale.
 *
 * Values transcribed from `.docs/arabic_text_translation.md`
 * (the single English → Arabic reference specification, Modern Standard
 * Arabic), mapped onto the app's existing dot-notation keys. Doc wording is
 * preserved exactly where specified. RTL itself is handled by the existing
 * infrastructure: languages.ts marks `ar` as rtl:true and LanguageContext
 * sets document.documentElement.dir, with [dir="rtl"] overrides in
 * index.css — no layout changes are made here.
 * The doc's "Welcome back, Admin" drops the dynamic name because the JSX
 * renders it (DashboardPage); the doc's delete/change-role entries use
 * "{resource}"/"{user}" but the calling code interpolates "{name}", so the
 * code's placeholder is preserved. Entries without a doc match (auth form
 * labels, a few toasts) follow the doc's section 27 translation patterns.
 * Interpolation placeholders ({resource}, {name}, {count}, {total_days},
 * {nativeName}, {error.message}, {bookingError.message}) must match the
 * calling code exactly. Keys missing here fall back to English.
 */
export const ar: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'ميت أوبس',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'لوحة التحكم',
  'nav.bookings': 'الحجوزات',
  'nav.calendar': 'تقويم',
  'nav.resources': 'موارد',
  'nav.users': 'المستخدمون',
  'nav.notifications': 'الإشعارات',

  // ===== HEADER ROLES =====
  'navbar.admin': 'المسؤول',
  'navbar.manager': 'مدير',
  'navbar.user': 'مستخدم',
  'navbar.logout': 'تسجيل الخروج',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'تأكيد تسجيل الخروج',
  'logoutDialog.description':
    'هل أنت متأكد من رغبتك في تسجيل الخروج؟ ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى لوحة التحكم والحجوزات الخاصة بك.',
  'logoutDialog.cancel': 'إلغاء',
  'logoutDialog.logout': 'تسجيل الخروج',

  // ===== DASHBOARD =====
  'dashboard.title': 'لوحة التحكم',
  'dashboard.welcome': 'مرحبًا بعودتك',
  'dashboard.totalBookings': 'إجمالي الحجوزات',
  'dashboard.pendingBookings': 'قيد الانتظار',
  'dashboard.approvedBookings': 'موافق عليه',
  'dashboard.rejectedBookings': 'مرفوض',
  'dashboard.upcomingBookings': 'الحجوزات القادمة',
  'dashboard.noUpcomingBookings': 'لا توجد حجوزات قادمة',
  'dashboard.quickActions': 'إجراءات سريعة',
  'dashboard.newBooking': 'حجز جديد',
  'dashboard.viewAllBookings': 'عرض جميع الحجوزات',
  'dashboard.manageResources': 'إدارة الموارد',
  'dashboard.aiInsights': 'رؤى الذكاء الاصطناعي',
  'dashboard.chatWithAI': 'تحدث مع مساعد الذكاء الاصطناعي',

  // ===== NOTIFICATIONS =====
  'notifications.title': 'الإشعارات',
  'notifications.markAllAsRead': 'وضع علامة "مقروء" على الكل',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'مساعد MeetOps للذكاء الاصطناعي',
  'chat.greeting':
    'مرحبًا! أنا مساعد MeetOps للذكاء الاصطناعي. يمكنني مساعدتك في حجز الغرف والتحقق من التوافر وإدارة حجوزاتك.',
  'chat.examplePrompt': 'جرّب: «احجز لي غرفة لـ 5 أشخاص غدًا الساعة 14:00»',
  'chat.placeholder': 'اكتب رسالتك...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'الحجوزات',
  'bookings.activeBookings': 'الحجوزات النشطة',
  'bookings.pastBookings': 'الحجوزات السابقة',
  'bookings.exportPDF': 'تصدير ملف PDF',
  'bookings.newBooking': 'حجز جديد',
  'bookings.status': 'الحالة',
  'bookings.allStatuses': 'جميع الحالات',
  'bookings.pending': 'قيد الانتظار',
  'bookings.approved': 'موافق عليه',
  'bookings.rejected': 'مرفوض',
  'bookings.cancelled': 'تم الإلغاء',
  'bookings.completed': 'مكتمل',
  'bookings.user': 'المستخدم',
  'bookings.allUsers': 'جميع المستخدمين',
  'bookings.search': 'بحث',
  'bookings.searchPlaceholder': 'ابحث حسب المورد أو الغاية أو المستخدم...',
  'bookings.resource': 'المورد',
  'bookings.purpose': 'الغاية',
  'bookings.date': 'التاريخ',
  'bookings.startTime': 'وقت البدء',
  'bookings.endTime': 'وقت الانتهاء',
  'bookings.type': 'النوع',
  'bookings.actions': 'الإجراءات',
  'bookings.view': 'عرض',
  'bookings.viewDetails': 'عرض التفاصيل',
  'bookings.multiDay': 'عدة أيام',
  'bookings.singleDay': 'يوم واحد',
  'bookings.noActiveBookings': 'لم يتم العثور على حجوزات نشطة',
  'bookings.noPastBookings': 'لم يتم العثور على حجوزات سابقة',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'تصدير الحجوزات إلى ملف PDF',
  'bookings.exportDescription': 'حدد عوامل التصفية لتصدير سجل الحجوزات',
  'bookings.startDate': 'تاريخ البدء',
  'bookings.endDate': 'تاريخ الانتهاء',
  'bookings.exportButton': 'تصدير ملف PDF',
  'bookings.cancelButton': 'إلغاء',

  // ===== PAGINATION =====
  'bookings.previous': 'السابق',
  'bookings.next': 'التالي',
  'bookings.page': 'صفحة',
  'bookings.of': 'من',

  // ===== NEW BOOKING =====
  'newBooking.title': 'حجز جديد',
  'newBooking.subtitle': 'إنشاء حجز مورد جديد',
  'newBooking.step1Title': 'الخطوة 1: تحديد المورد',
  'newBooking.step1Description': 'اختر المورد الذي ترغب في حجزه',
  'newBooking.step2Title': 'الخطوة 2: تحديد التاريخ والوقت',
  'newBooking.step2Description': 'اختر الوقت الذي تريد فيه حجز {resource}',
  'newBooking.step3Title': 'الخطوة 3: تفاصيل الحجز',
  'newBooking.step3Description': 'يرجى تقديم معلومات إضافية حول حجزك.',
  'newBooking.bookingType': 'نوع الحجز',
  'newBooking.singleDay': 'يوم واحد',
  'newBooking.multiDay': 'عدة أيام',
  'newBooking.startDate': 'تاريخ البدء',
  'newBooking.endDate': 'تاريخ الانتهاء',
  'newBooking.startTime': 'وقت البدء',
  'newBooking.endTime': 'وقت الانتهاء',
  'newBooking.totalDays': 'إجمالي الأيام',
  'newBooking.timeSlotAvailable': 'الفترة الزمنية المتاحة',
  'newBooking.purposeLabel': 'الغاية',
  'newBooking.purposePlaceholder': 'مثال: اجتماع فريق، عرض تقديمي للعميل',
  'newBooking.attendeesLabel': 'الحضور (اختياري)',
  'newBooking.attendeesPlaceholder': 'أدخل أسماء الحضور مفصولة بفواصل.',
  'newBooking.generateAgendaButton': 'إنشاء جدول أعمال باستخدام الذكاء الاصطناعي',
  'newBooking.bookingSummary': 'ملخص الحجز',
  'newBooking.createBooking': 'إنشاء الحجز',

  // ===== BOOKING DETAILS =====
  'bookingDetails.title': 'تفاصيل الحجز',
  'bookingDetails.resource': 'المورد',
  'bookingDetails.location': 'الموقع',
  'bookingDetails.startTime': 'وقت البدء',
  'bookingDetails.endTime': 'وقت الانتهاء',
  'bookingDetails.purpose': 'الغاية',
  'bookingDetails.attendees': 'الحضور',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'تقويم',
  'calendar.subtitle': 'عرض جميع حجوزات الموارد',
  'calendar.month': 'شهر',
  'calendar.week': 'أسبوع',
  'calendar.day': 'يوم',
  'calendar.agenda': 'جدول الأعمال',
  'calendar.today': 'اليوم',
  'calendar.back': 'خلف',
  'calendar.next': 'التالي',
  'calendar.legend': 'مفتاح الألوان',
  'calendar.approved': 'موافق عليه',
  'calendar.pending': 'قيد الانتظار',
  'calendar.rejected': 'مرفوض',
  'calendar.cancelled': 'تم الإلغاء',

  // ===== RESOURCES PAGE =====
  'resources.title': 'موارد',
  'resources.addResource': 'إضافة مورد',
  'resources.name': 'الاسم',
  'resources.location': 'الموقع',
  'resources.capacity': 'السعة',
  'resources.description': 'الوصف',
  'resources.actions': 'الإجراءات',
  'resources.addTitle': 'إضافة مورد جديد',
  'resources.editTitle': 'تعديل المورد',
  'resources.addDescription': 'إنشاء مورد جديد للحجز',
  'resources.editDescription': 'تحديث معلومات المورد',
  'resources.namePlaceholder': 'أدخل اسم المورد',
  'resources.locationPlaceholder': 'أدخل الموقع',
  'resources.descriptionPlaceholder': 'أدخل الوصف',
  'resources.create': 'إنشاء',
  'resources.update': 'تحديث',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'حذف المورد',
  'resources.deleteDescription': 'هل أنت متأكد من رغبتك في حذف "{name}"؟ لا يمكن التراجع عن هذا الإجراء.',

  // ===== USERS PAGE =====
  'users.title': 'المستخدمون',
  'users.name': 'الاسم',
  'users.email': 'البريد الإلكتروني',
  'users.role': 'الدور',
  'users.joined': 'الانضمام',
  'users.actions': 'الإجراءات',
  'users.changeRole': 'تغيير الدور',
  'users.changeRoleTitle': 'تغيير دور المستخدم',
  'users.currentRole': 'الدور الحالي',
  'users.newRole': 'الدور الجديد',
  'users.updateRole': 'تحديث',
  'users.searchPlaceholder': 'ابحث عن المستخدمين...',
  'users.admin': 'المسؤول',
  'users.manager': 'مدير',
  'users.user': 'مستخدم',

  // ===== COMMON =====
  'common.cancel': 'إلغاء',
  'common.back': 'خلف',
  'common.next': 'التالي',
  'common.previous': 'السابق',
  'common.today': 'اليوم',
  'common.view': 'عرض',
  'common.viewDetails': 'عرض التفاصيل',
  'common.search': 'بحث',
  'common.filter': 'تصفية',
  'common.date': 'التاريخ',
  'common.name': 'الاسم',
  'common.description': 'الوصف',
  'common.delete': 'حذف',
  'common.remove': 'إزالة',
  'common.edit': 'تعديل',
  'common.create': 'إنشاء',
  'common.update': 'تحديث',
  'common.actions': 'الإجراءات',
  'common.status': 'الحالة',

  // ===== AUTHENTICATION =====
  'auth.appName': 'ميت أوبس',
  'auth.subtitle': 'نظام إدارة حجز الموارد',
  'auth.welcome': 'مرحبًا',
  'auth.loginOrRegister': 'سجّل الدخول أو أنشئ حسابًا جديدًا',
  'auth.loginTab': 'تسجيل الدخول',
  'auth.registerTab': 'التسجيل',
  'auth.fullName': 'الاسم الكامل',
  'auth.fullNamePlaceholder': 'أدخل اسمك الكامل',
  'auth.username': 'اسم المستخدم',
  'auth.usernameRegisterPlaceholder': 'أحرف وأرقام وشرطات سفلية فقط',
  'auth.password': 'كلمة المرور',
  'auth.passwordRegisterPlaceholder': '8 أحرف على الأقل مع أحرف وأرقام',
  'auth.confirmPassword': 'تأكيد كلمة المرور',
  'auth.confirmPasswordPlaceholder': 'أعد إدخال كلمة المرور',
  'auth.termsAgreement': 'أوافق على اتفاقية المستخدم وسياسة الخصوصية',
  'auth.registerButton': 'إنشاء حساب',
  'auth.usernameLoginPlaceholder': 'أدخل اسم المستخدم',
  'auth.passwordLoginPlaceholder': 'أدخل كلمة المرور',
  'auth.forgotPassword': 'هل نسيت كلمة المرور؟',
  'auth.loginButton': 'تسجيل الدخول',
  'auth.fetchUserInfoFailed': 'تعذر الحصول على معلومات المستخدم: {error.message}',

  // ===== LOGIN PAGE TOASTS =====
  'login.enterUsernamePassword': 'يرجى إدخال اسم المستخدم وكلمة المرور',
  'login.usernameFormat': 'يمكن أن يحتوي اسم المستخدم على أحرف وأرقام وشرطات سفلية فقط',
  'login.loginFailed': 'تعذر تسجيل الدخول: {error.message}',
  'login.loginSuccess': 'تم تسجيل الدخول بنجاح',
  'login.fillAllFields': 'يرجى إدخال الحقول المطلوبة',
  'login.passwordMinLength': 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
  'login.passwordRequirements': 'يجب أن تحتوي كلمة المرور على أحرف وأرقام',
  'login.passwordsDoNotMatch': 'كلمتا المرور غير متطابقتين',
  'login.agreeToTermsRequired': 'يرجى الموافقة على اتفاقية المستخدم وسياسة الخصوصية',
  'login.registrationFailed': 'تعذر التسجيل: {error.message}',
  'login.registrationSuccess': 'تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن.',

  // ===== STANDALONE REGISTRATION PAGE TOASTS =====
  'register.fillAllFields': 'يرجى إدخال الحقول المطلوبة',
  'register.usernameFormat': 'يمكن أن يحتوي اسم المستخدم على أحرف وأرقام وشرطات سفلية فقط',
  'register.passwordMinLength': 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
  'register.passwordRequirements': 'يجب أن تحتوي كلمة المرور على أحرف وأرقام',
  'register.passwordsDoNotMatch': 'كلمتا المرور غير متطابقتين',
  'register.agreeToTermsRequired': 'يرجى الموافقة على اتفاقية المستخدم وسياسة الخصوصية',
  'register.registrationFailed': 'تعذر التسجيل: {error.message}',
  'register.registrationSuccess': 'تم التسجيل بنجاح! جارٍ التحويل إلى لوحة التحكم...',

  // ===== PASSWORD RESET TOASTS =====
  'resetPassword.usernameRequired': 'يرجى إدخال اسم المستخدم الخاص بك',
  'resetPassword.usernameFormat': 'يمكن أن يحتوي اسم المستخدم على أحرف وأرقام وشرطات سفلية فقط',
  'resetPassword.sendFailed': 'تعذر إرسال رابط إعادة التعيين: {error.message}',
  'resetPassword.sendSuccess': 'تم إرسال رابط إعادة تعيين كلمة المرور! يرجى التحقق من بريدك الإلكتروني.',

  // ===== NEW BOOKING TOASTS =====
  'newBooking.purposeRequired': 'يرجى إدخال الغاية',
  'newBooking.resourceRequired': 'يرجى تحديد مورد',
  'newBooking.dateRequired': 'يرجى تحديد تاريخ',
  'newBooking.startTimeRequired': 'يرجى تحديد وقت',
  'newBooking.invalidTimeRange': 'يجب أن يكون وقت الانتهاء بعد وقت البدء',
  'newBooking.conflictDetected': 'هذه الفترة الزمنية محجوزة بالفعل',
  'newBooking.createFailed': 'تعذر إنشاء الحجز: {bookingError.message}',
  'newBooking.createSuccess': 'تم إنشاء الحجز بنجاح',
  'newBooking.multiDayCreateFailed': 'تعذر إنشاء الحجز لعدة أيام',
  'newBooking.multiDayCreateSuccess': 'تم إنشاء الحجز لعدة أيام بنجاح! ({total_days} أيام)',
  'newBooking.generalCreateFailed': 'تعذر إنشاء الحجز',

  // ===== BOOKINGS / PDF EXPORT TOASTS =====
  'bookings.exportDatesRequired': 'يرجى تحديد تاريخي البدء والانتهاء للتصدير',
  'bookings.noBookingsForFilters': 'لم يتم العثور على حجوزات لعوامل التصفية المحددة',
  'bookings.exportSuccess': 'تم تصدير {count} حجز إلى ملف PDF',

  // ===== BOOKING APPROVAL / DETAILS TOASTS =====
  'common.notFound': 'غير موجود',
  'toast.approveMultiDayFailed': 'تعذرت الموافقة على الحجز لعدة أيام: {error.message}',
  'toast.approveFailed': 'تعذرت الموافقة على الحجز: {error.message}',
  'toast.bookingApproved': 'تمت الموافقة على الحجز بنجاح',
  'toast.rejectMultiDayFailed': 'تعذر رفض الحجز لعدة أيام: {error.message}',
  'toast.rejectFailed': 'تعذر رفض الحجز: {error.message}',
  'toast.bookingRejected': 'تم رفض الحجز بنجاح',
  'toast.cancelMultiDayFailed': 'تعذر إلغاء الحجز لعدة أيام: {error.message}',
  'toast.cancelFailed': 'تعذر إلغاء الحجز: {error.message}',
  'toast.bookingCancelled': 'تم إلغاء الحجز بنجاح',

  // ===== RESOURCE MANAGEMENT TOASTS =====
  'toast.requiredField': 'هذا الحقل مطلوب',
  'toast.resourceUpdateFailed': 'تعذر تحديث المورد: {error.message}',
  'toast.resourceUpdated': 'تم تحديث المورد بنجاح',
  'toast.resourceCreateFailed': 'تعذر إنشاء المورد: {error.message}',
  'toast.resourceCreated': 'تم إنشاء المورد بنجاح',
  'resources.deleteWarning': 'لا يمكن حذف مورد به حجوزات نشطة',
  'toast.resourceDeleteFailed': 'تعذر حذف المورد: {error.message}',
  'toast.resourceDeleted': 'تم حذف المورد بنجاح',

  // ===== USER ROLE TOASTS =====
  'toast.userRoleUpdateFailed': 'تعذر تحديث دور المستخدم: {error.message}',
  'toast.userRoleChanged': 'تم تحديث دور المستخدم بنجاح',

  // ===== LANGUAGE SWITCHER TOASTS =====
  'language.updateSuccess': 'تم تحديث اللغة بنجاح!',
  'language.updateFailed': 'تعذر تحديث اللغة. يرجى المحاولة مرة أخرى.',
  'language.changedTo': 'تم تغيير اللغة إلى {nativeName}',
  'language.changeFailed': 'تعذر تغيير اللغة. يرجى المحاولة مرة أخرى.',

  // ===== AI ASSISTANT / COMMON TOASTS =====
  'chat.sendError': 'تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.',
  'common.somethingWentWrong': 'حدث خطأ ما',
  'toast.operationSuccess': 'تم تنفيذ العملية بنجاح',
  'toast.operationFailed': 'تعذر تنفيذ العملية',
};
