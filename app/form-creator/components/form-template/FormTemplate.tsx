import DeleteIcon from '@/icons/delete-icon';
import EditIcon from '@/icons/edit-icon';

import { FormConfig, FormItem } from '../../types';
import FormRenderer from '../form-renderer';

import styles from './form-template.module.css';

type FormTemplateProps = {
  config: FormConfig;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  activeContainerId?: string | null;
  onContainerSelect?: (id: string | null) => void;
};

export const FormTemplate = ({
  config,
  onEdit,
  onDelete,
  activeContainerId,
  onContainerSelect,
}: FormTemplateProps) => {
  if (!config.items || config.items.length === 0) {
    return (
      <div
        className={styles['form-template']}
        onClick={() => onContainerSelect?.(null)}
      >
        <div className={styles['empty-state']}>
          Form is empty. Select a control to add.
        </div>
      </div>
    );
  }

  const itemWrapper = (item: FormItem, children: React.ReactNode) => (
    <div key={item.id} className={styles['item-wrapper']}>
      <div className={styles['item-actions']}>
        {onEdit && (
          <button
            className={styles['action-btn']}
            onClick={() => item.id && onEdit(item.id)}
            title="Edit"
          >
            <EditIcon />
          </button>
        )}
        {onDelete && (
          <button
            className={`${styles['action-btn']} ${styles['delete']}`}
            onClick={() => item.id && onDelete(item.id)}
            title="Delete"
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg> */}
            <DeleteIcon />
          </button>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div
      className={styles['form-template']}
      id="form-template"
      onClick={() => onContainerSelect?.(null)}
    >
      <FormRenderer
        config={config}
        itemWrapper={itemWrapper}
        activeContainerId={activeContainerId}
        onContainerSelect={onContainerSelect}
      />
    </div>
  );
};
