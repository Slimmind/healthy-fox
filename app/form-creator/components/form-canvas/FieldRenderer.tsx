import { FormItem, FormField } from '../../types';

import styles from './form-canvas.module.css';

type FieldRendererProps = {
  item: FormItem;
  field: FormField;
  dragOverContainer: string | null;
  depth: number;
  renderItems: (items: FormItem[], depth: number) => React.ReactNode;
  handleContainerDragOver: (
    e: React.DragEvent<HTMLFieldSetElement | HTMLDivElement>,
    id: string
  ) => void;
  handleContainerDragLeave: (
    e: React.DragEvent<HTMLFieldSetElement | HTMLDivElement>,
    id: string
  ) => void;
  handleContainerDrop: (
    e: React.DragEvent<HTMLFieldSetElement | HTMLDivElement>,
    id: string
  ) => void;
  onContainerSelect?: (id: string | null) => void;
};

export const FieldRenderer = ({
  field,
  dragOverContainer,
  depth,
  renderItems,
  handleContainerDragOver,
  handleContainerDragLeave,
  handleContainerDrop,
  onContainerSelect,
}: FieldRendererProps) => {
  switch (field.type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
      return (
        <div className={styles['field-preview']}>
          <label>{field.label}</label>
          <input type={field.type} placeholder={field.placeholder} disabled />
        </div>
      );
    case 'textarea':
      return (
        <div className={styles['field-preview']}>
          <label>{field.label}</label>
          <textarea placeholder={field.placeholder} disabled />
        </div>
      );
    case 'select':
      return (
        <div className={styles['field-preview']}>
          <label>{field.label}</label>
          <select disabled>
            <option>Select option...</option>
            {field.options?.map((opt) => (
              <option key={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className={styles['field-preview']}>
          <label>
            <input type="checkbox" disabled /> {field.label}
          </label>
        </div>
      );
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const HeaderTag = field.type;
      return (
        <HeaderTag className={styles[`field-${field.type}`]}>
          {field.label || field.text}
        </HeaderTag>
      );
    }
    case 'title': {
      const TitleTag =
        (field.value as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h2';
      return (
        <TitleTag className={styles['field-title']}>{field.label}</TitleTag>
      );
    }
    case 'subheader':
      return (
        <h3 className={styles['field-subheader']}>
          {field.text || field.label}
        </h3>
      );
    case 'description':
      return (
        <p className={styles['field-description']}>{field.value as string}</p>
      );
    case 'divider':
      return (
        <div className={styles['field-divider']}>
          {field.label && <span>{field.label}</span>}
        </div>
      );
    case 'button':
      return (
        <button
          className={`${styles['field-button']} ${
            styles[`field-button--${field.variant || 'primary'}`]
          }`}
          disabled
        >
          {field.text || field.label}
        </button>
      );
    case 'label':
      return (
        <label className={styles['field-label']}>
          {field.text || field.label}
        </label>
      );
    case 'fieldset':
      return (
        <fieldset
          className={`${styles['field-fieldset']} ${
            dragOverContainer === field.id
              ? styles['field-fieldset--drag-over']
              : ''
          }`}
          disabled={field.disabled}
          onDragOver={(e) => handleContainerDragOver(e, field.id)}
          onDragLeave={(e) => handleContainerDragLeave(e, field.id)}
          onDrop={(e) => handleContainerDrop(e, field.id)}
        >
          {field.legend && <legend>{field.legend}</legend>}
          <div className={styles['fieldset-content']}>
            {field.children && field.children.length > 0 ? (
              renderItems(field.children, depth + 1)
            ) : (
              <div className={styles['empty-container']}>
                Drop elements here
              </div>
            )}
          </div>
        </fieldset>
      );
    case 'columns':
      return (
        <div className={styles['field-columns']}>
          {field.columns?.map((col, colIndex) => {
            const columnId = col.id || `col-${field.id}-${colIndex}`;
            const isActive = dragOverContainer === columnId;

            return (
              <div
                key={columnId}
                className={`${styles['field-column']} ${
                  isActive ? styles['field-column--drag-over'] : ''
                }`}
                onDragOver={(e) => handleContainerDragOver(e, columnId)}
                onDragLeave={(e) => handleContainerDragLeave(e, columnId)}
                onDrop={(e) => handleContainerDrop(e, columnId)}
                onClick={(e) => {
                  e.stopPropagation();
                  onContainerSelect?.(columnId);
                }}
              >
                <div className={styles['column-header']}>
                  Column {colIndex + 1}
                  {isActive && (
                    <span className={styles['column-active-indicator']}>
                      Drop here
                    </span>
                  )}
                </div>
                <div className={styles['column-content']}>
                  {col.items && col.items.length > 0 ? (
                    renderItems(col.items, depth + 1)
                  ) : (
                    <div className={styles['empty-container']}>Drop here</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    case 'datalist':
      return (
        <div className={styles['field-datalist']}>
          <span className={styles['field-badge']}>Datalist: {field.name}</span>
        </div>
      );
    case 'output':
      return (
        <div className={styles['field-output']}>
          <label>{field.label || 'Output'}</label>
          <output>{field.default || '0'}</output>
        </div>
      );
    default:
      return (
        <div className={styles['field-unknown']}>Unknown: {field.type}</div>
      );
  }
};
