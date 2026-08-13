-- Add booking type enum
CREATE TYPE booking_type AS ENUM ('single', 'multi_day');

-- Add columns to bookings table
ALTER TABLE bookings
ADD COLUMN booking_type booking_type NOT NULL DEFAULT 'single',
ADD COLUMN booking_group_id uuid;

-- Create index for efficient querying of booking groups
CREATE INDEX idx_bookings_group_id ON bookings(booking_group_id) WHERE booking_group_id IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN bookings.booking_group_id IS 'Links related bookings in a multi-day booking. All bookings with same group_id are part of the same multi-day reservation';
COMMENT ON COLUMN bookings.booking_type IS 'Type of booking: single for single-day bookings, multi_day for bookings that are part of a multi-day reservation';