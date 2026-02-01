#!/bin/bash
# Universal Client Setup Script
# Works for any domain with custom ports and SSL provider
# Usage: ./new-client-setup.sh

set -e

echo "=========================================="
echo "New Client Setup - Universal Script"
echo "=========================================="
echo ""

# Gather parameters
read -p "Domain name (e.g., example.com): " DOMAIN
read -p "Staging port (e.g., 3002): " STAGING_PORT
read -p "Production port (e.g., 3003): " PROD_PORT
read -p "Repository name (e.g., ClientWebsite): " REPO_NAME
read -p "GitHub username [Gunna1982]: " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-Gunna1982}

read -p "SSL provider (1=Let's Encrypt/Nginx, 2=Cloudflare/Caddy) [1]: " SSL_CHOICE
SSL_CHOICE=${SSL_CHOICE:-1}

echo ""
echo "Configuration:"
echo "  Domain: $DOMAIN"
echo "  Staging: staging.$DOMAIN:$STAGING_PORT"
echo "  Production: $DOMAIN:$PROD_PORT"
echo "  Repository: $REPO_NAME"
echo "  SSL: $([ "$SSL_CHOICE" == "1" ] && echo "Let's Encrypt + Nginx" || echo "Cloudflare + Caddy")"
echo ""
read -p "Continue? (y/n): " CONFIRM
[[ "$CONFIRM" != "y" ]] && echo "Aborted." && exit 1

# Step 1: Update system
echo ""
echo "[1/8] Updating system..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git

# Install SSL provider
if [ "$SSL_CHOICE" == "1" ]; then
    echo "Installing Nginx + Certbot..."
    sudo apt install -y nginx certbot python3-certbot-nginx
else
    echo "Installing Caddy (will require Cloudflare token later)..."
    # Caddy installation handled separately
    sudo apt install -y golang-go
fi

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
if [ ! -f ~/apps/${REPO_NAME}-staging/package.json ]; then
    echo "Creating staging Next.js app..."
    cd ~/apps/${REPO_NAME}-staging
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
else
    echo "Staging app already exists, pulling latest..."
    cd ~/apps/${REPO_NAME}-staging
    git pull 2>/dev/null || echo "No git repo yet"
fi

# Production
if [ ! -f ~/apps/${REPO_NAME}-production/package.json ]; then
    echo "Creating production Next.js app..."
    cd ~/apps/${REPO_NAME}-production
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
else
    echo "Production app already exists, pulling latest..."
    cd ~/apps/${REPO_NAME}-production
    git pull 2>/dev/null || echo "No git repo yet"
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

# Sanitize app name (replace dots/spaces with dashes)
APP_NAME=$(echo "$DOMAIN" | sed 's/\./-/g' | sed 's/ /-/g')

cat > ~/apps/${REPO_NAME}-ecosystem.config.js << EOFPM2
module.exports = {
  apps: [
    {
      name: "${APP_NAME}-staging",
      cwd: "$HOME/apps/${REPO_NAME}-staging",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p ${STAGING_PORT}",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "${STAGING_PORT}",
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://staging.${DOMAIN}"
      }
    },
    {
      name: "${APP_NAME}-production",
      cwd: "$HOME/apps/${REPO_NAME}-production",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p ${PROD_PORT}",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "${PROD_PORT}",
        HOSTNAME: "127.0.0.1",
        NEXT_PUBLIC_SITE_URL: "https://${DOMAIN}"
      }
    }
  ]
};
EOFPM2

# Stop any existing instances
pm2 delete ${APP_NAME}-staging 2>/dev/null || true
pm2 delete ${APP_NAME}-production 2>/dev/null || true

# Start both environments
pm2 start ~/apps/${REPO_NAME}-ecosystem.config.js
pm2 save

echo "✓ PM2 processes started"

# Step 8: Configure reverse proxy
echo ""
echo "[8/8] Configuring reverse proxy..."

if [ "$SSL_CHOICE" == "1" ]; then
    # Nginx configuration
    echo "Configuring Nginx..."

    # Staging config
    sudo tee /etc/nginx/sites-available/staging.${DOMAIN} > /dev/null << EOFNGINX
server {
    listen 80;
    server_name staging.${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${STAGING_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOFNGINX

    # Production config
    sudo tee /etc/nginx/sites-available/${DOMAIN} > /dev/null << EOFNGINX
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${PROD_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
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

else
    # Caddy configuration
    echo "Configuring Caddy..."
    read -p "Enter Cloudflare API Token: " CF_API_TOKEN

    # Append to Caddyfile
    sudo tee -a /etc/caddy/Caddyfile > /dev/null << EOFCADDY

# ${DOMAIN} - Staging
staging.${DOMAIN} {
    reverse_proxy 127.0.0.1:${STAGING_PORT}
    tls {
        dns cloudflare {env.CF_API_TOKEN_${APP_NAME}}
    }
    encode gzip
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}

# ${DOMAIN} - Production
${DOMAIN}, www.${DOMAIN} {
    reverse_proxy 127.0.0.1:${PROD_PORT}
    tls {
        dns cloudflare {env.CF_API_TOKEN_${APP_NAME}}
    }
    encode gzip
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
EOFCADDY

    # Update Caddy service with env var
    sudo sed -i "/\[Service\]/a Environment=\"CF_API_TOKEN_${APP_NAME}=${CF_API_TOKEN}\"" /etc/systemd/system/caddy.service

    sudo systemctl daemon-reload
    sudo systemctl reload caddy

    echo "✓ Caddy configured"
fi

echo ""
echo "=========================================="
echo "✓ Setup Complete!"
echo "=========================================="
echo ""
echo "PM2 Processes:"
pm2 list
echo ""
echo "Sites running:"
echo "  Staging:    http://staging.$DOMAIN → :$STAGING_PORT"
echo "  Production: http://$DOMAIN → :$PROD_PORT"
echo ""
echo "=========================================="
echo "NEXT STEPS:"
echo "=========================================="
echo ""
echo "1. ADD DNS RECORDS:"
echo "   A record: $DOMAIN → $(curl -s ifconfig.me)"
echo "   A record: www.$DOMAIN → $(curl -s ifconfig.me)"
echo "   A record: staging.$DOMAIN → $(curl -s ifconfig.me)"
echo ""

if [ "$SSL_CHOICE" == "1" ]; then
    echo "2. WAIT for DNS propagation (check: dig $DOMAIN)"
    echo ""
    echo "3. INSTALL SSL CERTIFICATES:"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo "   sudo certbot --nginx -d staging.$DOMAIN"
else
    echo "2. SET Cloudflare DNS to point to this server"
    echo ""
    echo "3. SSL will be automatic via Cloudflare + Caddy"
fi

echo ""
echo "4. INITIALIZE GIT REPOSITORY:"
echo "   cd ~/apps/${REPO_NAME}-staging"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'feat: initial Next.js setup for ${DOMAIN}'"
echo "   gh repo create ${GITHUB_USER}/${REPO_NAME} --private --source=. --remote=origin --push"
echo ""
echo "=========================================="
echo ""
