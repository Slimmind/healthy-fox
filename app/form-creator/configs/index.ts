import { FormConfig } from '../types';

export * from './inputs';
export * from './structural';
export * from './controls';
export * from './grouping';

export const initialFormConfig: FormConfig = {
  items: [],
};

export const initialSettingsConfig = {
  items: [],
};

export const formCreatorControls = [
  // Structural Elements
  { title: 'Form Name', typeCode: 'form-name' },
  { title: 'H1', typeCode: 'h1' },
  { title: 'H2', typeCode: 'h2' },
  { title: 'H3', typeCode: 'h3' },
  { title: 'H4', typeCode: 'h4' },
  { title: 'H5', typeCode: 'h5' },
  { title: 'H6', typeCode: 'h6' },
  { title: 'Subheader', typeCode: 'subheader' },
  { title: 'Description', typeCode: 'description-block' },
  { title: 'Divider', typeCode: 'divider' },
  { title: 'Columns', typeCode: 'columns-layout' },
  // Input Fields
  { title: 'Text Field', typeCode: 'text-field' },
  { title: 'Email Field', typeCode: 'email-field' },
  { title: 'Password Field', typeCode: 'password-field' },
  { title: 'Number Field', typeCode: 'number-field' },
  { title: 'Textarea', typeCode: 'textarea-field' },
  { title: 'Select', typeCode: 'select-field' },
  { title: 'Checkbox', typeCode: 'checkbox-field' },
  { title: 'Datalist', typeCode: 'datalist' },
  { title: 'Output', typeCode: 'output' },
  // Grouping
  { title: 'Fieldset', typeCode: 'fieldset-field' },
  { title: 'Option Group', typeCode: 'optgroup' },
  // Controls
  { title: 'Button', typeCode: 'button' },
  { title: 'Label', typeCode: 'label' },
];
