/**
 * event-registration controller
 */

import { factories } from '@strapi/strapi';

const TIMESTAMP_FIELD = 'registeredAt';

export default factories.createCoreController(
  'api::event-registration.event-registration',
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
