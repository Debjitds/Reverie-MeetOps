#!/usr/bin/env node

/**
 * Automated Translation Injection Script
 * 
 * This script systematically adds translation support to MeetOps pages by:
 * 1. Adding useAppTranslation import
 * 2. Adding hook usage
 * 3. Replacing common hardcoded strings with t() calls
 */

const fs = require('fs');
const path = require('path');

// Common string replacements that apply to all pages
const commonReplacements = [
  // Common buttons
  ['>Next<', ">{t('common.next')}<"],
  ['>Back<', ">{t('common.back')}<"],
  ['>Cancel<', ">{t('common.cancel')}<"],
  ['>Save<', ">{t('common.save')}<"],
  ['>Submit<', ">{t('common.submit')}<"],
  ['>Delete<', ">{t('common.delete')}<"],
  ['>Edit<', ">{t('common.edit')}<"],
  ['>Add<', ">{t('common.add')}<"],
  ['>Close<', ">{t('common.close')}<"],
  ['>View<', ">{t('common.view')}<"],
  ['>Search<', ">{t('common.search')}<"],
  ['>Filter<', ">{t('common.filter')}<"],
  ['>Export<', ">{t('common.export')}<"],
  ['>Loading...<', ">{t('common.loading')}<"],
  
  // Common labels
  ['>Actions<', ">{t('common.actions')}<"],
  ['>Status<', ">{t('common.status')}<"],
  ['>Date<', ">{t('common.date')}<"],
  ['>Time<', ">{t('common.time')}<"],
  ['>Name<', ">{t('common.name')}<"],
  ['>Description<', ">{t('common.description')}<"],
  
  // Status values
  ['>Pending<', ">{t('bookings.pending')}<"],
  ['>Approved<', ">{t('bookings.approved')}<"],
  ['>Rejected<', ">{t('bookings.rejected')}<"],
  ['>Cancelled<', ">{t('bookings.cancelled')}<"],
  ['>Completed<', ">{t('bookings.completed')}<"],
  
  // Common phrases
  ['placeholder="Search', "placeholder={t('common.search"],
  ['"Loading..."', "t('common.loading')"],
  ['"No data available"', "t('common.noData')"],
  ['"No results found"', "t('common.noResults')"],
];

function addTranslationSupport(filePath, pageSpecificReplacements = []) {
  console.log(`\nProcessing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Step 1: Add import if not present
  if (!content.includes("import { useAppTranslation }")) {
    content = content.replace(
      "import { useAuth } from '@/contexts/AuthContext';",
      "import { useAuth } from '@/contexts/AuthContext';\nimport { useAppTranslation } from '@/hooks/useAppTranslation';"
    );
    console.log('  ✓ Added useAppTranslation import');
  }
  
  // Step 2: Add hook usage if not present
  if (!content.includes("const { t") && content.includes("const { profile } = useAuth();")) {
    content = content.replace(
      "const { profile } = useAuth();",
      "const { profile } = useAuth();\n  const { t } = useAppTranslation();"
    );
    console.log('  ✓ Added useAppTranslation hook');
  }
  
  // Step 3: Apply common replacements
  let replacementCount = 0;
  for (const [oldStr, newStr] of commonReplacements) {
    const before = content;
    content = content.replace(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
    if (content !== before) replacementCount++;
  }
  console.log(`  ✓ Applied ${replacementCount} common replacements`);
  
  // Step 4: Apply page-specific replacements
  let pageReplacementCount = 0;
  for (const [oldStr, newStr] of pageSpecificReplacements) {
    const before = content;
    content = content.replace(new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
    if (content !== before) pageReplacementCount++;
  }
  if (pageReplacementCount > 0) {
    console.log(`  ✓ Applied ${pageReplacementCount} page-specific replacements`);
  }
  
  // Write back
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ File updated successfully`);
}

// Page-specific replacements
const calendarPageReplacements = [
  ['>Calendar<', ">{t('calendar.title')}<"],
  ['>View all resource bookings<', ">{t('calendar.subtitle')}<"],
  ['>Month<', ">{t('calendar.month')}<"],
  ['>Week<', ">{t('calendar.week')}<"],
  ['>Day<', ">{t('calendar.day')}<"],
  ['>Today<', ">{t('calendar.today')}<"],
  ['>Legend<', ">{t('calendar.legend')}<"],
  ['>Room:<', ">{t('calendar.room')}:<"],
  ['>Time:<', ">{t('calendar.time')}:<"],
  ['>Booked By:<', ">{t('calendar.bookedBy')}:<"],
  ['>No bookings for this period<', ">{t('calendar.noEvents')}<"],
];

const resourcesPageReplacements = [
  ['>Resources<', ">{t('resources.title')}<"],
  ['>Add Resource<', ">{t('resources.addResource')}<"],
  ['>Location<', ">{t('resources.location')}<"],
  ['>Capacity<', ">{t('resources.capacity')}<"],
  ['>Add New Resource<', ">{t('resources.addTitle')}<"],
  ['>Edit Resource<', ">{t('resources.editTitle')}<"],
  ['placeholder="Enter resource name"', "placeholder={t('resources.namePlaceholder')}"],
  ['placeholder="Enter location"', "placeholder={t('resources.locationPlaceholder')}"],
  ['placeholder="Enter capacity"', "placeholder={t('resources.capacityPlaceholder')}"],
  ['placeholder="Enter description"', "placeholder={t('resources.descriptionPlaceholder')}"],
  ['>No resources found<', ">{t('resources.noResources')}<"],
];

const usersPageReplacements = [
  ['>Users<', ">{t('users.title')}<"],
  ['>Email<', ">{t('users.email')}<"],
  ['>Role<', ">{t('users.role')}<"],
  ['>Joined<', ">{t('users.joined')}<"],
  ['>Change Role<', ">{t('users.changeRole')}<"],
  ['>Admin<', ">{t('users.admin')}<"],
  ['>Manager<', ">{t('users.manager')}<"],
  ['>User<', ">{t('users.user')}<"],
  ['placeholder="Search users..."', "placeholder={t('users.searchPlaceholder')}"],
  ['>No users found<', ">{t('users.noUsers')}<"],
];

// Process each page
const pagesDir = '/workspace/app-b5rmjd5bhh4x/src/pages';

console.log('=== MeetOps Translation Injection ===\n');

addTranslationSupport(path.join(pagesDir, 'CalendarPage.tsx'), calendarPageReplacements);
addTranslationSupport(path.join(pagesDir, 'ResourcesPage.tsx'), resourcesPageReplacements);
addTranslationSupport(path.join(pagesDir, 'UsersPage.tsx'), usersPageReplacements);

console.log('\n=== Translation injection complete ===');
console.log('\nNext steps:');
console.log('1. Run: cd /workspace/app-b5rmjd5bhh4x && npm run lint');
console.log('2. Fix any compilation errors');
console.log('3. Test language switching on each page');
