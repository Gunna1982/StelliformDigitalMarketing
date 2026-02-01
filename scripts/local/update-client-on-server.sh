#!/bin/bash
# Step 3: Update Client on Server
# Pull latest changes from GitHub, rebuild, and restart
# Use this during development to deploy updates

set -e

echo "=========================================="
echo "Update Client on Server"
echo "=========================================="
echo ""

# Gather parameters
read -p "Domain (e.g., plasticsurguryexperts.com): " DOMAIN
read -p "Environment (staging/production/both) [staging]: " ENVIRONMENT
ENVIRONMENT=${ENVIRONMENT:-staging}
read -p "Server IP [157.245.213.103]: " SERVER_IP
SERVER_IP=${SERVER_IP:-157.245.213.103}
read -p "SSH Username [supafly04]: " SSH_USER
SSH_USER=${SSH_USER:-supafly04}

APP_NAME=$(echo "$DOMAIN" | sed 's/\./-/g')

echo ""
echo "Configuration:"
echo "  Domain: $DOMAIN"
echo "  Environment: $ENVIRONMENT"
echo "  Server: ${SSH_USER}@${SERVER_IP}"
echo ""
read -p "Continue? (y/n): " CONFIRM
[[ "$CONFIRM" != "y" ]] && echo "Aborted." && exit 1

# Create update script
cat > /tmp/update-${APP_NAME}.sh << 'EOFUPDATE'
#!/bin/bash
set -e

DOMAIN="REPLACE_DOMAIN"
ENVIRONMENT="REPLACE_ENVIRONMENT"
APP_NAME="REPLACE_APP_NAME"

echo "=========================================="
echo "Updating $ENVIRONMENT environment..."
echo "=========================================="
echo ""

update_environment() {
    local env=$1
    local app_name="${APP_NAME}-${env}"

    echo "[${env}] Pulling latest changes from GitHub..."
    cd ~/apps/*-${env}
    git pull origin main || git pull origin master

    echo "[${env}] Installing dependencies..."
    npm install

    echo "[${env}] Building application..."
    npm run build

    echo "[${env}] Restarting PM2 process..."
    pm2 restart ${app_name}

    echo "✓ [${env}] Updated successfully"
}

if [ "$ENVIRONMENT" == "both" ]; then
    update_environment "staging"
    echo ""
    update_environment "production"
elif [ "$ENVIRONMENT" == "staging" ]; then
    update_environment "staging"
elif [ "$ENVIRONMENT" == "production" ]; then
    update_environment "production"
else
    echo "Invalid environment: $ENVIRONMENT"
    exit 1
fi

echo ""
echo "=========================================="
echo "✓ Update Complete!"
echo "=========================================="
echo ""
pm2 list
echo ""
EOFUPDATE

# Replace placeholders
sed -i "s/REPLACE_DOMAIN/$DOMAIN/g" /tmp/update-${APP_NAME}.sh
sed -i "s/REPLACE_ENVIRONMENT/$ENVIRONMENT/g" /tmp/update-${APP_NAME}.sh
sed -i "s/REPLACE_APP_NAME/$APP_NAME/g" /tmp/update-${APP_NAME}.sh

echo ""
echo "Uploading update script..."
scp /tmp/update-${APP_NAME}.sh ${SSH_USER}@${SERVER_IP}:~/

echo "✓ Uploaded"
echo ""
echo "Executing update..."
echo ""

ssh ${SSH_USER}@${SERVER_IP} "chmod +x ~/update-${APP_NAME}.sh && ~/update-${APP_NAME}.sh"

# Cleanup
rm /tmp/update-${APP_NAME}.sh

echo ""
echo "=========================================="
echo "✓ Update Successful!"
echo "=========================================="
echo ""
if [ "$ENVIRONMENT" == "both" ] || [ "$ENVIRONMENT" == "staging" ]; then
    echo "Staging: https://staging.$DOMAIN"
fi
if [ "$ENVIRONMENT" == "both" ] || [ "$ENVIRONMENT" == "production" ]; then
    echo "Production: https://$DOMAIN"
fi
echo ""
