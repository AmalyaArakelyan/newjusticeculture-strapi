export const PEOPLE_CATEGORY_SEEDS = [
  {
    slug: 'founders',
    en: { name: 'Founders' },
    hy: { name: 'Հիմնադիրներ' },
  },
  {
    slug: 'members',
    en: { name: 'Members' },
    hy: { name: 'Անդամներ' },
  },
  {
    slug: 'staff',
    en: { name: 'Staff' },
    hy: { name: 'Աշխատակազմ' },
  },
  {
    slug: 'volunteers',
    en: { name: 'Volunteers' },
    hy: { name: 'Կամավորներ' },
  },
  {
    slug: 'sponsors',
    en: { name: 'Sponsors' },
    hy: { name: 'Հովանավորներ' },
  },
] as const;

export type PeopleCategorySlug = (typeof PEOPLE_CATEGORY_SEEDS)[number]['slug'];
