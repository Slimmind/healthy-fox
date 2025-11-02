'use client';

import Button from '@/components/button';

import { FormCreatorSetting, FormField, FormItem } from '../../types';

import styles from './form-settings.module.css';
import { SettingRenderer } from './SettingRenderer';

type FormSettingsProps = {
  config: FormCreatorSetting;
  submitHandler: () => void;
  changeHandler: (
    itemId: string,
    fieldId: string,
    value: string | boolean
  ) => void;
  cancelHandler: () => void;
};

export const FormSettings = ({
  config,
  submitHandler,
  changeHandler,
  cancelHandler,
}: FormSettingsProps) => {
  return (
    <div className={styles['form-settings']} id="form-settings">
      <h2 className={styles['form-settings__title']}>Properties</h2>
      <div className={styles['form-settings__body']}>
        {config.items.length === 0 ? (
          <div className={styles['empty-settings']}>
            Select an element to edit its properties
          </div>
        ) : (
          config.items.map((item: FormItem) => (
            <div key={item.id} className={styles['settings-group']}>
              {item.title && (
                <h3 className={styles['settings-group__title']}>
                  {item.title}
                </h3>
              )}
              {item.fields.map((field: FormField) => (
                <div key={field.id}>
                  <SettingRenderer
                    field={field}
                    itemId={item.id || ''}
                    onChange={changeHandler}
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      {config.items.length > 0 && (
        <footer className={styles['form-settings__controls']}>
          <Button mod="secondary" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button onClick={submitHandler}>Apply</Button>
        </footer>
      )}
    </div>
  );
};
