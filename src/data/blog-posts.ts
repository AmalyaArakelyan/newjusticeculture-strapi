type BlogSeedLocale = {
  title: string;
  shortDescription: string;
  paragraphs: string[];
};

export type BlogSeedPost = {
  slug: string;
  categorySlug: string;
  en: BlogSeedLocale;
  hy: BlogSeedLocale;
};

function paragraphBlock(text: string) {
  return {
    type: 'paragraph' as const,
    children: [{ type: 'text' as const, text }],
  };
}

export function blocksFromParagraphs(paragraphs: string[]) {
  return paragraphs.map(paragraphBlock);
}

export const BLOG_SEED_POSTS: BlogSeedPost[] = [
  {
    slug: 'news-community-forum-spring',
    categorySlug: 'news',
    en: {
      title: 'Spring community forum announced',
      shortDescription:
        'Registration opens for our spring forum on civic participation and local accountability.',
      paragraphs: [
        'New Justice Culture will host a public forum in Yerevan this April.',
        'Sessions will focus on community questions, panel discussions, and practical follow-up steps.',
      ],
    },
    hy: {
      title: 'Հայտարարվել է գարնանային համայնքային ֆորումը',
      shortDescription:
        'Բացվել է գրանցումը գարնանային ֆորումի համար՝ քաղաքացիական մասնակցության և տեղական հաշվետվողության թեմայով։',
      paragraphs: [
        '«Նոր արդարադատության մշակույթ»-ը ապրիլին հանրային ֆորում կկազմակերպի Երևանում։',
        'Նիստերը կկենտրոնանան համայնքի հարցերի, պանելային քննարկումների և գործնական հետագա քայլերի վրա։',
      ],
    },
  },
  {
    slug: 'news-transparency-report-2026',
    categorySlug: 'news',
    en: {
      title: '2026 transparency briefing published',
      shortDescription:
        'Our latest briefing summarizes open-data wins and remaining gaps in public decision-making.',
      paragraphs: [
        'The report highlights three municipalities that piloted open budget dashboards.',
        'We recommend clearer timelines for publishing evaluation criteria in large tenders.',
      ],
    },
    hy: {
      title: 'Հրապարակվել է 2026 թվականի թափանցիկության հաշվետվությունը',
      shortDescription:
        'Մեր վերջին հաշվետվությունը ամփոփում է բաց տվյալների հաջողությունները և բացատները հանրային որոշումներում։',
      paragraphs: [
        'Զեկույցը նշում է երեք համայնք, որտեղ փորձարկվել են բաց բյուջեի վահանակներ։',
        'Մենք խորհուրդ ենք տալիս ավելի պարզ ժամկետներ մրցույթների գնահատման չափանիշները հրապարակելու համար։',
      ],
    },
  },
  {
    slug: 'justice-legal-literacy-workshop',
    categorySlug: 'justice',
    en: {
      title: 'Legal literacy workshop for community leaders',
      shortDescription:
        'A practical session on administrative remedies and how to document rights violations.',
      paragraphs: [
        'Participants reviewed real case examples from administrative courts.',
        'Facilitators shared templates for filing complaints and tracking responses.',
      ],
    },
    hy: {
      title: 'Իրավական գրագիտության աշխատարան համայնքային առաջնորդների համար',
      shortDescription:
        'Գործնական նիստ վարչական միջոցների և իրավունքների խախտումները փաստաթղթավորելու մասին։',
      paragraphs: [
        'Մասնակիցները քննարկել են վարչական դատարանների իրական օրինակները։',
        'Ֆասիլիտատորները ներկայացրել են բողոքներ ներկայացնելու և պատասխանները հետևելու ձևանմուշներ։',
      ],
    },
  },
  {
    slug: 'justice-rights-protection-update',
    categorySlug: 'justice',
    en: {
      title: 'Rights protection update from the field',
      shortDescription:
        'What we heard from partners about social and economic rights in administrative practice.',
      paragraphs: [
        'Communities asked for clearer guidance on appeal deadlines and required documents.',
        'We published a short guide and will host follow-up office hours next month.',
      ],
    },
    hy: {
      title: 'Իրավունքների պաշտպանության թարմացում դաշտից',
      shortDescription:
        'Ինչ ակնկալել են գործընկերները սոցիալական և տնտեսական իրավունքների վերաբերյալ։',
      paragraphs: [
        'Համայնքները խնդրել են ավելի պարզ ուղեցույցներ բողոքարկման ժամկետների և փաստաթղերի մասին։',
        'Մենք հրապարակել ենք համառոտ ուղեցույց և հաջորդ ամիս կազմակերպենք հետագա խորհրդատվություն։',
      ],
    },
  },
  {
    slug: 'culture-youth-dialogue-series',
    categorySlug: 'culture',
    en: {
      title: 'Youth dialogue series launches in schools',
      shortDescription:
        'Students and educators explore memory, inclusion, and peace education through guided dialogue.',
      paragraphs: [
        'The pilot includes six schools in Yerevan and two regional towns.',
        'Recordings of selected sessions will be shared on our podcast page.',
      ],
    },
    hy: {
      title: 'Երիտասարդական երկխոսության շարքը մեկնարկում է դպրոցներում',
      shortDescription:
        'Աշակերտներն ու կրթողները քննարկում են հիշողությունը, ներառությունը և խաղաղության կրթությունը։',
      paragraphs: [
        'Փորձնական ծրագիրը ներառում է վեց դպրոց Երևանում և երկու մարզային քաղաք։',
        'Ընտրված նիստերի ձայնագրությունները կհրապարակվեն մեր պոդքաստի էջում։',
      ],
    },
  },
  {
    slug: 'culture-peace-education-roundtable',
    categorySlug: 'culture',
    en: {
      title: 'Peace education roundtable with cultural institutions',
      shortDescription:
        'Museums and libraries joined a roundtable on inclusive programming and shared learning resources.',
      paragraphs: [
        'Partners agreed to co-design two public exhibitions for the autumn season.',
        'A resource list for teachers will be available for download later this month.',
      ],
    },
    hy: {
      title: 'Խաղաղության կրթության կլոր սեղան մշակութային հաստատությունների հետ',
      shortDescription:
        'Թանգարաններն ու գրադարանները միացել են ներառական ծրագրերի և ընդհանուր ռեսուրսների քննարկմանը։',
      paragraphs: [
        'Գործընկերները համաձայնեցին համատեղ մշակել երկու հանրային ցուցահանդես աշնանային սեզոնի համար։',
        'Ուսուցիչների համար ռեսուրսների ցանկը հասանելի կլինի այս ամսվա վերջին։',
      ],
    },
  },
  {
    slug: 'events-annual-forum-save-date',
    categorySlug: 'events',
    en: {
      title: 'Save the date: NJC annual forum',
      shortDescription:
        'Mark early June in Yerevan—registration for the annual forum opens next month.',
      paragraphs: [
        'The forum will spotlight accountability tools and regional cooperation.',
        'Scholars and practitioners will lead parallel sessions across two days.',
      ],
    },
    hy: {
      title: 'Պահպանեք ամսաթիվը․ NJC տարեկան ֆորում',
      shortDescription:
        'Նշեք վաղ ամսվա սկիզբը Երևանում՝ տարեկան ֆորումի գրանցումը կբացվի հաջորդ ամիս։',
      paragraphs: [
        'Ֆորումը կկենտրոնանա հաշվետվողության գործիքների և տարածաշրջանային համագործակցության վրա։',
        'Գիտնականներն ու մասնագետները երկու օրով զուգահեռ նիստեր կվարեն։',
      ],
    },
  },
  {
    slug: 'events-regional-meeting-announcement',
    categorySlug: 'events',
    en: {
      title: 'Regional partners meeting announced',
      shortDescription:
        'Civil society groups from four regions will meet to share local accountability initiatives.',
      paragraphs: [
        'The meeting will include small-group clinics and a public summary session.',
        'Travel support is available for selected community representatives.',
      ],
    },
    hy: {
      title: 'Հայտարարվել է տարածաշրջանային գործընկերների հանդիպումը',
      shortDescription:
        'Քաղաքացիական հասարակության խմբերը չորս մարզից կհանդիպեն տեղական հաշվետվողության նախաձեռնությունները կիսելու համար։',
      paragraphs: [
        'Հանդիպումը կներառի փոքր խմբերի խորհրդատվություններ և հանրային ամփոփ նիստ։',
        'Ճանապարհային աջակցություն հասանելի է ընտրված համայնքային ներկայացուցիչների համար։',
      ],
    },
  },
];
