#!/bin/bash
# Nginx Configuration for Stelliform Digital
# Run this AFTER server-setup.sh completes

echo "Setting up Nginx for stelliformdigital.com..."

# Create Nginx config
sudo tee /etc/nginx/sites-available/stelliformdigital.com > /dev/null << 'EOF'
server {
    listen 80;
    server_name stelliformdigital.com www.stelliformdigital.com;

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

# Enable the site
sudo ln -sf /etc/nginx/sites-available/stelliformdigital.com /etc/nginx/sites-enabled/

# Test Nginx config
echo ""
echo "Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx
echo ""
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo ""
echo "=========================================="
echo "✓ Nginx Configuration Complete!"
echo "=========================================="
echo ""
echo "The site is now accessible at:"
echo "  http://157.245.213.103"
echo ""
echo "Once you point your domain in Cloudflare:"
echo "  http://stelliformdigital.com"
echo ""
echo "To add SSL after DNS is pointed:"
echo "  sudo apt install certbot python3-certbot-nginx -y"
echo "  sudo certbot --nginx -d stelliformdigital.com -d www.stelliformdigital.com"
echo ""
