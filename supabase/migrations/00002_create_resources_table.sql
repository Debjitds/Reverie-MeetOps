-- Create resources table
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  location text NOT NULL,
  capacity int NOT NULL CHECK (capacity > 0),
  availability_hours jsonb NOT NULL DEFAULT '{"monday": {"start": "09:00", "end": "18:00"}, "tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}}'::jsonb,
  booking_rules jsonb DEFAULT '{}'::jsonb,
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resources
CREATE POLICY "Anyone can view resources" ON public.resources
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can insert resources" ON public.resources
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resources" ON public.resources
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resources" ON public.resources
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));