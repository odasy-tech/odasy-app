import { useEffect, useState } from 'react';
import { MetaLabel } from './MetaLabel';

/**
 * Live-ish coordinate ticker. Base point is Eje Cafetero;
 * sub-arcseconds drift every 1.5s to suggest a working instrument.
 * Does not touch the device GPS — purely decorative.
 */
export function FieldCoordinates() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, []);

  // Base: ~4°32'N, 75°40'W (Salento, Quindío)
  const latSeconds = ((tick * 17) % 600) / 10;
  const lonSeconds = ((tick * 13) % 600) / 10;

  const lat = `N 04°32'${latSeconds.toFixed(1).padStart(4, '0')}"`;
  const lon = `W 075°40'${lonSeconds.toFixed(1).padStart(4, '0')}"`;

  return <MetaLabel tone="dim">{`${lat}  ·  ${lon}`}</MetaLabel>;
}
