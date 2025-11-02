import { FormItem } from '../types';

export const formTitleConfig: FormItem = {
  id: 'form-title',
  title: 'Form Title',
  fields: [
    {
      id: 'title',
      type: 'text',
      label: 'Form Title',
      required: false,
      value: '',
    },
  ],
};

export const formSubtitleConfig: FormItem = {
  id: 'form-subtitle',
  title: 'Form Subtitle',
  fields: [
    {
      id: 'subtitle',
      type: 'text',
      label: 'Form Subtitle',
      required: false,
      value: '',
    },
  ],
};

export const formDescriptionConfig: FormItem = {
  id: 'form-description',
  title: 'Form Description',
  fields: [
    {
      id: 'description',
      type: 'textarea',
      label: 'Form Description',
      required: false,
      value: '',
    },
  ],
};

export const fieldsetConfig: FormItem = {
  id: 'fieldset-settings',
  title: 'Fieldset Settings',
  fields: [
    {
      id: 'legend',
      type: 'text' as const,
      label: 'Legend',
      required: false,
      placeholder: 'Fieldset Legend',
      value: '',
    },
    {
      id: 'name',
      type: 'text' as const,
      label: 'Name',
      required: false,
      placeholder: 'fieldset_name',
      value: '',
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

export const optgroupConfig: FormItem = {
  id: 'optgroup-settings',
  title: 'Option Group Settings',
  fields: [
    {
      id: 'label',
      type: 'text' as const,
      label: 'Group Label',
      required: true,
      placeholder: 'Group label',
      value: '',
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
