# MeetOps Hindi Translation Specification
## English → Hindi Reference
### Language: Hindi (`hi`)

> Purpose:
> This document is the source of truth for implementing MeetOps Hindi translations using the existing static i18n system.
>
> The UI translations below are based primarily on the supplied Hindi MeDo-hosted MeetOps screenshots.
>
> Toast notifications are translated separately because no Hindi toast screenshots were supplied.
>
> IMPORTANT:
> - Do NOT use Gemini or any external translation API for these static translations.
> - Do NOT translate dynamic database/user values.
> - Preserve dynamic placeholders exactly.
> - Keep existing English/Bengali translations unchanged.
> - Hindi must be added as another static dictionary using the existing translation-key architecture.

---

# 1. Language

| Property | Value |
|---|---|
| Language | Hindi |
| Code | `hi` |
| Native name | हिन्दी |

---

# 2. Application / Brand

| Key | English | Hindi |
|---|---|---|
| `app.name` | MeetOps | मीटऑप्स |

---

# 3. Global Navigation / Sidebar

| Key | English | Hindi |
|---|---|---|
| `nav.dashboard` | Dashboard | डैशबोर्ड |
| `nav.bookings` | Bookings | बुकिंग के |
| `nav.calendar` | Calendar | कैलेंडर |
| `nav.resources` | Resources | संसाधन |
| `nav.users` | Users | उपयोगकर्ताओं |

---

# 4. Global Common Actions

| Key | English | Hindi |
|---|---|---|
| `common.admin` | Admin | व्यवस्थापक |
| `common.cancel` | Cancel | रद्द करना |
| `common.back` | Back | पीछे |
| `common.next` | Next | अगला |
| `common.today` | Today | आज |
| `common.previous` | Previous | पिछले |
| `common.view` | View | देखना |
| `common.viewDetails` | View Details | विवरण देखें |
| `common.create` | Create | बनाएँ |
| `common.update` | Update | अद्यतन |
| `common.delete` | Delete | हटाएँ |
| `common.remove` | Remove | मिटाना |
| `common.edit` | Edit | संपादित करें |
| `common.search` | Search | खोज |

---

# 5. Dashboard

| Key | English | Hindi |
|---|---|---|
| `dashboard.title` | Dashboard | डैशबोर्ड |
| `dashboard.welcome` | Welcome back, | वापसी पर स्वागत है, |
| `dashboard.totalBookings` | Total Bookings | कुल बुकिंग |
| `dashboard.pending` | Pending | लंबित |
| `dashboard.approved` | Approved | अनुमत |
| `dashboard.rejected` | Rejected | अस्वीकार कर दिया |
| `dashboard.upcomingBookings` | Upcoming Bookings | आगामी बुकिंग |
| `dashboard.noUpcomingBookings` | No upcoming bookings | कोई आगामी बुकिंग नहीं है |
| `dashboard.quickActions` | Quick Actions | त्वरित कार्रवाइयाँ |
| `dashboard.newBooking` | New Booking | नई बुकिंग |
| `dashboard.viewAllBookings` | View All Bookings | सभी बुकिंग देखें |
| `dashboard.manageResources` | Manage Resources | संसाधनों का प्रबंधन करें |
| `dashboard.aiInsights` | AI Insights | एआई इनसाइट्स |
| `dashboard.chatWithAssistant` | Chat with AI Assistant | एआई असिस्टेंट से चैट करें |

Dynamic values such as:

- booking counts
- usernames
- dates
- times

must remain dynamic.

---

# 6. Notifications

| Key | English | Hindi |
|---|---|---|
| `notifications.title` | Notifications | सूचनाएँ |
| `notifications.markAllAsRead` | Mark All as Read | सभी को पढ़ा हुआ मार्क करें |

## Notification bodies

The supplied Hindi reference keeps the actual notification messages in English:

| English | Hindi reference behavior |
|---|---|
| New multi-day booking request for 4 days | UNCHANGED — English |
| New multi-day booking request for 5 days | UNCHANGED — English |
| New multi-day booking request for 16 days | UNCHANGED — English |
| Your booking for Room 10 has been approved | UNCHANGED — English |

Dynamic dates and times remain unchanged.

---

# 7. Logout Confirmation

| Key | English | Hindi |
|---|---|---|
| `logout.confirmTitle` | Confirm Logout | लॉगआउट की पुष्टि करें |
| `logout.confirmMessage` | Are you sure you want to log out? You will need to sign in again to access your dashboard and bookings. | क्या आप वाकई लॉग आउट करना चाहते हैं? डैशबोर्ड और बुकिंग देखने के लिए आपको दोबारा साइन इन करना होगा। |
| `logout.cancel` | Cancel | रद्द करना |
| `logout.confirm` | Logout | लॉग आउट |

---

# 8. AI Assistant

| Key | English | Hindi |
|---|---|---|
| `ai.title` | MeetOps AI Assistant | मीटऑप्स एआई सहायक |
| `ai.greeting` | Hi! I'm MeetOps AI. I can help you book rooms, check availability, and manage your bookings. | नमस्कार! मैं मीटऑप्स एआई हूँ। मैं कमरे बुक करने, उपलब्धता जाँचने और आपकी बुकिंग प्रबंधित करने में आपकी मदद कर सकता हूँ। |
| `ai.examplePrompt` | Try: "Book me a room for 5 people tomorrow at 2PM" | यह आज़माएँ: "कल दोपहर 2 बजे मेरे लिए 5 लोगों के लिए एक कमरा बुक कर दें" |
| `ai.inputPlaceholder` | Type your message... | अपना संदेश टाइप करें... |
| `ai.chatInvitation` | Chat with AI Assistant | एआई असिस्टेंट से चैट करें |
| `ai.insightsButton` | AI Insights | एआई इनसाइट्स |

Important:

`{actionResult.message}` is dynamic AI-generated content.

Do NOT put it in the static translation dictionary.

---

# 9. Bookings Page

| Key | English | Hindi |
|---|---|---|
| `bookings.title` | Bookings | बुकिंग के |
| `bookings.exportPdf` | Export PDF | पीडीएफ निर्यात करें |
| `bookings.newBooking` | New Booking | नई बुकिंग |
| `bookings.status` | Status | स्थिति |
| `bookings.allStatuses` | All Statuses | सभी स्थितियाँ |
| `bookings.user` | User | उपयोगकर्ता |
| `bookings.allUsers` | All Users | सभी उपयोगकर्ता |
| `bookings.search` | Search | खोज |
| `bookings.searchPlaceholder` | Search by resource, purpose, or user... | संसाधन, उद्देश्य या उपयोगकर्ता के आधार पर खोजें... |
| `bookings.activeBookings` | Active Bookings | सक्रिय बुकिंग |
| `bookings.pastBookings` | Past Bookings | पिछली बुकिंग |
| `bookings.resource` | Resource | संसाधन |
| `bookings.purpose` | Purpose | उद्देश्य |
| `bookings.date` | Date | तारीख |
| `bookings.startTime` | Start Time | समय शुरू |
| `bookings.endTime` | End Time | अंत समय |
| `bookings.type` | Type | प्रकार |
| `bookings.statusColumn` | Status | स्थिति |
| `bookings.actions` | Actions | कार्रवाई |
| `bookings.view` | View | देखना |
| `bookings.viewDetails` | View Details | विवरण देखें |

---

# 10. Booking Statuses

| Key | English | Hindi |
|---|---|---|
| `status.pending` | Pending | लंबित |
| `status.approved` | Approved | अनुमत |
| `status.rejected` | Rejected | अस्वीकार कर दिया |
| `status.cancelled` | Cancelled | रद्द कर दिया गया |
| `status.completed` | Completed | पूरा होना |
| `booking.type.multiDay` | Multi-Day | मल्टी डे |
| `booking.type.singleDay` | Single Day | एकल दिन |

---

# 11. Booking Empty States

| Key | English | Hindi |
|---|---|---|
| `bookings.noActiveBookings` | No active bookings found | कोई सक्रिय बुकिंग नहीं मिली |
| `bookings.noPastBookings` | No past bookings found | कोई पूर्व बुकिंग नहीं मिली |

These MUST be static translation keys.

---

# 12. Active / Past Booking Headers

| Key | English | Hindi |
|---|---|---|
| `bookings.active` | Active Bookings | सक्रिय बुकिंग |
| `bookings.past` | Past Bookings | पिछली बुकिंग |

Counts remain dynamic.

Example:

`ACTIVE BOOKINGS (18)`

must use the translated label with the dynamic numeric value.

---

# 13. Booking Filters

| Key | English | Hindi |
|---|---|---|
| `filter.status` | Status | स्थिति |
| `filter.allStatuses` | All Statuses | सभी स्थितियाँ |
| `filter.user` | User | उपयोगकर्ता |
| `filter.allUsers` | All Users | सभी उपयोगकर्ता |
| `filter.search` | Search | खोज |

---

# 14. Booking Status Dropdown

The screenshot shows:

| English | Hindi |
|---|---|
| All Statuses | सभी स्थितियाँ |
| Pending | लंबित |
| Approved | अनुमत |
| Rejected | अस्वीकार कर दिया |
| Cancelled | रद्द कर दिया गया |
| Completed | पूरा होना |

---

# 15. Export Bookings PDF Dialog

| Key | English | Hindi |
|---|---|---|
| `bookings.exportDialog.title` | Export Bookings as PDF | बुकिंग को पीडीएफ में निर्यात करें |
| `bookings.exportDialog.description` | Select filters to export booking history | बुकिंग इतिहास निर्यात करने के लिए फ़िल्टर चुनें |
| `bookings.exportDialog.startDate` | Start Date | आरंभ करने की तिथि |
| `bookings.exportDialog.endDate` | End Date | अंतिम तिथि |
| `bookings.exportDialog.cancel` | Cancel | रद्द करना |
| `bookings.exportDialog.export` | Export PDF | पीडीएफ निर्यात करें |

---

# 16. New Booking

| Key | English | Hindi |
|---|---|---|
| `newBooking.title` | New Booking | नई बुकिंग |
| `newBooking.description` | Create a new resource booking | नया संसाधन बुकिंग बनाएँ |

---

# 17. New Booking Step Indicator

Numbers:

`1`

`2`

`3`

remain unchanged.

---

# 18. New Booking — Step 1

| Key | English | Hindi |
|---|---|---|
| `newBooking.step1.title` | STEP 1: SELECT RESOURCE | चरण 1: संसाधन का चयन करें |
| `newBooking.step1.description` | Choose a resource to book | वह संसाधन चुनें जिसे आप बुक करना चाहते हैं |
| `newBooking.capacity` | Capacity | क्षमता |
| `newBooking.next` | Next | अगला |

---

# 19. New Booking — Step 2

| Key | English | Hindi |
|---|---|---|
| `newBooking.step2.title` | STEP 2: SELECT DATE & TIME | चरण 2: दिनांक और समय चुनें |
| `newBooking.step2.description` | Choose when you want to book Room 10 | आप Room 10 को कब बुक करना चाहते हैं, यह चुनें |
| `newBooking.bookingType` | Booking Type | बुकिंग प्रकार |
| `newBooking.singleDay` | Single Day | एकल दिन |
| `newBooking.multiDay` | Multi-Day | मल्टी डे |
| `newBooking.startDate` | Start Date | आरंभ करने की तिथि |
| `newBooking.endDate` | End Date | अंतिम तिथि |
| `newBooking.totalDays` | Total Days | कुल दिन |
| `newBooking.startTime` | Start Time | समय शुरू |
| `newBooking.endTime` | End Time | अंत समय |
| `newBooking.timeSlotAvailable` | Time Slot Available | समय उपलब्ध है |
| `newBooking.back` | Back | पीछे |
| `newBooking.next` | Next | अगला |

---

# 20. New Booking — Step 3

| Key | English | Hindi |
|---|---|---|
| `newBooking.step3.title` | STEP 3: BOOKING DETAILS | चरण 3: बुकिंग विवरण |
| `newBooking.step3.description` | Provide additional information about your booking | अपनी बुकिंग के बारे में अतिरिक्त जानकारी प्रदान करें |
| `newBooking.purpose` | Purpose | उद्देश्य |
| `newBooking.generateAgenda` | Generate Agenda with AI | एआई की मदद से एजेंडा तैयार करें |
| `newBooking.attendees` | Attendees (Optional) | उपस्थित लोग (वैकल्पिक) |
| `newBooking.attendeesPlaceholder` | Enter attendee names separated by commas | उपस्थित लोगों के नाम अल्पविराम से अलग करके दर्ज करें |
| `newBooking.bookingSummary` | Booking Summary | बुकिंग सारांश |
| `newBooking.resourceLabel` | Resource: | संसाधन: |
| `newBooking.locationLabel` | Location: | जगह: |
| `newBooking.bookingTypeLabel` | Booking Type: | बुकिंग प्रकार: |
| `newBooking.startDateLabel` | Start Date: | आरंभ करने की तिथि: |
| `newBooking.endDateLabel` | End Date: | अंतिम तिथि: |
| `newBooking.totalDaysLabel` | Total Days: | कुल दिन: |
| `newBooking.timeLabel` | Time: | समय: |
| `newBooking.back` | Back | पीछे |
| `newBooking.createBooking` | Create Booking | बुकिंग बनाएँ |

---

# 21. New Booking Placeholders

| Key | English | Hindi |
|---|---|---|
| `newBooking.purposePlaceholder` | e.g., Team Meeting, Client Presentation | उदाहरण के लिए, टीम मीटिंग, क्लाइंट प्रेजेंटेशन |
| `newBooking.attendeesPlaceholder` | Enter attendee names separated by commas | उपस्थित लोगों के नाम अल्पविराम से अलग करके दर्ज करें |

---

# 22. Dynamic Booking Values

The following are dynamic data and must NOT be translated:

- Room names
- User names
- Resource names
- User-entered purpose
- Resource descriptions
- Dates
- Times
- Emails
- Numeric counts

Examples:

`Room 10`

`Room 11`

`Room 12`

`Room 13`

`Room 14`

`Room 15`

`Admin`

`Deb`

`Debjit`

`Nugget bitch`

must remain database/user values.

---

# 23. Calendar Page

| Key | English | Hindi |
|---|---|---|
| `calendar.title` | Calendar | कैलेंडर |
| `calendar.description` | View all resource bookings | सभी संसाधन बुकिंग देखें |
| `calendar.month` | Month | महीना |
| `calendar.week` | Week | सप्ताह |
| `calendar.day` | Day | दिन |
| `calendar.agenda` | Agenda | कार्यसूची |
| `calendar.today` | Today | आज |
| `calendar.back` | Back | पीछे |
| `calendar.next` | Next | अगला |
| `calendar.legend` | Legend | दंतकथा |

---

# 24. Calendar Weekdays

The supplied Hindi screenshot uses:

| English | Hindi |
|---|---|
| SUN | रवि |
| MON | सोम |
| TUE | मंगल |
| WED | बुध |
| THU | गुरु |
| FRI | शुक्र |
| SAT | शनि |

---

# 25. Calendar Legend

The screenshot-derived wording is:

| English | Hindi |
|---|---|
| Approved | अनुमत |
| Pending | लंबित |
| Rejected | अस्वीकार कर दिया |
| Cancelled | रद्द कर दिया गया |

IMPORTANT:

The screenshot uses `दंतकथा` for `Legend`. Preserve this wording for consistency with the supplied reference.

---

# 26. Resources Page

| Key | English | Hindi |
|---|---|---|
| `resources.title` | Resources | संसाधन |
| `resources.addResource` | Add Resource | संसाधन जोड़ें |
| `resources.name` | Name | नाम |
| `resources.location` | Location | जगह |
| `resources.capacity` | Capacity | क्षमता |
| `resources.description` | Description | विवरण |
| `resources.actions` | Actions | कार्रवाई |

---

# 27. Add New Resource Dialog

| Key | English | Hindi |
|---|---|---|
| `resources.add.title` | Add New Resource | नया संसाधन जोड़ें |
| `resources.add.description` | Create a new resource for booking | बुकिंग के लिए एक नया संसाधन बनाएँ |
| `resources.nameRequired` | Name * | नाम * |
| `resources.namePlaceholder` | Enter resource name | संसाधन का नाम दर्ज करें |
| `resources.descriptionLabel` | Description | विवरण |
| `resources.descriptionPlaceholder` | Enter description | विवरण दर्ज करें |
| `resources.locationRequired` | Location * | जगह * |
| `resources.locationPlaceholder` | Enter location | स्थान दर्ज करें |
| `resources.capacityRequired` | Capacity * | क्षमता * |
| `resources.add.cancel` | Cancel | रद्द करना |
| `resources.add.create` | Create | बनाएँ |

---

# 28. Edit Resource Dialog

| Key | English | Hindi |
|---|---|---|
| `resources.edit.title` | Edit Resource | संसाधन संपादित करें |
| `resources.edit.description` | Update resource information | संसाधन जानकारी अपडेट करें |
| `resources.edit.name` | Name * | नाम * |
| `resources.edit.descriptionLabel` | Description | विवरण |
| `resources.edit.location` | Location * | जगह * |
| `resources.edit.capacity` | Capacity * | क्षमता * |
| `resources.edit.cancel` | Cancel | रद्द करना |
| `resources.edit.update` | Update | अद्यतन |

---

# 29. Delete Resource Dialog

| Key | English | Hindi |
|---|---|---|
| `resources.delete.title` | Remove Resource | संसाधन हटाएँ |
| `resources.delete.message` | Are you sure you want to remove "Room 14"? This action cannot be undone. | क्या आप वाकई "Room 14" को हटाना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती। |
| `resources.delete.cancel` | Cancel | रद्द करना |
| `resources.delete.confirm` | Remove | मिटाना |

The resource name must remain dynamic.

---

# 30. Users Page

| Key | English | Hindi |
|---|---|---|
| `users.title` | Users | उपयोगकर्ताओं |
| `users.search` | Search | खोज |
| `users.searchPlaceholder` | Search users... | उपयोगकर्ताओं को खोजें... |
| `users.name` | Name | नाम |
| `users.email` | Email | ईमेल |
| `users.role` | Role | भूमिका |
| `users.joined` | Joined | शामिल हुए |
| `users.actions` | Actions | कार्रवाई |
| `users.changeRole` | Change Role | भूमिका बदलें |

---

# 31. Change User Role Dialog

| Key | English | Hindi |
|---|---|---|
| `users.changeRole.title` | Change User Role | उपयोगकर्ता की भूमिका बदलें |
| `users.changeRole.description` | Update the role for [USER_NAME] | [USER_NAME] के लिए भूमिका अपडेट करें |
| `users.currentRole` | Current Role | वर्तमान भूमिका |
| `users.newRole` | New Role | नई भूमिका |
| `users.updateRole` | Update Role | भूमिका बदलें |

---

# 32. User Roles

| English | Hindi |
|---|---|
| User | उपयोगकर्ता |
| Manager | प्रबंधक |
| Admin | व्यवस्थापक |

The role selector in the supplied screenshot uses:

`उपयोगकर्ता`

`प्रबंधक`

`व्यवस्थापक`

---

# 33. Common Empty States

| Key | English | Hindi |
|---|---|---|
| `empty.noUpcomingBookings` | No upcoming bookings | कोई आगामी बुकिंग नहीं है |
| `bookings.noActiveBookings` | No active bookings found | कोई सक्रिय बुकिंग नहीं मिली |
| `bookings.noPastBookings` | No past bookings found | कोई पूर्व बुकिंग नहीं मिली |

---

# 34. Pagination

| Key | English | Hindi |
|---|---|---|
| `pagination.previous` | Previous | पिछले |
| `pagination.next` | Next | अगला |
| `pagination.page` | Page | पृष्ठ |
| `pagination.of` | of | का |

Numbers remain dynamic.

---

# 35. Authentication

## Important Source Note

No Hindi authentication screenshots were included in this Hindi screenshot batch.

Therefore, the following authentication translations are conservative Hindi translations derived from the already-established English/Bengali authentication strings, rather than screenshot-copied wording.

---

# 36. Authentication — Common

| Key | English | Hindi |
|---|---|---|
| `auth.appName` | MeetOps | मीटऑप्स |
| `auth.subtitle` | Resource Booking Management System | संसाधन बुकिंग प्रबंधन प्रणाली |
| `auth.welcome` | Welcome | स्वागत है |
| `auth.loginOrRegister` | Login or create a new account | लॉगिन करें या एक नया अकाउंट बनाएँ |
| `auth.loginTab` | Login | लॉगिन |
| `auth.registerTab` | Register | पंजीकरण करें |

---

# 37. Authentication — Register

| Key | English | Hindi |
|---|---|---|
| `auth.fullName` | Full Name | पूरा नाम |
| `auth.fullNamePlaceholder` | Enter your full name | अपना पूरा नाम लिखें |
| `auth.username` | Username | उपयोगकर्ता नाम |
| `auth.usernameRegisterPlaceholder` | Letters, numbers, and underscores only | केवल अक्षर, संख्या और अंडरस्कोर |
| `auth.password` | Password | पासवर्ड |
| `auth.passwordRegisterPlaceholder` | At least 8 characters with letters and numbers | कम से कम 8 अक्षर और संख्याएँ |
| `auth.confirmPassword` | Confirm Password | पासवर्ड की पुष्टि करें |
| `auth.confirmPasswordPlaceholder` | Re-enter password | पासवर्ड फिर से दर्ज करें |
| `auth.termsAgreement` | I agree to the User Agreement and Privacy Policy (Please modify these documents to comply with legal requirements) | मैं उपयोगकर्ता समझौते और गोपनीयता नीति से सहमत हूँ (कृपया कानूनी आवश्यकताओं का पालन करने के लिए इन दस्तावेज़ों को संशोधित करें) |
| `auth.registerButton` | Register | पंजीकरण करें |

---

# 38. Authentication — Login

| Key | English | Hindi |
|---|---|---|
| `auth.usernameLoginPlaceholder` | Enter username | उपयोगकर्ता नाम लिखें |
| `auth.passwordLoginPlaceholder` | Enter password | पासवर्ड लिखें |
| `auth.forgotPassword` | Forgot password? | पासवर्ड भूल गए? |
| `auth.loginButton` | Login | लॉगिन |

---

# 39. Toast Notifications

> Hindi screenshots for toast notifications were not supplied.
>
> Therefore these values are professionally translated into natural Hindi while retaining exact dynamic placeholders.

---

# 40. Authentication Context Toasts

| Key | English | Hindi |
|---|---|---|
| `auth.fetchUserInfoFailed` | Failed to fetch user info: `{error.message}` | उपयोगकर्ता की जानकारी प्राप्त करने में विफल: `{error.message}` |

---

# 41. Login Toasts

| Key | English | Hindi |
|---|---|---|
| `login.enterUsernamePassword` | Please enter username and password | कृपया उपयोगकर्ता नाम और पासवर्ड दर्ज करें |
| `login.usernameFormat` | Username can only contain letters, numbers, and underscores | उपयोगकर्ता नाम में केवल अक्षर, संख्या और अंडरस्कोर हो सकते हैं |
| `login.loginFailed` | Login failed: `{error.message}` | लॉगिन विफल: `{error.message}` |
| `login.loginSuccess` | Login successful | लॉगिन सफल हुआ |
| `login.fillAllFields` | Please fill in all required fields | कृपया सभी आवश्यक फ़ील्ड भरें |
| `login.passwordMinLength` | Password must be at least 8 characters | पासवर्ड कम से कम 8 अक्षरों का होना चाहिए |
| `login.passwordRequirements` | Password must contain both letters and numbers | पासवर्ड में अक्षर और संख्या दोनों होने चाहिए |
| `login.passwordsDoNotMatch` | Passwords do not match | पासवर्ड मेल नहीं खाते |
| `login.agreeToTermsRequired` | Please agree to the User Agreement and Privacy Policy | कृपया उपयोगकर्ता समझौते और गोपनीयता नीति से सहमत हों |
| `login.registrationFailed` | Registration failed: `{error.message}` | पंजीकरण विफल: `{error.message}` |
| `login.registrationSuccess` | Registration successful! You can now log in. | पंजीकरण सफल हुआ! अब आप लॉगिन कर सकते हैं। |

---

# 42. Registration Toasts

| Key | English | Hindi |
|---|---|---|
| `register.fillAllFields` | Please fill in all required fields | कृपया सभी आवश्यक फ़ील्ड भरें |
| `register.usernameFormat` | Username can only contain letters, numbers, and underscores | उपयोगकर्ता नाम में केवल अक्षर, संख्या और अंडरस्कोर हो सकते हैं |
| `register.passwordMinLength` | Password must be at least 8 characters | पासवर्ड कम से कम 8 अक्षरों का होना चाहिए |
| `register.passwordRequirements` | Password must contain both letters and numbers | पासवर्ड में अक्षर और संख्या दोनों होने चाहिए |
| `register.passwordsDoNotMatch` | Passwords do not match | पासवर्ड मेल नहीं खाते |
| `register.agreeToTermsRequired` | Please agree to the User Agreement and Privacy Policy | कृपया उपयोगकर्ता समझौते और गोपनीयता नीति से सहमत हों |
| `register.registrationFailed` | Registration failed: `{error.message}` | पंजीकरण विफल: `{error.message}` |
| `register.registrationSuccess` | Registration successful! Redirecting to dashboard... | पंजीकरण सफल हुआ! डैशबोर्ड पर भेजा जा रहा है... |

---

# 43. Password Reset Toasts

| Key | English | Hindi |
|---|---|---|
| `resetPassword.usernameRequired` | Please enter your username | कृपया अपना उपयोगकर्ता नाम दर्ज करें |
| `resetPassword.usernameFormat` | Username can only contain letters, numbers, and underscores | उपयोगकर्ता नाम में केवल अक्षर, संख्या और अंडरस्कोर हो सकते हैं |
| `resetPassword.sendFailed` | Failed to send reset link: `{error.message}` | रीसेट लिंक भेजने में विफल: `{error.message}` |
| `resetPassword.sendSuccess` | Password reset link sent! Please check your email. | पासवर्ड रीसेट लिंक भेज दिया गया है! कृपया अपना ईमेल जाँचें। |

---

# 44. New Booking Toasts

| Key | English | Hindi |
|---|---|---|
| `newBooking.purposeRequired` | Please enter a purpose | कृपया एक उद्देश्य दर्ज करें |
| `toast.operationSuccess` | Operation completed successfully | कार्य सफलतापूर्वक पूरा हुआ |
| `toast.operationFailed` | Operation failed | कार्य विफल हुआ |
| `newBooking.resourceRequired` | Please select a resource | कृपया एक संसाधन चुनें |
| `newBooking.dateRequired` | Please select a date | कृपया एक तारीख चुनें |
| `newBooking.invalidTimeRange` | End time must be after start time | अंत समय, प्रारंभ समय के बाद होना चाहिए |
| `newBooking.startTimeRequired` | Please select start time | कृपया प्रारंभ समय चुनें |
| `newBooking.conflictDetected` | This time slot is already booked | यह समय स्लॉट पहले से बुक है |
| `newBooking.createFailed` | Failed to create booking: `{bookingError.message}` | बुकिंग बनाने में विफल: `{bookingError.message}` |
| `newBooking.createSuccess` | Booking created successfully! | बुकिंग सफलतापूर्वक बनाई गई! |
| `newBooking.multiDayCreateFailed` | Failed to create multi-day booking | मल्टी डे बुकिंग बनाने में विफल |
| `newBooking.multiDayCreateSuccess` | Multi-day booking created successfully! (`{total_days}` days) | मल्टी डे बुकिंग सफलतापूर्वक बनाई गई! (`{total_days}` दिन) |
| `newBooking.generalCreateFailed` | Failed to create booking | बुकिंग बनाने में विफल |

---

# 45. Booking / PDF Toasts

| Key | English | Hindi |
|---|---|---|
| `bookings.exportDatesRequired` | Please select start and end dates for export | कृपया निर्यात के लिए प्रारंभ और अंतिम तारीख चुनें |
| `bookings.noBookingsForFilters` | No bookings found for the selected filters | चयनित फ़िल्टर के लिए कोई बुकिंग नहीं मिली |
| `bookings.exportSuccess` | Exported `{count}` bookings to PDF | `{count}` बुकिंग पीडीएफ में निर्यात की गईं |

`{count}` remains dynamic.

---

# 46. Booking Approval / Rejection / Cancellation Toasts

| Key | English | Hindi |
|---|---|---|
| `toast.approveMultiDayFailed` | Failed to approve multi-day booking: `{error.message}` | मल्टी डे बुकिंग को अनुमोदित करने में विफल: `{error.message}` |
| `toast.bookingApproved` | Booking approved successfully | बुकिंग सफलतापूर्वक अनुमोदित हुई |
| `toast.approveFailed` | Failed to approve booking: `{error.message}` | बुकिंग को अनुमोदित करने में विफल: `{error.message}` |
| `toast.rejectMultiDayFailed` | Failed to reject multi-day booking: `{error.message}` | मल्टी डे बुकिंग को अस्वीकार करने में विफल: `{error.message}` |
| `toast.bookingRejected` | Booking rejected successfully | बुकिंग सफलतापूर्वक अस्वीकार की गई |
| `toast.rejectFailed` | Failed to reject booking: `{error.message}` | बुकिंग को अस्वीकार करने में विफल: `{error.message}` |
| `toast.cancelMultiDayFailed` | Failed to cancel multi-day booking: `{error.message}` | मल्टी डे बुकिंग रद्द करने में विफल: `{error.message}` |
| `toast.bookingCancelled` | Booking cancelled successfully | बुकिंग सफलतापूर्वक रद्द की गई |
| `toast.cancelFailed` | Failed to cancel booking: `{error.message}` | बुकिंग रद्द करने में विफल: `{error.message}` |

---

# 47. Resource Management Toasts

| Key | English | Hindi |
|---|---|---|
| `toast.requiredField` | This field is required | यह फ़ील्ड आवश्यक है |
| `toast.resourceUpdateFailed` | Failed to update resource: `{error.message}` | संसाधन अपडेट करने में विफल: `{error.message}` |
| `toast.resourceUpdated` | Resource updated successfully | संसाधन सफलतापूर्वक अपडेट हुआ |
| `toast.resourceCreateFailed` | Failed to create resource: `{error.message}` | संसाधन बनाने में विफल: `{error.message}` |
| `toast.resourceCreated` | Resource created successfully | संसाधन सफलतापूर्वक बनाया गया |
| `resources.deleteWarning` | Cannot delete resource with active bookings | सक्रिय बुकिंग वाले संसाधन को हटाया नहीं जा सकता |
| `toast.resourceDeleteFailed` | Failed to delete resource: `{error.message}` | संसाधन हटाने में विफल: `{error.message}` |
| `toast.resourceDeleted` | Resource deleted successfully | संसाधन सफलतापूर्वक हटा दिया गया |

---

# 48. User Role Toasts

| Key | English | Hindi |
|---|---|---|
| `toast.userRoleUpdateFailed` | Failed to update role: `{error.message}` | भूमिका अपडेट करने में विफल: `{error.message}` |
| `toast.userRoleChanged` | User role changed successfully | उपयोगकर्ता की भूमिका सफलतापूर्वक बदल दी गई |

---

# 49. Language Toasts

| Key | English | Hindi |
|---|---|---|
| `language.updateSuccess` | Language updated successfully! | भाषा सफलतापूर्वक अपडेट की गई! |
| `language.updateFailed` | Failed to update language. Please try again. | भाषा अपडेट करने में विफल। कृपया पुनः प्रयास करें। |
| `language.changedTo` | Language changed to `{nativeName}` | भाषा `{nativeName}` में बदल दी गई |
| `language.changeFailed` | Failed to change language. Please try again. | भाषा बदलने में विफल। कृपया पुनः प्रयास करें। |

`{nativeName}` remains dynamic.

---

# 50. AI Chat Toast

| Key | English | Hindi |
|---|---|---|
| `chat.sendError` | Failed to send message. Please try again. | संदेश भेजने में विफल। कृपया पुनः प्रयास करें। |

---

# 51. AI Insight Toasts

| Key | English | Hindi |
|---|---|---|
| `common.somethingWentWrong` | Something went wrong | कुछ गलत हो गया |
| `toast.operationSuccess` | Operation completed successfully | कार्य सफलतापूर्वक पूरा हुआ |

---

# 52. Dynamic Placeholder Rules

The following must remain EXACTLY unchanged in the code:

`{error.message}`

`{bookingError.message}`

`{errorMsg}`

`{total_days}`

`{count}`

`{nativeName}`

`{actionResult.message}`

Example:

English:

`Failed to create booking: {bookingError.message}`

Hindi:

`बुकिंग बनाने में विफल: {bookingError.message}`

Do not translate or rename the placeholder.

---

# 53. Notification Control

Required key:

`notifications.markAllAsRead`

English:

`Mark All as Read`

Hindi:

`सभी को पढ़ा हुआ मार्क करें`

The notification read/unread functionality must remain completely unchanged.

Only the displayed label is translated.

---

# 54. Dynamic Data Rules

Do NOT translate:

- User names
- Email addresses
- Room names
- Resource names
- User-entered booking purposes
- Resource descriptions
- Database values
- Booking IDs
- Dates
- Times
- Numeric counters

Examples:

`Room 10`

`Room 12`

`Admin`

`RAJ`

`Deb`

`Nugget bitch`

must remain data.

---

# 55. Calendar / Date Data

The following values should remain controlled by the calendar/date library unless the existing app already localizes them:

`August 2026`

`Su`

`Mo`

`Tu`

`We`

`Th`

`Fr`

`Sa`

`AM`

`PM`

The static calendar control labels should use the Hindi dictionary.

---

# 56. Architecture Rule

Hindi translation must use the existing local static i18n architecture:

Application
→ Current language
→ Translation key
→ Local dictionary
→ Hindi text

NOT:

Application
→ Gemini
→ Translation API
→ Hindi text

Static Hindi UI translation must require:

ZERO Gemini translation calls.

ZERO `translate-text` calls.

ZERO external translation API calls.

---

# 57. AI Dynamic Content Rule

The MeetOps AI assistant can still use Gemini for genuine AI functionality.

However:

Static labels such as:

`MeetOps AI Assistant`

`Chat with AI Assistant`

`Type your message...`

must come from the local Hindi dictionary.

The AI-generated message:

`{actionResult.message}`

must NOT be statically translated.

If Hindi AI responses are required later, the AI request itself can be made locale-aware.

---

# 58. Hindi Screenshot-Derived Wording Notes

The following wording was intentionally preserved from the supplied screenshots:

`Dashboard` → `डैशबोर्ड`

`Bookings` → `बुकिंग के`

`Resources` → `संसाधन`

`Users` → `उपयोगकर्ताओं`

`Pending` → `लंबित`

`Approved` → `अनुमत`

`Rejected` → `अस्वीकार कर दिया`

`Cancelled` → `रद्द कर दिया गया`

`Completed` → `पूरा होना`

`Multi-Day` → `मल्टी डे`

`Legend` → `दंतकथा`

`Mark All as Read` → `सभी को पढ़ा हुआ मार्क करें`

These are treated as screenshot-reference wording for this language implementation.

---

# 59. Hindi Implementation Acceptance Criteria

Hindi implementation is complete only when:

1. Hindi can be selected from the existing language selector.
2. Dashboard translates correctly.
3. Sidebar translates correctly.
4. Bookings page translates correctly.
5. Booking status dropdown translates correctly.
6. Booking search/filters translate correctly.
7. Active booking empty state translates correctly.
8. Past booking empty state translates correctly.
9. PDF export UI translates correctly.
10. New Booking Step 1 translates correctly.
11. New Booking Step 2 translates correctly.
12. New Booking Step 3 translates correctly.
13. Calendar controls translate correctly.
14. Calendar weekdays display correctly.
15. Calendar legend translates correctly.
16. Resources page translates correctly.
17. Add Resource dialog translates correctly.
18. Edit Resource dialog translates correctly.
19. Delete Resource confirmation translates correctly.
20. Users page translates correctly.
21. Change User Role dialog translates correctly.
22. User / Manager / Admin role labels translate correctly.
23. Logout confirmation translates correctly.
24. AI Assistant static UI translates correctly.
25. Notification title translates correctly.
26. "Mark All as Read" translates correctly.
27. Static toast messages translate correctly.
28. Dynamic placeholders remain intact.
29. User/database data remains unchanged.
30. Switching Hindi → English restores English correctly.
31. Switching English → Hindi restores Hindi correctly.
32. Refresh preserves the selected language.
33. Navigation preserves the selected language.
34. No static Hindi translation requires Gemini.
35. Existing booking/auth/database functionality is not broken.

---

# 60. Future Language Expansion

The existing selector supports:

| Code | Language |
|---|---|
| `en` | English |
| `hi` | Hindi |
| `bn` | Bengali |
| `ta` | Tamil |
| `es` | Spanish |
| `fr` | French |
| `ar` | Arabic |
| `zh` | Chinese |
| `ja` | Japanese |
| `de` | German |

This document only defines Hindi.

Do NOT modify the other language dictionaries while implementing Hindi.

---

# 61. Final Principle

The objective is to reproduce the Hindi behavior of the MeDo-hosted MeetOps application using a local static dictionary.

Hindi should work independently of Gemini translation quotas.

Architecture:

Language Selector
→ `hi`
→ Existing LanguageContext
→ Hindi dictionary
→ Translation key
→ Hindi UI

No runtime translation service is required.

---

# 62. Source / Translation Notes

## Screenshot-derived

The main UI translations in this document are based on the supplied Hindi screenshots covering:

- Dashboard
- Notifications
- Bookings
- Booking filters
- Booking empty states
- PDF export
- New Booking Step 1
- New Booking Step 2
- New Booking Step 3
- Calendar
- Resources
- Add Resource
- Edit Resource
- Delete Resource
- Users
- Change User Role
- Logout confirmation
- AI Assistant

## Model-translated because screenshot was not supplied

The following were translated conservatively because Hindi screenshots were not provided:

- Authentication page strings
- Authentication toast messages
- Booking/resource/user/language toast notifications

The dynamic values and placeholders are intentionally preserved.

---

# 63. End