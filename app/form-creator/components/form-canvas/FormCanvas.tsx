'use client';

import { useState } from 'react';

import DeleteIcon from '@/icons/delete-icon';
import EditIcon from '@/icons/edit-icon';

import { FormConfig, FormItem } from '../../types';

import { FieldRenderer } from './FieldRenderer';
import styles from './form-canvas.module.css';

type FormCanvasProps = {
  config: FormConfig;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
  selectedElementId?: string | null;
  activeContainerId?: string | null;
  onContainerSelect?: (id: string | null) => void;
  onDrop?: (
    data: { type: string; typeCode: string },
    containerId?: string | null
  ) => void;
  onMove?: (
    sourceId: string,
    targetId: string,
    position: 'before' | 'after'
  ) => void;
};

export const FormCanvas = ({
  config,
  onEdit,
  onDelete,
  onSelect,
  selectedElementId,
  activeContainerId,
  onContainerSelect,
  onDrop,
  onMove,
}: FormCanvasProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragOverContainer, setDragOverContainer] = useState<string | null>(
    null
  );
  const [dragOverItem, setDragOverItem] = useState<{
    id: string;
    position: 'before' | 'after';
  } | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragOverContainer(null);

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const data = JSON.parse(dataStr);
        onDrop?.(data, activeContainerId);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const handleItemDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    e.stopPropagation();
    const dragData = { action: 'move', id };
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleItemDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';

    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? 'before' : 'after';

    setDragOverItem({ id: targetId, position });
  };

  const handleItemDragLeave = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverItem?.id === targetId) {
      setDragOverItem(null);
    }
  };

  const handleItemDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverItem(null);
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data.action === 'move' && data.id !== targetId) {
          onMove?.(data.id, targetId, dragOverItem?.position || 'before');
        }
      }
    } catch (error) {
      console.error('Item drop error:', error);
    }
  };

  const handleContainerDrop = (
    e: React.DragEvent<HTMLFieldSetElement | HTMLDivElement>,
    containerId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverContainer(containerId);
    setTimeout(() => setDragOverContainer(null), 100);

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const data = JSON.parse(dataStr);
        onDrop?.(data, containerId);
      }
    } catch (error) {
      console.error('Container drop error:', error);
    }
  };

  const handleContainerDragOver = (
    e: React.DragEvent<HTMLFieldSetElement | HTMLDivElement>,
    containerId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverContainer(containerId);
  };

  const handleContainerDragLeave = (
    e: React.DragEvent<HTMLFieldSetElement | HTMLDivElement>,
    containerId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverContainer === containerId) {
      setDragOverContainer(null);
    }
  };

  if (!config.items || config.items.length === 0) {
    return (
      <div
        className={`${styles['form-canvas']} ${
          isDragOver ? styles['form-canvas--drag-over'] : ''
        }`}
        id="form-canvas"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => onContainerSelect?.(null)}
      >
        <div className={styles['empty-state']}>
          <div className={styles['empty-state__icon']}>📋</div>
          <p className={styles['empty-state__text']}>
            Drag and drop elements here to build your form
          </p>
        </div>
      </div>
    );
  }

  const renderItemWrapper = (item: FormItem, content: React.ReactNode) => {
    const isSelected = selectedElementId === item.id;
    const field = item.fields[0];
    const isContainer = field?.type === 'fieldset' || field?.type === 'columns';
    const isDragOverThis = dragOverItem?.id === item.id;

    return (
      <div
        key={item.id}
        className={`${styles['item-wrapper']} ${
          isSelected ? styles['item-wrapper--selected'] : ''
        }`}
        draggable
        onDragStart={(e) => handleItemDragStart(e, item.id!)}
        onDragOver={(e) => handleItemDragOver(e, item.id!)}
        onDragLeave={(e) => handleItemDragLeave(e, item.id!)}
        onDrop={(e) => handleItemDrop(e, item.id!)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(item.id || '');
        }}
      >
        {isDragOverThis && dragOverItem?.position === 'before' && (
          <div
            className={`${styles['drop-indicator']}
            ${styles['drop-indicator--before']}`}
          />
        )}
        <div className={styles['item-actions']}>
          {onEdit && (
            <button
              className={styles['action-btn']}
              onClick={(e) => {
                e.stopPropagation();
                item.id && onEdit(item.id);
              }}
              title="Edit"
            >
              <EditIcon />
            </button>
          )}
          {onDelete && (
            <button
              className={`${styles['action-btn']} ${styles['delete']}`}
              onClick={(e) => {
                e.stopPropagation();
                item.id && onDelete(item.id);
              }}
              title="Delete"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
        {content}
        {isContainer && (
          <span className={styles['container-badge']}>
            {field?.type === 'fieldset' ? 'Fieldset' : 'Columns'}
          </span>
        )}
        {isDragOverThis && dragOverItem?.position === 'after' && (
          <div
            className={`${styles['drop-indicator']}
              ${styles['drop-indicator--after']}`}
          />
        )}
      </div>
    );
  };

  const renderItems = (items: FormItem[], depth = 0): React.ReactNode => {
    if (!items || items.length === 0) return null;

    return items.map((item) => {
      if (!item.fields || item.fields.length === 0) return null;
      const field = item.fields[0];

      const fieldContent = (
        <FieldRenderer
          item={item}
          field={field}
          dragOverContainer={dragOverContainer}
          depth={depth}
          renderItems={renderItems}
          handleContainerDragOver={handleContainerDragOver}
          handleContainerDragLeave={handleContainerDragLeave}
          handleContainerDrop={handleContainerDrop}
          onContainerSelect={onContainerSelect}
        />
      );

      const content = (
        <div className={styles['form-field']}>{fieldContent}</div>
      );
      return renderItemWrapper(item, content);
    });
  };

  return (
    <div
      className={`${styles['form-canvas']} ${
        isDragOver ? styles['form-canvas--drag-over'] : ''
      }`}
      id="form-canvas"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onContainerSelect?.(null)}
    >
      <div className={styles['form-canvas__content']}>
        {config.name && (
          <div className={styles['form-name-badge']}>Form: {config.name}</div>
        )}
        <div className={styles['form-content']}>
          {renderItems(config.items)}
        </div>
      </div>
    </div>
  );
};
