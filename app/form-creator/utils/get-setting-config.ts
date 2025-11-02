import * as configs from '../configs';
import { FormItem } from '../types';

const SETTING_CONFIG_MAP: Record<string, FormItem> = {
  'form-name': configs.formTitleConfig,
  'form-title': configs.formTitleConfig,
  'form-subtitle': configs.formSubtitleConfig,
  'form-description': configs.formDescriptionConfig,
  'title-field': configs.titleFieldConfig,
  'description-block': configs.descriptionBlockConfig,
  'columns-layout': configs.columnsConfig,
  'text-field': configs.textFieldConfig,
  'number-field': configs.numberFieldConfig,
  'email-field': configs.emailFieldConfig,
  'password-field': configs.passwordFieldConfig,
  'select-field': configs.selectFieldConfig,
  'checkbox-field': configs.checkboxFieldConfig,
  'textarea-field': configs.textareaFieldConfig,
  'fieldset-field': configs.fieldsetConfig,
  h1: configs.h1Config,
  h2: configs.h2Config,
  h3: configs.h3Config,
  h4: configs.h4Config,
  h5: configs.h5Config,
  h6: configs.h6Config,
  subheader: configs.subheaderConfig,
  divider: configs.dividerConfig,
  button: configs.buttonConfig,
  label: configs.labelConfig,
  datalist: configs.datalistConfig,
  output: configs.outputConfig,
  optgroup: configs.optgroupConfig,
};

export const getSettingConfig = (typeCode: string): FormItem => {
  return SETTING_CONFIG_MAP[typeCode] || configs.formTitleConfig;
};
