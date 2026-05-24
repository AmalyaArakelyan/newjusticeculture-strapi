import type { Core } from '@strapi/strapi';

import {
  getTimestampFieldForUid,
  isAdminPanelRequest,
} from '../utils/form-timestamp-fields';

export function registerFormSubmissionTimestamps(strapi: Core.Strapi) {
  strapi.documents.use(async (context, next) => {
    const field = getTimestampFieldForUid(context.uid);
    if (!field) {
      return await next();
    }

    const params = context.params as { data?: Record<string, unknown>; documentId?: string };
    const data = params.data;
    const fromAdmin = isAdminPanelRequest(strapi);

    if (context.action === 'create' && data) {
      if (fromAdmin) {
        delete data[field];
      } else if (data[field] == null || data[field] === '') {
        data[field] = new Date().toISOString();
      }
    }

    if (context.action === 'update' && data && field in data) {
      const documentId = params.documentId;
      if (documentId) {
        try {
          const existing = await strapi.documents(context.uid).findOne({
            documentId: String(documentId),
          });
          const existingRecord = existing as Record<string, unknown> | null;
          if (existingRecord?.[field] != null) {
            data[field] = existingRecord[field];
          } else {
            delete data[field];
          }
        } catch {
          delete data[field];
        }
      } else {
        delete data[field];
      }
    }

    return await next();
  });
}
