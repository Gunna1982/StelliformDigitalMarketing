#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[rebuild] cwd=$PWD"

# Ensure deps are installed (no-op if already)
if [ ! -d node_modules ]; then
  echo "[rebuild] node_modules missing; running npm install..."
  npm install
fi

echo "[rebuild] building..."
npm run build

echo "[rebuild] restarting pm2 process (stelliform-preview)..."
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart stelliform-preview || pm2 restart stelliform-dev || true
  pm2 save || true
else
  echo "[rebuild] pm2 not found; skipping restart"
fi

echo "[rebuild] done"
