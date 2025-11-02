import { FormItem } from '../types';

export const buttonConfig: FormItem = {
  id: 'button-settings',
  title: 'Button Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Button Text',
      required: true,
      placeholder: 'Click me',
      value: '',
    },
    {
      id: 'name',
      type: 'text' as const,
      label: 'Name',
      required: false,
      placeholder: 'button_name',
      value: '',
    },
    {
      id: 'variant',
      type: 'select' as const,
      label: 'Variant',
      required: false,
      placeholder: 'Select variant',
      value: 'primary',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'success', label: 'Success' },
        { value: 'danger', label: 'Danger' },
        { value: 'warning', label: 'Warning' },
      ],
    },
    {
      id: 'disabled',
      type: 'checkbox' as const,
      label: 'Disabled',
      required: false,
      value: false,
    },
  ],
};

export const labelConfig: FormItem = {
  id: 'label-settings',
  title: 'Label Settings',
  fields: [
    {
      id: 'text',
      type: 'text' as const,
      label: 'Label Text',
      required: true,
      placeholder: 'Label text',
      value: '',
    },
    {
      id: 'for',
      type: 'text' as const,
      label: 'For (input ID)',
      required: false,
      placeholder: 'input_id',
      value: '',
    },
  ],
};

export const datalistConfig: FormItem = {
  id: 'datalist-settings',
  title: 'Datalist Settings',
  fields: [
    {
      id: 'name',
      type: 'text' as const,
      label: 'Name (ID)',
      required: true,
      placeholder: 'datalist_name',
      value: '',
    },
    {
      id: 'data',
      type: 'textarea' as const,
      label: 'Options (comma separated: value:label)',
      required: true,
      placeholder: 'us:USA, ca:Canada',
      value: '',
    },
  ],
};

export const outputConfig: FormItem = {
  id: 'output-settings',
  title: 'Output Settings',
  fields: [
    {
      id: 'name',
      type: 'text' as const,
      label: 'Name',
      required: false,
      placeholder: 'output_name',
      value: '',
    },
    {
      id: 'label',
      type: 'text' as const,
      label: 'Label',
      required: false,
      placeholder: 'Output label',
      value: '',
    },
    {
      id: 'default',
      type: 'text' as const,
      label: 'Default Value',
      required: false,
      placeholder: 'Default output value',
      value: '',
    },
  ],
};
