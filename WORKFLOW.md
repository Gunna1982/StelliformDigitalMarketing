# Stelliform Digital - Complete Development & Deployment Workflow

## Table of Contents
1. [Quick Reference](#quick-reference)
2. [Local Development](#local-development)
3. [Git Workflow](#git-workflow)
4. [Deploying to Staging](#deploying-to-staging)
5. [Deploying to Production](#deploying-to-production)
6. [Backups](#backups)
7. [Rollback Procedures](#rollback-procedures)
8. [Troubleshooting](#troubleshooting)

---

## Quick Reference

### Daily Development Workflow
```bash
# 1. Make changes locally
npm run dev                           # Test locally at http://localhost:3000

# 2. Commit changes
git add .
git commit -m "feat: your change description"
git push origin master

# 3. Deploy to staging (test first)
bash deploy-to-server.sh staging

# 4. Deploy to production (after testing)
bash deploy-to-server.sh production
```

### Server URLs
- **Local**: http://localhost:3000
- **Staging**: https://staging.stelliformdigital.com (Port 3000)
- **Production**: https://stelliformdigital.com (Port 3001)
- **Server IP**: 157.245.213.103

---

## Local Development

### 1. Start Development Server

```bash
# Navigate to project
cd C:\dev\stelliformdigital

# Install dependencies (first time or after package.json changes)
npm install

# Start dev server
npm run dev
```

Access at: http://localhost:3000

### 2. Make Changes

Edit files in:
- `src/components/` - React components
- `src/app/` - Next.js pages and layouts
- `src/app/globals.css` - Global styles

### 3. Test Changes

```bash
# Check for errors
npm run lint

# Build to verify production compatibility
npm run build

# Test production build locally
npm start
```

### 4. Common Development Commands

```bash
# Install new package
npm install package-name

# Remove package
npm uninstall package-name

# Update all packages
npm update

# Clear Next.js cache
rm -rf .next
npm run build
```

---

## Git Workflow

### 1. Check Current Status

```bash
git status              # See changed files
git diff                # See changes in detail
git log --oneline -5    # See recent commits
```

### 2. Commit Changes

```bash
# Add specific files
git add src/components/Features.tsx

# Or add all changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new pricing section"
```

**Commit Message Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `style:` - Visual/CSS changes
- `docs:` - Documentation updates
- `chore:` - Maintenance tasks

### 3. Push to GitHub

```bash
git push origin master
```

### 4. View History

```bash
# Last 10 commits
git log --oneline -10

# Commits by specific author
git log --author="your-name"

# Changes in specific file
git log --oneline src/components/Features.tsx
```

---

## Deploying to Staging

### Purpose
Test changes in a production-like environment before going live.

### Method 1: Automated Script (Recommended)

```bash
# Deploy to staging
bash deploy-to-server.sh staging
```

**What this does:**
1. Pushes local changes to GitHub
2. SSHs to server
3. Pulls latest code to staging directory
4. Installs dependencies
5. Builds the application
6. Restarts staging PM2 process

### Method 2: Manual Deployment

```bash
# Connect to server
ssh stelliform

# Navigate to staging
cd ~/apps/stelliform-staging

# Pull latest code
git pull origin master

# Install dependencies
npm ci --prefer-offline --no-audit

# Build
npm run build

# Restart staging
cd ~/apps
pm2 restart stelliform-staging
```

### 3. Test Staging

Visit: https://staging.stelliformdigital.com

**Checklist:**
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Navigation works
- [ ] Contact form functions
- [ ] Mobile responsive
- [ ] No console errors (F12 → Console)

---

## Deploying to Production

### ALWAYS Test on Staging First!

### Method 1: Automated Script (Recommended)

```bash
# Deploy to production only
bash deploy-to-server.sh production

# Or deploy to both staging and production
bash deploy-to-server.sh
```

### Method 2: Manual Deployment

```bash
# Connect to server
ssh stelliform

# Navigate to production
cd ~/apps/stelliform-production

# Pull latest code
git pull origin master

# Install dependencies
npm ci --prefer-offline --no-audit

# Build
npm run build

# Restart production
cd ~/apps
pm2 restart stelliform-production
```

### 3. Verify Production

Visit: https://stelliformdigital.com

**Post-Deployment Checklist:**
- [ ] Site loads within 3 seconds
- [ ] No errors in browser console
- [ ] All CTAs work
- [ ] Mobile responsive
- [ ] Analytics tracking works
- [ ] SSL certificate valid (green padlock)

---

## Backups

### 1. Automatic Git Backups

Every commit is a backup. GitHub stores full history.

```bash
# View all commits (backups)
git log --oneline

# Create a backup tag
git tag -a v1.0.0 -m "Production release Jan 2026"
git push origin v1.0.0

# List all tags
git tag -l
```

### 2. Server Directory Backup

Before major changes:

```bash
ssh stelliform

# Backup production
cd ~/apps
tar -czf stelliform-production-backup-$(date +%Y%m%d).tar.gz stelliform-production/

# List backups
ls -lh *.tar.gz

# Download backup to local machine (from local terminal)
scp stelliform:~/apps/stelliform-production-backup-*.tar.gz C:/dev/backups/
```

### 3. Database Backup (if applicable)

```bash
# If using a database, backup before major changes
ssh stelliform
# Add database backup commands here
```

### 4. Scheduled Backups

Consider setting up automated backups:
- GitHub auto-backups all code
- DigitalOcean snapshots (weekly recommended)
- PM2 process list: `pm2 save` (auto-saves on deploy)

---

## Rollback Procedures

### Scenario 1: Bad Deployment (Site Broken)

#### Quick Rollback to Previous Commit

```bash
ssh stelliform

# Go to production
cd ~/apps/stelliform-production

# View recent commits
git log --oneline -5

# Rollback to previous commit (example: abc1234)
git reset --hard abc1234

# Rebuild
npm ci
npm run build

# Restart
cd ~/apps
pm2 restart stelliform-production
```

#### Alternative: Restore from Backup

```bash
ssh stelliform
cd ~/apps

# Stop production
pm2 stop stelliform-production

# Rename broken version
mv stelliform-production stelliform-production-broken

# Extract backup
tar -xzf stelliform-production-backup-20260128.tar.gz

# Restart
pm2 restart stelliform-production
```

### Scenario 2: Need to Undo Last Commit Locally

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes (DANGEROUS)
git reset --hard HEAD~1

# Undo last commit and create new commit that reverses it
git revert HEAD
```

### Scenario 3: Server Not Responding

```bash
ssh stelliform

# Check PM2 status
pm2 status

# Restart all processes
pm2 restart all

# If that doesn't work, reload ecosystem
pm2 delete all
pm2 start ecosystem.config.js

# Check logs
pm2 logs --lines 50
```

---

## Troubleshooting

### Issue: Site Not Loading

**Check 1: Is PM2 Running?**
```bash
ssh stelliform
pm2 status
```

Expected: Both `stelliform-staging` and `stelliform-production` should show "online"

**Fix:**
```bash
cd ~/apps
pm2 restart all
```

---

**Check 2: Is Nginx Running?**
```bash
ssh stelliform
systemctl status nginx
```

Expected: "active (running)"

**Fix:**
```bash
# Nginx requires sudo - contact system admin or:
# Check DigitalOcean console for server restart option
```

---

**Check 3: Are Ports Accessible?**
```bash
ssh stelliform
curl -I http://localhost:3000  # Staging
curl -I http://localhost:3001  # Production
```

Expected: "HTTP/1.1 200 OK"

**Fix:**
```bash
cd ~/apps
pm2 restart all
```

---

**Check 4: Firewall Blocking?**

If site works on server but not externally:
1. Log into DigitalOcean control panel
2. Go to Networking → Firewalls
3. Ensure ports 80 and 443 are open for inbound traffic

---

### Issue: Build Errors

**Error: TypeScript Errors**
```bash
# Check for errors
npm run build

# Fix and rebuild
# (fix the errors shown)
npm run build
```

**Error: Module Not Found**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Out of Memory**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

### Issue: Old Code Showing (Cache Issue)

**Browser Cache:**
- Hard refresh: Ctrl + F5 (Windows) or Cmd + Shift + R (Mac)
- Clear browser cache
- Try incognito/private window

**Server Cache:**
```bash
ssh stelliform
cd ~/apps/stelliform-production

# Verify you have latest code
git log --oneline -1

# If not, pull and rebuild
git pull origin master
npm run build
pm2 restart stelliform-production

# Clear PM2 logs
pm2 flush
```

**Cloudflare Cache (if using):**
1. Log into Cloudflare
2. Go to Caching → Purge Cache
3. Select "Purge Everything"

---

### Issue: Server Action Errors

**Symptoms:** "Failed to find Server Action" in logs

**Fix:**
```bash
ssh stelliform
cd ~/apps/stelliform-production

# Clean rebuild
rm -rf .next node_modules
npm ci
npm run build

# Restart
pm2 restart stelliform-production
pm2 flush
```

---

### Issue: Can't SSH to Server

**Error: Connection Refused**
- Check internet connection
- Verify server is running in DigitalOcean console
- Check IP address hasn't changed

**Error: Permission Denied**
- Verify SSH key is loaded: `ssh-add -l`
- Re-add key: `ssh-add C:\Users\forev\.ssh\id_ed25519`
- Check SSH config: `C:\Users\forev\.ssh\config`

**Error: Passphrase Prompt Every Time**
```powershell
# PowerShell as Administrator
Start-Service ssh-agent
Set-Service -Name ssh-agent -StartupType Automatic

# Regular PowerShell
ssh-add C:\Users\forev\.ssh\id_ed25519
```

---

### Issue: PM2 Not Starting

```bash
ssh stelliform
cd ~/apps

# Kill all node processes
pkill -f node

# Remove PM2 processes
pm2 delete all

# Start fresh
pm2 start ecosystem.config.js
pm2 save
```

---

### Issue: Port Already in Use

```bash
ssh stelliform

# Check what's using port 3000
ss -tlnp | grep 3000

# Check what's using port 3001
ss -tlnp | grep 3001

# Kill process on port (replace PID)
kill -9 <PID>

# Or kill all node processes
pkill -f node

# Restart PM2
pm2 restart all
```

---

## Useful Server Commands

### PM2 Process Management

```bash
# View all processes
pm2 status

# View logs (live)
pm2 logs

# View logs (last 50 lines)
pm2 logs --lines 50

# View specific process logs
pm2 logs stelliform-production --lines 50

# Restart specific process
pm2 restart stelliform-production

# Restart all
pm2 restart all

# Stop process
pm2 stop stelliform-production

# Delete process
pm2 delete stelliform-production

# Clear logs
pm2 flush

# Save current PM2 state
pm2 save

# View process details
pm2 show stelliform-production
```

### Git Commands on Server

```bash
ssh stelliform
cd ~/apps/stelliform-production

# Check current commit
git log --oneline -1

# Check for updates
git fetch
git status

# Pull latest
git pull origin master

# View what changed
git diff HEAD~1 HEAD

# List all branches
git branch -a
```

### System Monitoring

```bash
ssh stelliform

# Disk usage
df -h

# Memory usage
free -h

# CPU usage
top
# (press 'q' to quit)

# Check running processes
ps aux | grep node

# Network connections
ss -tulpn
```

---

## Best Practices

### Development
1. **Always test locally first** (`npm run dev`)
2. **Build before committing** (`npm run build`)
3. **Use descriptive commit messages**
4. **Commit frequently, push often**

### Deployment
1. **Always deploy to staging first**
2. **Test staging thoroughly before production**
3. **Deploy during low-traffic hours if possible**
4. **Create a backup tag before major releases**
5. **Monitor logs after deployment** (`pm2 logs`)

### Git
1. **Pull before making changes** (`git pull`)
2. **Don't commit node_modules** (already in .gitignore)
3. **Don't commit .env files** (secrets stay local)
4. **Use branches for major features** (optional)

### Security
1. **Never commit API keys or passwords**
2. **Keep dependencies updated** (`npm audit`)
3. **Use HTTPS only** (already configured)
4. **Monitor server logs regularly**

---

## Emergency Contacts

### Server Access
- **SSH Host**: stelliform (157.245.213.103)
- **User**: supafly04
- **SSH Config**: `C:\Users\forev\.ssh\config`

### Hosting
- **Provider**: DigitalOcean
- **Dashboard**: https://cloud.digitalocean.com

### Domain/DNS
- **Registrar**: (Check DigitalOcean or Cloudflare)
- **DNS**: Likely Cloudflare or DigitalOcean DNS

### Repository
- **GitHub**: https://github.com/Gunna1982/StelliformDigitalMarketing

---

## Cheat Sheet

### Local → Production (Full Workflow)
```bash
# 1. Develop locally
cd C:\dev\stelliformdigital
npm run dev

# 2. Commit changes
git add .
git commit -m "feat: new feature"
git push origin master

# 3. Deploy to staging
bash deploy-to-server.sh staging

# 4. Test staging
# Visit https://staging.stelliformdigital.com

# 5. Deploy to production
bash deploy-to-server.sh production

# 6. Verify production
# Visit https://stelliformdigital.com
```

### Quick Server Check
```bash
ssh stelliform
pm2 status
pm2 logs --lines 20
```

### Emergency Rollback
```bash
ssh stelliform
cd ~/apps/stelliform-production
git log --oneline -5
git reset --hard <previous-commit-hash>
npm ci && npm run build
pm2 restart stelliform-production
```

### Full Server Restart
```bash
ssh stelliform
pm2 restart all
pm2 logs --lines 50
```

---

## File Locations

### Local Machine
- **Project**: `C:\dev\stelliformdigital\`
- **SSH Config**: `C:\Users\forev\.ssh\config`
- **SSH Keys**: `C:\Users\forev\.ssh\id_ed25519`
- **Backups**: `C:\dev\backups\` (create if needed)

### Server
- **Apps Directory**: `~/apps/`
- **Staging**: `~/apps/stelliform-staging/`
- **Production**: `~/apps/stelliform-production/`
- **PM2 Config**: `~/apps/ecosystem.config.js`
- **Deploy Script**: `~/apps/deploy.sh`
- **Nginx Config**: `/etc/nginx/sites-available/stelliformdigital.com`
- **SSL Certs**: `/etc/letsencrypt/live/stelliformdigital.com/`

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **Nginx Docs**: https://nginx.org/en/docs/

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
**Maintained By**: Stelliform Digital Team
