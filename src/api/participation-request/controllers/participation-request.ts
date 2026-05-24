/**
 * participation-request controller
 */

import { factories } from '@strapi/strapi';

const TIMESTAMP_FIELD = 'submittedAt';

export default factories.createCoreController(
  'api::participation-request.participation-request',
  () => ({
    async create(ctx) {
      if (ctx.state?.user && ctx.request.body?.data) {
        delete ctx.request.body.data[TIMESTAMP_FIELD];
      }
      return await super.create(ctx);
    },
    async update(ctx) {
      if (ctx.request.body?.data) {
        delete ctx.request.body.data[TIMESTAMP_FIELD];
      }
      return await super.update(ctx);
    },
  })
);
