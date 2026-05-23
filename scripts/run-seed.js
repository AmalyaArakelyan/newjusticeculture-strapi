'use strict';

const { createStrapi } = require('@strapi/strapi');

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();

  const { seedBlogCategories } = require('../dist/src/bootstrap/seed-blog-categories');
  const { seedBlogPosts } = require('../dist/src/bootstrap/seed-blog-posts');

  await seedBlogCategories(app);
  await seedBlogPosts(app);

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
