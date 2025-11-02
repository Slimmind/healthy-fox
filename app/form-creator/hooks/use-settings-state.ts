import { useState } from 'react';

import { FormItem } from '../types';

/**
 * Isolated state for the settings panel.
 * Kept in its own hook so that settings changes don't trigger re-renders
 * of the entire FormCreator component tree.
 */
export const useSettingsState = () => {
  const [settings, setSettings] = useState<{ items: FormItem[] }>({
    items: [],
  });
  const [activeControlType, setActiveControlType] = useState<string | null>(
    null
  );

  return {
    settings,
    setSettings,
    activeControlType,
    setActiveControlType,
  };
};
