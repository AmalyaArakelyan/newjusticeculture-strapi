import { paragraphsToHtml } from './rich-text';

export type StaticPageSectionSeed = {
  heading: string;
  paragraphs: string[];
};

export type StaticPageLocaleSeed = {
  title: string;
  subtitle: string;
  sections: StaticPageSectionSeed[];
};

export type StaticPageSeed = {
  en: StaticPageLocaleSeed;
  hy: StaticPageLocaleSeed;
};

function sectionsToRichText(sections: StaticPageSectionSeed[]) {
  return sections.map((section) => ({
    heading: section.heading,
    body: paragraphsToHtml(section.paragraphs),
  }));
}

export const ABOUT_US_PAGE_SEED: StaticPageSeed = {
  en: {
    title: 'About us',
    subtitle:
      'New Justice Culture is a civic initiative strengthening rights, accountability, and dialogue across Armenia.',
    sections: [
      {
        heading: 'Our mission',
        paragraphs: [
          'We work with communities, schools, NGOs, and public institutions to advance justice culture through education, research, and public programs.',
          'Our programs focus on legal literacy, civic participation, culture, and regional outreach.',
        ],
      },
      {
        heading: 'What we do',
        paragraphs: [
          'Forums, workshops, and publications that help citizens understand and use their rights.',
          'Media, podcasts, and community dialogues that connect people across regions and backgrounds.',
        ],
      },
      {
        heading: 'How to connect',
        paragraphs: [
          'Explore our events, blog, and volunteer or sponsorship pages to get involved.',
          'Contact us through the website form for partnerships, media requests, or program questions.',
        ],
      },
    ],
  },
  hy: {
    title: 'Մեր մասին',
    subtitle:
      '«Նոր արդարադատության մշակույթ»-ը քաղաքացիական նախաձեռնություն է, որը ուժեղացնում է իրավունքները, հաշվետվողությունը և երկխոսությունը Հայաստանում։',
    sections: [
      {
        heading: 'Մեր առաքելությունը',
        paragraphs: [
          'Աշխատում ենք համայնքների, դպրոցների, ՀԿ-ների և հանրային հաստատությունների հետ՝ կրթության, հետազոտության և հանրային ծրագրերի միջոցով արդարադատության մշակույթը խթանելու համար։',
          'Ծրագրերը կենտրոնանում են իրավական գրագիտության, քաղաքացիական մասնակցության, մշակույթի և մարզային աշխատանքի վրա։',
        ],
      },
      {
        heading: 'Ինչ ենք անում',
        paragraphs: [
          'Ֆորումներ, աշխատարաններ և հրապարակումներ, որոնք օգնում են քաղաքացիներին հասկանալ և օգտագործել իրենց իրավունքները։',
          'Մեդիա, պոդքաստներ և համայնքային երկխոսություններ, որոնք միավորում են մարդկանց տարբեր մարզերից և միջավայրերից։',
        ],
      },
      {
        heading: 'Ինչպես կապվել',
        paragraphs: [
          'Ուսումնասիրեք միջոցառումները, բլոգը և կամավորության կամ հովանավորության էջերը՝ մասնակցելու համար։',
          'Կապվեք մեզ հետ կայքի ձևի միջոցով՝ գործընկերության, մեդիայի հարցումների կամ ծրագրերի վերաբերյալ։',
        ],
      },
    ],
  },
};

export const MANIFEST_PAGE_SEED: StaticPageSeed = {
  en: {
    title: 'Manifest',
    subtitle:
      'Our shared commitment to justice, accountability, and a culture where every person can participate with dignity.',
    sections: [
      {
        heading: 'Why we exist',
        paragraphs: [
          'New Justice Culture works to strengthen rights, transparency, and civic dialogue in Armenia and the region.',
          'We believe lasting change grows when communities, institutions, and citizens learn together and hold power to account.',
        ],
      },
      {
        heading: 'What we stand for',
        paragraphs: [
          'Justice that is accessible, inclusive, and grounded in human dignity.',
          'Accountability in public life — from local communities to national policy.',
          'Culture as a space for education, memory, and collective action.',
        ],
      },
      {
        heading: 'How we act',
        paragraphs: [
          'Through research, public programs, media, and partnerships with schools, NGOs, and public institutions.',
          'By creating spaces where young people, educators, and community leaders can speak, learn, and organize.',
          'With integrity, independence, and respect for every voice in the conversation.',
        ],
      },
    ],
  },
  hy: {
    title: 'Մանիֆեստ',
    subtitle:
      'Մեր ընդհանուր հանձնառությունը՝ արդարություն, հաշվետվողություն և մշակույթ, որտեղ ամեն մարդ կարող է մասնակցել արժանապատվությամբ։',
    sections: [
      {
        heading: 'Ինչու ենք մենք',
        paragraphs: [
          '«Նոր արդարադատության մշակույթ»-ը աշխատում է իրավունքները, թափանցիկությունը և քաղաքացիական երկխոսությունը ուժեղացնելու համար Հայաստանում և տարածաշրջանում։',
          'Հավատում ենք, որ տևական փոփոխությունը ծնվում է, երբ համայնքները, հաստատությունները և քաղաքացիները միասին սովորում և պատասխանատվություն են պահանջում։',
        ],
      },
      {
        heading: 'Ինչի համար ենք կանգնած',
        paragraphs: [
          'Արդարություն, որը հասանելի է, ներառական և հիմնված մարդկային արժանապատվության վրա։',
          'Հաշվետվողություն հանրային կյանքում՝ տեղական համայնքներից մինչև ազգային քաղաքականություն։',
          'Մշակույթ որպես կրթության, հիշողության և համատեղ գործողության տարածք։',
        ],
      },
      {
        heading: 'Ինչպես ենք գործում',
        paragraphs: [
          'Հետազոտությունների, հանրային ծրագրերի, մեդիայի և գործընկերությունների միջոցով դպրոցների, ՀԿ-ների և հանրային հաստատությունների հետ։',
          'Տարածքներ ստեղծելով, որտեղ երիտասարդները, կրթական մասնագետները և համայնքային առաջնորդները կարող են խոսել, սովորել և կազմակերպվել։',
          'Ազնվությամբ, անկախությամբ և հարգանքով՝ երկխոսության յուրաքանչյուր ձայնի նկատմամբ։',
        ],
      },
    ],
  },
};

export const REHABILITATION_PROGRAM_PAGE_SEED: StaticPageSeed = {
  en: {
    title: 'Preventing Violence',
    subtitle:
      'Support for people rebuilding their lives through rights education, dialogue, and community reintegration.',
    sections: [
      {
        heading: 'What we offer',
        paragraphs: [
          'Workshops and mentoring on legal literacy, accountability, and civic participation.',
          'Safe spaces for dialogue between communities, institutions, and people affected by injustice.',
        ],
      },
      {
        heading: 'Who it is for',
        paragraphs: [
          'Individuals and groups seeking to restore dignity, access services, and participate fully in public life.',
          'Partners in education, social work, and local government who support reintegration in practice.',
        ],
      },
      {
        heading: 'How to join',
        paragraphs: [
          'Contact us through the website form or email to learn about current cohorts and referral options.',
          'We work in Armenian and English, in Yerevan and across the regions.',
        ],
      },
    ],
  },
  hy: {
    title: 'Բռնության կանխարգելում',
    subtitle:
      'Աջակցություն մարդկանց, ովքեր իրավունքների կրթության, երկխոսության և համայնքային վերաինտեգրման միջոցով վերակառուցում են իրենց կյանքը։',
    sections: [
      {
        heading: 'Ինչ ենք առաջարկում',
        paragraphs: [
          'Աշխատարաններ և մենթորություն՝ իրավական գրագիտության, հաշվետվողության և քաղաքացիական մասնակցության թեմայով։',
          'Անվտանգ տարածքներ երկխոսության համար՝ համայնքների, հաստատությունների և անարդարության հետևանքներով ապրող մարդկանց միջև։',
        ],
      },
      {
        heading: 'Ում համար է',
        paragraphs: [
          'Անհատների և խմբերի, որոնք ցանկանում են վերականգնել արժանապատվությունը, մուտք գործել ծառայություններ և լիարժեք մասնակցել հանրային կյանքին։',
          'Գործընկերներին կրթության, սոցիալական աշխատանքի և տեղական ինքնակառավարման ոլորտներում, որոնք աջակցում են վերաինտեգրմանը։',
        ],
      },
      {
        heading: 'Ինչպես միանալ',
        paragraphs: [
          'Կապվեք մեզ հետ կայքի ձևի կամ էլ. փոստի միջոցով՝ ընթացիկ խմբերի և ուղղորդման տարբերակների մասին տեղեկանալու համար։',
          'Աշխատում ենք հայերեն և անգլերեն՝ Երևանում և մարզերում։',
        ],
      },
    ],
  },
};

export const EDUCATION_CAPACITY_BUILDING_PAGE_SEED: StaticPageSeed = {
  en: {
    title: 'Education & Capacity Building',
    subtitle:
      'Training and curriculum support that strengthens legal literacy, civic education, and organizational capacity across Armenia.',
    sections: [
      {
        heading: 'What we offer',
        paragraphs: [
          'Workshops and trainer-of-trainers programs on legal literacy, human rights, and civic education.',
          'Curriculum development and resources for schools, universities, and civil society organizations.',
        ],
      },
      {
        heading: 'Who it is for',
        paragraphs: [
          'Educators, students, and youth groups looking to build practical knowledge of rights and civic participation.',
          'Civil society organizations and local institutions seeking to strengthen their internal capacity and training practices.',
        ],
      },
      {
        heading: 'How to join',
        paragraphs: [
          'Contact us through the website form or email to learn about upcoming trainings and partnership opportunities.',
          'We work in Armenian and English, in Yerevan and across the regions.',
        ],
      },
    ],
  },
  hy: {
    title: 'Կրթություն և կարողությունների զարգացում',
    subtitle:
      'Վերապատրաստումներ և ուսումնական աջակցություն, որոնք ամրապնդում են իրավական գրագիտությունը, քաղաքացիական կրթությունը և կազմակերպական կարողությունները Հայաստանում։',
    sections: [
      {
        heading: 'Ինչ ենք առաջարկում',
        paragraphs: [
          'Աշխատարաններ և թրեյներների պատրաստման ծրագրեր՝ իրավական գրագիտության, մարդու իրավունքների և քաղաքացիական կրթության թեմայով։',
          'Ուսումնական ծրագրերի մշակում և ռեսուրսներ դպրոցների, բուհերի և քաղաքացիական հասարակության կազմակերպությունների համար։',
        ],
      },
      {
        heading: 'Ում համար է',
        paragraphs: [
          'Կրթողների, ուսանողների և երիտասարդական խմբերի համար, ովքեր ցանկանում են ձեռք բերել գործնական գիտելիքներ իրավունքների և քաղաքացիական մասնակցության մասին։',
          'Քաղաքացիական հասարակության կազմակերպությունների և տեղական հաստատությունների համար, որոնք ցանկանում են ամրապնդել իրենց ներքին կարողությունները և վերապատրաստման պրակտիկան։',
        ],
      },
      {
        heading: 'Ինչպես միանալ',
        paragraphs: [
          'Կապվեք մեզ հետ կայքի ձևի կամ էլ. փոստի միջոցով՝ առաջիկա վերապատրաստումների և գործընկերության հնարավորությունների մասին տեղեկանալու համար։',
          'Աշխատում ենք հայերեն և անգլերեն՝ Երևանում և մարզերում։',
        ],
      },
    ],
  },
};

export function staticPageSectionsForLocale(
  seed: StaticPageSeed,
  locale: 'en' | 'hy'
) {
  return sectionsToRichText(seed[locale].sections);
}
