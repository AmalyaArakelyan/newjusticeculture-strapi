import type { Core } from '@strapi/strapi';

import {
  EDUCATION_CAPACITY_BUILDING_PAGE_SEED,
  REHABILITATION_PROGRAM_PAGE_SEED,
  staticPageSectionsForLocale,
  type StaticPageSeed,
} from '../data/static-pages';

type ProgramPageUid =
  | 'api::rehabilitation-program.rehabilitation-program'
  | 'api::education-capacity-building.education-capacity-building';

async function upsertLocalizedPage(
  strapi: Core.Strapi,
  uid: ProgramPageUid,
  label: string,
  seed: StaticPageSeed
): Promise<void> {
  const existing = await strapi.documents(uid).findMany({
    locale: 'en',
    status: 'published',
    pageSize: 1,
  });

  const enData = {
    title: seed.en.title,
    subtitle: seed.en.subtitle,
    sections: staticPageSectionsForLocale(seed, 'en'),
  };
  const hyData = {
    title: seed.hy.title,
    subtitle: seed.hy.subtitle,
    sections: staticPageSectionsForLocale(seed, 'hy'),
  };

  if (existing.length > 0) {
    const documentId = existing[0].documentId;

    await strapi.documents(uid).update({
      documentId,
      locale: 'en',
      status: 'published',
      data: enData,
    });

    await strapi.documents(uid).update({
      documentId,
      locale: 'hy',
      status: 'published',
      data: hyData,
    });

    strapi.log.info(`[migrate] Updated ${label} (en + hy)`);
    return;
  }

  const enEntry = await strapi.documents(uid).create({
    locale: 'en',
    status: 'published',
    data: enData,
  });

  await strapi.documents(uid).update({
    documentId: enEntry.documentId,
    locale: 'hy',
    status: 'published',
    data: hyData,
  });

  strapi.log.info(`[migrate] Created ${label} (en + hy)`);
}

/**
 * One-off content migration: pushes the current program copy from
 * `src/data/static-pages.ts` into Strapi, overwriting whatever title/
 * subtitle/sections are currently published. Run manually via
 * `npm run migrate:programs` — not wired into bootstrap, since bootstrap
 * runs on every restart and would clobber future admin edits.
 */
export async function migrateProgramPages(strapi: Core.Strapi) {
  await upsertLocalizedPage(
    strapi,
    'api::rehabilitation-program.rehabilitation-program',
    'Preventing Violence',
    REHABILITATION_PROGRAM_PAGE_SEED
  );

  await upsertLocalizedPage(
    strapi,
    'api::education-capacity-building.education-capacity-building',
    'Education & Capacity Building',
    EDUCATION_CAPACITY_BUILDING_PAGE_SEED
  );
}
