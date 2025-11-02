export const commonFields = [
  {
    id: 'label',
    type: 'text' as const,
    label: 'Label',
    required: true,
    placeholder: 'Field Label',
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
  {
    id: 'description',
    type: 'textarea' as const,
    label: 'Description',
    required: false,
    placeholder: 'Field description',
    value: '',
  },
];

export const placeholderField = {
  id: 'placeholder',
  type: 'text' as const,
  label: 'Placeholder',
  required: false,
  placeholder: 'Placeholder text',
  value: '',
};
