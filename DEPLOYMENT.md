# Stelliform Digital - Deployment Guide

## Production Server Status

Your production server is now **LIVE** and running at:
- **Production**: https://stelliformdigital.com (Port 3001)
- **Staging**: https://staging.stelliformdigital.com (Port 3000)

Both environments are managed by PM2 and served through Nginx with SSL.

---

## Quick Deployment

### From Your Local Machine

1. **Make changes locally and commit**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Deploy to server**
   ```bash
   # Deploy to both environments (recommended)
   bash deploy-to-server.sh

   # Deploy to production only
   bash deploy-to-server.sh production

   # Deploy to staging only
   bash deploy-to-server.sh staging
   ```

This will automatically:
- Push your changes to GitHub
- SSH into the server
- Pull latest code
- Install dependencies
- Build the application
- Restart PM2 processes

---

## Manual Server Commands

### Connect to Server
```bash
ssh stelliform
```

### Check Status
```bash
pm2 status
```

### View Logs
```bash
pm2 logs stelliform-production --lines 50
pm2 logs stelliform-staging --lines 50
```

### Deploy Latest Changes (on server)
```bash
cd ~/apps
./deploy.sh                 # Deploy both
./deploy.sh production      # Production only
./deploy.sh staging         # Staging only
```

### Restart Services
```bash
pm2 restart stelliform-production
pm2 restart stelliform-staging
pm2 restart all
```

---

## What Just Happened?

### Problem
- Production website (stelliformdigital.com) wasn't displaying
- PM2 wasn't using the ecosystem.config.js file
- Only staging was running on port 3000
- Nginx was configured to proxy production to port 3001, but nothing was there

### Solution
1. Stopped all PM2 processes
2. Restarted PM2 with `ecosystem.config.js`
3. Both staging (3000) and production (3001) are now running
4. Created deployment scripts for easy updates

---

## Server Architecture

```
Cloudflare DNS
    ↓
Nginx (Reverse Proxy with SSL)
    ↓
├── stelliformdigital.com → Port 3001 (Production)
└── staging.stelliformdigital.com → Port 3000 (Staging)
    ↓
PM2 Process Manager
    ↓
├── stelliform-production (Next.js on 3001)
└── stelliform-staging (Next.js on 3000)
```

### Server Directories
```
/home/supafly04/apps/
├── deploy.sh                    # Deployment script
├── ecosystem.config.js          # PM2 configuration
├── README.md                    # Server documentation
├── stelliform-staging/          # Staging codebase
└── stelliform-production/       # Production codebase
```

---

## Troubleshooting

### Site Not Loading
```bash
ssh stelliform
pm2 status                  # Check if processes are running
pm2 logs                    # View error logs
pm2 restart all             # Restart all processes
```

### Check Nginx
```bash
sudo systemctl status nginx
sudo nginx -t               # Test configuration
sudo systemctl restart nginx
```

### SSL Certificate Issues
```bash
sudo certbot renew --dry-run
sudo systemctl restart nginx
```

---

## Recent Updates Deployed

Latest features now live on production:
- Restructured Services section
- 6 new service offerings with pricing:
  - Website Design ($2,500+)
  - Lead Generation ($1,500/mo)
  - Email & Social Media ($1,000/mo)
  - Custom Development ($5,000+)
  - Brand Strategy ($3,000+)
  - SEO & Digital Marketing ($1,200/mo)
- New service highlights and CTAs
- Improved card layout and design

---

## Next Steps

1. Test the production site: https://stelliformdigital.com
2. Verify all services display correctly
3. Test all CTAs and navigation links
4. Use the deployment script for future updates
