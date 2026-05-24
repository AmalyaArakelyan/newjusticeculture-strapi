import type { Core } from '@strapi/strapi';

import { EVENT_SEED_ENTRIES } from '../data/events';
import { paragraphsToHtml } from '../data/rich-text';

const EVENT_UID = 'api::event.event';

async function findEventBySlug(strapi: Core.Strapi, slug: string, locale: string) {
  const events = await strapi.documents(EVENT_UID).findMany({
    filters: { slug: { $eq: slug } },
    locale,
    status: 'published',
    pageSize: 1,
  });

  return events[0] ?? null;
}

export async function seedEvents(strapi: Core.Strapi) {
  let created = 0;
  let skipped = 0;

  for (const entry of EVENT_SEED_ENTRIES) {
    const existing = await findEventBySlug(strapi, entry.slug, 'en');
    if (existing) {
      skipped += 1;
      continue;
    }

    const enEvent = await strapi.documents(EVENT_UID).create({
      locale: 'en',
      status: 'published',
      data: {
        title: entry.en.title,
        slug: entry.slug,
        shortDescription: entry.en.shortDescription,
        content: paragraphsToHtml(entry.en.paragraphs),
        startAt: entry.startAt,
        endAt: entry.endAt,
        location: entry.en.location,
        googleMapsUrl: entry.googleMapsUrl,
        registrationOpen: entry.registrationOpen ?? true,
        isOnline: entry.isOnline ?? false,
      },
    });

    await strapi.documents(EVENT_UID).update({
      documentId: enEvent.documentId,
      locale: 'hy',
      status: 'published',
      data: {
        title: entry.hy.title,
        slug: entry.slug,
        shortDescription: entry.hy.shortDescription,
        content: paragraphsToHtml(entry.hy.paragraphs),
        startAt: entry.startAt,
        endAt: entry.endAt,
        location: entry.hy.location,
        googleMapsUrl: entry.googleMapsUrl,
        registrationOpen: entry.registrationOpen ?? true,
        isOnline: entry.isOnline ?? false,
      },
    });

    created += 1;
  }

  if (created > 0 || skipped > 0) {
    strapi.log.info(`[seed] Events: ${created} created, ${skipped} skipped`);
  }
}
