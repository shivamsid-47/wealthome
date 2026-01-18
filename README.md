# Wealthome - Modern Real Estate Platform

A full-featured, production-ready real estate website built with Next.js 14, featuring property listings, user authentication, interactive media galleries, advanced search functionality, and modern UI components. The platform provides a comprehensive solution for buying, selling, and renting properties with an exceptional user experience.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sidharthshivam7-6510s-projects/v0-website-redesign)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/tn2JHgzwfAV)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-85%25-F7DF1E?style=for-the-badge&logo=javascript)
![TypeScript](https://img.shields.io/badge/TypeScript-15%25-3178C6?style=for-the-badge&logo=typescript)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages](#pages)
- [Components](#components)
- [Authentication](#authentication)
- [Search Functionality](#search-functionality)
- [Customization](#customization)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Wealthome is a comprehensive real estate platform that allows users to browse, search, and explore properties for buying, selling, or renting. The platform features a modern, responsive design with interactive elements including video tours, image galleries, and a complete authentication system.

**Live Demo:** [https://vercel.com/sidharthshivam7-6510s-projects/v0-website-redesign](https://vercel.com/sidharthshivam7-6510s-projects/v0-website-redesign)

### Key Highlights

- **85% JavaScript / 15% TypeScript** - Optimized for simplicity and maintainability
- **12+ Custom Pages** - Complete user journey from browsing to buying
- **Interactive Search** - Real-time filtering with autocomplete and suggestions
- **Authentication System** - Full login/register with session persistence
- **Media Rich** - Video tours, image galleries, and property photography
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| Property Listings | Browse featured properties with detailed information |
| Advanced Search | Filter by city, neighborhood, price range, bedrooms, property type |
| User Authentication | Complete login/register system with persistent sessions |
| Favorites System | Save and manage favorite properties (requires login) |
| Video Tours | Interactive video player with virtual property tours |
| Image Galleries | Full-screen image galleries with navigation |
| Responsive Design | Optimized for desktop, tablet, and mobile devices |

### Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page with hero, search, featured properties |
| Rent | `/rent` | Rental property listings with filters |
| Buy | `/buy` | Properties for sale with advanced search |
| Sell | `/sell` | Information for sellers with listing form |
| About | `/about` | Company info, team members, mission |
| Explore | `/explore` | Full property catalog with filtering |
| Video Tours | `/video-tours` | Collection of virtual property tours |
| Agents | `/agents` | Real estate agent profiles |

---

## Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| React | 19.x | UI library |
| JavaScript | ES6+ | Primary language (85%) |
| TypeScript | 5.x | Type safety for configs (15%) |
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| Lucide React | Latest | Icon library |
| shadcn/ui | Latest | UI component library |

### Key Dependencies

\`\`\`json
{
  "next": "^14.0.0",
  "react": "^19.0.0",
  "tailwindcss": "^3.4.0",
  "lucide-react": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
\`\`\`

---

## Project Structure

\`\`\`
wealthome/
├── app/                          # Next.js App Router pages
│   ├── page.jsx                  # Home page
│   ├── layout.tsx                # Root layout with AuthProvider
│   ├── loading.jsx               # Global loading component
│   ├── globals.css               # Global styles
│   ├── about/
│   │   └── page.jsx              # About page
│   ├── agents/
│   │   └── page.jsx              # Agents listing
│   ├── buy/
│   │   ├── page.jsx              # Buy properties
│   │   └── loading.jsx
│   ├── rent/
│   │   ├── page.jsx              # Rent properties
│   │   └── loading.jsx
│   ├── sell/
│   │   └── page.jsx              # Sell properties
│   ├── explore/
│   │   ├── page.jsx              # Full catalog
│   │   └── loading.jsx
│   └── video-tours/
│       ├── page.jsx              # Video tours
│       └── loading.jsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── dialog.jsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── auth-modal.jsx            # Authentication modal
│   ├── user-menu.jsx             # User dropdown
│   ├── image-gallery.jsx         # Image gallery
│   ├── video-player.jsx          # Video player
│   ├── social-auth.jsx           # Social auth buttons
│   ├── agent-card.jsx            # Agent profile card
│   └── theme-provider.jsx        # Theme provider
├── lib/
│   ├── auth.jsx                  # Auth context & provider
│   └── utils.js                  # Utility functions
├── hooks/
│   ├── use-toast.js              # Toast notifications
│   └── use-mobile.js             # Mobile detection
├── public/
│   ├── images/                   # All property & user images
│   │   ├── property-[1-4].jpg
│   │   ├── rental-[1-4].jpg
│   │   ├── buy-*.jpg
│   │   ├── team-[1-3].jpg
│   │   ├── customer-[1-3].jpg
│   │   └── ...
│   └── videos/                   # Video tour files
│       ├── house-tour-1.mp4
│       └── house-tour-2.mp4
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
\`\`\`

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/shivamsid-47/wealthome.git
cd wealthome
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Run the development server**

\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## Search Functionality

### Interactive Search Component

Wealthome features a highly interactive, real-time search system that provides an exceptional user experience:

#### Key Interactive Features

| Feature | Description |
|---------|-------------|
| Real-time Result Count | Displays estimated property count that updates dynamically as filters are selected |
| City Autocomplete | Type-ahead search for cities with listing counts displayed |
| Recent Searches | Automatically saves and displays last 5 searches (persisted in localStorage) |
| Trending Searches | Shows popular search terms as clickable badges |
| Active Filter Pills | Visual badges for selected filters with one-click removal |
| Search Type Tabs | Quick toggle between Buy/Rent/Sell with animated states |
| Loading State | Shows spinner with "Finding Properties..." text when searching |
| Dynamic Price Ranges | Automatically switches between rental and sale price ranges |
| Click Outside to Close | Suggestions dropdown closes when clicking elsewhere |

#### Search Button Text
- Default: "Find Your Dream Home"
- Loading: "Finding Properties..."

#### City Selection (with listing counts)
| City | Listings |
|------|----------|
| New York, NY | 534 |
| Los Angeles, CA | 421 |
| San Francisco, CA | 298 |
| Chicago, IL | 276 |
| Miami, FL | 245 |
| Austin, TX | 189 |
| Denver, CO | 167 |
| Seattle, WA | 156 |
| Hawaii | 112 |
| Beverly Hills, CA | 87 |
| Napa Valley, CA | 43 |

#### Neighborhood Types
- Downtown
- Suburbs
- Beachfront
- Countryside
- Waterfront
- Gated Community
- Historic District
- Urban

#### Property Types
- Single Family
- Condo
- Townhouse
- Villa
- Estate

#### Price Ranges (Buy)
- $0 - $300k
- $300k - $500k
- $500k - $750k
- $750k - $1M
- $1M - $2M
- $2M+

#### Price Ranges (Rent)
- $0 - $1,500/mo
- $1,500 - $2,500/mo
- $2,500 - $4,000/mo
- $4,000 - $6,000/mo
- $6,000+/mo

#### Bedrooms
- Any Beds
- 1+ to 5+ bedrooms

### Search Component Usage

\`\`\`jsx
import { InteractiveSearch } from "@/components/interactive-search"

// Default blue accent (Home page)
<InteractiveSearch variant="default" accentColor="blue" />

// Purple accent (Buy page)
<InteractiveSearch variant="default" accentColor="purple" />
\`\`\`

### Search URL Parameters

When searching, the component redirects to `/explore` with query parameters:

\`\`\`
/explore?type=buy&city=miami&neighborhood=beachfront&price=500k-750k&beds=3
\`\`\`

---

## Components

### Authentication Components

#### AuthModal
Modal for login/register with form validation and social auth options.

#### UserMenu
Dropdown menu showing user avatar, profile links, favorites, and logout.

### Media Components

#### ImageGallery
- Fullscreen mode
- Arrow navigation
- Thumbnail strip
- Keyboard support

#### VideoPlayer
- Custom play/pause controls
- Volume control
- Progress bar
- Fullscreen toggle

---

## Authentication

### How It Works

1. `AuthProvider` wraps the app in `layout.tsx`
2. User state stored in React Context
3. Sessions persisted to localStorage
4. Protected features require authentication

### Demo Credentials

\`\`\`
Email: john@example.com
Password: password123
\`\`\`

### User Object

\`\`\`javascript
{
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  avatar: "/images/customer-1.jpg",
  favorites: ["1", "3"],
  notifications: 3
}
\`\`\`

---

## Customization

### Adding Properties

Edit the `properties` array in page files:

\`\`\`javascript
const properties = [
  {
    id: 5,
    title: "New Property",
    price: "$500,000",
    address: "123 Street, City, ST",
    beds: 3,
    baths: 2,
    sqft: 1500,
    image: "/images/new-property.jpg",
    badge: "New",
    featured: true
  }
]
\`\`\`

### Modifying Colors

Update CSS variables in `app/globals.css`:

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
}
\`\`\`

### Adding Cities/Neighborhoods

Edit Select components in page files:

\`\`\`jsx
<SelectItem value="new-city">New City, ST</SelectItem>
\`\`\`

---

## Deployment

### Vercel (Recommended)

This project is automatically deployed via Vercel:

1. Push code to GitHub
2. Vercel auto-deploys from main branch
3. Live at your Vercel URL

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Performance Optimizations

- Next.js Image optimization
- Code splitting with App Router
- Lazy loading for media
- Responsive images
- CSS purging with Tailwind

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Environment Variables

No environment variables are required for basic functionality. All data is currently stored client-side.

For future backend integration, you may need:

\`\`\`env
# Database (optional)
DATABASE_URL=your_database_url

# Authentication (optional)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# API Keys (optional)
GOOGLE_MAPS_API_KEY=your_google_maps_key
\`\`\`

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `useAuth must be used within AuthProvider` | Ensure `layout.tsx` wraps children with `<AuthProvider>` |
| Images not loading | Check that images exist in `/public/images/` directory |
| Search not working | Verify `InteractiveSearch` component is imported correctly |
| Styles not applying | Run `npm run dev` to regenerate Tailwind CSS |

### Development Tips

1. Use `console.log("[v0]...")` for debugging
2. Check browser console for client-side errors
3. Verify all imports use correct file extensions (.jsx vs .tsx)

---

## Roadmap

- [ ] Backend API integration with database
- [ ] Real authentication with NextAuth.js
- [ ] Property listing submission form
- [ ] Map integration with Google Maps
- [ ] Saved searches and alerts
- [ ] Agent messaging system
- [ ] Mortgage calculator
- [ ] Virtual tour 360 views

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment
- [v0.dev](https://v0.dev/) - AI Development

---

## Contact

For questions or support:

- **GitHub Issues:** [Report a bug](https://github.com/shivamsid-47/wealthome/issues)
- **Email:** support@wealthome.com

---

**Built with love by the Wealthome Team**
