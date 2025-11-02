import { FormField, FormItem } from '../types';

/**
 * Recursively finds a FormItem by ID within nested fieldset children and column items.
 */
export const findItemById = (
  items: FormItem[],
  id: string
): { item: FormItem | null; parentField?: FormField } => {
  for (const item of items) {
    if (item.id === id) {
      return { item, parentField: item.fields[0] };
    }
    const field = item.fields[0];
    if (field?.children) {
      const found = findItemById(field.children, id);
      if (found.item) return found;
    }
    if (field?.columns) {
      for (const col of field.columns) {
        const found = findItemById(col.items, id);
        if (found.item) return found;
      }
    }
  }
  return { item: null };
};

/**
 * Recursively updates a FormItem by ID within nested structures,
 * replacing it with `newItem` when the ID matches.
 */
export const updateItemInItems = (
  items: FormItem[],
  editingId: string,
  newItem: FormItem
): FormItem[] => {
  return items.map((item) => {
    if (item.id === editingId) {
      return newItem;
    }
    const field = item.fields[0];
    if (field?.children) {
      return {
        ...item,
        fields: [
          {
            ...field,
            children: updateItemInItems(field.children, editingId, newItem),
          },
        ],
      };
    }
    if (field?.columns) {
      return {
        ...item,
        fields: [
          {
            ...field,
            columns: field.columns.map((col) => ({
              ...col,
              items: updateItemInItems(col.items, editingId, newItem),
            })),
          },
        ],
      };
    }
    return item;
  });
};
