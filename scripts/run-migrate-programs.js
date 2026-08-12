'use strict';

const { createStrapi } = require('@strapi/strapi');

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();

  const { migrateProgramPages } = require('../dist/src/bootstrap/migrate-program-pages');

  await migrateProgramPages(app);

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
