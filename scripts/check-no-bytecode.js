import { execSync } from 'node:child_process';

function main() {
  const output = execSync('git ls-files -z', {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const files = output
    .split('\0')
    .map((line) => line.trim())
    .filter(Boolean);

  const forbidden = files.filter((file) => {
    const normalized = file.replace(/\\/g, '/');
    return (
      normalized.includes('/__pycache__/') ||
      normalized.endsWith('.pyc') ||
      normalized.endsWith('.pyo') ||
      normalized.endsWith('.pyd')
    );
  });

  if (forbidden.length > 0) {
    console.error('FAIL: tracked Python bytecode/cache files detected:');
    for (const file of forbidden) {
      console.error(` - ${file}`);
    }
    process.exit(1);
  }

  console.log('PASS: no tracked Python bytecode/cache files detected.');
}

main();
