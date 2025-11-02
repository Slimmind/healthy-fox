import { FormField, FormItem } from '../types';

/**
 * Extracts the value of a specific field (by ID) from a list of FormItems.
 */
export const extractValue = (
  items: FormItem[],
  fieldId: string
): string | boolean | undefined => {
  for (const item of items) {
    const field = item.fields.find((f) => f.id === fieldId);
    if (field) return field.value;
  }
  return undefined;
};

/** Parses "value:label, value:label" option strings into option arrays. */
const parseOptions = (raw: string) =>
  raw.split(',').map((opt: string) => {
    const [value, label] = opt.split(':').map((s: string) => s.trim());
    return { value: value || label, label: label || value };
  });

type FieldBuilder = (base: FormField, items: FormItem[]) => FormField;

const FIELD_BUILDERS: Partial<Record<string, FieldBuilder>> = {
  'select-field': (base, items) => {
    const optionsStr = extractValue(items, 'options');
    if (typeof optionsStr === 'string') {
      return { ...base, options: parseOptions(optionsStr) };
    }
    return base;
  },

  'title-field': (base, items) => {
    const levelRaw = extractValue(items, 'level');
    const level = typeof levelRaw === 'string' ? levelRaw : 'h2';
    return { ...base, value: level };
  },

  'description-block': (base, items) => {
    const textRaw = extractValue(items, 'text');
    const text = typeof textRaw === 'string' ? textRaw : base.label;
    return { ...base, type: 'description', label: 'Description', value: text };
  },

  'fieldset-field': (base, items) => {
    const legendRaw = extractValue(items, 'legend');
    const legend = typeof legendRaw === 'string' ? legendRaw : '';
    const disabledRaw = extractValue(items, 'disabled');
    return {
      ...base,
      type: 'fieldset',
      label: 'Fieldset',
      legend,
      disabled: disabledRaw === true,
      children: [],
    };
  },

  'columns-layout': (base, items) => {
    const countRaw = extractValue(items, 'count');
    const count = typeof countRaw === 'string' ? countRaw : '2';
    const countNum = parseInt(count, 10) || 2;
    const columns = Array.from({ length: countNum }).map(() => ({
      id: `col_${Date.now()}_${Math.random()}`,
      items: [],
    }));
    return {
      ...base,
      type: 'columns',
      label: 'Columns',
      value: count,
      columns,
    };
  },

  button: (base, items) => {
    const variantRaw = extractValue(items, 'variant');
    const variant = typeof variantRaw === 'string' ? variantRaw : 'primary';
    const disabledRaw = extractValue(items, 'disabled');
    return { ...base, type: 'button', variant, disabled: disabledRaw === true };
  },

  label: (base, items) => {
    const forRaw = extractValue(items, 'for');
    const htmlFor = typeof forRaw === 'string' ? forRaw : '';
    return { ...base, type: 'label', for: htmlFor };
  },

  datalist: (base, items) => {
    const dataStr = extractValue(items, 'data');
    const data = typeof dataStr === 'string' ? parseOptions(dataStr) : [];
    return { ...base, type: 'datalist', data };
  },

  output: (base, items) => {
    const defaultRaw = extractValue(items, 'default');
    const defaultValue = typeof defaultRaw === 'string' ? defaultRaw : '';
    return { ...base, type: 'output', default: defaultValue };
  },

  optgroup: (base, items) => {
    const disabledRaw = extractValue(items, 'disabled');
    return {
      ...base,
      type: 'optgroup',
      label: base.label,
      disabled: disabledRaw === true,
    };
  },

  subheader: (base) => ({ ...base, type: 'subheader', label: 'Subheader' }),

  divider: (base) => ({ ...base, type: 'divider' }),
};

// Heading types share the same builder
const headingBuilder: FieldBuilder = (base) => ({
  ...base,
  type: base.type,
  label: base.text ?? base.label,
});
(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).forEach((h) => {
  FIELD_BUILDERS[h] = headingBuilder;
});

/**
 * Builds a FormField from the current settings panel state.
 * Delegates to FIELD_BUILDERS for type-specific properties.
 */
export const createFieldFromSettings = (
  type: string,
  settingsItems: FormItem[]
): FormField => {
  const labelRaw = extractValue(settingsItems, 'label');
  const label = typeof labelRaw === 'string' ? labelRaw : 'New Field';

  const nameRaw = extractValue(settingsItems, 'name');
  const name = typeof nameRaw === 'string' ? nameRaw : `field_${Date.now()}`;

  const requiredRaw = extractValue(settingsItems, 'required');

  const placeholderRaw = extractValue(settingsItems, 'placeholder');
  const placeholder =
    typeof placeholderRaw === 'string' ? placeholderRaw : undefined;

  const descriptionRaw = extractValue(settingsItems, 'description');
  const description =
    typeof descriptionRaw === 'string' ? descriptionRaw : undefined;

  const textRaw = extractValue(settingsItems, 'text');
  const text = typeof textRaw === 'string' ? textRaw : label;

  const baseField: FormField = {
    id: `field_${Date.now()}`,
    type: type.replace('-field', '') as FormField['type'],
    label,
    name,
    required: requiredRaw === true,
    placeholder,
    description,
    value: '',
    text,
  };

  const builder = FIELD_BUILDERS[type];
  return builder ? builder(baseField, settingsItems) : baseField;
};
