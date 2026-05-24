import type { Core } from '@strapi/strapi';

import { getTimestampFieldForUid } from '../utils/form-timestamp-fields';

const FORM_LIST_UIDS = [
  'api::event-registration.event-registration',
  'api::contact-submission.contact-submission',
  'api::participation-request.participation-request',
] as const;

/**
 * Ensures the timestamp field is in the Content Manager list view default columns
 * (used when resetting column configuration).
 */
export async function ensureFormListViewTimestamps(strapi: Core.Strapi) {
  const contentTypesService = strapi
    .plugin('content-manager')
    .service('content-types');

  for (const uid of FORM_LIST_UIDS) {
    const field = getTimestampFieldForUid(uid);
    if (!field) {
      continue;
    }

    const contentType = strapi.contentType(uid);
    if (!contentType) {
      continue;
    }

    const configuration = await contentTypesService.findConfiguration(contentType);
    const list = configuration.layouts?.list ?? [];

    if (list.includes(field)) {
      continue;
    }

    await contentTypesService.updateConfiguration(contentType, {
      ...configuration,
      layouts: {
        ...configuration.layouts,
        list: [field, ...list],
      },
      settings: {
        ...configuration.settings,
        defaultSortBy: configuration.settings?.defaultSortBy ?? field,
        defaultSortOrder: configuration.settings?.defaultSortOrder ?? 'desc',
      },
    });

    strapi.log.info(`[bootstrap] Added ${field} to list view for ${uid}`);
  }
}
