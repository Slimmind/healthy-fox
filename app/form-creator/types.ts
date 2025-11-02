export type FormField = {
  id: string;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'select'
    | 'checkbox'
    | 'textarea'
    | 'title'
    | 'description'
    | 'columns'
    | 'fieldset'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subheader'
    | 'divider'
    | 'button'
    | 'label'
    | 'optgroup'
    | 'datalist'
    | 'output';
  label: string;
  required: boolean;
  placeholder?: string;
  description?: string;
  name?: string;
  value?: string | boolean;
  options?: {
    value: string;
    label: string;
  }[];
  form?: string;
  legend?: string;
  children?: FormItem[];
  columns?: { id: string; items: FormItem[] }[];
  // Additional properties for new element types
  text?: string; // For headers, labels, buttons
  level?: string; // For h1-h6
  variant?: string; // For buttons (primary, secondary, etc.)
  size?: string; // For buttons, headers
  disabled?: boolean; // For buttons, fieldsets
  for?: string; // For label (associates with input id)
  list?: string; // For input (associates with datalist id)
  data?: { value: string; label: string }[]; // For datalist options
  groupId?: string; // For optgroup
  default?: string; // For output default value
};

export type FormData = {
  [key: string]: string | boolean;
};

export type FormCreatorControl = {
  title: string;
  typeCode: string;
};

export type FormItem = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  fields: FormField[];
};

export type FormConfig = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  name?: string; // Form config name for JSON export
  items: FormItem[];
};

export type FormCreatorSetting = {
  items: FormItem[];
};

// Store types for Zustand
export type FormCreatorState = {
  formConfig: FormConfig;
  selectedElementId: string | null;
  activeContainerId: string | null;
  isDragging: boolean;
  dragType: string | null;
  editingId: string | null;

  // Actions
  setFormConfig: (config: FormConfig) => void;
  setSelectedElement: (id: string | null) => void;
  setActiveContainer: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragType: (type: string | null) => void;
  setEditingId: (id: string | null) => void;
  addElement: (element: FormItem, containerId?: string | null) => void;
  updateElement: (id: string, element: FormItem) => void;
  deleteElement: (id: string) => void;
  moveElement: (
    sourceId: string,
    targetId: string,
    position: 'before' | 'after'
  ) => void;
  exportToJson: () => void;
  addItemToContainer: (
    items: FormItem[],
    containerId: string | null,
    newItem: FormItem
  ) => FormItem[];
};

// DnD types
export type DragData = {
  type: string;
  typeCode: string;
};
