import { FormItem } from '../types';

export const addItemToContainer = (
  items: FormItem[],
  containerId: string | null,
  newItem: FormItem
): FormItem[] => {
  if (!containerId) {
    return [...items, newItem];
  }

  return items.map((item) => {
    const field = item.fields[0];

    // Check if this item is the container
    if (item.id === containerId || field?.id === containerId) {
      if (field?.children !== undefined) {
        return {
          ...item,
          fields: [
            {
              ...field,
              children: [...(field.children || []), newItem],
            },
          ],
        };
      }
    }

    // Recursive search in children (fieldset)
    if (field?.children) {
      if (field.id === containerId) {
        return {
          ...item,
          fields: [
            {
              ...field,
              children: [...field.children, newItem],
            },
          ],
        };
      }
      return {
        ...item,
        fields: [
          {
            ...field,
            children: addItemToContainer(field.children, containerId, newItem),
          },
        ],
      };
    }

    // Recursive search in columns
    if (field?.columns) {
      const targetColumnIndex = field.columns.findIndex(
        (col) => col.id === containerId
      );

      if (targetColumnIndex !== -1) {
        const newColumns = [...field.columns];
        newColumns[targetColumnIndex] = {
          ...newColumns[targetColumnIndex],
          items: [...newColumns[targetColumnIndex].items, newItem],
        };
        return {
          ...item,
          fields: [
            {
              ...field,
              columns: newColumns,
            },
          ],
        };
      }

      const newColumns = field.columns.map((col) => ({
        ...col,
        items: addItemToContainer(col.items, containerId, newItem),
      }));

      return {
        ...item,
        fields: [
          {
            ...field,
            columns: newColumns,
          },
        ],
      };
    }

    return item;
  });
};

export const removeFromChildren = (
  items: FormItem[],
  id: string
): FormItem[] => {
  return items
    .filter((item) => item.id !== id)
    .map((item) => {
      const field = item.fields[0];
      if (field?.children) {
        return {
          ...item,
          fields: [
            {
              ...field,
              children: removeFromChildren(field.children, id),
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
                items: removeFromChildren(col.items, id),
              })),
            },
          ],
        };
      }
      return item;
    });
};

export const insertItemRelative = (
  items: FormItem[],
  targetId: string,
  newItem: FormItem,
  position: 'before' | 'after'
): FormItem[] => {
  const result: FormItem[] = [];
  for (const item of items) {
    if (item.id === targetId) {
      if (position === 'before') {
        result.push(newItem, item);
      } else {
        result.push(item, newItem);
      }
      continue;
    }
    const field = item.fields[0];
    if (field?.children) {
      const newChildren = insertItemRelative(
        field.children,
        targetId,
        newItem,
        position
      );
      result.push({
        ...item,
        fields: [{ ...field, children: newChildren }],
      });
      continue;
    }
    if (field?.columns) {
      const newColumns = field.columns.map((col) => ({
        ...col,
        items: insertItemRelative(col.items, targetId, newItem, position),
      }));
      result.push({
        ...item,
        fields: [{ ...field, columns: newColumns }],
      });
      continue;
    }
    result.push(item);
  }
  return result;
};
