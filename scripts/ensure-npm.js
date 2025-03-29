const userAgent = process.env.npm_config_user_agent || '';

if (!userAgent.includes('npm/')) {
  console.error('\n🚫 Please use npm to install dependencies (not yarn or pnpm).\n');
  process.exit(1);
}