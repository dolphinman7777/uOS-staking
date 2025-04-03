const { execSync } = require('child_process');
const { resolve } = require('path');

async function main() {
  try {
    // Compile contracts
    console.log('Compiling contracts...');
    execSync('npx hardhat compile', { stdio: 'inherit' });

    // Generate types
    console.log('Generating types...');
    execSync(
      'npx typechain --target=ethers-v6 "artifacts/contracts/**/*.json" --out-dir typechain-types',
      { stdio: 'inherit' }
    );

    console.log('Types generated successfully!');
  } catch (error) {
    console.error('Error generating types:', error);
    process.exit(1);
  }
}

main(); 