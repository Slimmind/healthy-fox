'use client';

import { DragData } from '../../types';

import styles from './toolbox.module.css';

type ToolboxProps = {
  controls: { title: string; typeCode: string }[];
  onItemClick?: (data: DragData) => void;
};

const CATEGORIES = [
  {
    title: 'Structural',
    keys: [
      'form-name',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subheader',
      'description-block',
      'divider',
      'columns-layout',
    ],
  },
  {
    title: 'Input Fields',
    keys: [
      'text-field',
      'number-field',
      'email-field',
      'password-field',
      'textarea-field',
      'select-field',
      'checkbox-field',
      'datalist',
      'output',
    ],
  },
  {
    title: 'Grouping',
    keys: ['fieldset-field', 'optgroup'],
  },
  {
    title: 'Controls',
    keys: ['button', 'label'],
  },
];

export const Toolbox = ({ controls, onItemClick }: ToolboxProps) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    typeCode: string,
    title: string
  ) => {
    const dragData: DragData = {
      type: title,
      typeCode,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', title);
  };

  return (
    <aside className={styles.toolbox} id="toolbox">
      <h2 className={styles.toolbox__title}>Toolbox</h2>

      {CATEGORIES.map((category) => {
        const categoryControls = controls.filter((c) =>
          category.keys.includes(c.typeCode)
        );

        if (categoryControls.length === 0) return null;

        return (
          <div key={category.title} className={styles.toolbox__section}>
            <h3 className={styles['toolbox__section-title']}>
              {category.title}
            </h3>
            <ul className={styles['toolbox-list']}>
              {categoryControls.map((control) => (
                <li key={control.typeCode}>
                  <button
                    className={styles.toolbox__item}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, control.typeCode, control.title)
                    }
                    onClick={() =>
                      onItemClick?.({
                        type: control.title,
                        typeCode: control.typeCode,
                      })
                    }
                  >
                    <span className={styles.toolbox__icon}>+</span>
                    {control.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </aside>
  );
};
