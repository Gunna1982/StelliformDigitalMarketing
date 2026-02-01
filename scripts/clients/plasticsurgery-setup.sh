#!/bin/bash
# Complete Setup for Plastic Surgery Experts
# Domain: plasticsurguryexperts.com
# Ports: 3002 (staging), 3003 (production)
# SSL: Let's Encrypt via Certbot

set -e

DOMAIN="plasticsurguryexperts.com"
STAGING_PORT=3002
PROD_PORT=3003
REPO_NAME="PlasticSurgeryExperts"
GITHUB_USER="Gunna1982"

echo "=========================================="
echo "Plastic Surgery Experts - Complete Setup"
echo "=========================================="
echo "Domain: $DOMAIN"
echo "Staging: staging.$DOMAIN:$STAGING_PORT"
echo "Production: $DOMAIN:$PROD_PORT"
echo ""

# Step 1: Update system
echo "[1/8] Updating system..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx

# Step 2: Install Node.js LTS (if not installed)
echo ""
echo "[2/8] Installing Node.js LTS..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "✓ Node.js: $(node --version)"
echo "✓ NPM: $(npm --version)"

# Step 3: Install PM2
echo ""
echo "[3/8] Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    pm2 startup | grep -oP "sudo env.*" | bash || true
fi
echo "✓ PM2: $(pm2 --version)"

# Step 4: Create directory structure
echo ""
echo "[4/8] Setting up directories..."
mkdir -p ~/apps/${REPO_NAME}-staging
mkdir -p ~/apps/${REPO_NAME}-production

# Step 5: Create new Next.js project
echo ""
echo "[5/8] Creating Next.js projects..."

# Staging
if [ ! -d ~/apps/${REPO_NAME}-staging/package.json ]; then
    echo "Creating staging Next.js app..."
    cd ~/apps/${REPO_NAME}-staging
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
else
    echo "Staging app already exists"
fi

# Production
if [ ! -d ~/apps/${REPO_NAME}-production/package.json ]; then
    echo "Creating production Next.js app..."
    cd ~/apps/${REPO_NAME}-production
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
else
    echo "Production app already exists"
fi

echo "✓ Next.js projects created"

# Step 6: Build applications
echo ""
echo "[6/8] Building applications..."

cd ~/apps/${REPO_NAME}-staging
npm install
npm run build

cd ~/apps/${REPO_NAME}-production
npm install
npm run build

echo "✓ Applications built"

# Step 7: Create PM2 ecosystem
echo ""
echo "[7/8] Creating PM2 configuration..."
cat > ~/apps/${REPO_NAME}-ecosystem.config.js << 'EOFPM2'
module.exports = {
  apps: [
    {
      name: "plasticsurgery-staging",
      cwd: "/home/supafly04/apps/PlasticSurgeryExperts-staging",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3002",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://staging.plasticsurguryexperts.com"
      }
    },
    {
      name: "plasticsurgery-production",
      cwd: "/home/supafly04/apps/PlasticSurgeryExperts-production",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3003",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3003",
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://plasticsurguryexperts.com"
      }
    }
  ]
};
EOFPM2

# Stop any existing instances
pm2 delete plasticsurgery-staging 2>/dev/null || true
pm2 delete plasticsurgery-production 2>/dev/null || true

# Start both environments
pm2 start ~/apps/${REPO_NAME}-ecosystem.config.js
pm2 save

echo "✓ PM2 processes started"

# Step 8: Configure Nginx
echo ""
echo "[8/8] Configuring Nginx..."

# Staging config
sudo tee /etc/nginx/sites-available/staging.${DOMAIN} > /dev/null << 'EOFNGINX'
server {
    listen 80;
    server_name staging.plasticsurguryexperts.com;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOFNGINX

# Production config
sudo tee /etc/nginx/sites-available/${DOMAIN} > /dev/null << 'EOFNGINX'
server {
    listen 80;
    server_name plasticsurguryexperts.com www.plasticsurguryexperts.com;

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOFNGINX

# Enable sites
sudo ln -sf /etc/nginx/sites-available/staging.${DOMAIN} /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx

echo "✓ Nginx configured"

echo ""
echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "PM2 Processes:"
pm2 list
echo ""
echo "Sites running (HTTP only):"
echo "  Staging:    http://staging.$DOMAIN → :$STAGING_PORT"
echo "  Production: http://$DOMAIN → :$PROD_PORT"
echo ""
echo "=========================================="
echo "NEXT STEPS (CRITICAL):"
echo "=========================================="
echo ""
echo "1. ADD DNS RECORDS (at your domain registrar):"
echo "   A record: $DOMAIN → 157.245.213.103"
echo "   A record: www.$DOMAIN → 157.245.213.103"
echo "   A record: staging.$DOMAIN → 157.245.213.103"
echo ""
echo "2. WAIT for DNS propagation (5-30 minutes)"
echo "   Check with: dig $DOMAIN"
echo ""
echo "3. INSTALL SSL CERTIFICATES (after DNS propagates):"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "   sudo certbot --nginx -d staging.$DOMAIN"
echo ""
echo "4. INITIALIZE GIT REPOSITORY:"
echo "   cd ~/apps/${REPO_NAME}-staging"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'feat: initial Next.js setup for Plastic Surgery Experts'"
echo "   gh repo create ${GITHUB_USER}/${REPO_NAME} --private --source=. --remote=origin --push"
echo ""
echo "=========================================="
echo ""
