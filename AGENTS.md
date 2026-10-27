# Payment Management Assistant

## Project Structure

```
payment management assistant/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities
│   └── package.json
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── app.module.ts # Main application module with TypeORM config
│   │   └── main.ts       # Application entry point
│   ├── .env.example      # Environment variables template
│   └── package.json
└── AGENTS.md            # This file
```

## Technology Stack

### Frontend
- **Next.js 16** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **Recharts** for data visualization

### Backend
- **NestJS** with TypeScript
- **TypeORM** for database ORM
- **PostgreSQL** for database

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:3001 (default Next.js port)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your PostgreSQL credentials
npm run start:dev
```
Backend runs on http://localhost:3000 (configurable via PORT env var)

### Database Setup
1. Install PostgreSQL on your system
2. Create a database named `payment_assistant` (or update .env)
3. Update `backend/.env` with your database credentials
4. TypeORM will auto-create tables based on entity definitions

## Environment Variables

### Backend (.env)
- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_USERNAME` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_DATABASE` - Database name (default: payment_assistant)
- `PORT` - Backend server port (default: 3000)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3000)

## Next Steps

1. Set up PostgreSQL database
2. Create TypeORM entities for:
   - Customers
   - Invoices
   - Transactions
   - Reconciliation results
3. Implement REST API endpoints in NestJS
4. Build frontend pages and components
5. Implement authentication/authorization
6. Add payment processing integrations
