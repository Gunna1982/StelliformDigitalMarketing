#!/bin/bash
# Nginx with Let's Encrypt SSL Setup
# Simpler alternative to Caddy

set -e

echo "=========================================="
echo "Setting up Nginx with SSL"
echo "=========================================="

# Install Certbot for SSL
echo ""
echo "[1/4] Installing Certbot..."
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Create Nginx config for both domains
echo ""
echo "[2/4] Creating Nginx configurations..."

# Staging configuration
sudo tee /etc/nginx/sites-available/staging.stelliformdigital.com > /dev/null << 'EOF'
server {
    listen 80;
    server_name staging.stelliformdigital.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
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
EOF

# Production configuration
sudo tee /etc/nginx/sites-available/stelliformdigital.com > /dev/null << 'EOF'
server {
    listen 80;
    server_name stelliformdigital.com www.stelliformdigital.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
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
EOF

# Enable sites
echo ""
echo "[3/4] Enabling sites..."
sudo ln -sf /etc/nginx/sites-available/staging.stelliformdigital.com /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/stelliformdigital.com /etc/nginx/sites-enabled/

# Test and reload Nginx
echo ""
echo "[4/4] Testing and reloading Nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=========================================="
echo "✓ Nginx Configuration Complete!"
echo "=========================================="
echo ""
echo "Sites configured (HTTP only for now):"
echo "  http://staging.stelliformdigital.com → :3000"
echo "  http://stelliformdigital.com → :3001"
echo ""
echo "IMPORTANT: After DNS is pointing to this server, run:"
echo ""
echo "  sudo certbot --nginx -d stelliformdigital.com -d www.stelliformdigital.com"
echo "  sudo certbot --nginx -d staging.stelliformdigital.com"
echo ""
echo "This will add SSL certificates automatically."
echo ""
