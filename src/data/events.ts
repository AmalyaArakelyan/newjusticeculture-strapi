type EventSeedLocale = {
  title: string;
  shortDescription: string;
  paragraphs: string[];
  location?: string;
};

export type EventSeedEntry = {
  slug: string;
  startAt: string;
  endAt?: string;
  isOnline?: boolean;
  googleMapsUrl?: string;
  registrationOpen?: boolean;
  en: EventSeedLocale;
  hy: EventSeedLocale;
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

export const EVENT_SEED_ENTRIES: EventSeedEntry[] = [
  {
    slug: 'civic-forum-yerevan-2026',
    startAt: '2026-06-14T10:00:00.000Z',
    endAt: '2026-06-14T17:00:00.000Z',
    googleMapsUrl: 'https://maps.google.com/?q=Yerevan+Armenia',
    registrationOpen: true,
    en: {
      title: 'Civic forum on accountability',
      shortDescription:
        'A full-day public forum on civic participation, transparency, and local accountability.',
      location: 'Yerevan, Armenia',
      paragraphs: [
        'Join community leaders, students, and practitioners for panels and workshops.',
        'Sessions include open Q&A and practical resources you can use in your organization.',
      ],
    },
    hy: {
      title: 'Հաշվետվողության համայնքային ֆորում',
      shortDescription:
        'Մեկօրյա հանրային ֆորում քաղաքացիական մասնակցության, թափանցիկության և տեղական հաշվետվողության թեմայով։',
      location: 'Երևան, Հայաստան',
      paragraphs: [
        'Միացեք համայնքի առաջնորդներին, ուսանողներին և մասնագետներին պանելների և աշխատարանների համար։',
        'Նիստերն ընդգրկում են բաց հարց ու պատասխան և գործնական ռեսուրսներ։',
      ],
    },
  },
  {
    slug: 'anti-corruption-academy-open-day',
    startAt: '2026-07-22T09:30:00.000Z',
    endAt: '2026-07-22T13:00:00.000Z',
    isOnline: true,
    registrationOpen: true,
    en: {
      title: 'Anti-corruption online academy — open day',
      shortDescription:
        'Online introduction to NJC learning tracks: ethics, integrity, and public interest advocacy.',
      location: 'Online',
      paragraphs: [
        'Meet instructors and preview course modules in a live virtual session.',
        'Registration is free; a stable internet connection is recommended.',
      ],
    },
    hy: {
      title: 'Հակակոռուպցիոն առցանց ակադեմիա — բաց օր',
      shortDescription:
        'Առցանց ներդիմում NJC-ի ուսումնական ուղղություններին՝ էթիկա, ազնվություն և հանրային շահի պաշտպանություն։',
      location: 'Առցանց',
      paragraphs: [
        'Ծանոթացեք դասախոսներին և դիտարկեք դասընթացների մոդուլները ուղիղ հեռարձակմամբ։',
        'Գրանցումն անվճար է, խորհուրդ է տրվում կայուն ինտերնետ կապ։',
      ],
    },
  },
  {
    slug: 'culture-night-community-stories',
    startAt: '2026-09-05T18:00:00.000Z',
    endAt: '2026-09-05T21:30:00.000Z',
    googleMapsUrl: 'https://maps.google.com/?q=Gyumri+Armenia',
    en: {
      title: 'Culture night: community stories',
      shortDescription:
        'An evening of film, discussion, and live performances celebrating justice and culture.',
      location: 'Gyumri, Armenia',
      paragraphs: [
        'Local artists and activists share short films and performances followed by a community dialogue.',
      ],
    },
    hy: {
      title: 'Մշակութային գիշեր՝ համայնքի պատմություններ',
      shortDescription:
        'Գիշերային ծրագիր կինոցուցադրություններով, քննարկումներով և live հանդեսներով՝ արդարությունն ու մշակույթը նշելու համար։',
      location: 'Գյումրի, Հայաստան',
      paragraphs: [
        'Տեղական արտիստներն ու ակտիվիստները ներկայացնում են կարճ ֆիլմեր և հանդեսներ, ապա համայնքային երկխոսություն։',
      ],
    },
  },
];
