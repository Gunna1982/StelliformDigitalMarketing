#!/bin/bash
# Install latest Go version

set -e

echo "=========================================="
echo "Installing Go 1.25+"
echo "=========================================="

# Remove old Go
echo "Removing old Go installation..."
sudo rm -rf /usr/local/go

# Download and install Go 1.25.6
echo ""
echo "Downloading Go 1.25.6..."
cd /tmp
wget https://go.dev/dl/go1.25.6.linux-amd64.tar.gz

echo ""
echo "Installing Go..."
sudo tar -C /usr/local -xzf go1.25.6.linux-amd64.tar.gz

# Add to PATH if not already there
if ! grep -q "/usr/local/go/bin" ~/.bashrc; then
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
    echo 'export PATH=$PATH:$(go env GOPATH)/bin' >> ~/.bashrc
fi

# Set for current session
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$(go env GOPATH)/bin

# Verify
echo ""
echo "=========================================="
echo "✓ Go Installation Complete!"
echo "=========================================="
go version

echo ""
echo "Please run: source ~/.bashrc"
echo "Then run: ~/fix-caddy.sh"
