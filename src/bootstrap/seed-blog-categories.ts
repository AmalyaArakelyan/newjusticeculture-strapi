import type { Core } from '@strapi/strapi';

import { BLOG_SEED_CATEGORIES } from '../data/blog-categories';

const CATEGORY_UID = 'api::category.category';

async function findCategoryBySlug(
  strapi: Core.Strapi,
  slug: string,
  locale: string
) {
  const categories = await strapi.documents(CATEGORY_UID).findMany({
    filters: { slug: { $eq: slug } },
    locale,
    status: 'published',
    pageSize: 1,
  });

  return categories[0] ?? null;
}

async function upsertCategoryLocale(
  strapi: Core.Strapi,
  documentId: string,
  locale: string,
  data: { name: string; slug: string }
) {
  await strapi.documents(CATEGORY_UID).update({
    documentId,
    locale,
    status: 'published',
    data,
  });
}

export async function seedBlogCategories(strapi: Core.Strapi) {
  for (const cat of BLOG_SEED_CATEGORIES) {
    let documentId: string;

    const enExisting = await findCategoryBySlug(strapi, cat.slug, 'en');

    if (enExisting) {
      documentId = enExisting.documentId;
      await strapi.documents(CATEGORY_UID).update({
        documentId,
        locale: 'en',
        status: 'published',
        data: { name: cat.name.en, slug: cat.slug },
      });
    } else {
      const created = await strapi.documents(CATEGORY_UID).create({
        locale: 'en',
        status: 'published',
        data: { name: cat.name.en, slug: cat.slug },
      });
      documentId = created.documentId;
      strapi.log.info(`[seed] Created category "${cat.slug}" (en)`);
    }

    await upsertCategoryLocale(strapi, documentId, 'hy', {
      name: cat.name.hy,
      slug: cat.slug,
    });
  }

  strapi.log.info('[seed] Blog categories ready (news, justice, culture, events)');
}
