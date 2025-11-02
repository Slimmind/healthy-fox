import Input from '@/components/input';

import { FormField } from '../../types';

import styles from './form-settings.module.css';

type SettingRendererProps = {
  field: FormField;
  itemId: string;
  onChange: (itemId: string, fieldId: string, value: string | boolean) => void;
};

export const SettingRenderer = ({
  field,
  itemId,
  onChange,
}: SettingRendererProps) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          type="text"
          id={field.id}
          name={field.id}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          value={field.value as string}
          onChange={(e) => onChange(itemId, field.id, e.target.value)}
        />
      );
    case 'number':
      return (
        <Input
          type="number"
          id={field.id}
          name={field.id}
          label={field.label}
          placeholder={field.placeholder}
          value={field.value as string}
          onChange={(e) => onChange(itemId, field.id, e.target.value)}
        />
      );
    case 'textarea':
      return (
        <Input
          type="textarea"
          id={field.id}
          name={field.id}
          label={field.label}
          placeholder={field.placeholder}
          value={field.value as string}
          onChange={(e) => onChange(itemId, field.id, e.target.value)}
        />
      );
    case 'checkbox':
      return (
        <Input
          type="checkbox"
          id={field.id}
          name={field.id}
          label={field.label}
          checked={field.value as boolean}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            onChange(itemId, field.id, target.checked);
          }}
        />
      );
    case 'select':
      return (
        <div className={styles['setting-field']}>
          <label htmlFor={field.id}>{field.label}</label>
          <select
            id={field.id}
            name={field.id}
            value={field.value as string}
            onChange={(e) => onChange(itemId, field.id, e.target.value)}
            className={styles['setting-select']}
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return (
        <Input
          type="text"
          id={field.id}
          name={field.id}
          label={field.label}
          value={field.value as string}
          onChange={(e) => onChange(itemId, field.id, e.target.value)}
        />
      );
  }
};
