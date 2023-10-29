import { useNight } from '@packages/nights/hooks';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const NightHeader = () => {
  const night = useNight();
  return (
    night && (
      <div className="">
        <h2 className="text-sm text-slate-500">
          {format(parseISO(night.date), 'MMM d')}
        </h2>
        <h1 className="text-lg">{night.theme}</h1>
      </div>
    )
  );
};
