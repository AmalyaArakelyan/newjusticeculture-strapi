import type { Core } from '@strapi/strapi';

import { BLOG_SEED_POSTS } from '../data/blog-posts';
import { paragraphsToHtml } from '../data/rich-text';

const BLOG_UID = 'api::blog.blog';
const CATEGORY_UID = 'api::category.category';

async function findCategoryDocumentId(
  strapi: Core.Strapi,
  categorySlug: string
): Promise<string | null> {
  const categories = await strapi.documents(CATEGORY_UID).findMany({
    filters: { slug: { $eq: categorySlug } },
    locale: 'en',
    status: 'published',
    pageSize: 1,
  });

  return categories[0]?.documentId ?? null;
}

async function findBlogBySlug(strapi: Core.Strapi, slug: string, locale: string) {
  const blogs = await strapi.documents(BLOG_UID).findMany({
    filters: { slug: { $eq: slug } },
    locale,
    status: 'published',
    pageSize: 1,
  });

  return blogs[0] ?? null;
}

export async function seedBlogPosts(strapi: Core.Strapi) {
  let created = 0;
  let skipped = 0;

  for (const post of BLOG_SEED_POSTS) {
    const existing = await findBlogBySlug(strapi, post.slug, 'en');
    if (existing) {
      skipped += 1;
      continue;
    }

    const categoryDocumentId = await findCategoryDocumentId(
      strapi,
      post.categorySlug
    );

    if (!categoryDocumentId) {
      strapi.log.warn(
        `[seed] Skip blog "${post.slug}": category "${post.categorySlug}" not found`
      );
      continue;
    }

    const enBlog = await strapi.documents(BLOG_UID).create({
      locale: 'en',
      status: 'published',
      data: {
        title: post.en.title,
        slug: post.slug,
        shortDescription: post.en.shortDescription,
        content: paragraphsToHtml(post.en.paragraphs),
        category: { documentId: categoryDocumentId },
      },
    });

    await strapi.documents(BLOG_UID).update({
      documentId: enBlog.documentId,
      locale: 'hy',
      status: 'published',
      data: {
        title: post.hy.title,
        slug: post.slug,
        shortDescription: post.hy.shortDescription,
        content: paragraphsToHtml(post.hy.paragraphs),
        category: { documentId: categoryDocumentId },
      },
    });

    created += 1;
    strapi.log.info(
      `[seed] Created blog "${post.slug}" (${post.categorySlug})`
    );
  }

  strapi.log.info(
    `[seed] Blog posts: ${created} created, ${skipped} already existed (${BLOG_SEED_POSTS.length} total)`
  );
}
