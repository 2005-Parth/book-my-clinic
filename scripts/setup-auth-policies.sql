-- Enable RLS on auth.users if not already enabled
-- Note: This might already be enabled by Supabase

-- Create a function to check if user is authenticated
CREATE OR REPLACE FUNCTION auth.user_id() RETURNS UUID AS $$
  SELECT auth.uid();
$$ LANGUAGE SQL STABLE;

-- Update bookings table policies to be more specific
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can delete their own bookings" ON bookings;

-- Create more specific policies
CREATE POLICY "Enable read access for users based on user_id" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users only" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Optional: Allow users to soft delete (cancel) their bookings
CREATE POLICY "Enable delete for users based on user_id" ON bookings
  FOR DELETE USING (auth.uid() = user_id);
