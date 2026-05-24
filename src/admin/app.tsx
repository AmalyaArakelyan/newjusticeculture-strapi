import type { StrapiApp } from '@strapi/strapi/admin';

import {
  setPluginConfig,
  defaultHtmlPreset,
} from '@_sh/strapi-plugin-ckeditor';

import { injectTimestampListColumns } from './list-timestamp-columns';
import { READ_ONLY_TIMESTAMP_FIELD_NAMES } from '../utils/form-timestamp-fields';

const TIMESTAMP_FIELD_HINT =
  'Set automatically when someone submits the form on the website. You cannot edit this here.';

type EditField = {
  name?: string;
  disabled?: boolean;
  hint?: string;
};

type EditLayoutPayload = {
  layout: EditField[][][];
  components?: Record<
    string,
    {
      layout: EditField[][];
      settings?: Record<string, unknown>;
    }
  >;
  metadatas?: Record<string, unknown>;
  options?: Record<string, unknown>;
  settings?: Record<string, unknown>;
};

function patchField(field: EditField): EditField {
  if (!field.name || !READ_ONLY_TIMESTAMP_FIELD_NAMES.has(field.name)) {
    return field;
  }
  return {
    ...field,
    disabled: true,
    hint: field.hint ?? TIMESTAMP_FIELD_HINT,
  };
}

function patchRows(rows: EditField[][]): EditField[][] {
  return rows.map((row) => row.map(patchField));
}

function patchPanels(panels: EditField[][][]): EditField[][][] {
  return panels.map((panel) => patchRows(panel));
}

/**
 * Strapi 5 passes the full EditLayout as `layout`, not the inner field grid.
 * @see useDocumentLayout runHookWaterfall(HOOKS.MUTATE_EDIT_VIEW_LAYOUT, { layout: editLayout })
 */
function disableTimestampFieldsInLayout({
  layout: editLayout,
  ...rest
}: {
  layout: EditLayoutPayload;
  query?: unknown;
}) {
  if (!editLayout || typeof editLayout !== 'object') {
    return { layout: editLayout, ...rest };
  }

  const updatedComponents = editLayout.components
    ? Object.fromEntries(
        Object.entries(editLayout.components).map(([uid, component]) => [
          uid,
          {
            ...component,
            layout: Array.isArray(component.layout)
              ? patchRows(component.layout)
              : component.layout,
          },
        ])
      )
    : editLayout.components;

  return {
    ...rest,
    layout: {
      ...editLayout,
      layout: Array.isArray(editLayout.layout)
        ? patchPanels(editLayout.layout)
        : editLayout.layout,
      components: updatedComponents,
    },
  };
}

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
  bootstrap(app: StrapiApp) {
    app.registerHook(
      'Admin/CM/pages/EditView/mutate-edit-view-layout',
      disableTimestampFieldsInLayout
    );
    app.registerHook(
      'Admin/CM/pages/ListView/inject-column-in-table',
      injectTimestampListColumns
    );
  },
};
