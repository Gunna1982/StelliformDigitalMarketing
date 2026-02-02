#!/usr/bin/env node

/**
 * Universal Development Server Script
 *
 * This script can be copied to any Next.js project.
 * It reads .devconfig.json to determine the correct port.
 *
 * Usage:
 *   node dev.js          - Start dev server
 *   npm run dev          - Start dev server (via package.json)
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the dev config
const configPath = path.join(__dirname, '.devconfig.json');

if (!fs.existsSync(configPath)) {
  console.error('❌ Error: .devconfig.json not found');
  console.error('Create a .devconfig.json file with:');
  console.error(JSON.stringify({
    projectName: 'your-project',
    ports: { dev: 3000, prod: 3001 },
    domain: 'example.com'
  }, null, 2));
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const port = config.ports.dev;

console.log(`\n🚀 Starting ${config.projectName} dev server...`);
console.log(`📍 Port: ${port}`);
console.log(`🌐 Domain: ${config.domain}`);
console.log(`\n⏳ Initializing Next.js...\n`);

// Start Next.js dev server
const devServer = spawn('npx', ['next', 'dev', '-p', port.toString()], {
  stdio: 'inherit',
  shell: true
});

devServer.on('error', (error) => {
  console.error('❌ Failed to start dev server:', error);
  process.exit(1);
});

devServer.on('close', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Dev server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle CTRL+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down dev server...');
  devServer.kill();
  process.exit(0);
});
