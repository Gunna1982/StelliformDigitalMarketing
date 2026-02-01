# Client Deployment Workflow

Complete workflow for creating and deploying client websites to production server.

## Overview

This is a **3-step process**:

1. **Create Project Locally** - Initialize Next.js project and push to GitHub
2. **Deploy to Server** - Clone from GitHub, set up PM2 + Nginx
3. **Update/Deploy Changes** - Push updates during development

---

## Prerequisites

- Git installed locally
- GitHub CLI (`gh`) installed
- SSH access to server
- Node.js installed locally

---

## Step 1: Create New Client Project

**Script:** `create-new-client-project.sh`

**What it does:**
- Creates Next.js project locally at `c:/dev/[ProjectName]`
- Initializes git repository
- Creates environment files (.env.local, .env.example)
- Pushes to GitHub as private repository

**Usage:**
```bash
cd c:\dev\stelliformdigital\scripts\local
bash create-new-client-project.sh

# Prompts:
Project name: PlasticSurgeryExperts
Domain: plasticsurguryexperts.com
GitHub username: Gunna1982
```

**Output:**
- Local project created at `c:/dev/PlasticSurgeryExperts`
- GitHub repo: `https://github.com/Gunna1982/PlasticSurgeryExperts`

---

## Step 2: Deploy to Server

**Script:** `deploy-client-to-server.sh`

**What it does:**
- Clones GitHub repo to server (staging + production)
- Installs dependencies and builds both environments
- Sets up PM2 processes
- Configures Nginx reverse proxy
- Starts services

**Usage:**
```bash
bash deploy-client-to-server.sh

# Prompts:
GitHub repository: Gunna1982/PlasticSurgeryExperts
Domain: plasticsurguryexperts.com
Staging port: 3002
Production port: 3003
Server IP: 157.245.213.103
SSH Username: supafly04
SSL provider: 1 (Let's Encrypt)
```

**After deployment:**
1. Add DNS records at domain registrar:
   - `plasticsurguryexperts.com` → `157.245.213.103`
   - `www.plasticsurguryexperts.com` → `157.245.213.103`
   - `staging.plasticsurguryexperts.com` → `157.245.213.103`

2. Wait for DNS propagation (5-30 minutes)

3. SSH to server and install SSL:
   ```bash
   ssh supafly04@157.245.213.103
   sudo certbot --nginx -d plasticsurguryexperts.com -d www.plasticsurguryexperts.com
   sudo certbot --nginx -d staging.plasticsurguryexperts.com
   ```

---

## Step 3: Update/Deploy Changes

**Script:** `update-client-on-server.sh`

**What it does:**
- Pulls latest changes from GitHub
- Installs dependencies (if needed)
- Rebuilds application
- Restarts PM2 process

**Usage:**
```bash
# Update staging only
bash update-client-on-server.sh
# Environment: staging

# Update production only
bash update-client-on-server.sh
# Environment: production

# Update both
bash update-client-on-server.sh
# Environment: both
```

**When to use:**
- After pushing code changes to GitHub
- To deploy new features to staging
- To promote staging to production

---

## Development Workflow

### Daily Development

1. **Develop locally:**
   ```bash
   cd c:/dev/PlasticSurgeryExperts
   npm run dev
   # Develop features, test locally
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: add new homepage section"
   git push origin main
   ```

3. **Deploy to staging:**
   ```bash
   cd c:\dev\stelliformdigital\scripts\local
   bash update-client-on-server.sh
   # Environment: staging
   ```

4. **Test on staging:**
   - Visit `https://staging.plasticsurguryexperts.com`
   - Verify changes work correctly

5. **Deploy to production:**
   ```bash
   bash update-client-on-server.sh
   # Environment: production
   ```

---

## File Structure

### Local (Development)
```
c:/dev/PlasticSurgeryExperts/
├── app/                    # Next.js app directory
├── public/                 # Static assets
├── .env.local             # Local environment variables
├── .env.example           # Environment template
├── deployment.config.json # Deployment settings
└── package.json
```

### Server (Staging + Production)
```
~/apps/
├── PlasticSurgeryExperts-staging/
│   ├── app/
│   ├── public/
│   └── package.json
├── PlasticSurgeryExperts-production/
│   ├── app/
│   ├── public/
│   └── package.json
└── PlasticSurgeryExperts-ecosystem.config.js  # PM2 config
```

---

## Troubleshooting

### Build fails on server
```bash
ssh supafly04@157.245.213.103
cd ~/apps/PlasticSurgeryExperts-staging
npm install
npm run build
```

### PM2 process not running
```bash
ssh supafly04@157.245.213.103
pm2 list
pm2 restart plasticsurguryexperts-com-staging
pm2 logs plasticsurguryexperts-com-staging
```

### Nginx errors
```bash
ssh supafly04@157.245.213.103
sudo nginx -t
sudo systemctl status nginx
sudo systemctl restart nginx
```

### DNS not propagating
```bash
# Check DNS locally
dig plasticsurguryexperts.com

# Check from different location
nslookup plasticsurguryexperts.com 8.8.8.8
```

---

## Quick Reference

### Create new client
```bash
bash create-new-client-project.sh
bash deploy-client-to-server.sh
```

### Deploy updates
```bash
bash update-client-on-server.sh
```

### Check server status
```bash
ssh supafly04@157.245.213.103
pm2 list
pm2 logs [app-name]
```

### Restart services
```bash
ssh supafly04@157.245.213.103
pm2 restart [app-name]
sudo systemctl restart nginx
```

---

## Notes

- **Always deploy to staging first**, test, then deploy to production
- **Environment variables** must be set on server in PM2 ecosystem config
- **SSL certificates** auto-renew via Certbot (Let's Encrypt)
- **PM2 saves state** on server restart (via `pm2 save`)
- **Nginx configs** persist in `/etc/nginx/sites-available/`
