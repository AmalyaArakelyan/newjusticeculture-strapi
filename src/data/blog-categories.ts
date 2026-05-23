/** Blog filter categories — slugs must match Next.js `BLOG_CATEGORIES` ids. */
export const BLOG_SEED_CATEGORIES = [
  {
    slug: 'news',
    name: { en: 'News', hy: 'Լուրեր' },
  },
  {
    slug: 'justice',
    name: { en: 'Justice & rights', hy: 'Արդարություն և իրավունք' },
  },
  {
    slug: 'culture',
    name: { en: 'Culture', hy: 'Մշակույթ' },
  },
  {
    slug: 'events',
    name: { en: 'Events', hy: 'Միջոցառումներ' },
  },
] as const;
