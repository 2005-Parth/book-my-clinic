-- Insert some sample bookings for testing
-- Note: Replace the user_id with actual user IDs from your auth.users table

INSERT INTO bookings (user_id, full_name, date, time, notes, status) VALUES
  ('00000000-0000-0000-0000-000000000000', 'John Doe', '2024-01-20', '10:00', 'Regular checkup', 'booked'),
  ('00000000-0000-0000-0000-000000000000', 'Jane Smith', '2024-01-21', '14:30', 'Follow-up appointment', 'booked'),
  ('00000000-0000-0000-0000-000000000000', 'Mike Johnson', '2024-01-19', '09:00', 'Consultation', 'cancelled');

-- Note: This is just sample data. In production, bookings will be created through the app.
