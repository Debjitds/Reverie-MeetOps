# Requirements Document

## 1. Application Overview

### 1.1 Application Name
MeetOps

### 1.2 Application Description
MeetOps is a SaaS platform designed to help organizations manage shared resources such as meeting rooms, equipment, studios, and operational assets through a centralized booking system. The platform prevents scheduling conflicts, supports approval workflows, and provides visibility into resource utilization.

## 2. Users and Use Scenarios

### 2.1 Target Users
- Startups
- Small teams
- Educational institutions
- Agencies and Studios

### 2.2 User Roles
- **Admin**: Full system control including resource management, user management, and all booking operations
- **Manager**: Approve or reject booking requests for assigned resources and manage pending queues
- **User**: Browse resources, create booking requests, and manage own bookings

### 2.3 Core Use Scenarios
- Organizations need to prevent double booking of shared resources
- Teams require centralized booking system to replace manual spreadsheets
- Managers need structured approval workflows for resource allocation
- Organizations need visibility into resource utilization patterns

## 3. Page Structure and Functional Description

### 3.1 Page Structure
```
MeetOps Application
├── Authentication Pages
│   ├── Register Page
│   ├── Login Page
│   └── Password Reset Page
├── Dashboard Page
├── Resource Management Page (Admin only)
├── Booking Pages
│   ├── Create Booking Page
│   ├── Booking List Page
│   ├── Booking Detail Page
│   └── Export Booking History Page
└── Notification Panel
```

### 3.2 Authentication Pages

#### 3.2.1 Register Page
- Input fields: name, email, password, confirm password
- Email uniqueness validation
- Password strength validation (minimum 8 characters, must include letters and numbers)
- Submit button to create account
- New users default to User role
- Link to Login Page

#### 3.2.2 Login Page
- Input fields: email, password
- Login button
- Link to Password Reset Page
- Link to Register Page
- Session management after successful login

#### 3.2.3 Password Reset Page
- Input field: email
- Send reset link button
- Confirmation message after sending
- Link back to Login Page

### 3.3 Dashboard Page

#### 3.3.1 Statistics Section
- Total bookings count (scoped by role)
- Pending bookings count
- Approved bookings count
- Rejected bookings count

#### 3.3.2 Upcoming Bookings Section
- List of upcoming bookings (scoped by user role)
- Each booking displays: resource name, date, time, status
- Click to view booking details

#### 3.3.3 Resource Usage Overview
- Summary of resource utilization
- Most booked resources

#### 3.3.4 Quick Actions
- New Booking button (all roles)
- View All Bookings button (all roles)
- Manage Resources button (Admin only)

### 3.4 Resource Management Page (Admin Only)

#### 3.4.1 Resource List
- Display all resources in table format
- Columns: name, location, capacity, availability hours
- Edit button for each resource
- Delete button for each resource
- Create New Resource button

#### 3.4.2 Create/Edit Resource Form
- Input fields:
  - Name (required)
  - Description (optional)
  - Location (required)
  - Capacity (required, number)
  - Availability hours (required, e.g., Mon–Fri 9AM–6PM)
  - Booking rules (optional, e.g., max duration, advance notice required)
- Save button
- Cancel button

#### 3.4.3 Delete Resource
- Confirmation dialog before deletion
- Prevent deletion if resource has active bookings

### 3.5 Booking Pages

#### 3.5.1 Create Booking Page

**Step 1: Select Resource**
- Display available resources with basic info
- Filter by location or capacity
- Select resource button

**Step 2: Select Date and Time**
- Booking type selector: Single Day or Multi-Day
- For Single Day:
  - Date picker
  - Start time selector
  - End time selector
- For Multi-Day:
  - Start date picker
  - End date picker
  - Daily start time selector
  - Daily end time selector
  - Display total number of days selected
- Real-time availability check
- Display conflict warning if any time slot unavailable

**Step 3: Enter Details**
- Purpose/title input (required)
- Attendees input (optional, comma-separated or multi-select)
- Submit booking button

**Validation Rules**
- End time must be after start time
- For multi-day bookings, end date must be after or equal to start date
- Time must fall within resource availability hours
- No overlap with existing Approved bookings for same resource on any selected day
- Display specific error messages for each validation failure

#### 3.5.2 Booking List Page

**For Users**
- Display own bookings only
- Columns: resource, date, time, purpose, status, booking type (single/multi-day)
- Multi-day bookings display date range
- Filter by date range and status
- Cancel button for Pending or Approved bookings
- Export to PDF button

**For Managers**
- Display bookings for assigned resources
- Columns: resource, user, date, time, purpose, status, booking type
- Multi-day bookings display date range
- Filter by date range, resource, status
- Approve/Reject buttons for Pending bookings
- Export to PDF button

**For Admins**
- Display all bookings
- Columns: resource, user, date, time, purpose, status, booking type
- Multi-day bookings display date range
- Filter by date range, resource, status, user
- Approve/Reject/Modify buttons for any booking
- Export to PDF button

#### 3.5.3 Booking Detail Page
- Display full booking information:
  - Resource name and details
  - User name
  - Booking type (single-day or multi-day)
  - Date and time (or date range for multi-day)
  - Purpose
  - Attendees
  - Status
  - Created timestamp
  - Reviewed by (if applicable)
  - Review timestamp (if applicable)
- Action buttons based on role and status:
  - Cancel (User, for own Pending/Approved bookings)
  - Approve/Reject (Manager/Admin, for Pending bookings)
  - Modify (Admin only)

#### 3.5.4 Export Booking History Page
- Filter options:
  - Date range selector (start date and end date)
  - Resource selector (multi-select)
  - Status selector (multi-select: Pending, Approved, Rejected, Cancelled, Completed)
- Apply Filters button
- Export to PDF button
- Preview section showing filtered bookings before export
- PDF includes:
  - Export date and time
  - Applied filters summary
  - Booking list table with columns: resource, user, date, time, purpose, status
  - Total bookings count

### 3.6 Notification Panel
- Accessible from top navigation bar
- Display list of notifications
- Each notification shows:
  - Type (booking created, approved, rejected, cancelled)
  - Message
  - Timestamp
  - Read/unread status
- Click notification to view related booking
- Mark as read functionality
- Badge showing unread count

## 4. Business Rules and Logic

### 4.1 Booking Status Flow
- User submits booking → Status: Pending
- Manager/Admin approves → Status: Approved
- Manager/Admin rejects → Status: Rejected
- User cancels → Status: Cancelled
- After end time passes → Status: Completed

### 4.2 Multi-Day Booking Rules
- Multi-day bookings create individual booking records for each day
- All daily bookings share same purpose, attendees, and time slots
- Each daily booking follows same approval workflow
- If any day has conflict, entire multi-day booking is rejected
- Cancelling multi-day booking cancels all associated daily bookings
- Approving multi-day booking approves all associated daily bookings
- Rejecting multi-day booking rejects all associated daily bookings

### 4.3 Conflict Detection Rules
- Two bookings for same resource are conflicting if:
  - start_time_1 < end_time_2 AND start_time_2 < end_time_1
- Boundary overlap is allowed (e.g., 10–11AM and 11AM–12PM do not conflict)
- Only Approved bookings block new booking requests
- Pending bookings do not block new requests
- For multi-day bookings, conflict check applies to each day independently

### 4.4 Approval Authority
- Managers can approve/reject bookings for resources they manage
- Admins can approve/reject any booking
- Users cannot approve/reject any booking
- Multi-day bookings require single approval action for all days

### 4.5 Cancellation Rules
- Users can cancel own bookings if status is Pending or Approved
- Users cannot cancel Rejected or Completed bookings
- Managers and Admins can cancel any booking
- Cancelling multi-day booking cancels all associated daily bookings

### 4.6 Role-Based Data Access
- Users see only own bookings
- Managers see bookings for resources they manage
- Admins see all bookings
- Resource management accessible only to Admins
- Export functionality respects role-based data access

### 4.7 Notification Triggers
- Booking created → Notify User (confirmation) + Manager/Admin (action required)
- Booking approved → Notify User
- Booking rejected → Notify User with reason
- Booking cancelled → Notify User + Manager/Admin
- Multi-day bookings trigger single notification per action

### 4.8 Simultaneous Submission Handling
- Use database-level locking or transaction isolation
- First approved booking wins
- Second submission receives conflict error

### 4.9 PDF Export Rules
- Export includes only bookings visible to current user based on role
- Date range filter is required
- Resource and status filters are optional
- PDF generation occurs server-side
- Export file name format: BookingHistory_YYYYMMDD_HHMMSS.pdf

## 5. Exception and Boundary Cases

| Scenario | System Behavior |
|----------|----------------|
| User submits booking outside availability hours | Display error: Booking time must be within resource availability hours |
| User submits booking with start time >= end time | Display error: End time must be after start time |
| User submits multi-day booking with end date before start date | Display error: End date must be after or equal to start date |
| Multi-day booking has conflict on any day | Display error: Resource unavailable on [specific dates], entire booking rejected |
| Two users submit booking for same slot simultaneously | First approved booking succeeds, second receives conflict error |
| User tries to cancel Completed booking | Display error: Cannot cancel completed bookings |
| Admin deletes resource with active bookings | Display error: Cannot delete resource with active bookings |
| User registers with existing email | Display error: Email already registered |
| Password does not meet strength requirements | Display error: Password must be at least 8 characters with letters and numbers |
| Manager tries to approve booking for unassigned resource | Display error: You do not have permission to approve this booking |
| User tries to access Admin-only pages | Redirect to Dashboard with error message |
| Booking end time has passed | Status automatically changes to Completed |
| User exports with no bookings matching filters | Display message: No bookings found for selected filters |
| Export date range exceeds 1 year | Display warning: Large date range may take longer to process |

## 6. Acceptance Criteria

1. Users can successfully register, login, and reset password
2. Role-based access control correctly restricts actions and data visibility
3. Dashboard displays accurate statistics and upcoming bookings scoped by role
4. Admins can create, edit, and delete resources with all specified fields
5. Users can create single-day bookings through 3-step flow with real-time validation
6. Users can create multi-day bookings by selecting date range and daily time slots
7. Multi-day bookings create individual records for each day with shared details
8. System correctly detects and prevents conflicting bookings for all days in multi-day bookings
9. Boundary overlaps (e.g., 10–11AM and 11AM–12PM) are allowed
10. Managers and Admins can approve or reject pending bookings including multi-day bookings
11. Approving or rejecting multi-day booking applies to all associated daily bookings
12. All booking status transitions are logged with timestamp and reviewer
13. Users receive notifications for all booking status changes
14. Notification panel displays all notifications with read/unread status
15. Booking list page displays multi-day bookings with date range indicator
16. Booking list page supports filtering by date range, resource, status, and user
17. Users can cancel own Pending or Approved bookings including multi-day bookings
18. Cancelling multi-day booking cancels all associated daily bookings
19. Simultaneous booking submissions for same slot are correctly resolved
20. Users can export booking history to PDF with date range, resource, and status filters
21. PDF export includes applied filters summary and booking details table
22. Export functionality respects role-based data access
23. All validation errors display clear, specific messages
24. UI is clean, professional, and follows SaaS design guidelines
25. Navigation and actions are role-appropriate
26. All pages are responsive and production-quality

## 7. Out of Scope for This Release

- Email notifications (only in-app notifications)
- Calendar integration (Google Calendar, Outlook)
- Recurring bookings (e.g., every Monday for 3 months)
- Resource categories or tags
- Advanced analytics and reporting
- Mobile native applications
- Multi-language support
- Payment or billing features
- Resource equipment checkout tracking
- Waitlist functionality for fully booked resources
- Bulk booking operations
- Export bookings to CSV or Excel formats
- Custom booking forms per resource
- Integration with third-party systems
- Automated booking reminders