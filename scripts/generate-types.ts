import { execSync } from 'child_process';

console.log('Generating contract types...');

try {
  // Run hardhat compile to generate the typechain types
  execSync('npx hardhat compile', { stdio: 'inherit' });
  
  console.log('Contract types generated successfully!');
} catch (error) {
  console.error('Error generating contract types:', error);
  process.exit(1);
} 