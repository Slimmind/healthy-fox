import { FormItem } from '../types';

export const titleFieldConfig: FormItem = {
  id: 'title-field-settings',
  title: 'Title Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Title Text',
      required: true,
      placeholder: 'Enter title text',
      value: '',
    },
    {
      id: 'level',
      type: 'select' as const,
      label: 'Heading Level',
      required: true,
      placeholder: 'Select level',
      value: 'h2',
      options: [
        { value: 'h1', label: 'Heading 1' },
        { value: 'h2', label: 'Heading 2' },
        { value: 'h3', label: 'Heading 3' },
        { value: 'h4', label: 'Heading 4' },
        { value: 'h5', label: 'Heading 5' },
        { value: 'h6', label: 'Heading 6' },
      ],
    },
  ],
};

export const descriptionBlockConfig: FormItem = {
  id: 'description-block-settings',
  title: 'Description Settings',
  fields: [
    {
      id: 'text',
      type: 'textarea' as const,
      label: 'Description Text',
      required: true,
      placeholder: 'Enter description text',
      value: '',
    },
  ],
};

export const columnsConfig: FormItem = {
  id: 'columns-settings',
  title: 'Columns Settings',
  fields: [
    {
      id: 'count',
      type: 'number' as const,
      label: 'Number of Columns',
      required: true,
      placeholder: '2',
      value: '2',
    },
  ],
};

export const h1Config: FormItem = {
  id: 'h1-settings',
  title: 'Heading 1 Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Heading Text',
      required: true,
      placeholder: 'Enter heading text',
      value: '',
    },
  ],
};

export const h2Config: FormItem = {
  id: 'h2-settings',
  title: 'Heading 2 Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Heading Text',
      required: true,
      placeholder: 'Enter heading text',
      value: '',
    },
  ],
};

export const h3Config: FormItem = {
  id: 'h3-settings',
  title: 'Heading 3 Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Heading Text',
      required: true,
      placeholder: 'Enter heading text',
      value: '',
    },
  ],
};

export const h4Config: FormItem = {
  id: 'h4-settings',
  title: 'Heading 4 Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Heading Text',
      required: true,
      placeholder: 'Enter heading text',
      value: '',
    },
  ],
};

export const h5Config: FormItem = {
  id: 'h5-settings',
  title: 'Heading 5 Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Heading Text',
      required: true,
      placeholder: 'Enter heading text',
      value: '',
    },
  ],
};

export const h6Config: FormItem = {
  id: 'h6-settings',
  title: 'Heading 6 Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Heading Text',
      required: true,
      placeholder: 'Enter heading text',
      value: '',
    },
  ],
};

export const subheaderConfig: FormItem = {
  id: 'subheader-settings',
  title: 'Subheader Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Subheader Text',
      required: true,
      placeholder: 'Enter subheader text',
      value: '',
    },
  ],
};

export const dividerConfig: FormItem = {
  id: 'divider-settings',
  title: 'Divider Settings',
  fields: [
    {
      id: 'label',
      type: 'text' as const,
      label: 'Label (optional)',
      required: false,
      placeholder: 'Divider label',
      value: '',
    },
  ],
};
