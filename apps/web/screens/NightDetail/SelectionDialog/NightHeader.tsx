import { DrawerDescription, DrawerTitle } from '@/components/ui/drawer';
import { useNight } from '@/packages/nights/hooks';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

export const NightHeader = () => {
  const night = useNight();
  return (
    <>
      <DrawerTitle>
        {night ? format(parseISO(night.date), 'MMM d') : ''}
      </DrawerTitle>
      <DrawerDescription>{night ? night.theme : ''}</DrawerDescription>
    </>
  );
};
