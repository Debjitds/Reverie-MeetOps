# Neo-Brutalist Design System Implementation Guide

## Overview
This document provides a complete guide for implementing the retro neo-brutalist design system across the entire MeetOps application.

## Design System Specifications

### Color Palette
```css
/* Checkerboard Background */
--checker-light: #FFF8E7 (soft cream)
--checker-dark: #FFEAA7 (warm yellow-beige)

/* Primary Colors */
--primary: #FFD93D (golden amber yellow)
--primary-foreground: #000000 (black)

/* Secondary Colors */
--secondary: #FFFFFF (white)
--secondary-foreground: #000000 (black)

/* Accent */
--accent: #FFF4D6 (light warm cream)
--accent-foreground: #000000 (black)

/* Borders */
--border: #000000 (pure black, 3px thick)

/* Inputs */
--input-bg: #FFF4D6 (warm cream)
```

### Typography
- **Font Family**: 'Space Grotesk' (bold 700) for headings, 'Space Mono' for body
- **All Headings**: UPPERCASE, bold (700 weight)
- **All Labels**: UPPERCASE, bold
- **All Buttons**: UPPERCASE, bold
- **Body Text**: Mixed case, bold weight

### Shadows
- **Hard Shadow**: `box-shadow: 5px 5px 0px 0px #000000`
- **Small Hard Shadow**: `box-shadow: 3px 3px 0px 0px #000000`
- **Large Hard Shadow**: `box-shadow: 8px 8px 0px 0px #000000`
- **NO soft shadows, NO blur, NO gradients**

### Borders
- **All Borders**: 3px solid black
- **NO border-radius anywhere** - all corners sharp and square
- **Table cells**: 1px solid black
- **Active states**: Thick left or top border (4px)

### Buttons
**Primary Button**:
```css
background: #FFD93D (golden yellow)
color: #000000 (black)
border: 3px solid #000000
box-shadow: 5px 5px 0px 0px #000000
text-transform: uppercase
font-weight: 700
border-radius: 0
```

**Hover State**:
```css
transform: translate(2px, 2px)
box-shadow: 3px 3px 0px 0px #000000
```

**Secondary/Outline Button**:
```css
background: #FFFFFF (white)
color: #000000 (black)
border: 3px solid #000000
box-shadow: 5px 5px 0px 0px #000000
text-transform: uppercase
font-weight: 700
border-radius: 0
```

### Input Fields
```css
background: #FFF4D6 (warm cream)
border: 3px solid #000000
color: #000000
border-radius: 0
padding: 12px
font-weight: 700
```

**Focus State**:
```css
outline: 3px solid #000000
outline-offset: 2px
```

### Cards and Panels
```css
background: #FFFFFF (white)
border: 3px solid #000000
box-shadow: 5px 5px 0px 0px #000000
border-radius: 0
padding: 24px
```

### Status Badges
**Approved**:
```css
background: #FFD93D (yellow)
color: #000000
border: 3px solid #000000
text-transform: uppercase
border-radius: 0
```

**Pending**:
```css
background: #FFFFFF (white)
color: #000000
border: 3px solid #000000
text-transform: uppercase
border-radius: 0
```

**Rejected**:
```css
background: #FFFFFF (white)
color: #000000
border: 3px dashed #000000
text-transform: uppercase
border-radius: 0
```

**Cancelled**:
```css
background: #E5E5E5 (light gray)
color: #000000
border: 3px solid #000000
text-transform: uppercase
border-radius: 0
```

### Tables
**Container**:
```css
background: #FFFFFF
border: 3px solid #000000
box-shadow: 5px 5px 0px 0px #000000
border-radius: 0
```

**Header Row**:
```css
background: #FFD93D (yellow)
color: #000000
border-bottom: 3px solid #000000
text-transform: uppercase
font-weight: 700
padding: 16px
```

**Body Rows**:
```css
/* Zebra striping */
even rows: background #FFFFFF
odd rows: background #FFF8E7 (light cream)
border-bottom: 1px solid #000000
```

**Hover State**:
```css
background: #FFEAA7 (light yellow)
```

### Navigation Sidebar
**Container**:
```css
background: #FFFFFF
border-right: 3px solid #000000
width: 240px
```

**Logo**:
```css
text-transform: uppercase
font-weight: 700
font-size: 24px
padding: 24px
border-bottom: 3px solid #000000
```

**Nav Items**:
```css
text-transform: uppercase
font-weight: 700
padding: 12px 24px
color: #000000
```

**Active Nav Item**:
```css
background: #FFD93D (yellow)
border-left: 4px solid #000000
color: #000000
```

**Hover State**:
```css
background: #FFF8E7 (light cream)
```

**User Info Section**:
```css
border-top: 3px solid #000000
padding: 16px
```

## Component-by-Component Implementation

### 1. Button Component (`/src/components/ui/button.tsx`)

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 border-3 border-black hard-shadow btn-press",
  {
    variants: {
      variant: {
        default: "bg-primary text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#000000]",
        outline: "bg-white text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#000000]",
        secondary: "bg-white text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#000000]",
        ghost: "border-0 shadow-none hover:bg-accent",
        destructive: "bg-destructive text-white hover:translate-x-[2px] hover:translate-y-[2px]",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 2. Input Component (`/src/components/ui/input.tsx`)

```typescript
<input
  className={cn(
    "flex h-12 w-full border-3 border-black bg-input px-4 py-3 text-sm font-bold text-black placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  ref={ref}
  {...props}
/>
```

### 3. Card Component (`/src/components/ui/card.tsx`)

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-card text-card-foreground border-3 border-black hard-shadow p-6", className)}
      {...props}
    />
  )
)
```

### 4. Badge Component (`/src/components/ui/badge.tsx`)

```typescript
const badgeVariants = cva(
  "inline-flex items-center border-3 border-black px-3 py-1 text-xs font-bold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-black",
        secondary: "bg-white text-black",
        outline: "bg-white text-black",
        destructive: "bg-white text-black border-dashed",
        muted: "bg-muted text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

### 5. Label Component (`/src/components/ui/label.tsx`)

```typescript
<label
  className={cn(
    "text-sm font-bold uppercase tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  {...props}
/>
```

## Page-by-Page Implementation

### Landing Page (`/src/pages/LandingPage.tsx`)

**Changes Needed**:
1. Remove all AI-generated images
2. Replace with simple SVG icons (use lucide-react icons)
3. Update hero headline to uppercase
4. Apply hard shadows to all cards
5. Update buttons to neo-brutalist style
6. Ensure checkerboard background is visible
7. Update navbar with thick bottom border
8. Update footer with thick top border

**Hero Section**:
```tsx
<h1 className="text-6xl font-bold uppercase leading-tight">
  BOOK ROOMS.<br/>
  ELIMINATE CONFLICTS.<br/>
  RUN SMOOTHER.
</h1>
```

**Feature Cards**:
```tsx
<div className="bg-white border-3 border-black hard-shadow p-8 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#000000] transition-all">
  <Calendar className="w-16 h-16 mb-4" />
  <h3 className="text-xl font-bold uppercase mb-3">INSTANT ROOM BOOKING</h3>
  <p className="text-sm">Book any room or resource in seconds...</p>
</div>
```

### Login Page (`/src/pages/LoginPage.tsx`)

**Changes Needed**:
1. Center white card on checkerboard background
2. Update all inputs to cream background
3. Update labels to uppercase
4. Update submit button to golden yellow
5. Add "BACK TO HOME" link above card
6. Apply hard shadow to card

**Structure**:
```tsx
<div className="min-h-screen flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <Link to="/" className="block text-center mb-4 text-sm font-bold uppercase">
      ← BACK TO HOME
    </Link>
    <Card className="border-3 border-black hard-shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold uppercase">LOGIN</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="username">USERNAME</Label>
            <Input id="username" className="bg-input" />
          </div>
          <Button type="submit" className="w-full">LOGIN</Button>
        </form>
      </CardContent>
    </Card>
  </div>
</div>
```

### Register Page (`/src/pages/RegisterPage.tsx`)

**Same treatment as Login Page**

### Dashboard Page (`/src/pages/DashboardPage.tsx`)

**Changes Needed**:
1. Update stat cards with hard shadows
2. Apply thick borders to all cards
3. Update labels to uppercase
4. Ensure white cards on checkerboard background
5. Update chart colors to match design system

**Stat Card**:
```tsx
<Card className="border-3 border-black hard-shadow">
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-bold uppercase">TOTAL BOOKINGS</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-4xl font-bold">{stats.total}</div>
  </CardContent>
</Card>
```

### Bookings Page (`/src/pages/BookingsPage.tsx`)

**Changes Needed**:
1. Update table with thick outer border
2. Yellow header row with uppercase text
3. Zebra striping (white/cream alternating)
4. Update status badges to neo-brutalist
5. Apply hard shadow to table container
6. Update "+ NEW BOOKING" button to golden yellow

**Table Structure**:
```tsx
<div className="bg-white border-3 border-black hard-shadow">
  <Table>
    <TableHeader>
      <TableRow className="bg-primary border-b-3 border-black">
        <TableHead className="font-bold uppercase text-black">RESOURCE</TableHead>
        <TableHead className="font-bold uppercase text-black">USER</TableHead>
        <TableHead className="font-bold uppercase text-black">STATUS</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {bookings.map((booking, index) => (
        <TableRow 
          key={booking.id}
          className={cn(
            "border-b border-black",
            index % 2 === 0 ? "bg-white" : "bg-[#FFF8E7]"
          )}
        >
          <TableCell className="font-bold">{booking.resource?.name}</TableCell>
          <TableCell>{booking.user?.name}</TableCell>
          <TableCell>
            <Badge variant={getStatusVariant(booking.status)}>
              {booking.status}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
```

### Calendar Page (`/src/pages/CalendarPage.tsx`)

**Bug Fix**:
The "undefined" issue is caused by missing user data in the booking query. Update the query to include user information:

```typescript
const { data: bookings } = await supabase
  .from('bookings')
  .select(`
    *,
    resource:resources(name, location),
    user:profiles!bookings_user_id_fkey(name, email)
  `)
  .in('status', ['approved', 'pending']);
```

**Styling Changes**:
1. Calendar container with hard shadow
2. Yellow header row
3. Thick black borders
4. Today highlighted in yellow
5. Events styled as small rectangles with borders

### Resources Page (`/src/pages/ResourcesPage.tsx`)

**Changes Needed**:
1. Table with neo-brutalist styling
2. Yellow header row
3. Thick borders
4. Hard shadow on container
5. Square action buttons with borders
6. Uppercase headings

### Users Page (`/src/pages/UsersPage.tsx`)

**Changes Needed**:
1. Table styling same as Resources
2. Role badges:
   - Admin: yellow background
   - Manager: white with border
   - User: white with border
3. Uppercase labels

### AppLayout and Sidebar (`/src/components/layouts/AppLayout.tsx`)

**Changes Needed**:
1. White sidebar with thick right border (3px)
2. MeetOps logo in uppercase
3. Navigation items in uppercase
4. Active item: yellow background + thick left border
5. Hover: light cream background
6. User info section with thick top border separator

**Sidebar Structure**:
```tsx
<aside className="w-60 bg-white border-r-3 border-black">
  <div className="p-6 border-b-3 border-black">
    <h1 className="text-2xl font-bold uppercase">MEETOPS</h1>
  </div>
  <nav className="p-4">
    {navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "block px-4 py-3 font-bold uppercase text-sm transition-colors",
          isActive(item.path)
            ? "bg-primary border-l-4 border-black"
            : "hover:bg-[#FFF8E7]"
        )}
      >
        {item.name}
      </Link>
    ))}
  </nav>
  <div className="absolute bottom-0 left-0 right-0 p-4 border-t-3 border-black bg-white">
    <div className="font-bold uppercase text-xs">{user?.name}</div>
    <div className="text-xs">{user?.email}</div>
  </div>
</aside>
```

### New Booking Page (`/src/pages/NewBookingPage.tsx`)

**Changes Needed**:
1. Step indicator cards with hard shadows
2. Form cards with thick borders
3. Cream input backgrounds
4. Golden yellow buttons
5. Uppercase labels
6. Calendar widget with neo-brutalist styling

### Booking Detail Page (`/src/pages/BookingDetailPage.tsx`)

**Changes Needed**:
1. White card with hard shadow
2. Status badge neo-brutalist
3. Action buttons golden yellow
4. Uppercase labels
5. Thick borders on all sections

## Implementation Priority

### Phase 1: Core Components (Critical)
1. ✅ Global CSS (index.css) - COMPLETED
2. Button component
3. Input component
4. Card component
5. Badge component
6. Label component

### Phase 2: Layout Components
7. AppLayout and Sidebar
8. Navigation components

### Phase 3: Pages (High Traffic)
9. Landing Page
10. Login Page
11. Register Page
12. Dashboard Page

### Phase 4: Application Pages
13. Bookings Page
14. Calendar Page (+ bug fix)
15. New Booking Page
16. Booking Detail Page

### Phase 5: Admin Pages
17. Resources Page
18. Users Page

### Phase 6: Testing and Polish
19. Run lint
20. Test all pages
21. Fix any issues
22. Verify consistency

## Testing Checklist

After implementation, verify:
- [ ] Checkerboard background visible on all pages
- [ ] All cards have thick black borders and hard shadows
- [ ] No rounded corners anywhere
- [ ] All buttons are golden yellow (primary) or white (secondary)
- [ ] All headings and labels are uppercase
- [ ] All inputs have cream background
- [ ] Tables have yellow headers and zebra striping
- [ ] Status badges follow the color scheme
- [ ] Calendar shows user names (not undefined)
- [ ] Sidebar has active state styling
- [ ] All hover states work correctly
- [ ] Design is consistent across all pages

## Common Patterns

### Hard Shadow Utility
```css
.hard-shadow {
  box-shadow: 5px 5px 0px 0px #000000;
}
```

### Button Press Effect
```css
.btn-press:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0px 0px #000000;
}
```

### Uppercase Bold
```css
.uppercase-bold {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}
```

### Thick Border
```css
.border-3 {
  border-width: 3px;
}
```

## Notes

- **NO gradients** - only solid colors
- **NO soft shadows** - only hard offset shadows
- **NO border-radius** - all corners sharp
- **NO thin fonts** - always bold (700 weight)
- **Checkerboard must be visible** - white cards on top
- **Consistency is key** - same treatment everywhere

## Maintenance

When adding new components or pages:
1. Always use the design system colors
2. Apply hard shadows to cards and buttons
3. Use thick black borders (3px)
4. Make all text uppercase for labels/headings
5. Use golden yellow for primary actions
6. Ensure checkerboard background is visible
7. Test on multiple screen sizes
