#!/bin/bash
# Local Script: Deploy New Client Website
# Run this from Windows (Git Bash/WSL) to provision client on remote server
# Usage: ./deploy-new-client.sh

set -e

echo "=========================================="
echo "Deploy New Client - Local Script"
echo "=========================================="
echo ""
echo "This script will SSH to your server and set up a new client website."
echo ""

# Gather parameters
read -p "Server IP [157.245.213.103]: " SERVER_IP
SERVER_IP=${SERVER_IP:-157.245.213.103}

read -p "SSH Username [supafly04]: " SSH_USER
SSH_USER=${SSH_USER:-supafly04}

read -p "Domain name (e.g., example.com): " DOMAIN
read -p "Staging port (e.g., 3002): " STAGING_PORT
read -p "Production port (e.g., 3003): " PROD_PORT
read -p "Repository name (e.g., ClientWebsite): " REPO_NAME
read -p "GitHub username [Gunna1982]: " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-Gunna1982}

read -p "SSL provider (1=Let's Encrypt/Nginx, 2=Cloudflare/Caddy) [1]: " SSL_CHOICE
SSL_CHOICE=${SSL_CHOICE:-1}

# If Cloudflare, get API token
if [ "$SSL_CHOICE" == "2" ]; then
    read -p "Cloudflare API Token: " CF_API_TOKEN
fi

echo ""
echo "=========================================="
echo "Configuration Summary:"
echo "=========================================="
echo "Server: $SSH_USER@$SERVER_IP"
echo "Domain: $DOMAIN"
echo "Staging: staging.$DOMAIN:$STAGING_PORT"
echo "Production: $DOMAIN:$PROD_PORT"
echo "Repository: $REPO_NAME"
echo "SSL: $([ "$SSL_CHOICE" == "1" ] && echo "Let's Encrypt + Nginx" || echo "Cloudflare + Caddy")"
echo "=========================================="
echo ""
read -p "Continue with deployment? (y/n): " CONFIRM
[[ "$CONFIRM" != "y" ]] && echo "Aborted." && exit 1

# Create remote setup script with parameters
echo ""
echo "Building remote setup script..."

APP_NAME=$(echo "$DOMAIN" | sed 's/\./-/g' | sed 's/ /-/g')

cat > /tmp/remote-setup-${APP_NAME}.sh << 'EOFREMOTE'
#!/bin/bash
set -e

DOMAIN="REPLACE_DOMAIN"
STAGING_PORT=REPLACE_STAGING_PORT
PROD_PORT=REPLACE_PROD_PORT
REPO_NAME="REPLACE_REPO_NAME"
GITHUB_USER="REPLACE_GITHUB_USER"
SSL_CHOICE=REPLACE_SSL_CHOICE
CF_API_TOKEN="REPLACE_CF_TOKEN"
APP_NAME="REPLACE_APP_NAME"

echo "=========================================="
echo "Remote Setup Starting..."
echo "=========================================="
echo "Domain: $DOMAIN"
echo "Ports: $STAGING_PORT (staging), $PROD_PORT (production)"
echo ""

# Step 1: Update system
echo "[1/8] Updating system..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git

# Install SSL provider
if [ "$SSL_CHOICE" == "1" ]; then
    echo "Installing Nginx + Certbot..."
    sudo apt install -y nginx certbot python3-certbot-nginx
fi

# Step 2: Install Node.js LTS
echo ""
echo "[2/8] Installing Node.js LTS..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "✓ Node.js: $(node --version)"

# Step 3: Install PM2
echo ""
echo "[3/8] Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    pm2 startup | grep -oP "sudo env.*" | bash || true
fi
echo "✓ PM2: $(pm2 --version)"

# Step 4: Create directories
echo ""
echo "[4/8] Setting up directories..."
mkdir -p ~/apps/${REPO_NAME}-staging
mkdir -p ~/apps/${REPO_NAME}-production

# Step 5: Create Next.js projects
echo ""
echo "[5/8] Creating Next.js projects..."

if [ ! -f ~/apps/${REPO_NAME}-staging/package.json ]; then
    cd ~/apps/${REPO_NAME}-staging
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
fi

if [ ! -f ~/apps/${REPO_NAME}-production/package.json ]; then
    cd ~/apps/${REPO_NAME}-production
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
fi

# Step 6: Build applications
echo ""
echo "[6/8] Building applications..."
cd ~/apps/${REPO_NAME}-staging
npm install && npm run build

cd ~/apps/${REPO_NAME}-production
npm install && npm run build

# Step 7: Create PM2 ecosystem
echo ""
echo "[7/8] Creating PM2 configuration..."
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

pm2 delete ${APP_NAME}-staging 2>/dev/null || true
pm2 delete ${APP_NAME}-production 2>/dev/null || true
pm2 start ~/apps/${REPO_NAME}-ecosystem.config.js
pm2 save

# Step 8: Configure reverse proxy
echo ""
echo "[8/8] Configuring reverse proxy..."

if [ "$SSL_CHOICE" == "1" ]; then
    # Nginx
    sudo tee /etc/nginx/sites-available/staging.${DOMAIN} > /dev/null << 'EOFNGINX'
server {
    listen 80;
    server_name staging.${DOMAIN};
    location / {
        proxy_pass http://127.0.0.1:${STAGING_PORT};
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

    sudo tee /etc/nginx/sites-available/${DOMAIN} > /dev/null << 'EOFNGINX'
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    location / {
        proxy_pass http://127.0.0.1:${PROD_PORT};
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

    sudo ln -sf /etc/nginx/sites-available/staging.${DOMAIN} /etc/nginx/sites-enabled/
    sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl reload nginx
fi

echo ""
echo "=========================================="
echo "✓ Remote Setup Complete!"
echo "=========================================="
pm2 list
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. ADD DNS RECORDS:"
echo "   $DOMAIN → $(curl -s ifconfig.me)"
echo "   www.$DOMAIN → $(curl -s ifconfig.me)"
echo "   staging.$DOMAIN → $(curl -s ifconfig.me)"
echo ""
if [ "$SSL_CHOICE" == "1" ]; then
    echo "2. After DNS propagates, run SSL setup:"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo "   sudo certbot --nginx -d staging.$DOMAIN"
fi
echo ""
EOFREMOTE

# Replace placeholders
sed -i "s/REPLACE_DOMAIN/$DOMAIN/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_STAGING_PORT/$STAGING_PORT/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_PROD_PORT/$PROD_PORT/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_REPO_NAME/$REPO_NAME/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_GITHUB_USER/$GITHUB_USER/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_SSL_CHOICE/$SSL_CHOICE/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_CF_TOKEN/${CF_API_TOKEN:-none}/g" /tmp/remote-setup-${APP_NAME}.sh
sed -i "s/REPLACE_APP_NAME/$APP_NAME/g" /tmp/remote-setup-${APP_NAME}.sh

echo "✓ Remote script built"

# Upload script to server
echo ""
echo "Uploading script to server..."
scp /tmp/remote-setup-${APP_NAME}.sh ${SSH_USER}@${SERVER_IP}:~/

echo "✓ Script uploaded"

# Execute remotely
echo ""
echo "=========================================="
echo "Executing remote setup..."
echo "=========================================="
echo ""

ssh ${SSH_USER}@${SERVER_IP} "chmod +x ~/remote-setup-${APP_NAME}.sh && ~/remote-setup-${APP_NAME}.sh"

# Cleanup
rm /tmp/remote-setup-${APP_NAME}.sh

echo ""
echo "=========================================="
echo "✓ Deployment Complete!"
echo "=========================================="
echo ""
echo "Your client website is now running:"
echo "  http://staging.$DOMAIN"
echo "  http://$DOMAIN"
echo ""
echo "Next steps:"
echo "1. Add DNS records (see output above)"
echo "2. Wait for DNS propagation"
if [ "$SSL_CHOICE" == "1" ]; then
    echo "3. SSH to server and run SSL setup:"
    echo "   ssh ${SSH_USER}@${SERVER_IP}"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo "   sudo certbot --nginx -d staging.$DOMAIN"
fi
echo ""
