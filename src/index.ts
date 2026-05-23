import type { Core } from '@strapi/strapi';

import { seedBlogCategories } from './bootstrap/seed-blog-categories';
import { seedBlogPosts } from './bootstrap/seed-blog-posts';

const PUBLIC_READ_CONTENT_TYPES = ['blog', 'category'] as const;

async function ensurePublicReadPermissions(strapi: Core.Strapi) {
  const roleService = strapi.plugin('users-permissions').service('role');
  const roles = await roleService.find();
  const publicRole = roles.find((role: { type: string }) => role.type === 'public');

  if (!publicRole) {
    return;
  }

  const role = await roleService.findOne(publicRole.id);

  for (const contentType of PUBLIC_READ_CONTENT_TYPES) {
    const apiKey = `api::${contentType}`;
    const controller = role.permissions?.[apiKey]?.controllers?.[contentType];

    if (!controller) {
      continue;
    }

    if (controller.find) {
      controller.find.enabled = true;
    }
    if (controller.findOne) {
      controller.findOne.enabled = true;
    }
  }

  await roleService.updateRole(publicRole.id, role);
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await ensurePublicReadPermissions(strapi);
      strapi.log.info(
        '[bootstrap] Public API: find/findOne enabled for blog and category'
      );
    } catch (error) {
      strapi.log.warn('[bootstrap] Could not configure public API permissions', error);
    }

    try {
      await seedBlogCategories(strapi);
      await seedBlogPosts(strapi);
    } catch (error) {
      strapi.log.warn('[bootstrap] Could not seed blog data', error);
    }
  },
};
