import type { Schema, Struct } from '@strapi/strapi';

export interface DefaultPageSection extends Struct.ComponentSchema {
  collectionName: 'components_default_page_sections';
  info: {
    displayName: 'Page section';
    icon: 'layout';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    heading: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface DefaultPreviewImage extends Struct.ComponentSchema {
  collectionName: 'components_podcast_preview_images';
  info: {
    description: 'Used for podcast preview images';
    displayName: 'Preview Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'default.page-section': DefaultPageSection;
      'default.preview-image': DefaultPreviewImage;
    }
  }
}
