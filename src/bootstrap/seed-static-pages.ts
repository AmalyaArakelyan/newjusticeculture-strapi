import type { Core } from '@strapi/strapi';

import {
  ABOUT_US_PAGE_SEED,
  EDUCATION_CAPACITY_BUILDING_PAGE_SEED,
  MANIFEST_PAGE_SEED,
  REHABILITATION_PROGRAM_PAGE_SEED,
  staticPageSectionsForLocale,
  type StaticPageSeed,
} from '../data/static-pages';

type StaticPageUid =
  | 'api::about-us.about-us'
  | 'api::manifest.manifest'
  | 'api::rehabilitation-program.rehabilitation-program'
  | 'api::education-capacity-building.education-capacity-building';

async function hasPublishedEntry(
  strapi: Core.Strapi,
  uid: StaticPageUid,
  locale: string
) {
  const entries = await strapi.documents(uid).findMany({
    locale,
    status: 'published',
    pageSize: 1,
  });

  return entries.length > 0;
}

async function createLocalizedPage(
  strapi: Core.Strapi,
  uid: 'api::about-us.about-us',
  label: string,
  seed: StaticPageSeed
): Promise<void>;
async function createLocalizedPage(
  strapi: Core.Strapi,
  uid: 'api::manifest.manifest',
  label: string,
  seed: StaticPageSeed
): Promise<void>;
async function createLocalizedPage(
  strapi: Core.Strapi,
  uid: 'api::rehabilitation-program.rehabilitation-program',
  label: string,
  seed: StaticPageSeed
): Promise<void>;
async function createLocalizedPage(
  strapi: Core.Strapi,
  uid: 'api::education-capacity-building.education-capacity-building',
  label: string,
  seed: StaticPageSeed
): Promise<void>;
async function createLocalizedPage(
  strapi: Core.Strapi,
  uid: StaticPageUid,
  label: string,
  seed: StaticPageSeed
): Promise<void> {
  if (await hasPublishedEntry(strapi, uid, 'en')) {
    strapi.log.info(`[seed] Skip ${label}: already published`);
    return;
  }

  const enEntry = await strapi.documents(uid).create({
    locale: 'en',
    status: 'published',
    data: {
      title: seed.en.title,
      subtitle: seed.en.subtitle,
      sections: staticPageSectionsForLocale(seed, 'en'),
    },
  });

  await strapi.documents(uid).update({
    documentId: enEntry.documentId,
    locale: 'hy',
    status: 'published',
    data: {
      title: seed.hy.title,
      subtitle: seed.hy.subtitle,
      sections: staticPageSectionsForLocale(seed, 'hy'),
    },
  });

  strapi.log.info(`[seed] Created ${label} (en + hy)`);
}

export async function seedStaticPages(strapi: Core.Strapi) {
  try {
    await createLocalizedPage(strapi, 'api::about-us.about-us', 'About us', ABOUT_US_PAGE_SEED);
  } catch (error) {
    strapi.log.warn('[seed] Could not seed About us', error);
  }

  try {
    await createLocalizedPage(strapi, 'api::manifest.manifest', 'Manifest', MANIFEST_PAGE_SEED);
  } catch (error) {
    strapi.log.warn('[seed] Could not seed Manifest', error);
  }

  try {
    await createLocalizedPage(
      strapi,
      'api::rehabilitation-program.rehabilitation-program',
      'Preventing Violence',
      REHABILITATION_PROGRAM_PAGE_SEED
    );
  } catch (error) {
    strapi.log.warn('[seed] Could not seed Preventing Violence', error);
  }

  try {
    await createLocalizedPage(
      strapi,
      'api::education-capacity-building.education-capacity-building',
      'Education & Capacity Building',
      EDUCATION_CAPACITY_BUILDING_PAGE_SEED
    );
  } catch (error) {
    strapi.log.warn('[seed] Could not seed Education & Capacity Building', error);
  }
}
