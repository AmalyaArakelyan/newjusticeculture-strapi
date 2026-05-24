/**
 * contact-submission controller
 */

import { factories } from '@strapi/strapi';

const TIMESTAMP_FIELD = 'submittedAt';

export default factories.createCoreController(
  'api::contact-submission.contact-submission',
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
