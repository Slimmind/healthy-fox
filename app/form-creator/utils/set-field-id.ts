import { nanoid } from 'nanoid';

import { FormField } from '../types';

export const setFieldId = (fields: FormField[]) =>
  fields.map((field: FormField) => ({ ...field, id: nanoid() }));
