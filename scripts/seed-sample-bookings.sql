-- Insert sample bookings (optional - for testing)
-- Note: This will only work if you have actual user IDs from auth.users

-- First, let's create a sample booking for testing
-- You can run this after creating a user account

INSERT INTO bookings (user_id, full_name, date, time, notes, status) VALUES
-- Replace 'your-user-id-here' with actual user ID after creating an account
-- ('your-user-id-here', 'John Doe', '2024-01-20', '10:00', 'Regular checkup', 'booked'),
-- ('your-user-id-here', 'Jane Smith', '2024-01-21', '14:30', 'Follow-up appointment', 'booked');

-- For now, this file serves as a template
-- Uncomment and modify the above lines with real user IDs for testing
SELECT 'Sample bookings template ready - modify with real user IDs' as message;
