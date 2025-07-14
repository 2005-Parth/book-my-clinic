-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'booked' CHECK (status IN ('booked', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
