#!/bin/bash

# Local deployment helper - Push changes and deploy to Stelliform server
# Usage: ./deploy-to-server.sh [staging|production|both]

ENVIRONMENT=${1:-both}

echo "🚀 Stelliform Digital Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if there are uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

echo "📤 Pushing to GitHub..."
git push origin master

echo ""
echo "🌐 Connecting to Stelliform server..."
echo ""

ssh stelliform "cd ~/apps && ./deploy.sh $ENVIRONMENT"

echo ""
echo "✨ Deployment complete!"
echo ""
echo "🌍 Production: https://stelliformdigital.com"
echo "🔧 Staging:    https://staging.stelliformdigital.com"
