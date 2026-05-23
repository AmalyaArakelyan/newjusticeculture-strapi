import type { PeopleCategorySlug } from './people-categories';

type PersonSeedLocale = {
  name: string;
  role: string;
  bio: string;
};

export type PersonSeed = {
  key: string;
  categorySlug: PeopleCategorySlug;
  sortOrder: number;
  en: PersonSeedLocale;
  hy: PersonSeedLocale;
};

export const PEOPLE_SEEDS: PersonSeed[] = [
  {
    key: 'founder-1',
    categorySlug: 'founders',
    sortOrder: 1,
    en: {
      name: 'Executive director',
      role: 'Executive director',
      bio: 'Oversees strategy, partnerships, and programs across New Justice Culture.',
    },
    hy: {
      name: 'Գործադիր տնօրեն',
      role: 'Գործադիր տնօրեն',
      bio: 'Ղեկավարում է ռազմավարը, գործընկերությունները և ծրագրերը «Նոր արդարադատության մշակույթ»-ում։',
    },
  },
  {
    key: 'founder-2',
    categorySlug: 'founders',
    sortOrder: 2,
    en: {
      name: 'Head of programs',
      role: 'Head of programs',
      bio: 'Coordinates workshops, forums, and regional outreach.',
    },
    hy: {
      name: 'Ծրագրերի ղեկավար',
      role: 'Ծրագրերի ղեկավար',
      bio: 'Կազմակերպում է աշխատարանները, ֆորումները և մարզային աշխատանքը։',
    },
  },
  {
    key: 'member-1',
    categorySlug: 'members',
    sortOrder: 1,
    en: {
      name: 'Legal literacy & rights',
      role: 'Legal literacy & rights',
      bio: 'Leads sessions on rights protection and accountability in practice.',
    },
    hy: {
      name: 'Իրավական գրագիտություն և իրավունքներ',
      role: 'Իրավական գրագիտություն և իրավունքներ',
      bio: 'Վարում է նիստեր՝ իրավունքների պաշտպանության և հաշվետվողության թեմայով։',
    },
  },
  {
    key: 'member-2',
    categorySlug: 'members',
    sortOrder: 2,
    en: {
      name: 'Culture & education',
      role: 'Culture & education',
      bio: 'Develops dialogue series with schools, youth, and educators.',
    },
    hy: {
      name: 'Մշակույթ և կրթություն',
      role: 'Մշակույթ և կրթություն',
      bio: 'Զարգացնում է երկխոսության շարքեր դպրոցների, երիտասարդների և կրթողների հետ։',
    },
  },
  {
    key: 'member-3',
    categorySlug: 'members',
    sortOrder: 3,
    en: {
      name: 'Communications',
      role: 'Communications',
      bio: 'Publications, media, and community-facing storytelling.',
    },
    hy: {
      name: 'Հաղորդակցություն',
      role: 'Հաղորդակցություն',
      bio: 'Հրապարակումներ, մեդիա և հանրության հետ աշխատանք։',
    },
  },
  {
    key: 'staff-1',
    categorySlug: 'staff',
    sortOrder: 1,
    en: {
      name: 'Ani Hakobyan',
      role: 'Programs coordinator',
      bio: 'Coordinates workshops, forums, and partner outreach across regional programs.',
    },
    hy: {
      name: 'Անի Հակոբյան',
      role: 'Ծրագրերի համակարգող',
      bio: 'Համակարգում է աշխատարանները, ֆորումները և մարզային ծրագրերում գործընկերների հետ աշխատանքը։',
    },
  },
  {
    key: 'staff-2',
    categorySlug: 'staff',
    sortOrder: 2,
    en: {
      name: 'Davit Petrosyan',
      role: 'Research & advocacy',
      bio: 'Leads research briefs, policy dialogues, and accountability-focused public programs.',
    },
    hy: {
      name: 'Դավիթ Պետրոսյան',
      role: 'Հետազոտություն և արգասավորություն',
      bio: 'Ղեկավարում է հետազոտական տեղեկագրերը, քաղաքականության երկխոսությունները և հաշվետվողության հանրային ծրագրերը։',
    },
  },
  {
    key: 'staff-3',
    categorySlug: 'staff',
    sortOrder: 3,
    en: {
      name: 'Lilit Sargsyan',
      role: 'Communications manager',
      bio: 'Oversees publications, social media, and community-facing storytelling for NJC.',
    },
    hy: {
      name: 'Լիլիթ Սարգսյան',
      role: 'Հաղորդակցության ղեկավար',
      bio: 'Ղեկավարում է հրապարակումները, սոցիալական ցանցերը և «Նոր արդարադատության մշակույթ»-ի հանրային պատմությունները։',
    },
  },
  {
    key: 'volunteer-1',
    categorySlug: 'volunteers',
    sortOrder: 1,
    en: {
      name: 'Community outreach volunteer',
      role: 'Volunteer',
      bio: 'Supports local forums and youth engagement activities.',
    },
    hy: {
      name: 'Համայնքային աշխատանքի կամավոր',
      role: 'Կամավոր',
      bio: 'Աջակցում է տեղական ֆորումներին և երիտասարդների ներգրավմանը։',
    },
  },
  {
    key: 'volunteer-2',
    categorySlug: 'volunteers',
    sortOrder: 2,
    en: {
      name: 'Research volunteer',
      role: 'Volunteer',
      bio: 'Helps with data collection and briefing notes for public programs.',
    },
    hy: {
      name: 'Հետազոտական կամավոր',
      role: 'Կամավոր',
      bio: 'Օգնում է տվյալների հավաքման և հանրային ծրագրերի տեղեկագրերի մշակմանը։',
    },
  },
  {
    key: 'sponsor-1',
    categorySlug: 'sponsors',
    sortOrder: 1,
    en: {
      name: 'Partner foundation',
      role: 'Institutional partner',
      bio: 'Supports civic education and accountability programs nationwide.',
    },
    hy: {
      name: 'Գործընկեր հիմնադրամ',
      role: 'Ինստիտուցիոնալ գործընկեր',
      bio: 'Աջակցում է քաղաքացիական կրթության և հաշվետվողության ծրագրերին։',
    },
  },
  {
    key: 'sponsor-2',
    categorySlug: 'sponsors',
    sortOrder: 2,
    en: {
      name: 'Education network',
      role: 'Program sponsor',
      bio: 'Co-funds dialogue series with schools and universities.',
    },
    hy: {
      name: 'Կրթական ցանց',
      role: 'Ծրագրի հովանավոր',
      bio: 'Համահովանավորում է երկխոսության շարքերը դպրոցների և բուհերի հետ։',
    },
  },
];
