# Stelliform Digital - Deployment Guide

## Environment Overview

| Environment | Port | Domain | Purpose |
|-------------|------|--------|---------|
| Staging | 3000 | staging.stelliformdigital.com | Testing changes before production |
| Production | 3001 | stelliformdigital.com | Live public website |

## Initial Setup (One-Time)

### Step 1: Copy setup scripts to server

```powershell
# From your Windows machine
scp C:\dev\stelliformdigital\complete-server-setup.sh stelliform:~/
scp C:\dev\stelliformdigital\caddy-setup.sh stelliform:~/
```

### Step 2: Run complete server setup

```bash
ssh stelliform
chmod +x ~/complete-server-setup.sh ~/caddy-setup.sh
~/complete-server-setup.sh
```

This will:
- Install Node.js, PM2, Caddy (with Cloudflare module)
- Clone repository to both staging and production directories
- Build both environments
- Start both with PM2 on ports 3000 and 3001

### Step 3: Configure Caddy with your Cloudflare API token

```bash
~/caddy-setup.sh
```

When prompted, enter your Cloudflare API Token (get from: https://dash.cloudflare.com/profile/api-tokens)

Create token with:
- Permissions: Zone > DNS > Edit, Zone > Zone > Read
- Zone Resources: Include > Specific zone > stelliformdigital.com

### Step 4: Configure Cloudflare DNS

In Cloudflare dashboard (https://dash.cloudflare.com):

1. Add these DNS records:
   - Type: A, Name: @, Content: 157.245.213.103, Proxy: OFF (gray cloud)
   - Type: A, Name: www, Content: 157.245.213.103, Proxy: OFF (gray cloud)
   - Type: A, Name: staging, Content: 157.245.213.103, Proxy: OFF (gray cloud)

2. Set SSL/TLS mode:
   - Go to SSL/TLS → Overview
   - Set to "Full (strict)"

### Step 5: Test the sites

After DNS propagates (5-10 minutes):
- Production: https://stelliformdigital.com
- Staging: https://staging.stelliformdigital.com

## Daily Workflow

### Deploying to Staging

```bash
ssh stelliform
cd ~/apps/stelliform-staging
git pull origin master
npm install
npm run build
pm2 restart stelliform-staging
```

### Deploying to Production

After testing in staging:

```bash
ssh stelliform
cd ~/apps/stelliform-production
git pull origin master
npm install
npm run build
pm2 restart stelliform-production
```

## Quick Commands

### Check status
```bash
pm2 list
pm2 logs stelliform-staging --lines 50
pm2 logs stelliform-production --lines 50
```

### Restart applications
```bash
pm2 restart stelliform-staging
pm2 restart stelliform-production
pm2 restart all
```

### View logs
```bash
pm2 logs stelliform-staging
pm2 logs stelliform-production
```

### Check Caddy status
```bash
sudo systemctl status caddy
sudo caddy validate --config /etc/caddy/Caddyfile
```

### Restart Caddy
```bash
sudo systemctl restart caddy
```

## Troubleshooting

### Site not loading
```bash
# Check PM2
pm2 list

# Check Caddy
sudo systemctl status caddy

# Check if ports are listening
sudo netstat -tlnp | grep -E '3000|3001'
```

### SSL issues
```bash
# Check Caddy logs
sudo journalctl -u caddy -n 50

# Verify Cloudflare API token
echo $CF_API_TOKEN

# Restart Caddy
sudo systemctl restart caddy
```

### Deploy not working
```bash
# Check git status
cd ~/apps/stelliform-staging
git status
git pull origin master

# Rebuild
npm install
npm run build

# Check for errors
pm2 logs stelliform-staging --err
```

## Architecture

```
Traffic Flow:

Internet
    ↓
Cloudflare DNS
    ↓
157.245.213.103 (Server)
    ↓
Caddy Reverse Proxy
    ├─ staging.stelliformdigital.com → Port 3000 (Staging)
    └─ stelliformdigital.com → Port 3001 (Production)

Server:
/home/supafly04/apps/
├── stelliform-staging/       # Port 3000
│   ├── .git/
│   ├── node_modules/
│   └── .next/
└── stelliform-production/    # Port 3001
    ├── .git/
    ├── node_modules/
    └── .next/
```

## Future: GHL Virtual Chat Integration

When ready to add Go High Level virtual chat:

1. Get GHL chat widget code
2. Add to `app/layout.tsx` in the repository
3. Deploy to staging first for testing
4. Deploy to production after verification

No database needed since GHL handles all lead capture.
