#!/bin/bash
# Step 1: Create New Client Project Locally
# Creates Next.js project, initializes git, pushes to GitHub
# Run this FIRST before deploying to server

set -e

echo "=========================================="
echo "Create New Client Project (Local)"
echo "=========================================="
echo ""

# Gather parameters
read -p "Project name (e.g., PlasticSurgeryExperts): " REPO_NAME
read -p "Domain (e.g., plasticsurguryexperts.com): " DOMAIN
read -p "GitHub username [Gunna1982]: " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-Gunna1982}

# Project directory
PROJECT_DIR="c:/dev/${REPO_NAME}"

echo ""
echo "Configuration:"
echo "  Project: $REPO_NAME"
echo "  Domain: $DOMAIN"
echo "  Location: $PROJECT_DIR"
echo "  GitHub: ${GITHUB_USER}/${REPO_NAME}"
echo ""
read -p "Continue? (y/n): " CONFIRM
[[ "$CONFIRM" != "y" ]] && echo "Aborted." && exit 1

# Create Next.js project
echo ""
echo "[1/5] Creating Next.js project..."
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes

echo "✓ Next.js project created"

# Create .env.local
echo ""
echo "[2/5] Creating environment files..."
cat > .env.local << EOF
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=${REPO_NAME}
NEXT_PUBLIC_DOMAIN=${DOMAIN}

# Add your environment variables here
EOF

# Create .env.example
cat > .env.example << EOF
# Site Configuration
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=
NEXT_PUBLIC_DOMAIN=

# Add your environment variables here (without values)
EOF

# Update .gitignore
cat >> .gitignore << EOF

# Environment files
.env.local
.env.production.local
.env.development.local

# PM2 ecosystem
ecosystem.config.js

# Server scripts
deploy.sh
EOF

echo "✓ Environment files created"

# Create deployment config
echo ""
echo "[3/5] Creating deployment configuration..."
cat > deployment.config.json << EOF
{
  "domain": "${DOMAIN}",
  "repository": "${GITHUB_USER}/${REPO_NAME}",
  "staging": {
    "url": "https://staging.${DOMAIN}",
    "port": 3002
  },
  "production": {
    "url": "https://${DOMAIN}",
    "port": 3003
  }
}
EOF

echo "✓ Deployment config created"

# Initialize git and push
echo ""
echo "[4/5] Initializing git repository..."
git init
git add .
git commit -m "feat: initial Next.js setup for ${DOMAIN}

- TypeScript + Tailwind CSS
- App Router
- Environment configuration
- Deployment config"

echo "✓ Git initialized"

# Create GitHub repo and push
echo ""
echo "[5/5] Creating GitHub repository and pushing..."
gh repo create ${GITHUB_USER}/${REPO_NAME} --private --source=. --remote=origin --push

echo ""
echo "=========================================="
echo "✓ Project Created Successfully!"
echo "=========================================="
echo ""
echo "Local project: $PROJECT_DIR"
echo "GitHub repo: https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""
echo "Next steps:"
echo "  1. Develop your website locally"
echo "  2. Test with: npm run dev"
echo "  3. Push changes to GitHub"
echo "  4. Deploy to server using: deploy-client-to-server.sh"
echo ""
