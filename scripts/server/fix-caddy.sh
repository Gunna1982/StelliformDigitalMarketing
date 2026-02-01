#!/bin/bash
# Fix Caddy installation

set -e

echo "=========================================="
echo "Fixing Caddy Installation"
echo "=========================================="

# Stop and remove existing caddy service
echo "Cleaning up existing Caddy..."
sudo systemctl stop caddy 2>/dev/null || true
sudo systemctl disable caddy 2>/dev/null || true
sudo rm -f /etc/systemd/system/caddy.service

# Remove old caddy binary
sudo rm -f /usr/bin/caddy

# Install xcaddy properly
echo ""
echo "Installing xcaddy..."
if ! command -v xcaddy &> /dev/null; then
    go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest
    export PATH=$PATH:$(go env GOPATH)/bin
fi

# Build Caddy with Cloudflare module
echo ""
echo "Building Caddy with Cloudflare DNS module..."
cd ~
$(go env GOPATH)/bin/xcaddy build --with github.com/caddy-dns/cloudflare

# Move to system location
sudo mv caddy /usr/bin/caddy
sudo chmod +x /usr/bin/caddy

# Verify installation
echo ""
echo "Verifying Caddy installation..."
/usr/bin/caddy version

# Create Caddy directories
echo ""
echo "Creating Caddy directories..."
sudo mkdir -p /etc/caddy
sudo mkdir -p /var/log/caddy
sudo chown -R $USER:$USER /etc/caddy
sudo chown -R $USER:$USER /var/log/caddy

echo ""
echo "=========================================="
echo "✓ Caddy Fixed!"
echo "=========================================="
echo ""
echo "Now run: ./caddy-setup.sh"
