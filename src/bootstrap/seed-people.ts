import type { Core } from '@strapi/strapi';

import { PEOPLE_SEEDS } from '../data/people';

const PEOPLE_CATEGORY_UID = 'api::people-category.people-category';
const TEAM_MEMBER_UID = 'api::team-member.team-member';

async function findCategoryDocumentId(
  strapi: Core.Strapi,
  slug: string
): Promise<string | null> {
  const categories = await strapi.documents(PEOPLE_CATEGORY_UID).findMany({
    filters: { slug: { $eq: slug } },
    locale: 'en',
    status: 'published',
    pageSize: 1,
  });

  return categories[0]?.documentId ?? null;
}

async function findPersonByKey(strapi: Core.Strapi, key: string, locale: string) {
  const people = await strapi.documents(TEAM_MEMBER_UID).findMany({
    filters: { name: { $eq: key } },
    locale,
    status: 'published',
    pageSize: 1,
  });

  return people[0] ?? null;
}

export async function seedPeople(strapi: Core.Strapi) {
  let created = 0;
  let skipped = 0;

  for (const person of PEOPLE_SEEDS) {
    const categoryDocumentId = await findCategoryDocumentId(
      strapi,
      person.categorySlug
    );

    if (!categoryDocumentId) {
      strapi.log.warn(
        `[seed] Skip person "${person.key}": category "${person.categorySlug}" not found`
      );
      continue;
    }

    const existing = await findPersonByKey(strapi, person.en.name, 'en');
    if (existing) {
      skipped += 1;
      continue;
    }

    const enPerson = await strapi.documents(TEAM_MEMBER_UID).create({
      locale: 'en',
      status: 'published',
      data: {
        name: person.en.name,
        role: person.en.role,
        shortDescription: person.en.bio,
        sortOrder: person.sortOrder,
        category: { documentId: categoryDocumentId },
      },
    });

    await strapi.documents(TEAM_MEMBER_UID).update({
      documentId: enPerson.documentId,
      locale: 'hy',
      status: 'published',
      data: {
        name: person.hy.name,
        role: person.hy.role,
        shortDescription: person.hy.bio,
        sortOrder: person.sortOrder,
        category: { documentId: categoryDocumentId },
      },
    });

    created += 1;
  }

  if (created > 0 || skipped > 0) {
    strapi.log.info(`[seed] People: ${created} created, ${skipped} skipped`);
  }
}
