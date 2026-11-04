/**
 * ÁTOMO · Select
 * Desplegable nativo. Se eligió el elemento nativo y no uno simulado porque
 * funciona con teclado, con lector de pantalla y con el selector propio de
 * cada sistema móvil sin escribir una línea extra.
 */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: readonly SelectOption[];
}

export function Select({ id, value, onChange, label, options }: SelectProps) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 appearance-none bg-transparent text-card text-text-primary outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
