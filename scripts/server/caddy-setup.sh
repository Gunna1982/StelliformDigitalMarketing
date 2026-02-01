#!/bin/bash
# Caddy Configuration for Stelliform Digital
# Sets up staging.stelliformdigital.com (port 3000) and stelliformdigital.com (port 3001)

echo "Setting up Caddy for Stelliform Digital..."

# Prompt for Cloudflare API token
echo ""
read -p "Enter your Cloudflare API Token: " CF_API_TOKEN

# Create Caddyfile
sudo tee /etc/caddy/Caddyfile > /dev/null << EOF
# Staging environment
staging.stelliformdigital.com {
    reverse_proxy 127.0.0.1:3000

    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }

    encode gzip

    header {
        # Security headers
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}

# Production environment
stelliformdigital.com, www.stelliformdigital.com {
    reverse_proxy 127.0.0.1:3001

    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }

    encode gzip

    header {
        # Security headers
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
EOF

# Create systemd service for Caddy
sudo tee /etc/systemd/system/caddy.service > /dev/null << EOF
[Unit]
Description=Caddy
Documentation=https://caddyserver.com/docs/
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
User=root
Group=root
ExecStart=/usr/bin/caddy run --environ --config /etc/caddy/Caddyfile
ExecReload=/usr/bin/caddy reload --config /etc/caddy/Caddyfile
TimeoutStopSec=5s
LimitNOFILE=1048576
LimitNPROC=512
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_BIND_SERVICE
Environment="CF_API_TOKEN=$CF_API_TOKEN"

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and start Caddy
sudo systemctl daemon-reload
sudo systemctl enable caddy
sudo systemctl restart caddy

echo ""
echo "=========================================="
echo "✓ Caddy Configuration Complete!"
echo "=========================================="
echo ""
echo "Domains configured:"
echo "  Staging:    https://staging.stelliformdigital.com → :3000"
echo "  Production: https://stelliformdigital.com → :3001"
echo ""
echo "Caddy status:"
sudo systemctl status caddy --no-pager
echo ""
echo "Next steps:"
echo "1. Add these DNS records in Cloudflare:"
echo "   - A record: stelliformdigital.com → 157.245.213.103"
echo "   - A record: www.stelliformdigital.com → 157.245.213.103"
echo "   - A record: staging.stelliformdigital.com → 157.245.213.103"
echo ""
echo "2. Set Cloudflare SSL mode to 'Full (strict)'"
echo ""
echo "3. Test sites:"
echo "   https://stelliformdigital.com"
echo "   https://staging.stelliformdigital.com"
echo ""
