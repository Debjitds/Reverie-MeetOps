import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Booking } from '@/types/types';
import { formatDateTime, formatDateOnly } from './booking-utils';

interface ExportFilters {
  dateRange?: { start: string; end: string };
  resources?: string[];
  statuses?: string[];
}

/**
 * Generate PDF export of booking history
 * Applies De Stijl design principles with primary colors and geometric layout
 */
export function exportBookingsToPDF(
  bookings: Booking[],
  filters: ExportFilters,
  userName: string
): void {
  // Create new PDF document
  const doc = new jsPDF();
  
  // De Stijl color scheme
  const primaryBlue: [number, number, number] = [0, 56, 168]; // #0038A8
  const primaryRed: [number, number, number] = [238, 51, 78]; // #EE334E
  const primaryYellow: [number, number, number] = [255, 205, 0]; // #FFCD00
  const black: [number, number, number] = [0, 0, 0];
  const white: [number, number, number] = [255, 255, 255];
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Header with geometric design
  doc.setFillColor(...primaryBlue);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  // Add accent rectangles (De Stijl style)
  doc.setFillColor(...primaryRed);
  doc.rect(0, 0, 8, 30, 'F');
  
  doc.setFillColor(...primaryYellow);
  doc.rect(pageWidth - 8, 0, 8, 30, 'F');
  
  // Title
  doc.setTextColor(...white);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('MeetOps Booking History', 15, 20);
  
  // Export info
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const exportDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.text(`Exported by: ${userName}`, 15, 26);
  doc.text(`Export Date: ${exportDate}`, pageWidth - 15, 26, { align: 'right' });
  
  // Filters section
  let yPos = 40;
  doc.setTextColor(...black);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Applied Filters:', 15, yPos);
  
  yPos += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  if (filters.dateRange) {
    doc.text(
      `Date Range: ${formatDateOnly(filters.dateRange.start)} - ${formatDateOnly(filters.dateRange.end)}`,
      15,
      yPos
    );
    yPos += 5;
  }
  
  if (filters.resources && filters.resources.length > 0) {
    doc.text(`Resources: ${filters.resources.join(', ')}`, 15, yPos);
    yPos += 5;
  }
  
  if (filters.statuses && filters.statuses.length > 0) {
    doc.text(`Status: ${filters.statuses.join(', ')}`, 15, yPos);
    yPos += 5;
  }
  
  yPos += 5;
  
  // Prepare table data
  const tableData = bookings.map((booking) => {
    const isMultiDay = booking.booking_type === 'multi_day';
    const dateDisplay = isMultiDay
      ? `${formatDateOnly(booking.start_time)} - ${formatDateOnly(booking.end_time)}`
      : formatDateOnly(booking.start_time);
    
    return [
      booking.resource?.name || 'N/A',
      booking.user?.name || 'N/A',
      dateDisplay,
      formatDateTime(booking.start_time).split(', ')[1] || '', // Time only
      formatDateTime(booking.end_time).split(', ')[1] || '', // Time only
      booking.purpose,
      booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
      isMultiDay ? 'Multi-Day' : 'Single',
    ];
  });
  
  // Generate table with De Stijl styling
  autoTable(doc, {
    startY: yPos,
    head: [['Resource', 'User', 'Date', 'Start', 'End', 'Purpose', 'Status', 'Type']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryBlue,
      textColor: white,
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'left',
      lineWidth: 0.5,
      lineColor: black,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: black,
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 25 }, // Resource
      1: { cellWidth: 25 }, // User
      2: { cellWidth: 30 }, // Date
      3: { cellWidth: 18 }, // Start
      4: { cellWidth: 18 }, // End
      5: { cellWidth: 35 }, // Purpose
      6: { cellWidth: 20 }, // Status
      7: { cellWidth: 20 }, // Type
    },
    margin: { left: 15, right: 15 },
    didDrawPage: (data) => {
      // Footer with page numbers
      const pageCount = (doc as any).internal.getNumberOfPages();
      const currentPage = (doc as any).internal.getCurrentPageInfo().pageNumber;
      
      doc.setFontSize(8);
      doc.setTextColor(...black);
      doc.text(
        `Page ${currentPage} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      
      // Footer accent line
      doc.setDrawColor(...primaryRed);
      doc.setLineWidth(2);
      doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
    },
  });
  
  // Add summary at the end
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Bookings: ${bookings.length}`, 15, finalY);
  
  // Save the PDF
  const fileName = `BookingHistory_${new Date().toISOString().split('T')[0].replace(/-/g, '')}_${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}.pdf`;
  doc.save(fileName);
}
