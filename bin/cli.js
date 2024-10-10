#!/usr/bin/env node

// Import modul child_process untuk menjalankan perintah di terminal
import { execSync } from 'child_process';

// Menampilkan pesan sambutan
console.log('======================================');
console.log(' Welcome to template-express-luthfi! ');
console.log('======================================');
console.log('This will create a new Express project for you.');
console.log('Please wait while we set everything up...');

// Menjalankan express-generator sebagai template default
try {
  execSync('npx express-generator', { stdio: 'inherit' });
  console.log('\n======================================');
  console.log('       Setup completed successfully!   ');
  console.log('          Happy Coding : ]            ');
  console.log('======================================');
} catch (error) {
  console.error('Error running express-generator:', error.message);
}
