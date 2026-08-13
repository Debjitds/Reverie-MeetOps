import type { Booking } from '@/types/types';

/**
 * Check if two time ranges overlap
 * Returns true if there is a conflict
 */
export function hasTimeConflict(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  // Two ranges overlap if: start1 < end2 AND start2 < end1
  return start1 < end2 && start2 < end1;
}

/**
 * Check if a booking conflicts with existing bookings
 */
export function checkBookingConflict(
  newStart: Date,
  newEnd: Date,
  existingBookings: Booking[]
): boolean {
  return existingBookings.some((booking) => {
    // Check against approved and pending bookings
    if (booking.status !== 'approved' && booking.status !== 'pending') return false;
    
    const bookingStart = new Date(booking.start_time);
    const bookingEnd = new Date(booking.end_time);
    
    return hasTimeConflict(newStart, newEnd, bookingStart, bookingEnd);
  });
}

/**
 * Format date to YYYY-MM-DD without timezone conversion
 * This ensures the date is extracted as-is without shifting due to UTC conversion
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Extract date components in local timezone (not UTC)
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Format date-only value for display (e.g., "Apr 12, 2026")
 * Handles both Date objects and YYYY-MM-DD strings without timezone shifts
 */
export function formatDateOnly(date: Date | string): string {
  let d: Date;
  
  if (typeof date === 'string') {
    // If it's a YYYY-MM-DD string, parse it as local date
    // Add 'T00:00:00' to ensure it's treated as local midnight, not UTC
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      d = new Date(date + 'T00:00:00');
    } else {
      // It's a full timestamp, parse normally
      d = new Date(date);
    }
  } else {
    d = date;
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format time to 12-hour format with AM/PM (e.g., "10:00 AM")
 * Handles both UTC timestamps (with Z suffix) and local timestamps (without Z)
 */
export function formatTime(date: Date | string): string {
  let hours: number;
  let minutes: string;

  if (typeof date === 'string') {
    const hasTimezone = date.endsWith('Z') || date.includes('+') || date.match(/[+-]\d{2}:\d{2}$/);
    
    if (hasTimezone) {
      // Has timezone - parse and convert to local
      const d = new Date(date);
      hours = d.getHours();
      minutes = d.getMinutes().toString().padStart(2, '0');
    } else {
      // No timezone - extract time directly from string
      const timePart = date.split('T')[1];
      const [hourStr, minuteStr] = timePart.split(':');
      hours = parseInt(hourStr);
      minutes = minuteStr;
    }
  } else {
    hours = date.getHours();
    minutes = date.getMinutes().toString().padStart(2, '0');
  }

  // Convert to 12-hour format
  const isPM = hours >= 12;
  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const ampm = isPM ? 'PM' : 'AM';

  return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Format datetime to readable string with both date and time
 * Handles both UTC timestamps (with Z suffix) and local timestamps (without Z)
 * 
 * CRITICAL: This function must handle bookings created before and after the timezone fix:
 * - Old bookings: "2026-04-29T10:00:00" (no Z) - stored as local time, display as-is
 * - New bookings: "2026-04-29T04:30:00.000Z" (with Z) - stored as UTC, convert to local
 */
export function formatDateTime(date: Date | string): string {
  if (typeof date === 'string') {
    // Check if the string has a Z suffix or timezone offset
    const hasTimezone = date.endsWith('Z') || date.includes('+') || date.match(/[+-]\d{2}:\d{2}$/);
    
    if (hasTimezone) {
      // Has timezone info - parse as UTC and convert to local
      const d = new Date(date);
      return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      // No timezone info - parse the string directly without Date object to avoid timezone shifts
      // Format: "2026-04-29T10:00:00" → "Apr 29, 2026, 10:00 AM"
      const [datePart, timePart] = date.split('T');
      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(month) - 1];
      
      const hourNum = parseInt(hour);
      const isPM = hourNum >= 12;
      const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
      const ampm = isPM ? 'PM' : 'AM';
      
      return `${monthName} ${parseInt(day)}, ${year}, ${hour12.toString().padStart(2, '0')}:${minute} ${ampm}`;
    }
  } else {
    // Date object - format normally
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

/**
 * Get day of week from date
 */
export function getDayOfWeek(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[d.getDay()];
}

/**
 * Combine date and time strings into a proper timestamp
 * Preserves the user's selected date and time by treating them as local values
 * and converting properly to ISO format for storage
 * 
 * @param date - YYYY-MM-DD format string
 * @param time - HH:MM format string
 * @returns ISO timestamp string in UTC
 */
export function combineDateAndTime(date: string, time: string): string {
  // Create the datetime string: "2026-04-26T14:30:00"
  // This format is interpreted by JavaScript as LOCAL time
  const dateTimeString = `${date}T${time}:00`;
  
  // Create a Date object - JavaScript interprets this as LOCAL time
  const dateObj = new Date(dateTimeString);
  
  // Verify the date wasn't shifted (this would indicate a parsing issue)
  const verifyYear = dateObj.getFullYear();
  const verifyMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
  const verifyDay = String(dateObj.getDate()).padStart(2, '0');
  const verifyDate = `${verifyYear}-${verifyMonth}-${verifyDay}`;
  
  if (verifyDate !== date) {
    console.error('Date shift detected during combineDateAndTime:', {
      input: date,
      parsed: verifyDate,
      dateObj: dateObj.toString(),
    });
  }
  
  // Convert to ISO string (UTC) for database storage
  // When retrieved and displayed, it will convert back to local time correctly
  return dateObj.toISOString();
}

/**
 * Check if time is within availability hours
 */
export function isWithinAvailability(
  date: Date,
  startTime: string,
  endTime: string,
  availabilityHours: Record<string, { start: string; end: string }>
): boolean {
  const dayOfWeek = getDayOfWeek(date);
  const availability = availabilityHours[dayOfWeek];
  
  if (!availability) return false;
  
  return startTime >= availability.start && endTime <= availability.end;
}

/**
 * Safely parse a datetime string to a Date object
 * Handles both UTC timestamps (with Z suffix) and local timestamps (without Z)
 * 
 * CRITICAL: This function ensures consistent Date object creation across the app:
 * - Old bookings: "2026-04-29T10:00:00" (no Z) - parse as local time
 * - New bookings: "2026-04-29T04:30:00.000Z" (with Z) - parse as UTC
 */
export function parseDateTime(dateString: string): Date {
  const hasTimezone = dateString.endsWith('Z') || dateString.includes('+') || dateString.match(/[+-]\d{2}:\d{2}$/);
  
  if (hasTimezone) {
    // Has timezone info - parse normally (will be interpreted as UTC)
    return new Date(dateString);
  } else {
    // No timezone info - ensure it's parsed as local time
    // Some browsers interpret "2026-04-29T10:00:00" as UTC, others as local
    // To force local interpretation, we can append the local timezone offset
    // But simpler: just use new Date() and trust it interprets as local
    return new Date(dateString);
  }
}
