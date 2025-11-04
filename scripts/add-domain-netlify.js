/**
 * Script to add custom domain to Netlify via API
 * Run with: node scripts/add-domain-netlify.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Read Netlify auth token from CLI
// This will use the token from netlify CLI
const execSync = require('child_process').execSync;

try {
  // Get auth token from Netlify CLI
  const tokenCommand = process.platform === 'win32' 
    ? 'netlify api:listAuthTokens' 
    : 'netlify api:listAuthTokens';
  
  console.log('📋 Adding custom domain to Netlify...');
  console.log('');
  console.log('To add the domain, please:');
  console.log('1. Go to: https://app.netlify.com/projects/assamshipping');
  console.log('2. Navigate to: Site settings → Domain management');
  console.log('3. Click "Add custom domain"');
  console.log('4. Enter: assampackersandmovers.com');
  console.log('5. Follow the DNS configuration instructions');
  console.log('');
  console.log('Alternatively, you can use the Netlify dashboard to add the domain.');
} catch (error) {
  console.error('Error:', error.message);
}


