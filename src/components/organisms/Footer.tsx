/**
 * ORGANISMO · Footer
 *
 * Pie de página con la procedencia de los datos.
 */
export function Footer() {
  return (
    <footer className="mt-2xl border-t border-line">
      <div className="app-shell flex flex-col gap-xs py-lg text-label text-ink-muted tablet:flex-row tablet:items-center tablet:justify-between">
        <p>Explorer App — Diseño Web Adaptable, UNIVO.</p>
        <p>Datos incluidos en el proyecto · 250 países</p>
      </div>
    </footer>
  );
}
