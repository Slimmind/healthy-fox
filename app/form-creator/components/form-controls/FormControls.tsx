import Button from '@/components/button';

import { FormCreatorControl } from '../../types';

import styles from './form-controls.module.css';

type FormControlsProps = {
  controls: FormCreatorControl[];
  clickHandler: (type: string) => void;
};

export const FormControls = ({ controls, clickHandler }: FormControlsProps) => {
  return (
    <aside className={styles['form-controls']} id="form-controls">
      <ul className={styles['form-controls-list']}>
        {controls.map((control: FormCreatorControl) => (
          <li key={control.title}>
            <Button
              mod={['secondary', 'wide']}
              onClick={() => clickHandler(control.typeCode)}
            >
              {control.title}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
