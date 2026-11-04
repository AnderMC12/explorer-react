import { Icon, type IconName } from './Icon';

/**
 * ÁTOMO · IconButton
 * Botón sin texto visible. El nombre accesible es obligatorio en las props,
 * de modo que el tipado impide crear un botón que un lector de pantalla no
 * pueda anunciar.
 */
export interface IconButtonProps {
  icon: IconName;
  /** Texto que anuncia el lector de pantalla. Obligatorio a propósito. */
  label: string;
  onClick: () => void;
  expanded?: boolean;
  controls?: string;
  className?: string;
}

export function IconButton({
  icon,
  label,
  onClick,
  expanded,
  controls,
  className = '',
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      className={`grid size-11 place-items-center rounded-field border border-border-strong bg-surface text-text-primary transition-colors hover:bg-surface-raised ${className}`}
    >
      <Icon name={icon} size={22} />
    </button>
  );
}
