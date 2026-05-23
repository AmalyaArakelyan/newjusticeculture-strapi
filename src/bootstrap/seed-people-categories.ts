import type { Core } from '@strapi/strapi';

import { PEOPLE_CATEGORY_SEEDS } from '../data/people-categories';

const PEOPLE_CATEGORY_UID = 'api::people-category.people-category';

export async function seedPeopleCategories(strapi: Core.Strapi) {
  let created = 0;
  let skipped = 0;

  for (const cat of PEOPLE_CATEGORY_SEEDS) {
    const existing = await strapi.documents(PEOPLE_CATEGORY_UID).findMany({
      filters: { slug: { $eq: cat.slug } },
      locale: 'en',
      status: 'published',
      pageSize: 1,
    });

    if (existing[0]) {
      skipped += 1;
      continue;
    }

    const enCat = await strapi.documents(PEOPLE_CATEGORY_UID).create({
      locale: 'en',
      status: 'published',
      data: {
        name: cat.en.name,
        slug: cat.slug,
      },
    });

    await strapi.documents(PEOPLE_CATEGORY_UID).update({
      documentId: enCat.documentId,
      locale: 'hy',
      status: 'published',
      data: {
        name: cat.hy.name,
        slug: cat.slug,
      },
    });

    created += 1;
  }

  if (created > 0 || skipped > 0) {
    strapi.log.info(`[seed] People categories: ${created} created, ${skipped} skipped`);
  }
}
