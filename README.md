# Finance Dashboard UI

## Description
A premium, frontend-only financial dashboard built to track and manage financial activity. Inspired by modern SaaS platforms like Gumroad and Lemon Squeezy, this application delivers a clean, component-based layout with a heavy focus on typography, spacing, and micro-interactions. It operates without a backend by aggressively leveraging the React Context API and mock data for a seamless out-of-the-box demonstration.

## Features Included
- **Dashboard Overview:** Comprehensive summary metrics (Total Balance, Income, Expenses).
- **Interactive Charts:** Time-based balance trends and category-based spending breakdown.
- **Transactions Management:** Robust data table featuring instant keyword search, dynamic category/type filtering, and sortable columns.
- **Role-Based UI:** Simulated permission system toggling between full 'Admin' privileges and read-only 'Viewer' access.
- **Actionable Insights:** Aggregated analytics computing highest spending categories, net margins, and largest single expenses.
- **Responsive Architecture:** Fully fluid design adapting perfectly from mobile screens to ultrawide desktop monitors.
- **Premium Aesthetics:** Meticulously crafted UI employing dark-mode-first styling, soft gradients, and modern component boundaries.

## Tech Stack
- **React** (Functional Components, Hooks, Context API)
- **Tailwind CSS** (Utility-first styling network)
- **Recharts** (Declarative data visualization)
- **Vite** (Next-generation frontend tooling)
- **Lucide React** (Beautiful, consistent iconography)

## Folder Structure
```text
src/
├── components/        # Reusable feature blocks
│   ├── charts/        # Data visualization modules
│   ├── layout/        # Topbar, Sidebar wrappers
│   ├── tables/        # Data grids and lists
│   └── ui/            # Modals, skeletons, toast notifications
├── context/           # Global State Management (FinanceContext.jsx)
├── data/              # Mock data structures and seed constants
├── pages/             # Core application views (Dashboard, Transactions, Insights)
└── index.css          # Tailwind directives and theme mappings
```

## Installation Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/finance-dashboard-ui.git
   ```
2. **Navigate into the project directory:**
   ```bash
   cd finance-dashboard-ui
   ```
3. **Install project dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

## How to Run
1. **Start the local development server:**
   ```bash
   npm run dev
   # or 
   yarn dev
   ```
2. **Open your browser:**
   Navigate to HTTP default port `http://localhost:5173/` to interact with the dashboard.

## Usage
- **View Dashboard:** Upon loading, you will immediately see a calculated snapshot of the mock financial state.
- **Switch Roles:** Use the identity dropdown located in the top-right navigation bar to instantly toggle your viewing clearance between **Admin** and **Viewer**.
- **Manage Transactions (Admin):** Navigate to the Transactions page. As an Admin, use the "+ New" button to add complex records, and utilize the appended inline "Actions" column to Edit or Delete existing entries.

## Optional Features
- **Dark / Light Mode:** Supported theme inversion triggered securely via the sun/moon icon in the topbar.
- **Local Storage Persistence:** Real-time data caching. User transactions and theme preferences automatically bind to browser data storage to prevent session loss.
- **Export Functionality:** Export the currently filtered transaction slice directly to a universally compatible CSV format with a single click.

## Future Improvements
- **Backend Integration:** Replace the browser-bound Context API structures with a robust REST API or GraphQL connection.
- **Authentication System:** Replace the simulated role-switcher with secure token-based authentication protocols (e.g., Clerk, NextAuth, Auth0).
- **Advanced Analytics:** Support multi-year filtering, custom metric thresholds, and predictive modeling algorithms.

## Screenshots

*(Insert visual overviews here)*  
`![Dashboard Overview](C:\Users\Public\Documents\zorvyn-task\screenshots\image.png)`  
`![Transactions View](screenshots\image copy.png)`  
`![Insights Layout](C:\Users\Public\Documents\zorvyn-task\screenshots\image copy 2.png)`

## License
Distributed under the MIT License. See `LICENSE` for more information.
