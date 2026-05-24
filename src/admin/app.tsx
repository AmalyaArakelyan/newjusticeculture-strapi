import {
  setPluginConfig,
  defaultHtmlPreset,
} from '@_sh/strapi-plugin-ckeditor';

/** Rich text with Media Library button for inline images in body/content fields. */
export default {
  register() {
    setPluginConfig({
      presets: [
        {
          ...defaultHtmlPreset,
          description:
            'Rich text with headings, lists, links, and inline images from the Media Library.',
          editorConfig: {
            ...defaultHtmlPreset.editorConfig,
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'strapiMediaLib',
              'insertTable',
              '|',
              'undo',
              'redo',
            ],
          },
        },
      ],
    });
  },
};
