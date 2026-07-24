import type { Core } from '@strapi/strapi';

const ARMENIAN_LOCALE = {
  code: 'hy',
  name: 'Armenian (hy)',
};

export async function seedLocales(strapi: Core.Strapi) {
  const localesService = strapi.plugin('i18n').service('locales');
  const existingLocale = await localesService.findByCode(ARMENIAN_LOCALE.code);

  if (!existingLocale) {
    await localesService.create(ARMENIAN_LOCALE);
    strapi.log.info('[seed] Created Armenian (hy) locale');
  }
}
