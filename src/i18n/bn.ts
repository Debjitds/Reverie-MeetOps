/**
 * Bengali (bn) static UI dictionary.
 *
 * Values are transcribed EXACTLY from `.docs/bengali_text_translation.md`
 * (the English → Bengali reference specification). Do not reword entries.
 * Keys missing here fall back to English automatically (see ./index.ts).
 * Keys use the same dot-notation as TRANSLATION_KEYS in src/lib/translation-keys.ts.
 */
export const bn: Record<string, string> = {
  // ===== BRAND =====
  'nav.appName': 'মিটঅপস',

  // ===== NAVIGATION / SIDEBAR =====
  'nav.dashboard': 'ড্যাশবোর্ড',
  'nav.bookings': 'বুকিং',
  'nav.calendar': 'ক্যালেন্ডার',
  'nav.resources': 'সম্পদ',
  'nav.users': 'ব্যবহারকারীরা',
  'nav.notifications': 'বিজ্ঞপ্তি',

  // ===== HEADER ROLES =====
  'navbar.admin': 'প্রশাসক',
  'navbar.manager': 'ব্যবস্থাপক',
  'navbar.user': 'ব্যবহারকারী',
  'navbar.logout': 'লগআউট',

  // ===== LOGOUT DIALOG =====
  'logoutDialog.title': 'লগআউট নিশ্চিত করুন',
  'logoutDialog.description':
    'আপনি কি নিশ্চিত যে আপনি লগ আউট করতে চান? আপনার ড্যাশবোর্ড এবং বুকিংগুলো অ্যাক্সেস করার জন্য আপনাকে আবার সাইন ইন করতে হবে।',
  'logoutDialog.cancel': 'বাতিল করুন',
  'logoutDialog.logout': 'লগআউট',

  // ===== DASHBOARD =====
  'dashboard.title': 'ড্যাশবোর্ড',
  'dashboard.welcome': 'আবার স্বাগতম',
  'dashboard.totalBookings': 'মোট বুকিং',
  'dashboard.pendingBookings': 'বিচারাধীন',
  'dashboard.approvedBookings': 'অনুমোদিত',
  'dashboard.rejectedBookings': 'প্রত্যাখ্যাত',
  'dashboard.upcomingBookings': 'আসন্ন বুকিং',
  'dashboard.noUpcomingBookings': 'আসন্ন কোনো বুকিং নেই',
  'dashboard.quickActions': 'দ্রুত পদক্ষেপ',
  'dashboard.newBooking': 'নতুন বুকিং',
  'dashboard.viewAllBookings': 'সমস্ত বুকিং দেখুন',
  'dashboard.manageResources': 'সম্পদ পরিচালনা করুন',
  'dashboard.aiInsights': 'এআই ইনসাইটস',
  'dashboard.chatWithAI': 'এআই সহকারীর সাথে চ্যাট করুন',

  // ===== NOTIFICATIONS (title only per reference; bodies remain English) =====
  'notifications.title': 'বিজ্ঞপ্তি',

  // ===== AI ASSISTANT UI =====
  'chat.title': 'মিটঅপস এআই অ্যাসিস্ট্যান্ট',
  'chat.greeting':
    'হ্যালো! আমি মিটঅপস এআই। আমি আপনাকে রুম বুক করতে, প্রাপ্যতা যাচাই করতে এবং আপনার বুকিংগুলো পরিচালনা করতে সাহায্য করতে পারি।',
  'chat.examplePrompt': 'চেষ্টা করুন: "আগামীকাল দুপুর ২টায় আমার জন্য ৫ জনের একটি রুম বুক করে দিন"',
  'chat.placeholder': 'আপনার বার্তা টাইপ করুন...',

  // ===== BOOKINGS PAGE =====
  'bookings.title': 'বুকিং',
  'bookings.activeBookings': 'সক্রিয় বুকিং',
  'bookings.pastBookings': 'পূর্ববর্তী বুকিং',
  'bookings.exportPDF': 'পিডিএফ-এ রপ্তানি করুন',
  'bookings.newBooking': 'নতুন বুকিং',
  'bookings.status': 'অবস্থা',
  'bookings.allStatuses': 'সমস্ত স্ট্যাটাস',
  'bookings.pending': 'বিচারাধীন',
  'bookings.approved': 'অনুমোদিত',
  'bookings.rejected': 'প্রত্যাখ্যাত',
  'bookings.cancelled': 'বাতিল করা হয়েছে',
  'bookings.completed': 'সম্পন্ন হয়েছে',
  'bookings.user': 'ব্যবহারকারী',
  'bookings.allUsers': 'সকল ব্যবহারকারী',
  'bookings.search': 'অনুসন্ধান',
  'bookings.searchPlaceholder': 'রিসোর্স, উদ্দেশ্য বা ব্যবহারকারী দ্বারা অনুসন্ধান করুন...',
  'bookings.resource': 'সম্পদ',
  'bookings.purpose': 'উদ্দেশ্য',
  'bookings.date': 'তারিখ',
  'bookings.startTime': 'শুরু সময়',
  'bookings.endTime': 'শেষ সময়',
  'bookings.type': 'প্রকার',
  'bookings.actions': 'কর্ম',
  'bookings.view': 'দেখুন',
  'bookings.viewDetails': 'বিস্তারিত দেখুন',
  'bookings.multiDay': 'বহু-দিনের',
  'bookings.singleDay': 'একদিন',
  'bookings.noActiveBookings': 'কোনো সক্রিয় বুকিং পাওয়া যায়নি',
  'bookings.noPastBookings': 'পূর্ববর্তী কোনো বুকিং পাওয়া যায়নি',

  // ===== EXPORT PDF DIALOG =====
  'bookings.exportTitle': 'বুকিংগুলো পিডিএফ-এ রপ্তানি করুন',
  'bookings.exportDescription': 'বুকিং ইতিহাস রপ্তানি করতে ফিল্টার নির্বাচন করুন',
  'bookings.startDate': 'শুরু তারিখ',
  'bookings.endDate': 'শেষ তারিখ',
  'bookings.exportButton': 'পিডিএফ-এ রপ্তানি করুন',
  'bookings.cancelButton': 'বাতিল করুন',

  // ===== PAGINATION =====
  'bookings.previous': 'পূর্ববর্তী',
  'bookings.next': 'পরবর্তী',
  'bookings.page': 'পৃষ্ঠা',
  'bookings.of': 'এর',

  // ===== NEW BOOKING =====
  'newBooking.title': 'নতুন বুকিং',
  'newBooking.subtitle': 'একটি নতুন রিসোর্স বুকিং তৈরি করুন',
  'newBooking.step1Title': 'ধাপ ১: রিসোর্স নির্বাচন করুন',
  'newBooking.step1Description': 'আপনি যে রিসোর্সটি বুক করতে চান তা বেছে নিন',
  'newBooking.step2Title': 'ধাপ ২: তারিখ ও সময় নির্বাচন করুন',
  'newBooking.step2Description': 'আপনি কখন {resource} বুক করতে চান তা বেছে নিন',
  'newBooking.step3Title': 'ধাপ ৩: বুকিংয়ের বিবরণ',
  'newBooking.step3Description': 'আপনার বুকিং সম্পর্কে অতিরিক্ত তথ্য প্রদান করুন।',
  'newBooking.bookingType': 'বুকিংয়ের ধরন',
  'newBooking.singleDay': 'একদিন',
  'newBooking.multiDay': 'বহু-দিনের',
  'newBooking.startDate': 'শুরু তারিখ',
  'newBooking.endDate': 'শেষ তারিখ',
  'newBooking.startTime': 'শুরু সময়',
  'newBooking.endTime': 'শেষ সময়',
  'newBooking.totalDays': 'মোট দিন',
  'newBooking.timeSlotAvailable': 'সময় উপলব্ধ আছে',
  'newBooking.purposeLabel': 'উদ্দেশ্য',
  'newBooking.purposePlaceholder': 'যেমন, টিম মিটিং, ক্লায়েন্ট প্রেজেন্টেশন',
  'newBooking.attendeesLabel': 'উপস্থিত ব্যক্তি (ঐচ্ছিক)',
  'newBooking.attendeesPlaceholder': 'অংশগ্রহণকারীদের নাম কমা দিয়ে আলাদা করে লিখুন',
  'newBooking.generateAgendaButton': 'এআই দিয়ে এজেন্ডা তৈরি করুন',
  'newBooking.bookingSummary': 'বুকিং সারাংশ',
  'newBooking.createBooking': 'বুকিং তৈরি করুন',

  // ===== BOOKING DETAILS (wording per reference: Section 17/9 tables) =====
  'bookingDetails.title': 'বুকিংয়ের বিবরণ',
  'bookingDetails.resource': 'সম্পদ',
  'bookingDetails.location': 'অবস্থান',
  'bookingDetails.startTime': 'শুরু সময়',
  'bookingDetails.endTime': 'শেষ সময়',
  'bookingDetails.purpose': 'উদ্দেশ্য',
  'bookingDetails.attendees': 'উপস্থিত ব্যক্তি',

  // ===== CALENDAR PAGE =====
  'calendar.title': 'ক্যালেন্ডার',
  'calendar.subtitle': 'সমস্ত রিসোর্স বুকিং দেখুন',
  'calendar.month': 'মাস',
  'calendar.week': 'সপ্তাহ',
  'calendar.day': 'দিন',
  'calendar.agenda': 'এজেন্ডা',
  'calendar.today': 'আজ',
  'calendar.back': 'ফিরে যান',
  'calendar.next': 'পরবর্তী',
  'calendar.legend': 'কিংবদন্তি',
  'calendar.approved': 'অনুমোদিত',
  'calendar.pending': 'বিচারাধীন',
  'calendar.rejected': 'প্রত্যাখ্যাত',
  'calendar.cancelled': 'বাতিল করা হয়েছে',

  // ===== RESOURCES PAGE =====
  'resources.title': 'সম্পদ',
  'resources.addResource': 'সম্পদ যোগ করুন',
  'resources.name': 'নাম',
  'resources.location': 'অবস্থান',
  'resources.capacity': 'ধারণক্ষমতা',
  'resources.description': 'বর্ণনা',
  'resources.actions': 'কর্ম',
  'resources.addTitle': 'নতুন রিসোর্স যোগ করুন',
  'resources.editTitle': 'রিসোর্স সম্পাদনা করুন',
  'resources.addDescription': 'বুকিংয়ের জন্য একটি নতুন রিসোর্স তৈরি করুন',
  'resources.editDescription': 'সম্পদের তথ্য হালনাগাদ করুন',
  'resources.namePlaceholder': 'রিসোর্সের নাম লিখুন',
  'resources.locationPlaceholder': 'অবস্থান লিখুন',
  'resources.descriptionPlaceholder': 'বিবরণ লিখুন',
  'resources.create': 'তৈরি করুন',
  'resources.update': 'আপডেট',

  // ===== DELETE RESOURCE CONFIRMATION =====
  'resources.deleteTitle': 'রিসোর্স মুছে ফেলুন',
  'resources.deleteDescription':
    'আপনি কি "{name}" মুছে ফেলতে নিশ্চিত? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।',

  // ===== USERS PAGE =====
  'users.title': 'ব্যবহারকারীরা',
  'users.name': 'নাম',
  'users.email': 'ইমেল',
  'users.role': 'ভূমিকা',
  'users.joined': 'যোগদান করেছেন',
  'users.actions': 'কর্ম',
  'users.changeRole': 'ভূমিকা পরিবর্তন করুন',
  'users.changeRoleTitle': 'ব্যবহারকারীর ভূমিকা পরিবর্তন করুন',
  'users.currentRole': 'বর্তমান ভূমিকা',
  'users.newRole': 'নতুন ভূমিকা',
  'users.updateRole': 'ভূমিকা পরিবর্তন করুন',
  'users.searchPlaceholder': 'ব্যবহারকারীদের অনুসন্ধান করুন...',
  'users.admin': 'প্রশাসক',
  'users.manager': 'ব্যবস্থাপক',
  'users.user': 'ব্যবহারকারী',

  // ===== COMMON =====
  'common.cancel': 'বাতিল করুন',
  'common.back': 'ফিরে যান',
  'common.next': 'পরবর্তী',
  'common.previous': 'পূর্ববর্তী',
  'common.today': 'আজ',
  'common.view': 'দেখুন',
  'common.viewDetails': 'বিস্তারিত দেখুন',
  'common.search': 'অনুসন্ধান',
  'common.filter': 'ফিল্টার',
  'common.date': 'তারিখ',
  'common.name': 'নাম',
  'common.description': 'বর্ণনা',
  'common.delete': 'মুছে ফেলুন',
  'common.remove': 'মুছে ফেলুন',
  'common.edit': 'সম্পাদনা',
  'common.create': 'তৈরি করুন',
  'common.update': 'আপডেট',
  'common.actions': 'কর্ম',
  'common.status': 'অবস্থা',

  // ===== AUTHENTICATION =====
  'auth.appName': 'মিটঅপস',
  'auth.subtitle': 'রিসোর্স বুকিং ম্যানেজমেন্ট সিস্টেম',
  'auth.welcome': 'স্বাগতম',
  'auth.loginOrRegister': 'লগইন করুন অথবা একটি নতুন অ্যাকাউন্ট তৈরি করুন',
  'auth.loginTab': 'লগইন',
  'auth.registerTab': 'নিবন্ধন করুন',
  'auth.fullName': 'পুরো নাম',
  'auth.fullNamePlaceholder': 'আপনার পুরো নাম লিখুন',
  'auth.username': 'ব্যবহারকারীর নাম',
  'auth.usernameRegisterPlaceholder': 'শুধুমাত্র অক্ষর, সংখ্যা এবং আন্ডারস্কোর',
  'auth.password': 'পাসওয়ার্ড',
  'auth.passwordRegisterPlaceholder': 'কমপক্ষে ৮টি অক্ষর ও সংখ্যা',
  'auth.confirmPassword': 'পাসওয়ার্ড নিশ্চিত করুন',
  'auth.confirmPasswordPlaceholder': 'পাসওয়ার্ড পুনরায় লিখুন',
  'auth.termsAgreement':
    'আমি ব্যবহারকারী চুক্তি এবং গোপনীয়তা নীতিতে সম্মত (অনুগ্রহ করে এই নথিগুলি আইনগত প্রয়োজনীয়তা মেনে চলার জন্য সংশোধন করুন)',
  'auth.registerButton': 'নিবন্ধন করুন',
  'auth.usernameLoginPlaceholder': 'ব্যবহারকারীর নাম লিখুন',
  'auth.passwordLoginPlaceholder': 'পাসওয়ার্ড লিখুন',
  'auth.forgotPassword': 'পাসওয়ার্ড ভুলে গেছেন?',
  'auth.loginButton': 'লগইন',
};
