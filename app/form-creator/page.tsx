import { Metadata } from 'next';

import FormCreator from './components/form-creator';

export const metadata: Metadata = {
  title: 'Foxy Form',
  description: 'Конструктор форм.',
};

export default function FormCreatorPage() {
  return <FormCreator />;
}
