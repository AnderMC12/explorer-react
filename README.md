# Explorer App — React + TypeScript

Aplicación que muestra los países del mundo en tarjetas y permite buscarlos por
nombre y filtrarlos por región. La interfaz está organizada en componentes
reutilizables siguiendo **Atomic Design**, con props tipadas y estado compartido
en el componente padre.

Construida con **React 18, TypeScript, Vite y Tailwind CSS v4**.

---

## 1. Requisitos

Node.js 20 o superior. Comprueba tu versión con `node -v`.

## 2. Ejecutar el proyecto

```bash
git clone https://github.com/AnderMC12/explorer-react.git
cd explorer-react
npm install
npm run dev
```

El servidor de desarrollo queda en <http://localhost:5173>.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Verifica los tipos y genera el sitio en `dist/`. |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar. |
| `npm run typecheck` | Solo la verificación de tipos. |

## 3. Organización por Atomic Design

```
src/
├── components/
│   ├── atoms/        Piezas indivisibles. No conocen la aplicación.
│   │   ├── Icon.tsx         Trazo SVG decorativo.
│   │   ├── Button.tsx       Botón con sus variantes.
│   │   ├── IconButton.tsx   Botón sin texto; exige etiqueta accesible.
│   │   ├── TextInput.tsx    Campo controlado.
│   │   ├── Select.tsx       Desplegable nativo.
│   │   ├── Flag.tsx         Imagen de bandera con su estado de ausencia.
│   │   ├── Stat.tsx         Par etiqueta-valor.
│   │   ├── Skeleton.tsx     Bloque animado de carga.
│   │   └── Logo.tsx         Marca de la aplicación.
│   │
│   ├── molecules/    Átomos combinados en un control con un propósito.
│   │   ├── SearchField.tsx    Icon + TextInput + botón de borrar.
│   │   ├── RegionFilter.tsx   Select + indicador.
│   │   ├── CountryCard.tsx    Flag + Stat: la tarjeta de país.
│   │   ├── NavLinks.tsx       Lista de enlaces, en fila o en columna.
│   │   ├── EmptyState.tsx     Mensaje de «sin coincidencias».
│   │   ├── ErrorState.tsx     Aviso de fallo con reintento.
│   │   └── CardSkeleton.tsx   Silueta de una tarjeta.
│   │
│   └── organisms/    Secciones completas de la interfaz.
│       ├── Header.tsx         Marca, navegación y menú móvil.
│       ├── SearchPanel.tsx    Búsqueda, filtro y conteo.
│       ├── CountryGrid.tsx    Rejilla adaptable y sus tres estados.
│       └── Footer.tsx         Pie de página.
│
├── types/        Country, Region, Filters y la forma cruda de los datos.
├── api/          Petición tipada, validación y errores clasificados.
├── utils/        Formato de población y filtrado combinado.
├── styles/       Design Tokens con @theme.
├── App.tsx       Plantilla: aquí vive el estado compartido.
└── main.tsx      Punto de entrada.
```

**El criterio para separar los niveles.** Un átomo no puede dividirse sin dejar
de tener sentido: un botón, un campo, una imagen. Una molécula agrupa átomos en
un control con un propósito único, como el campo de búsqueda con su icono y su
botón de borrar. Un organismo es una sección entera de la interfaz que puede
entenderse por sí sola, como la cabecera o la rejilla de resultados.

## 4. Dónde vive el estado

Todo el estado compartido está en `App.tsx`. Ningún hijo guarda copia: reciben
el valor por props y piden los cambios mediante callbacks.

| Estado | Para qué sirve | Quién pide el cambio |
|---|---|---|
| `countries` | Lista completa cargada una sola vez. | `CountryGrid` → `onRetry` |
| `status` | `loading`, `ready` o `error`. | — |
| `query` | Texto de búsqueda. | `SearchPanel` → `onQueryChange` |
| `region` | Región seleccionada. | `SearchPanel` → `onRegionChange` |
| `isMenuOpen` | Si el menú móvil está abierto. | `Header` → `onToggleMenu`, `onCloseMenu` |

```
App  ── query, region, isMenuOpen, countries, status
 │
 ├── Header       ← isMenuOpen         → onToggleMenu, onCloseMenu
 ├── SearchPanel  ← query, region      → onQueryChange, onRegionChange, onClearQuery
 └── CountryGrid  ← lista ya filtrada  → onRetry, onReset
```

Con una sola fuente de verdad, la búsqueda, el filtro y el menú no pueden quedar
desincronizados. La lista visible no se guarda en el estado: se deriva con
`useMemo` a partir de `countries`, `query` y `region`, de modo que no existe la
posibilidad de que quede desactualizada respecto a sus filtros.

### Ejemplo: el hijo pide, el padre decide

```tsx
// App.tsx — el estado y la función que lo actualiza
const [query, setQuery] = useState('');

<SearchPanel query={query} onQueryChange={setQuery} /* … */ />
```

```tsx
// SearchPanel.tsx — recibe el valor y propaga el cambio hacia arriba
<SearchField value={query} onChange={onQueryChange} onClear={onClearQuery} />
```

```tsx
// TextInput.tsx — el átomo solo avisa; no guarda nada
<input value={value} onChange={(event) => onChange(event.target.value)} />
```

## 5. Distribución adaptable

| Ancho | Tarjetas por fila | Navegación |
|---|---|---|
| Móvil `<640px` | 1 | Botón de menú; se abre y se cierra. |
| `≥640px` | 2 | Botón de menú. |
| `≥768px` | 2 | Barra de navegación de escritorio. |
| `≥1024px` | 3 | Barra de navegación de escritorio. |
| `≥1280px` | 4 | Barra de navegación de escritorio. |

El menú móvil se desmonta al cerrarse, para que sus enlaces no queden
accesibles por teclado mientras están ocultos. Se cierra con la tecla Escape y
al elegir un destino.

## 6. Búsqueda y filtro

La búsqueda no distingue mayúsculas ni acentos: «japon» encuentra Japón y
«ARGENT» encuentra Argentina. Los resultados se actualizan al escribir.

Ambos criterios se aplican de forma combinada y son independientes entre sí: una
cadena vacía significa «sin filtro». De ahí sale el comportamiento esperado sin
lógica adicional, porque al limpiar el texto se conserva la región activa y al
elegir «Todas las regiones» se conserva el texto escrito.

Cuando ningún país coincide, la rejilla muestra un mensaje con los criterios
usados y un botón para limpiar los filtros.

## 7. Fuente de datos

Los datos se leen de `public/countries.json`, que se sirve junto con la
aplicación: 250 países con bandera, nombre, población, región y capital.

REST Countries retiró las versiones v1 a v4 de su API; el endpoint antiguo
devuelve un aviso de versión obsoleta y, al llegar sin cabeceras CORS, el
navegador lo reporta como fallo de CORS. La versión v5 exige una clave de acceso
que en un sitio estático quedaría expuesta en el repositorio público.

La petición se hace igualmente con `fetch`, con retorno tipado
`Promise<Country[]>`, validación en tiempo de ejecución y errores clasificados
en red, respuesta y formato. Para cambiar de fuente basta con reemplazar una
constante en `src/api/countries.ts`:

```ts
export const DATA_SOURCE = './countries.json';
```

Treinta y cinco territorios pequeños no tienen población registrada y se
muestran como «No disponible», en lugar de dejar un hueco en la tarjeta.

## 8. Accesibilidad

- Enlace de salto al contenido como primer elemento tabulable.
- Cada control de formulario tiene etiqueta asociada, oculta visualmente.
- El botón del menú declara `aria-expanded` y `aria-controls`.
- El conteo de resultados vive en una región viva y se anuncia al cambiar.
- Foco visible de 3 px en todos los controles.
- Objetivos táctiles de al menos 44 px.
- Se respeta la preferencia del sistema para reducir el movimiento.
