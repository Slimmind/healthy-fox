'use client';

import { useEffect } from 'react';

import { formCreatorControls } from '../../configs';
import { useSettingsState } from '../../hooks/use-settings-state';
import { useFormCreatorStore } from '../../store/form-creator-store';
import { FormField, FormItem } from '../../types';
import { createFieldFromSettings } from '../../utils/field-builder';
import { findItemById, updateItemInItems } from '../../utils/find-item-by-id';
import { getSettingConfig } from '../../utils/get-setting-config';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../utils/local-storage';
import { getTypeCodeFromFieldType } from '../../utils/type-code-map';
import FormCanvas from '../form-canvas';
import FormSettings from '../form-settings';
import Toolbox from '../toolbox';

import styles from './form-creator.module.css';

export const FormCreator = () => {
  const {
    formConfig,
    selectedElementId,
    activeContainerId,
    editingId,
    setFormConfig,
    setSelectedElement,
    setActiveContainer,
    setEditingId,
    deleteElement,
    moveElement,
    exportToJson,
    addItemToContainer,
  } = useFormCreatorStore();

  const { settings, setSettings, activeControlType, setActiveControlType } =
    useSettingsState();

  // Load form config from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = getLocalStorageItem('form-creator-config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormConfig(parsed);
      } catch (e) {
        console.error('Failed to load saved form config:', e);
      }
    }
  }, [setFormConfig]);

  // Save form config to localStorage on change (client-side only)
  useEffect(() => {
    setLocalStorageItem('form-creator-config', JSON.stringify(formConfig));
  }, [formConfig]);

  const onSettingsCancel = () => {
    setSettings({ items: [] });
    setActiveControlType(null);
    setEditingId(null);
  };

  const handleDrop = (
    data: { type: string; typeCode: string },
    containerId?: string | null
  ) => {
    if (!activeControlType) {
      // Direct DnD from toolbox — use defaults (empty settings)
      const newField = createFieldFromSettings(data.typeCode, []);
      const newItem: FormItem = {
        id: `item_${Date.now()}`,
        title: newField.label || newField.text || data.type,
        fields: [newField],
      };

      if (containerId) {
        const updatedItems = addItemToContainer(
          formConfig.items,
          containerId,
          newItem
        );
        setFormConfig({ ...formConfig, items: updatedItems });
      } else {
        setFormConfig({ ...formConfig, items: [...formConfig.items, newItem] });
      }
    }
  };

  const onSettingsSubmit = () => {
    if (!activeControlType || !settings.items.length) return;

    const newField = createFieldFromSettings(activeControlType, settings.items);
    const newItem: FormItem = {
      id: editingId || `item_${Date.now()}`,
      title: newField.label || newField.text || 'New Element',
      fields: [newField],
    };

    if (editingId) {
      const updatedItems = updateItemInItems(
        formConfig.items,
        editingId,
        newItem
      );
      setFormConfig({ ...formConfig, items: updatedItems });
    } else {
      // Add new item
      if (activeContainerId) {
        const updatedItems = addItemToContainer(
          formConfig.items,
          activeContainerId,
          newItem
        );
        setFormConfig({ ...formConfig, items: updatedItems });
      } else {
        setFormConfig({ ...formConfig, items: [...formConfig.items, newItem] });
      }

      // If the new item is a container, make it active
      if (newField.type === 'fieldset') {
        setActiveContainer(newField.id);
      } else if (newField.type === 'columns' && newField.columns?.length) {
        setActiveContainer(newField.columns[0].id);
      }
    }

    onSettingsCancel();
  };

  const handleSettingChange = (
    itemId: string,
    fieldId: string,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          fields: item.fields.map((field) =>
            field.id === fieldId ? { ...field, value } : field
          ),
        };
      }),
    }));
  };

  const handleEdit = (id: string) => {
    const { item: itemToEdit } = findItemById(formConfig.items, id);
    if (!itemToEdit || !itemToEdit.fields.length) return;

    const field = itemToEdit.fields[0];
    const typeCode = getTypeCodeFromFieldType(field.type);

    const newSettings = JSON.parse(
      JSON.stringify({ items: [getSettingConfig(typeCode)] })
    );

    // Populate settings with existing field values
    const settingItem = newSettings.items[0];
    if (settingItem) {
      settingItem.fields.forEach((f: FormField) => {
        if (f.id === 'label') f.value = field.label || '';
        if (f.id === 'name') f.value = field.name || '';
        if (f.id === 'required') f.value = field.required || false;
        if (f.id === 'placeholder') f.value = field.placeholder || '';
        if (f.id === 'description') f.value = field.description || '';
        if (f.id === 'options' && field.options) {
          f.value = field.options
            .map((o) => `${o.value}:${o.label}`)
            .join(', ');
        }
        if (f.id === 'text') {
          if (typeCode === 'title-field') f.value = field.label;
          if (typeCode === 'description-block') f.value = field.value as string;
          if (
            [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'subheader',
              'button',
              'label',
            ].includes(typeCode)
          ) {
            f.value = field.text || field.label;
          }
        }
        if (f.id === 'legend') f.value = field.legend || '';
        if (f.id === 'form') f.value = field.form || '';
        if (f.id === 'disabled')
          f.value = field.disabled || (field.value as boolean) || false;
        if (f.id === 'count') f.value = (field.value as string) || '2';
        if (f.id === 'level') f.value = (field.value as string) || 'h2';
        if (f.id === 'variant') f.value = field.variant || 'primary';
        if (f.id === 'for') f.value = field.for || '';
        if (f.id === 'data' && field.data) {
          f.value = field.data.map((o) => `${o.value}:${o.label}`).join(', ');
        }
        if (f.id === 'default') f.value = field.default || '';
      });
    }

    setSettings(newSettings);
    setActiveControlType(typeCode);
    setEditingId(id);
  };

  const handleSelect = (id: string) => {
    setSelectedElement(id);
    handleEdit(id);
  };

  const handleDelete = (id: string) => {
    if (editingId) {
      const { item: itemToDelete } = findItemById(formConfig.items, id);
      if (itemToDelete) {
        // If the currently edited item is the deleted item or inside it, clear settings
        const { item: editedItemInsideDeleted } = findItemById(
          [itemToDelete],
          editingId
        );
        if (editedItemInsideDeleted) {
          onSettingsCancel();
        }
      }
    }

    deleteElement(id);
  };

  return (
    <div className={styles['form-creator']}>
      <div className={styles['form-creator__toolbox']}>
        <Toolbox
          controls={formCreatorControls}
          onItemClick={(data) => handleDrop(data, activeContainerId)}
        />
      </div>
      <div className={styles['form-creator__canvas']}>
        <FormCanvas
          config={formConfig}
          selectedElementId={selectedElementId}
          activeContainerId={activeContainerId}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMove={moveElement}
          onContainerSelect={setActiveContainer}
          onDrop={handleDrop}
        />
        <div className={styles['form-creator__actions']}>
          <button
            className={styles['action-btn']}
            onClick={exportToJson}
            title="Save as JSON"
          >
            💾 Save JSON
          </button>
          <button
            className={styles['action-btn']}
            onClick={() => {
              setFormConfig({ items: [] });
              setSelectedElement(null);
              setActiveContainer(null);
              onSettingsCancel();
            }}
            title="Clear all"
          >
            🗑️ Clear All
          </button>
        </div>
      </div>
      <div className={styles['form-creator__settings']}>
        <FormSettings
          config={settings}
          submitHandler={onSettingsSubmit}
          changeHandler={handleSettingChange}
          cancelHandler={onSettingsCancel}
        />
      </div>
    </div>
  );
};
