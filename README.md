# No Manner of -ites - E-Commerce Store

An online clothing retail website for the "No Manner of -ites" brand. Built with React, Vite, Tailwind CSS, and Firebase.

**Brand Message:** United, not divided. Clothing that reminds us we're all part of one human family.

## Features

### Storefront
- **Homepage** with hero section, featured products, and brand story
- **Shop Page** with category filtering, search, and sorting
- **Product Detail Pages** with image gallery, size/color selection
- **Search** with real-time results
- **Shopping Cart** with persistent storage (localStorage)
- **Checkout Flow** with multi-step form

### Admin Panel (`/admin`)
- **Dashboard** with stats and low stock alerts
- **Product Management** - Add, edit, delete products
- **Inventory Management** - Bulk quantity updates
- **Order Management** - View and update order status

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project
cd ~/Desktop/no-ites-store

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Firebase Setup (Optional)

For production, set up Firebase:

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore, Authentication, and Storage
3. Copy your config to `.env.local`:

```env
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Update `src/services/products.js` and set `USE_SAMPLE_DATA = false`

## Project Structure

```
no-ites-store/
├── src/
│   ├── components/
│   │   ├── admin/         # Admin panel components
│   │   ├── cart/          # Shopping cart components
│   │   ├── layout/        # Header, Footer
│   │   ├── products/      # Product cards, grid, filters
│   │   ├── search/        # Search bar component
│   │   └── ui/            # Reusable UI components
│   ├── context/           # React Context providers
│   ├── data/              # Sample product data
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   └── admin/         # Admin pages
│   ├── services/          # Firebase and API services
│   └── utils/             # Utility functions
├── public/
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Firebase** - Backend (Firestore, Auth, Storage)
- **Headless UI** - Accessible UI components
- **Heroicons** - Icons

## Admin Access

For demo purposes, click "Demo Admin Login" on `/admin/login` to access the admin panel without Firebase authentication.

## Product Categories

- Hoodies
- Pull Overs
- T-Shirts
- Hats

## Brand Variations

The store features clothing with these brand messages:
- "no manner of -ites"
- "no -ites"
- "un-ITEd"

## License

Private - All rights reserved
