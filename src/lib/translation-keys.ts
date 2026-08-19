/**
 * Centralized Translation Keys
 * 
 * This file contains ALL UI strings used across the MeetOps application.
 * All strings are defined in English and will be translated via Google Text Translation API.
 * 
 * DO NOT hardcode translations here - these are source strings only.
 */

export const TRANSLATION_KEYS = {
  // ===== NAVIGATION SIDEBAR =====
  nav: {
    appName: 'MeetOps',
    dashboard: 'Dashboard',
    bookings: 'Bookings',
    calendar: 'Calendar',
    resources: 'Resources',
    users: 'Users',
    notifications: 'Notifications',
    profile: 'Profile',
  },

  // ===== TOP NAVBAR =====
  navbar: {
    language: 'Language',
    logout: 'Logout',
    admin: 'Admin',
    manager: 'Manager',
    user: 'User',
  },

  // ===== LOGOUT DIALOG =====
  logoutDialog: {
    title: 'Confirm Logout',
    description: 'Are you sure you want to log out? You will need to sign in again to access your dashboard and bookings.',
    cancel: 'Cancel',
    logout: 'Logout',
  },

  // ===== DASHBOARD PAGE =====
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back',
    totalBookings: 'Total Bookings',
    pendingBookings: 'Pending',
    approvedBookings: 'Approved',
    rejectedBookings: 'Rejected',
    upcomingBookings: 'Upcoming Bookings',
    quickActions: 'Quick Actions',
    newBooking: 'New Booking',
    viewAllBookings: 'View All Bookings',
    manageResources: 'Manage Resources',
    aiInsights: 'AI Insights',
    chatWithAI: 'Chat with AI Assistant',
    noUpcomingBookings: 'No upcoming bookings',
    bookNow: 'Book Now',
  },

  // ===== BOOKINGS PAGE =====
  bookings: {
    title: 'Bookings',
    activeBookings: 'Active Bookings',
    pastBookings: 'Past Bookings',
    exportPDF: 'Export PDF',
    newBooking: 'New Booking',
    
    // Filters
    status: 'Status',
    allStatuses: 'All Statuses',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
    completed: 'Completed',
    user: 'User',
    allUsers: 'All Users',
    search: 'Search',
    searchPlaceholder: 'Search by resource, purpose, or user...',
    
    // Table columns
    resource: 'Resource',
    purpose: 'Purpose',
    date: 'Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    type: 'Type',
    actions: 'Actions',
    
    // Actions
    view: 'View',
    viewDetails: 'View Details',
    approve: 'Approve',
    reject: 'Reject',
    cancel: 'Cancel',
    
    // Empty states
    noBookingsFound: 'No bookings found',
    noActiveBookings: 'No active bookings found',
    noPastBookings: 'No past bookings found',
    
    // Export dialog
    exportTitle: 'Export Bookings to PDF',
    exportDescription: 'Select filters to export booking history',
    startDate: 'Start Date',
    endDate: 'End Date',
    exportButton: 'Export PDF',
    cancelButton: 'Cancel',
    
    // Types
    multiDay: 'Multi-Day',
    singleDay: 'Single Day',
    
    // Pagination
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
  },

  // ===== BOOKING CREATION FORM =====
  newBooking: {
    title: 'New Booking',
    subtitle: 'Create a new resource booking',
    selectResource: 'Select Resource',
    selectResourcePlaceholder: 'Choose a room or resource',
    
    // Step titles
    step1Title: 'Step 1: Select Resource',
    step1Description: 'Choose the resource you want to book',
    step2Title: 'Step 2: Select Date & Time',
    step2Description: 'Choose when you want to book {resource}',
    step3Title: 'Step 3: Booking Details',
    step3Description: 'Provide additional information about your booking',
    
    // Booking type
    bookingType: 'Booking Type',
    singleDay: 'Single Day',
    multiDay: 'Multi-Day',
    
    // Date & Time
    date: 'Date',
    startDate: 'Start Date',
    endDate: 'End Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    totalDays: 'Total Days',
    
    // Purpose & Attendees
    purpose: 'Purpose',
    purposeLabel: 'Purpose',
    purposePlaceholder: 'e.g., Team Meeting, Client Presentation',
    attendees: 'Attendees',
    attendeesLabel: 'Attendees (optional)',
    attendeesPlaceholder: 'Enter attendee names separated by commas',
    
    // AI Agenda Generator
    aiAgendaGenerator: 'AI Agenda Generator',
    generateAgenda: 'Generate Agenda',
    generateAgendaButton: 'GENERATE AGENDA WITH AI',
    generatingAgenda: 'GENERATING AGENDA...',
    aiGeneratedAgenda: 'AI-GENERATED AGENDA',
    copyToClipboard: 'COPY TO CLIPBOARD',
    
    // Availability
    checkingAvailability: 'Checking availability...',
    bookingConflict: 'BOOKING CONFLICT',
    conflictMessage: 'This time slot conflicts with an existing booking. Please choose a different time.',
    timeSlotAvailable: 'TIME SLOT AVAILABLE',
    
    // Summary
    bookingSummary: 'Booking Summary',
    createBooking: 'Create Booking',
    submit: 'Create Booking',
    cancel: 'Cancel',
    
    // Validation messages
    resourceRequired: 'Please select a resource',
    dateRequired: 'Please select a date',
    startTimeRequired: 'Please select start time',
    endTimeRequired: 'Please select end time',
    purposeRequired: 'Please enter a purpose',
    invalidTimeRange: 'End time must be after start time',
    conflictDetected: 'This time slot is already booked',
    
    // Success/Error messages
    bookingCreated: 'Booking created successfully',
    bookingFailed: 'Failed to create booking',
  },

  // ===== BOOKING DETAILS PAGE =====
  bookingDetails: {
    title: 'Booking Details',
    resource: 'Resource',
    location: 'Location',
    capacity: 'Capacity',
    bookedBy: 'Booked By',
    startTime: 'Start Time',
    endTime: 'End Time',
    purpose: 'Purpose',
    attendees: 'Attendees',
    status: 'Status',
    reviewedBy: 'Reviewed By',
    reviewedAt: 'Reviewed At',
    createdAt: 'Created At',
    
    // Actions
    approve: 'Approve',
    reject: 'Reject',
    cancelBooking: 'Cancel Booking',
    back: 'Back',
    
    // Confirmation dialogs
    confirmApprove: 'Are you sure you want to approve this booking?',
    confirmReject: 'Are you sure you want to reject this booking?',
    confirmCancel: 'Are you sure you want to cancel this booking?',
    yes: 'Yes',
    no: 'No',
    
    // Success/Error messages
    approveSuccess: 'Booking approved successfully',
    rejectSuccess: 'Booking rejected successfully',
    cancelSuccess: 'Booking cancelled successfully',
    actionFailed: 'Action failed',
  },

  // ===== CALENDAR PAGE =====
  calendar: {
    title: 'Calendar',
    subtitle: 'View all resource bookings',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
    today: 'Today',
    back: 'Back',
    next: 'Next',
    
    // Legend
    legend: 'Legend',
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
    
    // Event details
    room: 'Room',
    time: 'Time',
    bookedBy: 'Booked By',
    
    // Empty state
    noEvents: 'No bookings for this period',
  },

  // ===== RESOURCES PAGE =====
  resources: {
    title: 'Resources',
    addResource: 'Add Resource',
    name: 'Name',
    location: 'Location',
    capacity: 'Capacity',
    description: 'Description',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    
    // Add/Edit dialog
    addTitle: 'Add New Resource',
    editTitle: 'Edit Resource',
    addDescription: 'Create a new resource for booking',
    editDescription: 'Update resource information',
    namePlaceholder: 'Enter resource name',
    locationPlaceholder: 'Enter location',
    capacityPlaceholder: 'Enter capacity',
    descriptionPlaceholder: 'Enter description',
    availabilityHours: 'Availability Hours',
    save: 'Save',
    cancel: 'Cancel',
    create: 'Create',
    update: 'Update',
    
    // Validation
    nameRequired: 'Name is required',
    locationRequired: 'Location is required',
    capacityRequired: 'Capacity is required',
    
    // Success/Error messages
    resourceAdded: 'Resource added successfully',
    resourceUpdated: 'Resource updated successfully',
    resourceDeleted: 'Resource deleted successfully',
    actionFailed: 'Action failed',
    
    // Delete confirmation
    deleteTitle: 'Delete Resource',
    deleteDescription: 'Are you sure you want to delete "{name}"? This action cannot be undone.',
    confirmDelete: 'Are you sure you want to delete this resource?',
    deleteWarning: 'Cannot delete resource with active bookings',
    
    // Empty state
    noResources: 'No resources yet. Create your first resource to get started.',
    
    // Permissions
    noPermission: 'You do not have permission to access this page.',
  },

  // ===== USERS PAGE =====
  users: {
    title: 'Users',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    joined: 'Joined',
    actions: 'Actions',
    changeRole: 'Change Role',
    searchPlaceholder: 'Search users...',
    
    // Roles
    admin: 'Admin',
    manager: 'Manager',
    user: 'User',
    
    // Change role dialog
    changeRoleTitle: 'Change User Role',
    changeRoleDescription: 'Update the role for',
    currentRole: 'Current Role',
    newRole: 'New Role',
    updateRole: 'Update Role',
    selectRole: 'Select Role',
    save: 'Save',
    cancel: 'Cancel',
    
    // Success/Error messages
    roleChanged: 'User role changed successfully',
    actionFailed: 'Action failed',
    
    // Empty state
    noUsers: 'No users found',
  },

  // ===== NOTIFICATIONS PAGE =====
  notifications: {
    title: 'Notifications',
    markAllRead: 'Mark All as Read',
    today: 'Today',
    yesterday: 'Yesterday',
    
    // Notification messages
    bookingApproved: 'Your booking for {resource} has been approved',
    bookingRejected: 'Your booking for {resource} has been rejected',
    bookingCancelled: 'Your booking for {resource} has been cancelled',
    bookingRequiresApproval: 'New booking request requires your approval',
    bookingCreated: 'Booking created successfully',
    
    // Empty state
    noNotifications: 'No notifications',
  },

  // ===== PROFILE / SETTINGS PAGE =====
  profile: {
    title: 'Profile',
    personalInfo: 'Personal Information',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    languagePreference: 'Language Preference',
    selectLanguage: 'Select Language',
    save: 'Save',
    cancel: 'Cancel',
    
    // Success/Error messages
    profileUpdated: 'Profile updated successfully',
    updateFailed: 'Failed to update profile',
  },

  // ===== AI CHAT ASSISTANT =====
  chat: {
    title: 'MeetOps AI Assistant',
    greeting: "Hi! I'm MeetOps AI. I can help you book rooms, check availability, and manage your bookings.",
    examplePrompt: 'Try: "Book me a room for 5 people tomorrow at 2PM"',
    placeholder: 'Type your message...',
    send: 'Send',
    loading: 'Thinking...',
    error: 'Failed to send message',
    encounteredError: 'Sorry, I encountered an error. Please try again.',
    sendError: 'Failed to send message. Please try again.',
    noResponse: 'Sorry, I could not process your request.',
    minimize: 'Minimize',
    close: 'Close',
  },

  // ===== COMMON =====
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    close: 'Close',
    dismiss: 'Dismiss',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    clear: 'Clear',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    export: 'Export',
    import: 'Import',
    download: 'Download',
    upload: 'Upload',
    view: 'View',
    details: 'Details',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    time: 'Time',
    name: 'Name',
    description: 'Description',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    people: 'people',
    today: 'Today',
    create: 'Create',
    update: 'Update',
    
    // Time
    am: 'AM',
    pm: 'PM',
    
    // Empty states
    noData: 'No data available',
    noResults: 'No results found',
    
    // Error messages
    somethingWentWrong: 'Something went wrong',
    tryAgain: 'Please try again',
    unauthorized: 'Unauthorized access',
    notFound: 'Not found',
    networkError: 'Network error',
  },

  // ===== LOGIN PAGE =====
  login: {
    title: 'MeetOps',
    subtitle: 'Resource Booking Management System',
    welcomeTitle: 'Welcome',
    welcomeDescription: 'Login or create a new account',
    loginTab: 'Login',
    registerTab: 'Register',
    
    // Login form
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter username',
    enterPassword: 'Enter password',
    forgotPassword: 'Forgot password?',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    
    // Register form
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    usernamePlaceholder: 'Letters, numbers, and underscores only',
    passwordPlaceholder: 'At least 8 characters with letters and numbers',
    confirmPassword: 'Confirm Password',
    reenterPassword: 'Re-enter password',
    agreeToTerms: 'I agree to the User Agreement and Privacy Policy (Please modify these documents to comply with legal requirements)',
    registerButton: 'Register',
    registering: 'Registering...',
    
    // Validation messages
    enterUsernamePassword: 'Please enter username and password',
    usernameFormat: 'Username can only contain letters, numbers, and underscores',
    fillAllFields: 'Please fill in all required fields',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordRequirements: 'Password must contain both letters and numbers',
    passwordsDoNotMatch: 'Passwords do not match',
    agreeToTermsRequired: 'Please agree to the User Agreement and Privacy Policy',
    
    // Success/Error messages
    loginFailed: 'Login failed',
    loginSuccess: 'Login successful',
    registrationFailed: 'Registration failed',
    registrationSuccess: 'Registration successful! You can now log in.',
  },

  // ===== RESET PASSWORD PAGE =====
  resetPassword: {
    title: 'Reset Password',
    description: 'Enter your email to receive a password reset link',
    email: 'Email',
    enterEmail: 'Enter your email',
    sendResetLink: 'Send Reset Link',
    sending: 'Sending...',
    backToLogin: 'Back to Login',
    
    // Success/Error messages
    emailRequired: 'Please enter your email',
    invalidEmail: 'Please enter a valid email',
    resetLinkSent: 'Password reset link sent to your email',
    resetFailed: 'Failed to send reset link',
  },

  // ===== LANDING PAGE =====
  landing: {
    // Hero section
    heroTitle: 'Streamline Your Resource Management',
    heroSubtitle: 'MeetOps helps organizations efficiently manage meeting rooms, equipment, and shared resources',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Features
    featuresTitle: 'Why Choose MeetOps?',
    feature1Title: 'Easy Booking',
    feature1Description: 'Book resources in seconds with our intuitive interface',
    feature2Title: 'Smart Scheduling',
    feature2Description: 'AI-powered conflict detection and availability checking',
    feature3Title: 'Team Collaboration',
    feature3Description: 'Manage bookings across your entire organization',
    feature4Title: 'Real-time Updates',
    feature4Description: 'Get instant notifications about booking status changes',
    
    // CTA
    ctaTitle: 'Ready to Get Started?',
    ctaDescription: 'Join thousands of organizations using MeetOps',
    ctaButton: 'Start Free Trial',
    
    // Footer
    footerCopyright: '© 2026 MeetOps. All rights reserved.',
  },

  // ===== NOT FOUND PAGE =====
  notFound: {
    title: '404',
    subtitle: 'Page Not Found',
    description: 'The page you are looking for does not exist',
    backToHome: 'Back to Home',
  },

  // ===== TOAST MESSAGES =====
  toast: {
    bookingCreated: 'Booking created successfully',
    bookingUpdated: 'Booking updated successfully',
    bookingDeleted: 'Booking deleted successfully',
    bookingApproved: 'Booking approved successfully',
    bookingRejected: 'Booking rejected successfully',
    bookingCancelled: 'Booking cancelled successfully',
    resourceCreated: 'Resource created successfully',
    resourceUpdated: 'Resource updated successfully',
    resourceDeleted: 'Resource deleted successfully',
    userRoleChanged: 'User role changed successfully',
    profileUpdated: 'Profile updated successfully',
    languageChanged: 'Language changed successfully',
    exportSuccess: 'Export completed successfully',
    exportFailed: 'Export failed',
    invalidInput: 'Invalid input',
    requiredField: 'This field is required',
    operationFailed: 'Operation failed',
    operationSuccess: 'Operation completed successfully',
    agendaGenerated: 'Agenda generated successfully',
    agendaFailed: 'Failed to generate agenda',
  },
};

// Helper function to get all translation keys as a flat array
export function getAllTranslationKeys(): string[] {
  const keys: string[] = [];
  
  function extractKeys(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        keys.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        extractKeys(obj[key]);
      }
    }
  }
  
  extractKeys(TRANSLATION_KEYS);
  return keys;
}

// Helper function to get a nested translation key
export function getTranslationKey(path: string): string {
  const parts = path.split('.');
  let value: any = TRANSLATION_KEYS;
  
  for (const part of parts) {
    value = value[part];
    if (value === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
  }
  
  return typeof value === 'string' ? value : path;
}
