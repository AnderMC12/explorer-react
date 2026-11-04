import { Icon } from '../atoms/Icon';
import { TextInput } from '../atoms/TextInput';

/**
 * MOLÉCULA · SearchField
 * Une tres átomos —icono, campo de texto y botón de borrar— en un control con
 * un propósito. Sigue sin tener estado propio: recibe el valor y devuelve los
 * cambios al padre mediante callbacks.
 */
export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function SearchField({ value, onChange, onClear }: SearchFieldProps) {
  return (
    <div className="flex h-12 w-full items-center gap-sm rounded-field border border-border-strong bg-surface px-md">
      <span className="shrink-0 text-text-secondary">
        <Icon name="search" size={18} />
      </span>

      <TextInput
        id="buscar-pais"
        type="search"
        value={value}
        onChange={onChange}
        label="Buscar país por nombre"
        placeholder="Buscar país…"
      />

      {/* El botón solo existe cuando hay algo que borrar: ofrecer un control
          sin efecto confunde más de lo que ayuda. */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="grid size-6 shrink-0 place-items-center rounded-pill text-text-secondary"
        >
          <span className="sr-only">Borrar la búsqueda</span>
          <Icon name="x-circle" size={18} />
        </button>
      )}
    </div>
  );
}
