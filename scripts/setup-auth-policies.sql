-- Enable Row Level Security on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own bookings
CREATE POLICY "Users can insert own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own bookings
CREATE POLICY "Users can update own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own bookings
CREATE POLICY "Users can delete own bookings" ON bookings
    FOR DELETE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON bookings TO authenticated;
GRANT SELECT ON bookings TO anon;
