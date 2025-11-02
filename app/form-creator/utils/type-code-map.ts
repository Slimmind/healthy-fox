/**
 * Maps a FormField['type'] back to the typeCode used in the toolbox and settings config.
 * This is the single source of truth for field-type ↔ typeCode conversion.
 */
export const FIELD_TYPE_TO_TYPE_CODE: Record<string, string> = {
  description: 'description-block',
  fieldset: 'fieldset-field',
  columns: 'columns-layout',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheader: 'subheader',
  divider: 'divider',
  button: 'button',
  label: 'label',
  datalist: 'datalist',
  output: 'output',
  optgroup: 'optgroup',
};

/**
 * Resolves the typeCode for a given field type.
 * Falls back to `${fieldType}-field` for standard input types (text, email, etc.).
 */
export const getTypeCodeFromFieldType = (fieldType: string): string =>
  FIELD_TYPE_TO_TYPE_CODE[fieldType] ?? `${fieldType}-field`;
