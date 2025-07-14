# BookMyClinic - Doctor Appointment Booking System

A modern, mobile-first responsive web application for booking doctor appointments built with Next.js, TailwindCSS, and Supabase.

## Features

- 🏠 **Home Page**: Clean hero section with clinic information
- 🔐 **Authentication**: Phone-based OTP login with Supabase Auth
- 📅 **Booking System**: Interactive calendar with time slot selection
- ✅ **Booking Management**: View, cancel, and track appointments
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🎨 **Modern UI**: Clean design with smooth animations

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (Auth, Database, RLS)
- **UI Components**: Radix UI, Lucide Icons
- **Styling**: TailwindCSS with custom theme

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account and project

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd bookmyclinic
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your Supabase credentials in `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

4. Set up the database:
   - Run the SQL scripts in the `scripts/` folder in your Supabase SQL editor
   - Start with `create-bookings-table.sql`
   - Then run `setup-auth-policies.sql`
   - Optionally run `create-profiles-table.sql` for user profiles

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Bookings Table
\`\`\`sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- full_name (TEXT)
- date (DATE)
- time (TEXT)
- notes (TEXT, Optional)
- status (ENUM: 'booked', 'cancelled')
- created_at (TIMESTAMP)
\`\`\`

### Row Level Security (RLS)
- Users can only view, create, and modify their own bookings
- All database operations are secured with Supabase RLS policies

## Project Structure

\`\`\`
bookmyclinic/
├── app/                    # Next.js App Router pages
│   ├── booking/           # Appointment booking page
│   ├── booking-success/   # Booking confirmation page
│   ├── login/            # Authentication page
│   ├── my-bookings/      # User's bookings management
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utility functions and configurations
│   ├── supabase/        # Supabase client and helper functions
│   └── types.ts         # TypeScript type definitions
├── scripts/             # Database setup scripts
└── middleware.ts        # Next.js middleware for auth
\`\`\`

## Key Features

### Authentication
- Phone number-based login with OTP verification
- Secure session management with Supabase Auth
- Protected routes with middleware

### Booking System
- 7-day calendar view with date selection
- Dynamic time slot loading based on availability
- Real-time slot availability checking
- Appointment confirmation with details

### User Experience
- Mobile-first responsive design
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling

## Deployment

The app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact us at support@bookmyclinic.com or create an issue in the repository.
