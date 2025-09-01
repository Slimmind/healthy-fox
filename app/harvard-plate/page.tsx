import { Metadata } from 'next';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

import HarvardPlate from './components/harvard-plate';

export const metadata: Metadata = {
  title: 'Foxy Plate',
  description: 'Конструктор здорового завтрака, обеда и ужина.',
};

export default function HarvardPlatePage() {
  return (
    <Provider store={store}>
      <HarvardPlate />;
    </Provider>
  );
}
