import type { Core } from '@strapi/strapi';

import { seedLocales } from './bootstrap/seed-locales';
import { seedBlogCategories } from './bootstrap/seed-blog-categories';
import { seedBlogPosts } from './bootstrap/seed-blog-posts';
import { seedEvents } from './bootstrap/seed-events';
import { seedPeople } from './bootstrap/seed-people';
import { seedPeopleCategories } from './bootstrap/seed-people-categories';
import { ensureFormListViewTimestamps } from './bootstrap/form-list-view-timestamps';
import { registerFormSubmissionTimestamps } from './bootstrap/form-submission-timestamps';
import { seedStaticPages } from './bootstrap/seed-static-pages';

const PUBLIC_READ_CONTENT_TYPES = [
  'blog',
  'category',
  'event',
  'people-category',
  'team-member',
  'about-us',
  'manifest',
  'rehabilitation-program',
] as const;
const PUBLIC_CREATE_CONTENT_TYPES = [
  'event-registration',
  'participation-request',
  'contact-submission',
] as const;

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

async function ensurePublicCreatePermissions(strapi: Core.Strapi) {
  const roleService = strapi.plugin('users-permissions').service('role');
  const permissionService = strapi.plugin('users-permissions').service('permission');
  const roles = await roleService.find();
  const publicRole = roles.find((role: { type: string }) => role.type === 'public');

  if (!publicRole) {
    return;
  }

  const role = await roleService.findOne(publicRole.id);
  let permissionsUpdated = false;

  for (const contentType of PUBLIC_CREATE_CONTENT_TYPES) {
    const apiKey = `api::${contentType}`;
    const controller = role.permissions?.[apiKey]?.controllers?.[contentType];

    if (controller?.create) {
      if (!controller.create.enabled) {
        controller.create.enabled = true;
        permissionsUpdated = true;
      }
      continue;
    }

    const action = `${apiKey}.${contentType}.create`;
    const existing = await permissionService.findMany({
      filters: {
        role: { id: publicRole.id },
        action: { $eq: action },
      },
    });

    if (existing.length === 0) {
      await permissionService.create({
        data: {
          action,
          role: publicRole.id,
        },
      });
      permissionsUpdated = true;
      strapi.log.info(`[bootstrap] Enabled public create: ${action}`);
    }
  }

  if (permissionsUpdated && role.permissions) {
    await roleService.updateRole(publicRole.id, role);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    registerFormSubmissionTimestamps(strapi);
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await seedLocales(strapi);
    } catch (error) {
      strapi.log.warn('[bootstrap] Could not seed locales', error);
    }

    try {
      await ensureFormListViewTimestamps(strapi);
      await ensurePublicReadPermissions(strapi);
      await ensurePublicCreatePermissions(strapi);
      strapi.log.info(
        '[bootstrap] Public API: read (blog, category, event, people, static pages); create (event-registration, participation-request, contact-submission)'
      );
    } catch (error) {
      strapi.log.warn('[bootstrap] Could not configure public API permissions', error);
    }

    try {
      await seedBlogCategories(strapi);
      await seedBlogPosts(strapi);
      await seedEvents(strapi);
      await seedPeopleCategories(strapi);
      await seedPeople(strapi);
      await seedStaticPages(strapi);
    } catch (error) {
      strapi.log.warn('[bootstrap] Could not seed blog/event/people/static pages', error);
    }
  },
};
