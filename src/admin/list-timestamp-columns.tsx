import type { ReactNode } from 'react';

import { Typography } from '@strapi/design-system';

import {
  getTimestampFieldFromListMetadatas,
  LIST_TIMESTAMP_LABELS,
} from '../utils/form-timestamp-fields';

type ListFieldLayout = {
  name: string;
  label: string | { id: string; defaultMessage: string };
  attribute: { type: string };
  searchable?: boolean;
  sortable?: boolean;
  cellFormatter?: (
    row: Record<string, unknown>,
    header: { name: string },
    context: { collectionType: string; model: string }
  ) => ReactNode;
};

type ListLayout = {
  layout: ListFieldLayout[];
  metadatas?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  options?: Record<string, unknown>;
};

function formatListTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildTimestampColumn(fieldName: string): ListFieldLayout {
  return {
    name: fieldName,
    label: LIST_TIMESTAMP_LABELS[fieldName] ?? fieldName,
    attribute: { type: 'datetime' },
    searchable: false,
    sortable: true,
    cellFormatter: (row) => {
      const value = row[fieldName];
      if (value == null || value === '') {
        return (
          <Typography textColor="neutral600" variant="omega">
            —
          </Typography>
        );
      }
      return (
        <Typography textColor="neutral800" variant="omega">
          {formatListTimestamp(String(value))}
        </Typography>
      );
    },
  };
}

/**
 * Strapi 5 passes `layout` as the full ListLayout object (not the columns array).
 * @see ListViewPage runHookWaterfall(INJECT_COLUMN_IN_TABLE, { displayedHeaders, layout: list })
 */
export function injectTimestampListColumns({
  displayedHeaders,
  layout,
}: {
  displayedHeaders: ListFieldLayout[];
  layout: ListLayout;
}) {
  const fieldName = getTimestampFieldFromListMetadatas(layout.metadatas);
  if (!fieldName) {
    return { displayedHeaders, layout };
  }

  const column = buildTimestampColumn(fieldName);

  const headers = displayedHeaders.some((header) => header.name === fieldName)
    ? displayedHeaders
    : [column, ...displayedHeaders];

  const listColumns = Array.isArray(layout.layout) ? layout.layout : [];
  const nextListLayout = listColumns.some((header) => header.name === fieldName)
    ? listColumns
    : [column, ...listColumns];

  return {
    displayedHeaders: headers,
    layout: {
      ...layout,
      layout: nextListLayout,
    },
  };
}
