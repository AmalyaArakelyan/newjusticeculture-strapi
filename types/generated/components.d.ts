import type { Schema, Struct } from '@strapi/strapi';

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
      'default.preview-image': DefaultPreviewImage;
    }
  }
}
