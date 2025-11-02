import { create } from 'zustand';

import { initialFormConfig } from '../configs';
import { FormCreatorState } from '../types';
import { findItemById } from '../utils/find-item-by-id';
import {
  addItemToContainer,
  removeFromChildren,
  insertItemRelative,
} from '../utils/store-helpers';

export const useFormCreatorStore = create<FormCreatorState>((set, get) => ({
  formConfig: initialFormConfig,
  selectedElementId: null,
  activeContainerId: null,
  isDragging: false,
  dragType: null,
  editingId: null,

  setFormConfig: (config) => set({ formConfig: config }),

  setSelectedElement: (id) => set({ selectedElementId: id }),

  setActiveContainer: (id) => set({ activeContainerId: id }),

  setIsDragging: (isDragging) => set({ isDragging }),

  setDragType: (type) => set({ dragType: type }),

  setEditingId: (id) => set({ editingId: id }),

  addElement: (element, containerId = null) => {
    const { formConfig } = get();

    if (!containerId) {
      set({
        formConfig: {
          ...formConfig,
          items: [...formConfig.items, element],
        },
      });
    } else {
      const updatedItems = addItemToContainer(
        formConfig.items,
        containerId,
        element
      );
      set({ formConfig: { ...formConfig, items: updatedItems } });
    }

    // If the new item is a container, make it active
    const field = element.fields[0];
    if (field?.type === 'fieldset') {
      set({ activeContainerId: field.id });
    } else if (field?.type === 'columns' && field.columns?.length) {
      set({ activeContainerId: field.columns[0].id });
    }
  },

  updateElement: (id, element) => {
    const { formConfig } = get();
    set({
      formConfig: {
        ...formConfig,
        items: formConfig.items.map((item) =>
          item.id === id ? { ...item, fields: element.fields } : item
        ),
      },
    });
  },

  deleteElement: (id) => {
    const { formConfig, selectedElementId, activeContainerId } = get();

    set({
      formConfig: {
        ...formConfig,
        items: removeFromChildren(formConfig.items, id),
      },
      selectedElementId: selectedElementId === id ? null : selectedElementId,
      activeContainerId: activeContainerId === id ? null : activeContainerId,
    });
  },

  moveElement: (sourceId, targetId, position) => {
    const { formConfig } = get();
    const sourceFound = findItemById(formConfig.items, sourceId);
    if (!sourceFound.item) return;

    const itemsWithoutSource = removeFromChildren(formConfig.items, sourceId);
    const newItems = insertItemRelative(
      itemsWithoutSource,
      targetId,
      sourceFound.item,
      position
    );

    set({ formConfig: { ...formConfig, items: newItems } });
  },

  exportToJson: () => {
    const { formConfig } = get();
    const formName = formConfig.name || 'form-config';
    const jsonString = JSON.stringify(formConfig, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  addItemToContainer, // Exported for components like FormCreator that use it directly
}));
