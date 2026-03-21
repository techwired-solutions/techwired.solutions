# Techwired Solutions

A premium, futuristic, 3D animated full-stack website for Techwired Solutions - a Nepal-based digital agency.

## 🚀 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP + ScrollTrigger** - Advanced scroll animations
- **React Three Fiber + Drei** - 3D graphics with Three.js
- **TypeScript** - Type-safe JavaScript

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM
- **JWT** - Authentication
- **SMTP** - Email service

## 📁 Project Structure

```
techwired_solutions/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   │   ├── 3d/             # Three.js 3D scenes
│   │   ├── sections/       # Page sections
│   │   ├── ui/             # UI components
│   │   └── forms/          # Form components
│   └── public/             # Static assets
│
└── backend/                 # FastAPI application
    ├── app/
    │   ├── models/         # SQLAlchemy models
    │   ├── schemas/        # Pydantic schemas
    │   ├── routers/        # API endpoints
    │   ├── services/       # Business logic
    │   └── main.py         # FastAPI app
    └── requirements.txt    # Python dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 14+

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET` - Random secret key for JWT
   - `SMTP_PASSWORD` - Gmail app-specific password
   - Other settings as needed

5. **Initialize database:**
   ```bash
   python -m app.init_db
   ```

6. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   API will be available at: http://localhost:8000
   API docs: http://localhost:8000/docs

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install additional 3D and animation libraries:**
   ```bash
   npm install @react-three/fiber @react-three/drei three framer-motion gsap
   npm install react-hook-form zod axios
   npm install @types/three --save-dev
   ```

4. **Configure environment variables:**
   ```bash
   # Create .env.local
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:3000

## 📧 Email Configuration

To enable email functionality, you need to set up Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this password in `backend/.env` as `SMTP_PASSWORD`

## 🔐 Admin Access

Default admin credentials (change after first login):
- **Username:** admin
- **Password:** changeme123

Access admin panel at: http://localhost:3000/admin

## 🎨 Design System

### Colors
- **Primary:** Electric Violet (#8B5CF6) → Neon Purple (#C084FC)
- **Secondary:** Tech Yellow (#FACC15)
- **Background (Dark):** Deep Gray (#0A0A0A)

### Typography
- **Headings:** Geist Sans Bold
- **Body:** Geist Sans Regular
- **Code:** Geist Mono

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy --prod
```

### Backend (Fly.io)
```bash
cd backend
fly launch
fly deploy
```

## 🧪 API Endpoints

### Public
- `POST /api/inquiry` - Submit contact form

### Admin (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/inquiries` - List all inquiries
- `GET /api/admin/inquiries/{id}` - Get single inquiry
- `PATCH /api/admin/inquiries/{id}` - Update inquiry

## 📝 License

© 2025 Techwired Solutions — Built with ❤️ in Nepal

## 🤝 Contact

- **Email:** s.techwired@gmail.com
- **Phone:** +977 9843641508
- **Location:** Budhanilkantha, Kathmandu, Nepal
