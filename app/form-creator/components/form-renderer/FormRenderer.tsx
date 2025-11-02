import { useState } from 'react';

import Input from '@/components/input';

import { FormField, FormData, FormConfig, FormItem } from '../../types';

type FormRendererProps = {
  config: FormConfig;
  onFieldChange?: (
    itemId: string,
    fieldId: string,
    value: string | boolean
  ) => void;
  itemWrapper?: (item: FormItem, children: React.ReactNode) => React.ReactNode;
  onSubmit?: (data: FormData) => void;
  activeContainerId?: string | null;
  onContainerSelect?: (id: string | null) => void;
  isNested?: boolean;
};

export const FormRenderer = ({
  config,
  onFieldChange,
  itemWrapper,
  onSubmit,
  activeContainerId,
  onContainerSelect,
  isNested = false,
}: FormRendererProps) => {
  // Строгая типизация состояния формы
  const [formData, setFormData] = useState<FormData>({});

  // Типизированный обработчик изменения поля
  const handleChange = (
    fieldId: string,
    value: string | boolean,
    itemId?: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Если передан обработчик изменения поля, вызываем его
    if (itemId && onFieldChange) {
      onFieldChange(itemId, fieldId, value);
    }
  };

  // Типизированный обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // console.log('Данные формы:', formData);
  };

  // Типизированная функция рендера поля
  const renderField = (field: FormField, itemId?: string) => {
    // Use passed itemId or fallback to field.form or field.id
    const targetItemId = itemId || field.form || field.id;

    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'password':
        return (
          <Input
            type={field.type}
            id={field.id}
            name={field.name || field.id}
            label={field.label}
            placeholder={field.placeholder}
            description={field.description}
            required={field.required}
            value={field.value as string} // Ensure value is passed from props if controlled
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleChange(field.id, target.value, targetItemId);
            }}
            className="form-input"
          />
        );

      case 'select':
        return (
          <select
            id={field.id}
            value={field.value as string}
            onChange={(e) => {
              const target = e.target as HTMLSelectElement;
              handleChange(field.id, target.value, targetItemId);
            }}
            className="form-select"
          >
            <option value="">Выберите опцию</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <Input
            type="checkbox"
            id={field.id}
            name={field.name || field.id}
            label={field.label}
            description={field.description}
            checked={field.value as boolean}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleChange(field.id, target.checked, targetItemId);
            }}
          />
        );

      case 'textarea':
        return (
          <Input
            type="textarea"
            id={field.id}
            name={field.name || field.id}
            label={field.label}
            placeholder={field.placeholder}
            description={field.description}
            required={field.required}
            value={field.value as string}
            onChange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              handleChange(field.id, target.value, targetItemId);
            }}
            className="form-textarea"
          />
        );

      case 'title':
        const Tag =
          (field.value as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';
        return <Tag className="form-title">{field.label}</Tag>;

      case 'description':
        const lines = (field.value as string).split('\n');
        return (
          <div className="form-description-block">
            {lines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        );

      case 'columns':
        return (
          <div className="form-columns">
            {field.columns?.map((col, index) => {
              const isActive = activeContainerId === col.id;
              return (
                <div
                  key={col.id || index}
                  className={`form-column ${
                    isActive ? 'active-container' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onContainerSelect?.(col.id);
                  }}
                >
                  <FormRenderer
                    config={{ items: col.items }}
                    onFieldChange={onFieldChange}
                    activeContainerId={activeContainerId}
                    onContainerSelect={onContainerSelect}
                    isNested={true}
                  />
                </div>
              );
            })}
          </div>
        );

      case 'fieldset':
        const isFieldsetActive = activeContainerId === field.id;
        return (
          <fieldset
            name={field.name}
            disabled={field.value as boolean}
            className={`form-fieldset ${
              isFieldsetActive ? 'active-container' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onContainerSelect?.(field.id);
            }}
          >
            {field.legend && <legend>{field.legend}</legend>}
            <FormRenderer
              config={{ items: field.children || [] }}
              onFieldChange={onFieldChange}
              activeContainerId={activeContainerId}
              onContainerSelect={onContainerSelect}
              isNested={true}
            />
          </fieldset>
        );

      default:
        return null;
    }
  };

  const FormTag = isNested ? 'div' : 'form';
  const formProps = isNested
    ? { className: 'nested-form-group' }
    : { onSubmit: handleSubmit, className: 'dynamic-form' };

  return (
    <FormTag {...formProps}>
      {config.title && <h1>{config.title}</h1>}
      {config.subtitle && <h2>{config.subtitle}</h2>}
      {config.description && <p>{config.description}</p>}

      {config.items.map((item) => {
        const content = (
          <div key={item.id || `item-${Math.random()}`} className="form-field">
            {item.fields.map((field) => (
              <div key={field.id || `field-${Math.random()}`}>
                {renderField(field, item.id)}
              </div>
            ))}
          </div>
        );
        return itemWrapper ? itemWrapper(item, content) : content;
      })}
    </FormTag>
  );
};
