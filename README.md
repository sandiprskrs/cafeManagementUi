# Cafe Management System

A complete, production-ready cafe management web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Point of Sale (POS)**: Complete order management with table selection, menu browsing, and cart functionality
- **Kitchen Display**: Real-time order tracking with kanban-style workflow (Queued → In Progress → Ready → Served)
- **Menu Management**: Full CRUD operations for menu items with categories, pricing, and availability control
- **Inventory Management**: Stock tracking with low-stock alerts and manual adjustments
- **Staff Management**: Employee management with roles, shifts, and status tracking
- **Analytics & Reports**: Business insights with KPIs, top-selling items, and category sales
- **Settings**: Configurable business information, pricing, and theme preferences

### 🎨 Design & UX
- **Modern UI**: Clean, professional interface with Inter font and smooth animations
- **Dark Mode**: Full light/dark theme support with system preference detection
- **Responsive**: Mobile, tablet, and desktop optimized layouts
- **Glassmorphism**: Modern visual effects and gradient backgrounds
- **Accessible**: Built with accessibility best practices

### 🔐 Authentication
- Role-based access control (Manager, Cashier, Staff)
- Session persistence
- Demo credentials for testing

## Demo Credentials

### Manager Account
- **Email**: manager@cafe.com
- **Password**: manager123
- **Access**: Full access to all features

### Cashier Account
- **Email**: cashier@cafe.com
- **Password**: cashier123
- **Access**: Orders, POS, Kitchen, Menu (view only)

### Staff Account
- **Email**: staff@cafe.com
- **Password**: staff123
- **Access**: Kitchen, Orders (limited)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Layer**: In-memory mock data (easily replaceable with real API)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
\`\`\`bash
cd cafe_management_app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
cafe_management_app/
├── app/                          # Next.js app directory
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.tsx            # Main dashboard
│   │   ├── orders/             # POS system
│   │   ├── kitchen/            # Kitchen display
│   │   ├── menu/               # Menu management
│   │   ├── inventory/          # Inventory tracking
│   │   ├── staff/              # Staff management
│   │   ├── reports/            # Analytics
│   │   └── settings/           # Settings
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Login page
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── ui/                     # Base UI components
│   └── shared/                 # Shared components
├── contexts/                    # React contexts
│   ├── AuthContext.tsx         # Authentication
│   ├── CartContext.tsx         # Shopping cart
│   └── ThemeContext.tsx        # Theme management
├── lib/                         # Utilities and services
│   ├── constants.ts            # App constants
│   ├── mockData.ts             # Mock data
│   ├── services.ts             # Data services
│   └── utils.ts                # Utility functions
└── types/                       # TypeScript types
    └── index.ts                # Type definitions
\`\`\`

## Key Features Explained

### Orders / POS
- Three-column layout: Tables, Menu, Cart
- Real-time cart calculations with tax
- Table status management
- Category-based menu browsing
- Quantity adjustments and item notes

### Kitchen Display
- Kanban board with 4 status columns
- Overdue order highlighting (>10 minutes)
- Time tracking for each order
- One-click status transitions

### Menu Management
- Grid view with search and category filters
- Availability toggle
- Price and category display
- Tag-based filtering (Veg, Vegan, Popular, etc.)

### Inventory
- Stock level monitoring
- Low/Critical stock alerts
- Manual stock adjustments
- Supplier tracking

### Staff Management
- Role assignment (Manager, Cashier, Staff)
- Shift scheduling
- Active/Inactive status
- Contact information

### Reports & Analytics
- KPI cards (Orders, Revenue, Active Tables, etc.)
- Top 5 selling items
- Sales by category with visual charts
- Export functionality (UI ready)

### Settings
- Business information management
- Tax and pricing configuration
- Theme customization (Light/Dark)
- Business hours setup

## Data Layer

The application uses an in-memory mock data layer that can be easily replaced with real API calls. All data operations are abstracted through service functions in `lib/services.ts`.

### Mock Data Includes:
- 34 menu items across 5 categories
- 15 tables with various statuses
- Sample orders with different statuses
- 10 inventory items with stock levels
- 7 staff members
- 3 purchase orders

## Customization

### Adding Real Backend
Replace the service functions in `lib/services.ts` with API calls:

\`\`\`typescript
// Example: Replace mock menu service with API
export const menuService = {
  getAll: async () => {
    const response = await fetch('/api/menu');
    return response.json();
  },
  // ... other methods
};
\`\`\`

### Styling
- Theme colors: Edit CSS variables in `app/globals.css`
- Component styles: Modify Tailwind classes in components
- Fonts: Change Google Fonts import in `app/globals.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
\`\`\`
