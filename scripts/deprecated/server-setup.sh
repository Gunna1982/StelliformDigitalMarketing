#!/bin/bash
# Stelliform Digital Server Setup Script
# Run this on the stelliform server (157.245.213.103)

set -e  # Exit on any error

echo "=========================================="
echo "Stelliform Digital - Server Setup"
echo "=========================================="

# Step 1: Check/Install Node.js
echo ""
echo "[1/7] Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✓ Node.js installed: $(node --version)"
else
    echo "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "✓ Node.js installed: $(node --version)"
fi

# Step 2: Check/Install PM2
echo ""
echo "[2/7] Checking PM2..."
if command -v pm2 &> /dev/null; then
    echo "✓ PM2 installed: $(pm2 --version)"
else
    echo "Installing PM2..."
    sudo npm install -g pm2
    echo "✓ PM2 installed: $(pm2 --version)"
fi

# Step 3: Check/Install Nginx
echo ""
echo "[3/7] Checking Nginx..."
if command -v nginx &> /dev/null; then
    echo "✓ Nginx installed"
else
    echo "Installing Nginx..."
    sudo apt update
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo "✓ Nginx installed"
fi

# Step 4: Create apps directory and clone repo
echo ""
echo "[4/7] Setting up application directory..."
mkdir -p ~/apps
cd ~/apps

if [ -d "stelliformdigital" ]; then
    echo "Directory exists, pulling latest..."
    cd stelliformdigital
    git pull origin master
else
    echo "Cloning repository..."
    git clone https://github.com/Gunna1982/StelliformDigitalMarketing.git stelliformdigital
    cd stelliformdigital
fi
echo "✓ Repository ready"

# Step 5: Install dependencies
echo ""
echo "[5/7] Installing npm dependencies..."
npm install
echo "✓ Dependencies installed"

# Step 6: Build the application
echo ""
echo "[6/7] Building Next.js application..."
npm run build
echo "✓ Build complete"

# Step 7: Create PM2 ecosystem file
echo ""
echo "[7/7] Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: "stelliformdigital",
    cwd: "/home/supafly04/apps/stelliformdigital",
    script: "node_modules/next/dist/bin/next",
    args: "start -H 127.0.0.1 -p 3000",
    exec_mode: "fork",
    instances: 1,
    autorestart: true,
    max_memory_restart: "500M",
    env: {
      NODE_ENV: "production",
      PORT: "3000",
      HOSTNAME: "127.0.0.1"
    }
  }]
};
EOF
echo "✓ PM2 config created"

# Start with PM2
echo ""
echo "Starting application with PM2..."
pm2 delete stelliformdigital 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo ""
echo "=========================================="
echo "✓ Application Setup Complete!"
echo "=========================================="
echo ""
echo "App running on: http://127.0.0.1:3000"
echo ""
echo "Next step: Configure Nginx"
echo "Run: sudo nano /etc/nginx/sites-available/stelliformdigital.com"
echo ""
pm2 list
