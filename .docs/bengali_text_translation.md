# MeetOps Common Translation Specification
## English → Bengali Reference
### Pilot Language Set: English (`en`) + Bengali (`bn`)

> **Purpose:** This document is the source of truth for implementing MeetOps static UI translations without runtime translation APIs.
>
> **Important:** Bengali wording below is based on the Bengali MeDo-hosted MeetOps screenshots supplied for this project. Where the Bengali reference intentionally leaves a value in English, it is marked as **UNCHANGED** rather than inventing a translation.

---

# 1. Translation Implementation Rules

## 1.1 Language Codes

| Language | Code |
|---|---|
| English | `en` |
| Bengali | `bn` |

## 1.2 Core Rule

Every static UI string should use a stable translation key.

Example:

```text
dashboard.title
````

English:

```text
Dashboard
```

Bengali:

```text
ড্যাশবোর্ড
```

Do NOT create separate pages/routes/components for each language.

The same React page/component must render different text according to the active locale.

## 1.3 Dynamic Data

The following types of content must remain dynamic and must NOT be converted into static translation keys unless explicitly intended by the application:

* User names
* Email addresses
* Room names
* Resource names
* Booking purposes entered by users
* Resource descriptions entered by users
* Dates
* Times
* Booking counts
* IDs
* URLs

---

# 2. Brand / Application

| Key        | English | Bengali |
| ---------- | ------- | ------- |
| `app.name` | MeetOps | মিটঅপস  |

---

# 3. Global Navigation / Sidebar

| Key             | English   | Bengali       |
| --------------- | --------- | ------------- |
| `nav.dashboard` | Dashboard | ড্যাশবোর্ড    |
| `nav.bookings`  | Bookings  | বুকিং         |
| `nav.calendar`  | Calendar  | ক্যালেন্ডার   |
| `nav.resources` | Resources | সম্পদ         |
| `nav.users`     | Users     | ব্যবহারকারীরা |

---

# 4. Global User / Header

| Key                  | English      | Bengali         |
| -------------------- | ------------ | --------------- |
| `common.admin`       | Admin        | প্রশাসক         |
| `common.cancel`      | Cancel       | বাতিল করুন      |
| `common.back`        | Back         | ফিরে যান        |
| `common.next`        | Next         | পরবর্তী         |
| `common.today`       | Today        | আজ              |
| `common.previous`    | Previous     | পূর্ববর্তী      |
| `common.view`        | View         | দেখুন           |
| `common.viewDetails` | View Details | বিস্তারিত দেখুন |

### Dynamic role/user information

If the UI displays a username such as:

```text
Admin
Deb
Lê Minh Quân
```

the actual user/name value remains dynamic.

---

# 5. Dashboard

| Key                            | English                | Bengali                     |
| ------------------------------ | ---------------------- | --------------------------- |
| `dashboard.title`              | Dashboard              | ড্যাশবোর্ড                  |
| `dashboard.welcome`            | Welcome back,          | আবার স্বাগতম,               |
| `dashboard.totalBookings`      | Total Bookings         | মোট বুকিং                   |
| `dashboard.pending`            | Pending                | বিচারাধীন                   |
| `dashboard.approved`           | Approved               | অনুমোদিত                    |
| `dashboard.rejected`           | Rejected               | প্রত্যাখ্যাত                |
| `dashboard.upcomingBookings`   | Upcoming Bookings      | আসন্ন বুকিং                 |
| `dashboard.noUpcomingBookings` | No upcoming bookings   | আসন্ন কোনো বুকিং নেই        |
| `dashboard.quickActions`       | Quick Actions          | দ্রুত পদক্ষেপ               |
| `dashboard.newBooking`         | New Booking            | নতুন বুকিং                  |
| `dashboard.viewAllBookings`    | View All Bookings      | সমস্ত বুকিং দেখুন           |
| `dashboard.manageResources`    | Manage Resources       | সম্পদ পরিচালনা করুন         |
| `dashboard.aiInsights`         | AI Insights            | এআই ইনসাইটস                 |
| `dashboard.chatWithAssistant`  | Chat with AI Assistant | এআই সহকারীর সাথে চ্যাট করুন |

### Dashboard numeric/stat values

Values such as:

```text
56
61
3
8
0
```

remain dynamic numbers and must not be translated.

---

# 6. Notifications

| Key                   | English       | Bengali   |
| --------------------- | ------------- | --------- |
| `notifications.title` | Notifications | বিজ্ঞপ্তি |

## Notification bodies

The Bengali reference screenshots show the following notification bodies remaining in English rather than translated.

| English reference                                   | Bengali reference                            |
| --------------------------------------------------- | -------------------------------------------- |
| New multi-day booking request for 16 days           | **UNCHANGED — remains English in reference** |
| Your booking for Room 10 has been approved          | **UNCHANGED — remains English in reference** |
| New multi-day booking request for 4 days            | **UNCHANGED — remains English in reference** |
| Your booking request for Room 10 has been submitted | **UNCHANGED — remains English in reference** |
| New multi-day booking request for 5 days            | **UNCHANGED — remains English in reference** |

### Notification dates/times

Examples such as:

```text
May 21, 2026, 11:54 AM
May 17, 2026, 08:51 PM
May 16, 2026, 01:57 AM
May 12, 2026, 09:09 PM
Aug 18, 2026, 12:41 AM
```

are dynamic date/time values and remain dynamic.

---

# 7. Logout Confirmation

| Key                     | English                                                                                                 | Bengali                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `logout.confirmTitle`   | Confirm Logout                                                                                          | লগআউট নিশ্চিত করুন                                                                                                        |
| `logout.confirmMessage` | Are you sure you want to log out? You will need to sign in again to access your dashboard and bookings. | আপনি কি নিশ্চিত যে আপনি লগ আউট করতে চান? আপনার ড্যাশবোর্ড এবং বুকিংগুলো অ্যাক্সেস করার জন্য আপনাকে আবার সাইন ইন করতে হবে। |
| `logout.cancel`         | Cancel                                                                                                  | বাতিল করুন                                                                                                                |
| `logout.confirm`        | Logout                                                                                                  | লগআউট                                                                                                                     |

---

# 8. AI Assistant

| Key                   | English                                                                                      | Bengali                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `ai.title`            | MeetOps AI Assistant                                                                         | মিটঅপস এআই অ্যাসিস্ট্যান্ট                                                                                                 |
| `ai.greeting`         | Hi! I'm MeetOps AI. I can help you book rooms, check availability, and manage your bookings. | হ্যালো! আমি মিটঅপস এআই। আমি আপনাকে রুম বুক করতে, প্রাপ্যতা যাচাই করতে এবং আপনার বুকিংগুলো পরিচালনা করতে সাহায্য করতে পারি। |
| `ai.examplePrompt`    | Try: "Book me a room for 5 people tomorrow at 2PM"                                           | চেষ্টা করুন: "আগামীকাল দুপুর ২টায় আমার জন্য ৫ জনের একটি রুম বুক করে দিন"                                                  |
| `ai.inputPlaceholder` | Type your message...                                                                         | আপনার বার্তা টাইপ করুন...                                                                                                  |

### AI panel introductory area

| Key                 | English                | Bengali                               |
| ------------------- | ---------------------- | ------------------------------------- |
| `ai.chatInvitation` | Chat with AI Assistant | এআই অ্যাসিস্ট্যান্টের সাথে চ্যাট করুন |
| `ai.insightsButton` | AI Insights            | এআই ইনসাইটস                           |

---

# 9. Bookings Page

| Key                          | English                                 | Bengali                                                   |
| ---------------------------- | --------------------------------------- | --------------------------------------------------------- |
| `bookings.title`             | Bookings                                | বুকিং                                                     |
| `bookings.exportPdf`         | Export PDF                              | পিডিএফ-এ রপ্তানি করুন                                     |
| `bookings.newBooking`        | New Booking                             | নতুন বুকিং                                                |
| `bookings.status`            | Status                                  | অবস্থা                                                    |
| `bookings.allStatuses`       | All Statuses                            | সমস্ত স্ট্যাটাস                                           |
| `bookings.user`              | User                                    | ব্যবহারকারী                                               |
| `bookings.allUsers`          | All Users                               | সকল ব্যবহারকারী                                           |
| `bookings.search`            | Search                                  | অনুসন্ধান                                                 |
| `bookings.searchPlaceholder` | Search by resource, purpose, or user... | রিসোর্স, উদ্দেশ্য বা ব্যবহারকারী দ্বারা অনুসন্ধান করুন... |
| `bookings.activeBookings`    | Active Bookings                         | সক্রিয় বুকিং                                             |
| `bookings.pastBookings`      | Past Bookings                           | পূর্ববর্তী বুকিং                                          |
| `bookings.resource`          | Resource                                | সম্পদ                                                     |
| `bookings.purpose`           | Purpose                                 | উদ্দেশ্য                                                  |
| `bookings.date`              | Date                                    | তারিখ                                                     |
| `bookings.startTime`         | Start Time                              | শুরু সময়                                                 |
| `bookings.endTime`           | End Time                                | শেষ সময়                                                  |
| `bookings.type`              | Type                                    | প্রকার                                                    |
| `bookings.statusColumn`      | Status                                  | অবস্থা                                                    |
| `bookings.actions`           | Actions                                 | কর্ম                                                      |
| `bookings.view`              | View                                    | দেখুন                                                     |
| `bookings.viewDetails`       | View Details                            | বিস্তারিত দেখুন                                           |

---

# 10. Booking Statuses

| Key                     | English   | Bengali          |
| ----------------------- | --------- | ---------------- |
| `status.pending`        | Pending   | বিচারাধীন        |
| `status.approved`       | Approved  | অনুমোদিত         |
| `status.rejected`       | Rejected  | প্রত্যাখ্যাত     |
| `status.cancelled`      | Cancelled | বাতিল করা হয়েছে |
| `status.completed`      | Completed | সম্পন্ন হয়েছে   |
| `booking.type.multiDay` | Multi-Day | বহু-দিনের        |

---

# 11. Booking Sections

| Key               | English         | Bengali          |
| ----------------- | --------------- | ---------------- |
| `bookings.active` | Active Bookings | সক্রিয় বুকিং    |
| `bookings.past`   | Past Bookings   | পূর্ববর্তী বুকিং |

The numerical counts, for example:

```text
Active Bookings (8)
Active Bookings (13)
Past Bookings (48)
```

remain dynamic numbers.

---

# 12. Booking Empty States

| Key                         | English                  | Bengali                             |
| --------------------------- | ------------------------ | ----------------------------------- |
| `bookings.noActiveBookings` | No active bookings found | কোনো সক্রিয় বুকিং পাওয়া যায়নি    |
| `bookings.noPastBookings`   | No past bookings found   | পূর্ববর্তী কোনো বুকিং পাওয়া যায়নি |

These are static empty-state messages and MUST be translated through the local Bengali dictionary.

Examples:

```text
ACTIVE BOOKINGS (0)
→ সক্রিয় বুকিং (0)
```

```text
PAST BOOKINGS (0)
→ পূর্ববর্তী বুকিং (0)
```

The numeric value remains dynamic.

---

# 13. Export Bookings PDF Dialog

| Key                                 | English                                  | Bengali                                         |
| ----------------------------------- | ---------------------------------------- | ----------------------------------------------- |
| `bookings.exportDialog.title`       | Export Bookings as PDF                   | বুকিংগুলো পিডিএফ-এ রপ্তানি করুন                 |
| `bookings.exportDialog.description` | Select filters to export booking history | বুকিং ইতিহাস রপ্তানি করতে ফিল্টার নির্বাচন করুন |
| `bookings.exportDialog.startDate`   | Start Date                               | শুরু তারিখ                                      |
| `bookings.exportDialog.endDate`     | End Date                                 | শেষ তারিখ                                       |
| `bookings.exportDialog.cancel`      | Cancel                                   | বাতিল করুন                                      |
| `bookings.exportDialog.export`      | Export PDF                               | পিডিএফ-এ রপ্তানি করুন                           |

---

# 14. New Booking — Global

| Key                      | English                       | Bengali                           |
| ------------------------ | ----------------------------- | --------------------------------- |
| `newBooking.title`       | New Booking                   | নতুন বুকিং                        |
| `newBooking.description` | Create a new resource booking | একটি নতুন রিসোর্স বুকিং তৈরি করুন |

---

# 15. New Booking — Step Indicator

| Key                | English | Bengali |
| ------------------ | ------- | ------- |
| `newBooking.step1` | 1       | 1       |
| `newBooking.step2` | 2       | 2       |
| `newBooking.step3` | 3       | 3       |

Numbers remain unchanged.

---

# 16. New Booking — Step 1

| Key                            | English                   | Bengali                                    |
| ------------------------------ | ------------------------- | ------------------------------------------ |
| `newBooking.step1.title`       | STEP 1: SELECT RESOURCE   | ধাপ ১: রিসোর্স নির্বাচন করুন               |
| `newBooking.step1.description` | Choose a resource to book | আপনি যে রিসোর্সটি বুক করতে চান তা বেছে নিন |
| `newBooking.capacity`          | Capacity                  | ধারণক্ষমতা                                 |
| `newBooking.next`              | Next                      | পরবর্তী                                    |

### Resource data

Examples:

```text
Room 10
Room 11
Room 12
Room 13
Room 14
Room 15
2nd Floor
1st Floor
Seminar Room
Special room for Guests
Meeting Room with Projector
Meeting room for Online Clients
Meeting With Online Clients
Small Meetings
```

are resource/database values and remain unchanged in the Bengali reference.

---

# 17. New Booking — Step 2

| Key                            | English                              | Bengali                                   |
| ------------------------------ | ------------------------------------ | ----------------------------------------- |
| `newBooking.step2.title`       | STEP 2: SELECT DATE & TIME           | ধাপ ২: তারিখ ও সময় নির্বাচন করুন         |
| `newBooking.step2.description` | Choose when you want to book Room 10 | আপনি কখন Room 10 বুক করতে চান তা বেছে নিন |
| `newBooking.bookingType`       | Booking Type                         | বুকিংয়ের ধরন                             |
| `newBooking.singleDay`         | Single Day                           | একদিন                                     |
| `newBooking.multiDay`          | Multi-Day                            | বহু-দিনের                                 |
| `newBooking.startDate`         | Start Date                           | শুরু তারিখ                                |
| `newBooking.endDate`           | End Date                             | শেষ তারিখ                                 |
| `newBooking.totalDays`         | Total Days                           | মোট দিন                                   |
| `newBooking.startTime`         | Start Time                           | শুরু সময়                                 |
| `newBooking.endTime`           | End Time                             | শেষ সময়                                  |
| `newBooking.timeSlotAvailable` | Time Slot Available                  | সময় উপলব্ধ আছে                           |
| `newBooking.back`              | Back                                 | ফিরে যান                                  |
| `newBooking.next`              | Next                                 | পরবর্তী                                   |

### Calendar values observed in Bengali reference

The Bengali reference keeps the following values in English:

```text
August 2026
Su
Mo
Tu
We
Th
Fr
Sa
AM
PM
```

These should remain date/time/calendar-library values rather than being forced through the static translation dictionary unless the implementation intentionally localizes them through a date locale.

---

# 18. New Booking — Step 3

| Key                               | English                                           | Bengali                                         |
| --------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| `newBooking.step3.title`          | STEP 3: BOOKING DETAILS                           | ধাপ ৩: বুকিংয়ের বিবরণ                          |
| `newBooking.step3.description`    | Provide additional information about your booking | আপনার বুকিং সম্পর্কে অতিরিক্ত তথ্য প্রদান করুন। |
| `newBooking.purpose`              | Purpose                                           | উদ্দেশ্য                                        |
| `newBooking.generateAgenda`       | Generate Agenda with AI                           | এআই দিয়ে এজেন্ডা তৈরি করুন                     |
| `newBooking.attendees`            | Attendees (Optional)                              | উপস্থিত ব্যক্তি (ঐচ্ছিক)                        |
| `newBooking.attendeesPlaceholder` | Enter attendee names separated by commas          | অংশগ্রহণকারীদের নাম কমা দিয়ে আলাদা করে লিখুন   |
| `newBooking.bookingSummary`       | Booking Summary                                   | বুকিং সারাংশ                                    |
| `newBooking.resourceLabel`        | Resource:                                         | সম্পদ:                                          |
| `newBooking.locationLabel`        | Location:                                         | অবস্থান:                                        |
| `newBooking.bookingTypeLabel`     | Booking Type:                                     | বুকিংয়ের ধরন:                                  |
| `newBooking.startDateLabel`       | Start Date:                                       | শুরু তারিখ:                                     |
| `newBooking.endDateLabel`         | End Date:                                         | শেষ তারিখ:                                      |
| `newBooking.totalDaysLabel`       | Total Days:                                       | মোট দিন:                                        |
| `newBooking.timeLabel`            | Time:                                             | সময়:                                           |
| `newBooking.back`                 | Back                                              | ফিরে যান                                        |
| `newBooking.createBooking`        | Create Booking                                    | বুকিং তৈরি করুন                                 |

### Purpose placeholder

English:

```text
e.g., Team Meeting, Client Presentation
```

Bengali:

```text
যেমন, টিম মিটিং, ক্লায়েন্ট প্রেজেন্টেশন
```

### Dynamic booking summary values

Values such as:

```text
Room 10
2nd Floor
Multi-Day
Aug 18, 2026
Aug 26, 2026
09:00 - 10:00
```

remain dynamic.

---

# 19. Calendar Page

| Key                    | English                    | Bengali                   |
| ---------------------- | -------------------------- | ------------------------- |
| `calendar.title`       | Calendar                   | ক্যালেন্ডার               |
| `calendar.description` | View all resource bookings | সমস্ত রিসোর্স বুকিং দেখুন |
| `calendar.month`       | Month                      | মাস                       |
| `calendar.week`        | Week                       | সপ্তাহ                    |
| `calendar.day`         | Day                        | দিন                       |
| `calendar.agenda`      | Agenda                     | এজেন্ডা                   |
| `calendar.today`       | Today                      | আজ                        |
| `calendar.back`        | Back                       | ফিরে যান                  |
| `calendar.next`        | Next                       | পরবর্তী                   |
| `calendar.legend`      | Legend                     | কিংবদন্তি                 |

## Calendar weekdays

| English | Bengali  |
| ------- | -------- |
| SUN     | রবি      |
| MON     | সোম      |
| TUE     | মঙ্গল    |
| WED     | বুধ      |
| THU     | বৃহস্পতি |
| FRI     | শুক্র    |
| SAT     | শনি      |

## Calendar legend

| Key                  | English   | Bengali          |
| -------------------- | --------- | ---------------- |
| `calendar.approved`  | Approved  | অনুমোদিত         |
| `calendar.pending`   | Pending   | বিচারাধীন        |
| `calendar.rejected`  | Rejected  | প্রত্যাখ্যাত     |
| `calendar.cancelled` | Cancelled | বাতিল করা হয়েছে |

### Calendar dates

Dates and event contents such as:

```text
August 2026
01
02
03
...
Room 10 - Admin
```

remain dynamic/calendar data.

---

# 20. Resources Page

| Key                     | English      | Bengali        |
| ----------------------- | ------------ | -------------- |
| `resources.title`       | Resources    | সম্পদ          |
| `resources.addResource` | Add Resource | সম্পদ যোগ করুন |
| `resources.name`        | Name         | নাম            |
| `resources.location`    | Location     | অবস্থান        |
| `resources.capacity`    | Capacity     | ধারণক্ষমতা     |
| `resources.description` | Description  | বর্ণনা         |
| `resources.actions`     | Actions      | কর্ম           |

---

# 21. Delete Resource Confirmation

| Key                        | English                                                                  | Bengali                                                                      |
| -------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `resources.delete.title`   | Remove Resource                                                          | রিসোর্স মুছে ফেলুন                                                           |
| `resources.delete.message` | Are you sure you want to remove "Room 14"? This action cannot be undone. | আপনি কি "Room 14" মুছে ফেলতে নিশ্চিত? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। |
| `resources.delete.cancel`  | Cancel                                                                   | বাতিল করুন                                                                   |
| `resources.delete.confirm` | Remove Resource                                                          | মুছে ফেলুন                                                                   |

The resource name:

```text
Room 14
```

remains dynamic.

---

# 22. Edit Resource Dialog

| Key                          | English                     | Bengali                    |
| ---------------------------- | --------------------------- | -------------------------- |
| `resources.edit.title`       | Edit Resource               | রিসোর্স সম্পাদনা করুন      |
| `resources.edit.description` | Update resource information | সম্পদের তথ্য হালনাগাদ করুন |
| `resources.nameRequired`     | Name *                      | নাম *                      |
| `resources.descriptionLabel` | Description                 | বর্ণনা                     |
| `resources.locationRequired` | Location *                  | অবস্থান *                  |
| `resources.capacityRequired` | Capacity *                  | ধারণক্ষমতা *               |
| `resources.edit.cancel`      | Cancel                      | বাতিল করুন                 |
| `resources.edit.update`      | Update                      | আপডেট                      |

---

# 23. Add Resource Dialog

| Key                                | English                           | Bengali                                    |
| ---------------------------------- | --------------------------------- | ------------------------------------------ |
| `resources.add.title`              | Add New Resource                  | নতুন রিসোর্স যোগ করুন                      |
| `resources.add.description`        | Create a new resource for booking | বুকিংয়ের জন্য একটি নতুন রিসোর্স তৈরি করুন |
| `resources.nameRequired`           | Name *                            | নাম *                                      |
| `resources.namePlaceholder`        | Enter resource name               | রিসোর্সের নাম লিখুন                        |
| `resources.descriptionLabel`       | Description                       | বর্ণনা                                     |
| `resources.descriptionPlaceholder` | Enter description                 | বিবরণ লিখুন                                |
| `resources.locationRequired`       | Location *                        | অবস্থান লিখুন                              |
| `resources.capacityRequired`       | Capacity *                        | ধারণক্ষমতা *                               |
| `resources.add.cancel`             | Cancel                            | বাতিল করুন                                 |
| `resources.add.create`             | Create                            | তৈরি করুন                                  |

---

# 24. Users Page

| Key                       | English         | Bengali                          |
| ------------------------- | --------------- | -------------------------------- |
| `users.title`             | Users           | ব্যবহারকারীরা                    |
| `users.search`            | Search          | অনুসন্ধান                        |
| `users.searchPlaceholder` | Search users... | ব্যবহারকারীদের অনুসন্ধান করুন... |
| `users.name`              | Name            | নাম                              |
| `users.email`             | Email           | ইমেল                             |
| `users.role`              | Role            | ভূমিকা                           |
| `users.joined`            | Joined          | যোগদান করেছেন                    |
| `users.actions`           | Actions         | কর্ম                             |
| `users.changeRole`        | Change Role     | ভূমিকা পরিবর্তন করুন             |

---

# 25. Change User Role Dialog

| Key                            | English                         | Bengali                                 |
| ------------------------------ | ------------------------------- | --------------------------------------- |
| `users.changeRole.title`       | Change User Role                | ব্যবহারকারীর ভূমিকা পরিবর্তন করুন       |
| `users.changeRole.description` | Update the role for [USER_NAME] | **USER_NAME অনুযায়ী ডায়নামিক টেক্সট** |
| `users.currentRole`            | Current Role                    | বর্তমান ভূমিকা                          |
| `users.newRole`                | New Role                        | নতুন ভূমিকা                             |
| `users.updateRole`             | Update Role                     | ভূমিকা পরিবর্তন করুন                    |

### Role values

| English | Bengali     |
| ------- | ----------- |
| User    | ব্যবহারকারী |
| Manager | ব্যবস্থাপক  |
| Admin   | প্রশাসক     |

The actual selected user's name remains dynamic.

Example from the reference:

```text
Update the role for Lê Minh Quân
```

was not itself translated in the Bengali screenshot; the dynamic-name sentence remained partially English.

Therefore the implementation should construct the sentence from translation components rather than translating the actual user's name.

---

# 26. Common Actions

| Key                  | English      | Bengali         |
| -------------------- | ------------ | --------------- |
| `action.cancel`      | Cancel       | বাতিল করুন      |
| `action.create`      | Create       | তৈরি করুন       |
| `action.update`      | Update       | আপডেট           |
| `action.delete`      | Delete       | মুছে ফেলুন      |
| `action.remove`      | Remove       | মুছে ফেলুন      |
| `action.edit`        | Edit         | সম্পাদনা        |
| `action.view`        | View         | দেখুন           |
| `action.viewDetails` | View Details | বিস্তারিত দেখুন |
| `action.next`        | Next         | পরবর্তী         |
| `action.back`        | Back         | ফিরে যান        |
| `action.previous`    | Previous     | পূর্ববর্তী      |
| `action.today`       | Today        | আজ              |
| `action.search`      | Search       | অনুসন্ধান       |
| `action.filter`      | Filter       | ফিল্টার         |

---

# 27. Pagination

| Key                   | English  | Bengali    |
| --------------------- | -------- | ---------- |
| `pagination.previous` | Previous | পূর্ববর্তী |
| `pagination.next`     | Next     | পরবর্তী    |
| `pagination.page`     | Page     | পৃষ্ঠা     |
| `pagination.of`       | of       | এর         |

Numbers remain dynamic.

Example:

```text
Page 1 of 5
```

should be generated from:

```text
t("pagination.page") + currentPage + t("pagination.of") + totalPages
```

rather than hardcoded.

---

# 28. Search / Filters

| Key                  | English      | Bengali         |
| -------------------- | ------------ | --------------- |
| `filter.status`      | Status       | অবস্থা          |
| `filter.user`        | User         | ব্যবহারকারী     |
| `filter.allStatuses` | All Statuses | সমস্ত স্ট্যাটাস |
| `filter.allUsers`    | All Users    | সকল ব্যবহারকারী |
| `filter.search`      | Search       | অনুসন্ধান       |

---

# 29. Common Empty States

| Key                         | English                  | Bengali                             |
| --------------------------- | ------------------------ | ----------------------------------- |
| `empty.noUpcomingBookings`  | No upcoming bookings     | আসন্ন কোনো বুকিং নেই                |
| `bookings.noActiveBookings` | No active bookings found | কোনো সক্রিয় বুকিং পাওয়া যায়নি    |
| `bookings.noPastBookings`   | No past bookings found   | পূর্ববর্তী কোনো বুকিং পাওয়া যায়নি |

Do not invent additional empty-state translations that were not visible in the supplied references.

---

# 30. Authentication — Common

| Key                    | English                            | Bengali                                       |
| ---------------------- | ---------------------------------- | --------------------------------------------- |
| `auth.appName`         | MeetOps                            | মিটঅপস                                        |
| `auth.subtitle`        | Resource Booking Management System | রিসোর্স বুকিং ম্যানেজমেন্ট সিস্টেম            |
| `auth.welcome`         | Welcome                            | স্বাগতম                                       |
| `auth.loginOrRegister` | Login or create a new account      | লগইন করুন অথবা একটি নতুন অ্যাকাউন্ট তৈরি করুন |
| `auth.loginTab`        | Login                              | লগইন                                          |
| `auth.registerTab`     | Register                           | নিবন্ধন করুন                                  |

---

# 31. Authentication — Registration

| Key                                | English                                                                                                            | Bengali                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `auth.fullName`                    | Full Name                                                                                                          | পুরো নাম                                                                                                                  |
| `auth.fullNamePlaceholder`         | Enter your full name                                                                                               | আপনার পুরো নাম লিখুন                                                                                                      |
| `auth.username`                    | Username                                                                                                           | ব্যবহারকারীর নাম                                                                                                          |
| `auth.usernameRegisterPlaceholder` | Letters, numbers, and underscores only                                                                             | শুধুমাত্র অক্ষর, সংখ্যা এবং আন্ডারস্কোর                                                                                   |
| `auth.password`                    | Password                                                                                                           | পাসওয়ার্ড                                                                                                                |
| `auth.passwordRegisterPlaceholder` | At least 8 characters with letters and numbers                                                                     | কমপক্ষে ৮টি অক্ষর ও সংখ্যা                                                                                                |
| `auth.confirmPassword`             | Confirm Password                                                                                                   | পাসওয়ার্ড নিশ্চিত করুন                                                                                                   |
| `auth.confirmPasswordPlaceholder`  | Re-enter password                                                                                                  | পাসওয়ার্ড পুনরায় লিখুন                                                                                                  |
| `auth.termsAgreement`              | I agree to the User Agreement and Privacy Policy (Please modify these documents to comply with legal requirements) | আমি ব্যবহারকারী চুক্তি এবং গোপনীয়তা নীতিতে সম্মত (অনুগ্রহ করে এই নথিগুলি আইনগত প্রয়োজনীয়তা মেনে চলার জন্য সংশোধন করুন) |
| `auth.registerButton`              | Register                                                                                                           | নিবন্ধন করুন                                                                                                              |

---

# 32. Authentication — Login

| Key                             | English          | Bengali                |
| ------------------------------- | ---------------- | ---------------------- |
| `auth.usernameLoginPlaceholder` | Enter username   | ব্যবহারকারীর নাম লিখুন |
| `auth.passwordLoginPlaceholder` | Enter password   | পাসওয়ার্ড লিখুন       |
| `auth.forgotPassword`           | Forgot password? | পাসওয়ার্ড ভুলে গেছেন? |
| `auth.loginButton`              | Login            | লগইন                   |

---

# 33. Authentication — Bengali Reference Notes

The Bengali authentication reference shows the following exact static structure:

```text
MeetOps
→ মিটঅপস

Resource Booking Management System
→ রিসোর্স বুকিং ম্যানেজমেন্ট সিস্টেম

Welcome
→ স্বাগতম

Login or create a new account
→ লগইন করুন অথবা একটি নতুন অ্যাকাউন্ট তৈরি করুন

Login
→ লগইন

Register
→ নিবন্ধন করুন

Full Name
→ পুরো নাম

Enter your full name
→ আপনার পুরো নাম লিখুন

Username
→ ব্যবহারকারীর নাম

Letters, numbers, and underscores only
→ শুধুমাত্র অক্ষর, সংখ্যা এবং আন্ডারস্কোর

Password
→ পাসওয়ার্ড

At least 8 characters with letters and numbers
→ কমপক্ষে ৮টি অক্ষর ও সংখ্যা

Confirm Password
→ পাসওয়ার্ড নিশ্চিত করুন

Re-enter password
→ পাসওয়ার্ড পুনরায় লিখুন

I agree to the User Agreement and Privacy Policy
→ আমি ব্যবহারকারী চুক্তি এবং গোপনীয়তা নীতিতে সম্মত
```

The full legal-agreement text should remain:

```text
আমি ব্যবহারকারী চুক্তি এবং গোপনীয়তা নীতিতে সম্মত (অনুগ্রহ করে এই নথিগুলি আইনগত প্রয়োজনীয়তা মেনে চলার জন্য সংশোধন করুন)
```

---

# 34. Authentication — Important Dynamic/Non-Translated Values

The following must remain dynamic and must NOT become static translation entries:

```text
User names
Email addresses
Passwords
Actual username values
```

Examples:

```text
Deb
Admin
RAJ
```

remain application/user data.

---

# 35. Language Selector

The MeetOps language selector currently supports:

| Code | English language name | Reference display |
| ---- | --------------------- | ----------------- |
| `en` | English               | English           |
| `hi` | Hindi                 | हिन्दी            |
| `bn` | Bengali               | বাংলা             |
| `ta` | Tamil                 | தமிழ்             |
| `es` | Spanish               | Español           |
| `fr` | French                | Français          |
| `ar` | Arabic                | العربية           |
| `zh` | Chinese               | 中文                |
| `ja` | Japanese              | 日本語               |
| `de` | German                | Deutsch           |

Only `en` and `bn` are being implemented in this pilot dictionary.

---

# 36. Strings Observed as Unchanged in Bengali Reference

The following strings/values were visibly kept in English in the supplied Bengali UI. Do not force them through the Bengali dictionary unless the product requirements are intentionally changed later.

## Dynamic/user/resource values

```text
Room 10
Room 11
Room 12
Room 13
Room 14
Room 15
1st Floor
2nd Floor
Seminar Room
Special room for Guests
Meeting Room with Projector
Meeting room for Online Clients
Meeting With Online Clients
Small Meetings
Admin
Debjit
Lê Minh Quân
Nugget bitch
NAMA... user names
Email addresses
```

## Date/time/library values

```text
August 2026
Su
Mo
Tu
We
Th
Fr
Sa
AM
PM
```

## Notification content

The supplied Bengali reference visibly keeps notification messages such as:

```text
New multi-day booking request for 5 days
New multi-day booking request for 16 days
Your booking for Room 10 has been approved
New multi-day booking request for 4 days
Your booking request for Room 10 has been submitted
```

in English.

---

# 37. Important Translation Consistency Rules

## Pending

```text
Pending → বিচারাধীন
```

## Approved

```text
Approved → অনুমোদিত
```

## Rejected

```text
Rejected → প্রত্যাখ্যাত
```

## Cancelled

```text
Cancelled → বাতিল করা হয়েছে
```

## Resource

```text
Resource → সম্পদ
```

## Booking

```text
Booking → বুকিং
```

## Users

```text
Users → ব্যবহারকারীরা
```

## Actions

```text
Actions → কর্ম
```

## Calendar Legend

```text
Legend → কিংবদন্তি
```

These wording choices should be preserved for consistency with the MeDo-hosted reference.

---

# 38. Empty-State Implementation Rule

The following strings MUST use translation keys instead of hardcoded English:

```text
bookings.noActiveBookings
bookings.noPastBookings
```

Expected behavior:

English:

```text
No active bookings found
No past bookings found
```

Bengali:

```text
কোনো সক্রিয় বুকিং পাওয়া যায়নি
পূর্ববর্তী কোনো বুকিং পাওয়া যায়নি
```

No runtime Gemini/API translation should be performed for these strings.

---

# 39. Authentication Implementation Rule

All authentication-page static text must also use the same static dictionary system.

The implementation must NOT use Gemini or `translate-text` to translate:

* Login page text
* Register page text
* Form labels
* Placeholders
* Buttons
* Terms/Privacy text
* Forgot-password text

English and Bengali values should come directly from the local dictionaries.

---

# 40. Recommended Translation-Key Architecture

The implementation should use grouped keys such as:

```text
app.*
nav.*
common.*
dashboard.*
notifications.*
logout.*
ai.*
bookings.*
newBooking.*
calendar.*
resources.*
users.*
status.*
action.*
filter.*
pagination.*
auth.*
```

Avoid duplicate keys for identical strings.

For example, use:

```text
common.cancel
```

instead of creating:

```text
dashboard.cancel
bookings.cancel
resources.cancel
users.cancel
```

when the Bengali translation is the same:

```text
বাতিল করুন
```

---

# 41. Pilot Acceptance Criteria

The English/Bengali implementation is considered successful only when:

1. English is fully functional.
2. Bengali is selectable from the existing language selector.
3. No translation API request is required for static UI strings.
4. Dashboard translates correctly.
5. Sidebar translates correctly.
6. Bookings page translates correctly.
7. Booking filters translate correctly.
8. Booking empty states translate correctly.
9. New Booking Step 1 translates correctly.
10. New Booking Step 2 translates correctly.
11. New Booking Step 3 translates correctly.
12. Calendar UI translates correctly.
13. Calendar weekday/date localization continues working.
14. Resources page translates correctly.
15. Resource dialogs translate correctly.
16. Users page translates correctly.
17. User-role dialog translates correctly.
18. Logout confirmation translates correctly.
19. Notifications title translates correctly.
20. AI Assistant UI labels/messages translate correctly.
21. Login page translates correctly.
22. Register page translates correctly.
23. Authentication placeholders translate correctly.
24. Authentication agreement text translates correctly.
25. Dynamic names, rooms, dates, times, emails and user data remain dynamic.
26. Switching Bengali → English restores the English UI.
27. Switching English → Bengali does not invoke Gemini or another translation API for static UI strings.
28. Browser refresh preserves the selected language.
29. Navigation between pages preserves the selected language.
30. No existing MeetOps functionality is broken by the localization implementation.

---

# 42. Phase 1 Scope

This document currently contains the:

```text
English → Bengali
```

pilot translation set.

Do NOT add the other eight languages until the English/Bengali implementation has been tested and confirmed stable.

Later languages will be added using the EXACT SAME translation-key structure.

Future languages:

```text
hi
ta
es
fr
ar
zh
ja
de
```

must extend this dictionary rather than create a second translation architecture.

---

# 43. Final Implementation Principle

The target architecture is:

```text
MeetOps React Application
        ↓
Current Language State
        ↓
Translation Key
        ↓
Local Static Dictionary
        ↓
English / Bengali Text
        ↓
Rendered UI
```

NOT:

```text
MeetOps React Application
        ↓
External Translation API
        ↓
Gemini
        ↓
Translated UI
```

Static UI translation must require:

```text
ZERO Gemini translation requests
ZERO MeDo translation gateway requests
ZERO INTEGRATIONS_API_KEY
```

Gemini may continue to be used for genuine AI features such as the MeetOps AI Assistant, but it must not be required for translating static UI strings.

---

# 44. Source-of-Truth Note

This document is based on the English and Bengali screenshots supplied from the MeDo-hosted MeetOps application.

Where screenshots show an item remaining in English inside the Bengali interface, this document records that behavior rather than inventing a translation.

Where a string is dynamic, it is deliberately excluded from static translation.

The objective is to reproduce the existing MeDo-hosted MeetOps language behavior in the standalone Vercel/Supabase application while eliminating runtime translation API quota consumption.

---

# 45. Update Log

## Initial version

Contained the original English → Bengali static UI translation inventory covering:

* Dashboard
* Notifications
* Logout
* AI Assistant
* Bookings
* Booking statuses
* New Booking
* Calendar
* Resources
* Users
* Common actions
* Pagination
* Filters
* Language selector

## Update 1

Added previously missed strings discovered from additional reference screenshots:

### Bookings empty states

```text
No active bookings found
→ কোনো সক্রিয় বুকিং পাওয়া যায়নি

No past bookings found
→ পূর্ববর্তী কোনো বুকিং পাওয়া যায়নি
```

### Authentication — Register

```text
MeetOps
→ মিটঅপস

Resource Booking Management System
→ রিসোর্স বুকিং ম্যানেজমেন্ট সিস্টেম

Welcome
→ স্বাগতম

Login or create a new account
→ লগইন করুন অথবা একটি নতুন অ্যাকাউন্ট তৈরি করুন

Login
→ লগইন

Register
→ নিবন্ধন করুন

Full Name
→ পুরো নাম

Enter your full name
→ আপনার পুরো নাম লিখুন

Username
→ ব্যবহারকারীর নাম

Letters, numbers, and underscores only
→ শুধুমাত্র অক্ষর, সংখ্যা এবং আন্ডারস্কোর

Password
→ পাসওয়ার্ড

At least 8 characters with letters and numbers
→ কমপক্ষে ৮টি অক্ষর ও সংখ্যা

Confirm Password
→ পাসওয়ার্ড নিশ্চিত করুন

Re-enter password
→ পাসওয়ার্ড পুনরায় লিখুন

I agree to the User Agreement and Privacy Policy (Please modify these documents to comply with legal requirements)
→ আমি ব্যবহারকারী চুক্তি এবং গোপনীয়তা নীতিতে সম্মত (অনুগ্রহ করে এই নথিগুলি আইনগত প্রয়োজনীয়তা মেনে চলার জন্য সংশোধন করুন)

Register
→ নিবন্ধন করুন
```

### Authentication — Login

```text
Username
→ ব্যবহারকারীর নাম

Enter username
→ ব্যবহারকারীর নাম লিখুন

Password
→ পাসওয়ার্ড

Enter password
→ পাসওয়ার্ড লিখুন

Forgot password?
→ পাসওয়ার্ড ভুলে গেছেন?

Login
→ লগইন
```
