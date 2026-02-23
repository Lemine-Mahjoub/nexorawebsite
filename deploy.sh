#!/bin/bash
# Script de déploiement Nexora Agency (nexorawebsite)
# Fetch, pull, build et démarrage avec PM2

set -e
cd /home/ubuntu/nexorawebsite

echo "=== Fetch et pull du repo ==="
git fetch origin
git pull origin main

echo "=== Installation des dépendances ==="
npm install

echo "=== Build du projet ==="
npm run build

echo "=== (Re)démarrage PM2 ==="
if pm2 describe nexora-agency >/dev/null 2>&1; then
  pm2 reload nexora-agency --update-env
  echo "Application rechargée."
else
  pm2 start ecosystem.config.js
  echo "Application démarrée."
fi

pm2 save
echo "=== Déploiement terminé ==="
