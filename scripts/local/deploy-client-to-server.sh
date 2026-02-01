#!/bin/bash
# Step 2: Deploy Client to Server
# Clones GitHub repo to server, sets up PM2 + Nginx/Caddy
# Run this AFTER creating project locally and pushing to GitHub

set -e

echo "=========================================="
echo "Deploy Client to Server"
echo "=========================================="
echo ""

# Gather parameters
read -p "GitHub repository (user/repo): " GITHUB_REPO
read -p "Domain (e.g., plasticsurguryexperts.com): " DOMAIN
read -p "Staging port [3002]: " STAGING_PORT
STAGING_PORT=${STAGING_PORT:-3002}
read -p "Production port [3003]: " PROD_PORT
PROD_PORT=${PROD_PORT:-3003}
read -p "Server IP [157.245.213.103]: " SERVER_IP
SERVER_IP=${SERVER_IP:-157.245.213.103}
read -p "SSH Username [supafly04]: " SSH_USER
SSH_USER=${SSH_USER:-supafly04}
read -p "SSL provider (1=Let's Encrypt/Nginx, 2=Cloudflare/Caddy) [1]: " SSL_CHOICE
SSL_CHOICE=${SSL_CHOICE:-1}

# Extract repo name from GitHub URL
REPO_NAME=$(echo "$GITHUB_REPO" | cut -d'/' -f2)
APP_NAME=$(echo "$DOMAIN" | sed 's/\./-/g')

echo ""
echo "=========================================="
echo "Configuration:"
echo "=========================================="
echo "GitHub: https://github.com/${GITHUB_REPO}"
echo "Repository: $REPO_NAME"
echo "Domain: $DOMAIN"
echo "Server: ${SSH_USER}@${SERVER_IP}"
echo "Staging: staging.$DOMAIN:$STAGING_PORT"
echo "Production: $DOMAIN:$PROD_PORT"
echo "SSL: $([ "$SSL_CHOICE" == "1" ] && echo "Let's Encrypt + Nginx" || echo "Cloudflare + Caddy")"
echo "=========================================="
echo ""
read -p "Continue? (y/n): " CONFIRM
[[ "$CONFIRM" != "y" ]] && echo "Aborted." && exit 1

# Create remote deployment script
echo ""
echo "Building remote deployment script..."

cat > /tmp/deploy-${APP_NAME}.sh << 'EOFREMOTE'
#!/bin/bash
set -e

GITHUB_REPO="REPLACE_GITHUB_REPO"
REPO_NAME="REPLACE_REPO_NAME"
DOMAIN="REPLACE_DOMAIN"
STAGING_PORT=REPLACE_STAGING_PORT
PROD_PORT=REPLACE_PROD_PORT
SSL_CHOICE=REPLACE_SSL_CHOICE
APP_NAME="REPLACE_APP_NAME"

echo "=========================================="
echo "Server Deployment Starting..."
echo "=========================================="
echo ""

# Step 1: Update system and install dependencies
echo "[1/7] Updating system and installing dependencies..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git

if [ "$SSL_CHOICE" == "1" ]; then
    sudo apt install -y nginx certbot python3-certbot-nginx
fi

# Step 2: Install Node.js
echo ""
echo "[2/7] Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "✓ Node.js: $(node --version)"

# Step 3: Install PM2
echo ""
echo "[3/7] Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
    pm2 startup | grep -oP "sudo env.*" | bash || true
fi
echo "✓ PM2: $(pm2 --version)"

# Step 4: Clone repositories
echo ""
echo "[4/7] Cloning repositories from GitHub..."

# Staging
if [ -d ~/apps/${REPO_NAME}-staging/.git ]; then
    echo "Staging exists, pulling latest..."
    cd ~/apps/${REPO_NAME}-staging
    git pull origin main || git pull origin master
else
    echo "Cloning staging environment..."
    git clone https://github.com/${GITHUB_REPO}.git ~/apps/${REPO_NAME}-staging
fi

# Production
if [ -d ~/apps/${REPO_NAME}-production/.git ]; then
    echo "Production exists, pulling latest..."
    cd ~/apps/${REPO_NAME}-production
    git pull origin main || git pull origin master
else
    echo "Cloning production environment..."
    git clone https://github.com/${GITHUB_REPO}.git ~/apps/${REPO_NAME}-production
fi

echo "✓ Repositories cloned"

# Step 5: Install dependencies and build
echo ""
echo "[5/7] Building applications..."

# Staging
cd ~/apps/${REPO_NAME}-staging
npm install
npm run build

# Production
cd ~/apps/${REPO_NAME}-production
npm install
npm run build

echo "✓ Applications built"

# Step 6: Create PM2 ecosystem
echo ""
echo "[6/7] Creating PM2 configuration..."
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

# Stop and restart PM2 apps
pm2 delete ${APP_NAME}-staging 2>/dev/null || true
pm2 delete ${APP_NAME}-production 2>/dev/null || true
pm2 start ~/apps/${REPO_NAME}-ecosystem.config.js
pm2 save

echo "✓ PM2 processes started"

# Step 7: Configure Nginx
if [ "$SSL_CHOICE" == "1" ]; then
    echo ""
    echo "[7/7] Configuring Nginx..."

    # Staging
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

    # Production
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

    echo "✓ Nginx configured"
fi

echo ""
echo "=========================================="
echo "✓ Deployment Complete!"
echo "=========================================="
echo ""
pm2 list
echo ""
echo "Sites running:"
echo "  Staging: http://staging.$DOMAIN → :$STAGING_PORT"
echo "  Production: http://$DOMAIN → :$PROD_PORT"
echo ""
echo "=========================================="
echo "NEXT STEPS:"
echo "=========================================="
echo ""
echo "1. ADD DNS RECORDS:"
echo "   A: $DOMAIN → $(curl -s ifconfig.me)"
echo "   A: www.$DOMAIN → $(curl -s ifconfig.me)"
echo "   A: staging.$DOMAIN → $(curl -s ifconfig.me)"
echo ""
if [ "$SSL_CHOICE" == "1" ]; then
    echo "2. WAIT for DNS propagation (dig $DOMAIN)"
    echo ""
    echo "3. INSTALL SSL (after DNS propagates):"
    echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo "   sudo certbot --nginx -d staging.$DOMAIN"
fi
echo ""
EOFREMOTE

# Replace placeholders
sed -i "s|REPLACE_GITHUB_REPO|$GITHUB_REPO|g" /tmp/deploy-${APP_NAME}.sh
sed -i "s/REPLACE_REPO_NAME/$REPO_NAME/g" /tmp/deploy-${APP_NAME}.sh
sed -i "s/REPLACE_DOMAIN/$DOMAIN/g" /tmp/deploy-${APP_NAME}.sh
sed -i "s/REPLACE_STAGING_PORT/$STAGING_PORT/g" /tmp/deploy-${APP_NAME}.sh
sed -i "s/REPLACE_PROD_PORT/$PROD_PORT/g" /tmp/deploy-${APP_NAME}.sh
sed -i "s/REPLACE_SSL_CHOICE/$SSL_CHOICE/g" /tmp/deploy-${APP_NAME}.sh
sed -i "s/REPLACE_APP_NAME/$APP_NAME/g" /tmp/deploy-${APP_NAME}.sh

echo "✓ Deployment script built"

# Upload and execute
echo ""
echo "Uploading to server..."
scp /tmp/deploy-${APP_NAME}.sh ${SSH_USER}@${SERVER_IP}:~/

echo "✓ Uploaded"
echo ""
echo "=========================================="
echo "Executing remote deployment..."
echo "=========================================="
echo ""

ssh ${SSH_USER}@${SERVER_IP} "chmod +x ~/deploy-${APP_NAME}.sh && ~/deploy-${APP_NAME}.sh"

# Cleanup
rm /tmp/deploy-${APP_NAME}.sh

echo ""
echo "=========================================="
echo "✓ Client Deployed Successfully!"
echo "=========================================="
echo ""
echo "Access your sites:"
echo "  http://staging.$DOMAIN"
echo "  http://$DOMAIN"
echo ""
echo "After adding DNS and SSL:"
echo "  https://staging.$DOMAIN"
echo "  https://$DOMAIN"
echo ""
