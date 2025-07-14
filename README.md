# BookMyClinic - Doctor Appointment Booking App

A modern, mobile-first doctor appointment booking application built with Next.js, Supabase, and TailwindCSS.

## 🚀 Features

- **Phone-based Authentication**: Secure OTP login via SMS
- **Real-time Booking**: Live availability checking and instant confirmations
- **Mobile-First Design**: Optimized for mobile devices with responsive design
- **User Dashboard**: Manage appointments, view history, and cancel bookings
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Secure Database**: Row-level security with Supabase

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📱 Pages

1. **Home Page** (`/`) - Landing page with app overview
2. **Login Page** (`/login`) - Phone-based OTP authentication
3. **Booking Page** (`/booking`) - Select date, time, and book appointments
4. **Booking Success** (`/booking-success`) - Confirmation page
5. **My Bookings** (`/my-bookings`) - View and manage appointments

## 🗄️ Database Schema

### Bookings Table
\`\`\`sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- full_name (TEXT)
- date (DATE)
- time (TIME)
- notes (TEXT, Optional)
- status (TEXT: 'booked', 'cancelled', 'completed')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

### Profiles Table
\`\`\`sql
- id (UUID, Primary Key, Foreign Key to auth.users)
- full_name (TEXT)
- phone (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd book-my-clinic
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Since this project uses Vercel/v0's integrated Supabase, the environment variables will be automatically configured when deployed. For local development, they'll be provided through the integration.

4. **Set up the database**
   
   Run the SQL scripts in your Supabase dashboard (SQL Editor) in this order:
   \`\`\`bash
   1. scripts/create-bookings-table.sql
   2. scripts/setup-auth-policies.sql
   3. scripts/create-profiles-table.sql
   4. scripts/seed-sample-bookings.sql (optional)
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📋 Usage

### For Patients:
1. **Sign Up/Login**: Use your phone number to receive an OTP
2. **Book Appointment**: Select date, time, and provide details
3. **Manage Bookings**: View upcoming/past appointments and cancel if needed

### Authentication Flow:
1. Enter phone number
2. Receive SMS with 6-digit OTP
3. Verify OTP to access the app
4. Automatic profile creation on first login

### Booking Flow:
1. Select available date (next 7 days)
2. Choose from available time slots
3. Enter patient details and notes
4. Confirm appointment
5. Receive confirmation

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Phone Authentication**: Secure OTP-based login
- **Input Validation**: Client and server-side validation
- **CSRF Protection**: Built-in Next.js security features

## 🎨 Design System

- **Colors**: Pastel blue (#3B82F6) and white theme
- **Typography**: Inter/Manrope fonts
- **Components**: shadcn/ui component library
- **Animations**: Smooth transitions and hover effects
- **Mobile-First**: Responsive design optimized for mobile

## 📱 Mobile Features

- Touch-friendly buttons and inputs
- Swipe gestures for date selection
- Optimized keyboard inputs
- Fast loading and smooth animations
- Offline-ready design patterns

## 🚀 Deployment

This app is designed to be deployed on Vercel with integrated Supabase:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Environment variables are auto-configured**
4. **Database setup is handled through integration**

## 🔧 Configuration

### Supabase Setup (Handled by Integration)
- Authentication providers (Phone/SMS)
- Database tables and policies
- Real-time subscriptions
- Row-level security

### App Configuration
- Time slots: 9 AM - 6 PM (30-minute intervals)
- Booking window: Next 7 days
- Doctor: Dr. Smith (hardcoded for demo)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Test in the preview environment

## 🔮 Future Enhancements

- Multiple doctor support
- Email notifications
- Payment integration
- Admin dashboard
- Appointment reminders
- Multi-clinic support
- Video consultation booking
