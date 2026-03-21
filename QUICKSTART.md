# Techwired Solutions - Quick Start Guide

Get your development environment up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Install PostgreSQL

**Windows:**
```powershell
# Download and install from: https://www.postgresql.org/download/windows/
# Or use Docker:
docker run --name techwired-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=techwired -p 5432:5432 -d postgres
```

**Mac:**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb techwired
```

### Step 2: Backend Setup (2 minutes)

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (We use SQLite for local dev)
copy .env.example .env
```

**Edit `.env` if needed (Default is SQLite):**
Ensure `DATABASE_URL=sqlite:///./techwired.db`

**Initialize database:**
```bash
python -m app.init_db
```

**Run backend:**
```bash
uvicorn app.main:app --reload
```

✅ Backend running at: http://localhost:8000

### Step 3: Frontend Setup (2 minutes)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env.local manually (gitignored)
# Add this line:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Run frontend
npm run dev
```

✅ Frontend running at: http://localhost:3000

---

## 🎯 Test It Out

1. **Visit:** http://localhost:3000
2. **Fill contact form** and submit
3. **Check terminal** for email logs
4. **Login to admin:** http://localhost:3000/admin
   - Username: `admin`
   - Password: `changeme123`

---

## 📧 Email Setup (Optional for Development)

For development, emails will be logged to console. To actually send emails:

1. Go to Google Account → Security → 2-Step Verification → App Passwords
2. Generate app password for "Mail"
3. Update `SMTP_PASSWORD` in backend `.env`

---

## 🐛 Common Issues

**Backend won't start:**
```bash
# Check if PostgreSQL is running
# Windows: Services → PostgreSQL
# Mac: brew services list
```

**Frontend build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database errors:**
```bash
# Recreate database
python -m app.init_db
```

---

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Customize the design and content
- Add your own projects to the portfolio
- Set up social media links

---

## 🆘 Need Help?

- Email: s.techwired@gmail.com
- Phone: +977 9843641508

**Happy coding! 🎉**
