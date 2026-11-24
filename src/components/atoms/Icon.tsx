/**
 * ÁTOMO · Icon
 *
 * Pieza indivisible: dibuja un trazo y nada más. No conoce la aplicación.
 * Siempre queda oculto para los lectores de pantalla, porque el texto
 * accesible lo aporta el control que lo contiene.
 */
export type IconName =
  | 'search'
  | 'chevron-down'
  | 'chevron-right'
  | 'x-circle'
  | 'x'
  | 'menu'
  | 'close'
  | 'arrow-left'
  | 'arrow-up'
  | 'globe'
  | 'users'
  | 'map-pin'
  | 'compass'
  | 'coins'
  | 'languages';

const PATHS: Record<IconName, string> = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  'arrow-up': '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/>',
  users:
    '<path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="9.5" cy="7" r="3.2"/><path d="M21 19v-1a4 4 0 0 0-3-3.8"/><path d="M16.5 4.2a3.2 3.2 0 0 1 0 5.6"/>',
  'map-pin': '<path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  coins:
    '<circle cx="9" cy="9" r="5"/><path d="M15.5 5.3a5 5 0 0 1 0 13.4"/><path d="M11 19a5 5 0 0 0 7.5-4"/>',
  languages:
    '<path d="M3 6h9"/><path d="M7.5 4v2"/><path d="M10 6c-.6 4.2-3 7.3-6 9"/><path d="M5 11c1.2 2.1 3.3 3.8 6 4.5"/><path d="m13 20 4-10 4 10"/><path d="M14.5 17h5"/>',
};

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, className = '', strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
