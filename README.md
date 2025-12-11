# Digital E-Gram Panchayat 🏛️
hosted link:https://village-servify.lovable.app
A modern digital governance platform empowering rural India through seamless access to government services, schemes, and certificates. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### 🔐 Multi-Role Authentication System
- **Citizens**: Apply for services, track applications, manage profile
- **Staff**: Review and process applications, manage workflows  
- **Admin**: Full system management, service configuration, user oversight

### 📋 Government Services & Schemes
- **Civil Registration**: Birth/Death certificates
- **Income & Caste Certificates**: Essential documentation
- **Agriculture Schemes**: PM Kisan Samman Nidhi registration
- **Housing Programs**: PMAY-G applications
- **Social Welfare**: Widow pension, old age pension schemes

### 💻 Modern User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Tracking**: Live application status updates
- **Secure Authentication**: Protected routes and role-based access
- **Interactive Dashboard**: Personalized user experience
- **Document Management**: Upload and manage required documents

### 🎨 UI/UX Excellence
- Built with **shadcn/ui** components
- **Tailwind CSS** for modern styling
- **Lucide React** icons for consistent iconography
- **Dark/Light mode** support with next-themes
- **Toast notifications** for user feedback
- **Form validation** with React Hook Form and Zod

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Gram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (ServiceCard, ProtectedRoute)
│   ├── layout/         # Layout components (Header, Footer, Navigation)
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts (AuthContext)
├── data/              # Mock data and constants
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Route components
│   ├── admin/         # Admin dashboard and management
│   ├── staff/         # Staff workflow pages
│   └── user/          # User dashboard and applications
└── types/             # TypeScript type definitions
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **shadcn/ui** - High-quality, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind Animate** - Animation utilities
- **Lucide React** - Beautiful, customizable icons

### State Management & Data
- **TanStack Query** - Server state management and caching
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Routing & Navigation
- **React Router DOM** - Declarative routing for React

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

## 🎯 Key Features Breakdown

### Authentication & Authorization
- Role-based access control (User, Staff, Admin)
- Protected routes with automatic redirects
- Persistent login sessions
- Secure logout functionality

### Service Management
- Comprehensive service catalog
- Category-based filtering
- Detailed service information
- Eligibility criteria and required documents

### Application Workflow
- Multi-step application forms
- Document upload capabilities
- Real-time status tracking
- Application history and management

### Admin Dashboard
- Service creation and management
- User role management
- Application oversight and processing
- System analytics and reporting

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Accessible design patterns

## 🔧 Configuration

### Environment Setup
The project uses Vite's built-in environment variable handling. Create a `.env` file for local configuration:

```env
# Add your environment variables here
VITE_API_URL=your_api_endpoint
```

### Customization
- **Theme**: Modify `tailwind.config.ts` for custom colors and styling
- **Components**: Extend shadcn/ui components in `src/components/ui/`
- **Routes**: Add new routes in `src/App.tsx`
- **Services**: Update mock data in `src/data/mockData.ts`

## 📱 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Digital India initiative for rural governance modernization.

## 🆘 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Refer to the documentation

---

**Digital E-Gram Panchayat** - Empowering Rural India Through Technology 🇮🇳
