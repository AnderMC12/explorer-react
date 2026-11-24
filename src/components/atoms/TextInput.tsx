/**
 * ÁTOMO · TextInput
 *
 * Campo de texto controlado: el valor vive fuera y el componente avisa de cada
 * cambio con `onChange`. No guarda estado propio, de modo que el padre sigue
 * siendo la única fuente de verdad.
 */
export interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  type?: 'text' | 'search';
}

export function TextInput({
  id,
  value,
  onChange,
  label,
  placeholder,
  type = 'text',
}: TextInputProps) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        enterKeyHint="search"
        className="min-w-0 flex-1 bg-transparent text-card font-normal text-ink outline-none placeholder:font-normal placeholder:text-ink-muted"
      />
    </>
  );
}
