# Techwired Solutions - Deployment Guide

This guide will walk you through deploying the Techwired Solutions website to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Fly.io account (for backend) OR Railway/Render account
- PostgreSQL database (can use Neon, Supabase, or Railway)
- Gmail account with App Password (for email service)

---

## Part 1: Database Setup

### Option A: Using Neon (Recommended - Free Tier Available)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host/database`)
4. Save this for later

### Option B: Using Supabase

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Save this for later

---

## Part 2: Email Configuration

### Setting up Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (remove spaces)
6. Save this for later

---

## Part 3: Backend Deployment (Fly.io)

### Step 1: Install Fly CLI

```bash
# Windows (PowerShell)
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

### Step 2: Login to Fly.io

```bash
fly auth login
```

### Step 3: Create Fly.toml

Create `fly.toml` in the `backend` directory:

```toml
app = "techwired-api"
primary_region = "sin"  # Singapore - closest to Nepal

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8000"

[[services]]
  internal_port = 8000
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

### Step 4: Deploy Backend

```bash
cd backend

# Launch the app (first time)
fly launch

# Set environment variables
fly secrets set DATABASE_URL="your-postgresql-connection-string"
fly secrets set JWT_SECRET="your-random-secret-key-here"
fly secrets set SMTP_HOST="smtp.gmail.com"
fly secrets set SMTP_PORT="587"
fly secrets set SMTP_USER="s.techwired@gmail.com"
fly secrets set SMTP_PASSWORD="your-gmail-app-password"
fly secrets set ADMIN_EMAIL="s.techwired@gmail.com"
fly secrets set ADMIN_USERNAME="admin"
fly secrets set ADMIN_PASSWORD="your-secure-password"
fly secrets set FRONTEND_URL="https://your-frontend-url.vercel.app"

# Deploy
fly deploy
```

### Step 5: Initialize Database

```bash
# SSH into the app
fly ssh console

# Run database initialization
python -m app.init_db

# Exit
exit
```

Your backend API will be available at: `https://techwired-api.fly.dev`

---

## Part 4: Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
cd ..
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/techwired-solutions.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `https://techwired-api.fly.dev`

6. Click "Deploy"

Your frontend will be available at: `https://techwired-solutions.vercel.app`

### Step 3: Update Backend CORS

Update the `FRONTEND_URL` secret in Fly.io:

```bash
fly secrets set FRONTEND_URL="https://techwired-solutions.vercel.app"
```

---

## Part 5: Custom Domain (Optional)

### For Frontend (Vercel)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `techwiredsolutions.com`)
4. Follow the DNS configuration instructions

### For Backend (Fly.io)

1. Add a custom domain:
```bash
fly certs add api.techwiredsolutions.com
```

2. Update your DNS records as instructed

---

## Part 6: Testing

### Test Backend API

```bash
# Health check
curl https://techwired-api.fly.dev/health

# Test inquiry submission
curl -X POST https://techwired-api.fly.dev/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service_type": "Web Development",
    "budget": "NPR 50,000 - 1,00,000",
    "requirements": "This is a test inquiry with more than 50 characters to meet the validation requirement."
  }'
```

### Test Frontend

1. Visit your Vercel URL
2. Fill out the contact form
3. Check if you receive emails (both admin and client)
4. Test admin login at `/admin`

---

## Part 7: Post-Deployment Checklist

- [ ] Test all form submissions
- [ ] Verify email delivery (admin + client)
- [ ] Test admin login and dashboard
- [ ] Check mobile responsiveness
- [ ] Test 3D animations performance
- [ ] Verify all links work
- [ ] Check SEO meta tags
- [ ] Test on different browsers
- [ ] Set up monitoring (optional: use Vercel Analytics + Fly.io metrics)

---

## Troubleshooting

### Backend Issues

**Database connection errors:**
```bash
# Check if database URL is correct
fly secrets list

# View logs
fly logs
```

**Email not sending:**
- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail
- Ensure SMTP credentials are set correctly

### Frontend Issues

**API calls failing:**
- Check CORS settings in backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for errors

**3D scenes not loading:**
- Check browser WebGL support
- View console for Three.js errors
- Test on different devices

---

## Monitoring & Maintenance

### View Backend Logs

```bash
fly logs
```

### View Database

```bash
fly postgres connect -a your-postgres-app-name
```

### Update Backend

```bash
cd backend
git pull
fly deploy
```

### Update Frontend

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update frontend"
git push
```

---

## Security Recommendations

1. **Change default admin password immediately**
2. **Use strong JWT secret** (generate with: `openssl rand -hex 32`)
3. **Enable rate limiting** on API endpoints
4. **Set up SSL/TLS** (automatically handled by Vercel and Fly.io)
5. **Regular backups** of PostgreSQL database
6. **Monitor logs** for suspicious activity

---

## Cost Estimate

- **Neon PostgreSQL:** Free tier (512MB storage)
- **Fly.io Backend:** ~$5-10/month (shared CPU)
- **Vercel Frontend:** Free (hobby plan)
- **Total:** ~$5-10/month

---

## Support

For issues or questions:
- Email: s.techwired@gmail.com
- Phone: +977 9843641508

---

**Congratulations! Your Techwired Solutions website is now live! 🎉**
