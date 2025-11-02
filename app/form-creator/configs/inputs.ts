import { FormItem } from '../types';

import { commonFields, placeholderField } from './common';

export const textFieldConfig: FormItem = {
  id: 'text-field-settings',
  title: 'Text Field Settings',
  fields: [...commonFields, placeholderField],
};

export const numberFieldConfig: FormItem = {
  id: 'number-field-settings',
  title: 'Number Field Settings',
  fields: [
    ...commonFields,
    {
      id: 'min',
      type: 'number' as const,
      label: 'Minimum Value',
      required: false,
      placeholder: '0',
      value: '',
    },
    {
      id: 'max',
      type: 'number' as const,
      label: 'Maximum Value',
      required: false,
      placeholder: '100',
      value: '',
    },
    placeholderField,
  ].flat(),
};

export const emailFieldConfig: FormItem = {
  id: 'email-field-settings',
  title: 'Email Field Settings',
  fields: [...commonFields, placeholderField],
};

export const passwordFieldConfig: FormItem = {
  id: 'password-field-settings',
  title: 'Password Field Settings',
  fields: [...commonFields, placeholderField],
};

export const textareaFieldConfig: FormItem = {
  id: 'textarea-field-settings',
  title: 'Textarea Field Settings',
  fields: [...commonFields, placeholderField],
};

export const checkboxFieldConfig: FormItem = {
  id: 'checkbox-field-settings',
  title: 'Checkbox Field Settings',
  fields: [
    {
      id: 'label',
      type: 'text' as const,
      label: 'Label',
      required: true,
      placeholder: 'Checkbox Label',
      value: '',
    },
    {
      id: 'name',
      type: 'text' as const,
      label: 'Field Name (API key)',
      required: true,
      placeholder: 'field_name',
      value: '',
    },
    {
      id: 'required',
      type: 'checkbox' as const,
      label: 'Required',
      required: false,
      value: false,
    },
  ],
};

export const selectFieldConfig: FormItem = {
  id: 'select-field-settings',
  title: 'Select Field Settings',
  fields: [
    ...commonFields,
    {
      id: 'options',
      type: 'textarea' as const,
      label: 'Options (comma separated: value:label)',
      required: true,
      placeholder: 'us:USA, ca:Canada',
      value: '',
    },
  ],
};
