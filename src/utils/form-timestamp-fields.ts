import type { Core } from '@strapi/strapi';

/** Content-type UID → auto-set timestamp field (not editable in admin). */
export const TIMESTAMP_FIELD_BY_UID: Record<string, string> = {
  'api::event-registration.event-registration': 'registeredAt',
  'api::contact-submission.contact-submission': 'submittedAt',
  'api::participation-request.participation-request': 'submittedAt',
};

export const READ_ONLY_TIMESTAMP_FIELD_NAMES = new Set(
  Object.values(TIMESTAMP_FIELD_BY_UID)
);

export const LIST_TIMESTAMP_LABELS: Record<string, string> = {
  registeredAt: 'Registered at',
  submittedAt: 'Submitted at',
};

export function getTimestampFieldFromListMetadatas(
  metadatas: Record<string, unknown> | undefined
): string | undefined {
  if (!metadatas) {
    return undefined;
  }
  if ('registeredAt' in metadatas) {
    return 'registeredAt';
  }
  if ('submittedAt' in metadatas) {
    return 'submittedAt';
  }
  return undefined;
}

export function getTimestampFieldForUid(uid: string): string | undefined {
  return TIMESTAMP_FIELD_BY_UID[uid];
}

export function isAdminPanelRequest(strapi: Core.Strapi): boolean {
  const ctx = strapi.requestContext.get();
  return Boolean(ctx?.state?.user);
}
