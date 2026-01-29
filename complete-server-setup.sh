#!/bin/bash
# Complete Stelliform Digital Server Setup
# Creates staging (port 3000) and production (port 3001) environments

set -e

echo "=========================================="
echo "Stelliform Digital - Complete Setup"
echo "=========================================="

# Step 1: Update and install basic tools
echo ""
echo "[1/8] Updating system and installing basic tools..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl jq git

# Step 2: Install Node.js LTS
echo ""
echo "[2/8] Installing Node.js LTS..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "✓ Node.js installed: $(node --version)"
echo "✓ NPM installed: $(npm --version)"

# Step 3: Install PM2
echo ""
echo "[3/8] Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    pm2 startup | grep -oP "sudo env.*" | bash || true
fi
echo "✓ PM2 installed: $(pm2 --version)"

# Step 4: Install Caddy with Cloudflare Module
echo ""
echo "[4/8] Installing Caddy with Cloudflare module..."
if ! command -v caddy &> /dev/null; then
    sudo apt install -y golang-go
    go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest
    export PATH=$PATH:$(go env GOPATH)/bin
    xcaddy build --with github.com/caddy-dns/cloudflare
    sudo mv caddy /usr/bin/caddy
    sudo chmod +x /usr/bin/caddy
fi
echo "✓ Caddy installed"

# Step 5: Setup directory structure
echo ""
echo "[5/8] Setting up directory structure..."
mkdir -p ~/apps/stelliform-staging
mkdir -p ~/apps/stelliform-production
sudo mkdir -p /var/www/clients
sudo chown -R $USER:$USER /var/www/clients

# Step 6: Clone repository for both environments
echo ""
echo "[6/8] Cloning repository for staging and production..."

# Staging
if [ -d ~/apps/stelliform-staging/.git ]; then
    echo "Staging exists, pulling latest..."
    cd ~/apps/stelliform-staging
    git pull origin master
else
    echo "Cloning staging..."
    git clone -b master https://github.com/Gunna1982/StelliformDigitalMarketing.git ~/apps/stelliform-staging
fi

# Production
if [ -d ~/apps/stelliform-production/.git ]; then
    echo "Production exists, pulling latest..."
    cd ~/apps/stelliform-production
    git pull origin master
else
    echo "Cloning production..."
    git clone -b master https://github.com/Gunna1982/StelliformDigitalMarketing.git ~/apps/stelliform-production
fi

echo "✓ Repositories ready"

# Step 7: Install dependencies and build
echo ""
echo "[7/8] Installing dependencies and building applications..."

# Staging
echo "Building staging environment..."
cd ~/apps/stelliform-staging
npm install
npm run build

# Production
echo "Building production environment..."
cd ~/apps/stelliform-production
npm install
npm run build

echo "✓ Applications built"

# Step 8: Create PM2 ecosystem file
echo ""
echo "[8/8] Creating PM2 configuration..."
cat > ~/apps/stelliform-ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: "stelliform-staging",
      cwd: "/home/supafly04/apps/stelliform-staging",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://staging.stelliformdigital.com"
      }
    },
    {
      name: "stelliform-production",
      cwd: "/home/supafly04/apps/stelliform-production",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3001",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://stelliformdigital.com"
      }
    }
  ]
};
EOF

# Stop any existing instances
pm2 delete stelliform-staging 2>/dev/null || true
pm2 delete stelliform-production 2>/dev/null || true

# Start both environments
pm2 start ~/apps/stelliform-ecosystem.config.js
pm2 save

echo ""
echo "=========================================="
echo "✓ Complete Setup Finished!"
echo "=========================================="
echo ""
echo "Environments running:"
echo "  Staging:    http://127.0.0.1:3000"
echo "  Production: http://127.0.0.1:3001"
echo ""
echo "Next steps:"
echo "  1. Configure Caddy for domains"
echo "  2. Set up Cloudflare DNS"
echo "  3. Add Cloudflare API token for SSL"
echo ""
pm2 list
