import { Metadata } from 'next';

import HarvardPlate from '@/components/harvard-plate';

export const metadata: Metadata = {
  title: 'Foxy Plate',
  description: 'Конструктор здорового завтрака, обеда и ужина.',
};

export default function HarvardPlatePage() {
  return <HarvardPlate />;
}
