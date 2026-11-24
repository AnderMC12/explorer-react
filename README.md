# Explorer App — React + TypeScript

Aplicación web que muestra los 250 países del mundo en tarjetas, permite
buscarlos por nombre, filtrarlos por región y abrir la ficha completa de
cualquiera de ellos. La interfaz está organizada en componentes reutilizables
siguiendo **Atomic Design**, con props tipadas y el estado compartido en el
componente padre.

- **Aplicación publicada:** <https://explorer-react-anderson.vercel.app>
- **Repositorio:** <https://github.com/AnderMC12/explorer-react>

---

## 1. Capturas

### Listado de países

![Listado de países con el buscador, el filtro por región y la rejilla de tarjetas](docs/listado.png)

### Detalle de un país

![Ficha de un país con su bandera, nombre oficial, datos generales y países fronterizos](docs/detalle.png)

## 2. Tecnologías

| Tecnología | Para qué se usa |
|---|---|
| **React 18** | Componentes, estado y renderizado de la interfaz. |
| **TypeScript 5** | Tipado estricto del modelo de datos y de las props. |
| **Vite 6** | Servidor de desarrollo y empaquetado de producción. |
| **Tailwind CSS v4** | Estilos a partir de Design Tokens declarados con `@theme`. |
| **Vercel** | Publicación continua desde la rama principal. |

Sin bibliotecas de enrutado, de estado ni de componentes: todo se resuelve con
React y TypeScript.

## 3. Requisitos y ejecución

Node.js 20 o superior. Comprueba tu versión con `node -v`.

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

## 4. Qué hace la aplicación

- Carga el catálogo completo con una petición tipada y lo guarda en memoria.
- Muestra cada país en una tarjeta con bandera, nombre, región, población y capital.
- Busca por nombre sin distinguir mayúsculas ni acentos: «japon» encuentra Japón.
- Filtra por región de forma combinada con la búsqueda.
- Muestra los filtros activos como etiquetas que se pueden retirar una a una.
- Abre la ficha de cualquier país, con su nombre oficial, subregión, moneda,
  idiomas y países fronterizos navegables entre sí.
- Comunica tres estados distintos: cargando, sin coincidencias y error.
- Se adapta de una a cuatro columnas y ofrece un menú desplegable en móvil.

## 5. Organización por Atomic Design

```
src/
├── components/
│   ├── atoms/        Piezas indivisibles. No conocen la aplicación.
│   │   ├── Icon.tsx         Trazo SVG decorativo.
│   │   ├── Button.tsx       Botón con sus tres variantes.
│   │   ├── IconButton.tsx   Botón sin texto; exige etiqueta accesible.
│   │   ├── TextInput.tsx    Campo controlado.
│   │   ├── Select.tsx       Desplegable nativo.
│   │   ├── Flag.tsx         Bandera con su estado de ausencia.
│   │   ├── Stat.tsx         Par etiqueta-valor.
│   │   ├── Pill.tsx         Etiqueta compacta para un dato suelto.
│   │   ├── Skeleton.tsx     Bloque animado de carga.
│   │   └── Logo.tsx         Marca de la aplicación.
│   │
│   ├── molecules/    Átomos combinados en un control con un propósito.
│   │   ├── SearchField.tsx    Icono + campo + botón de borrar.
│   │   ├── RegionFilter.tsx   Selector de región con su indicador.
│   │   ├── CountryCard.tsx    Flag + Pill + Stat: la tarjeta de país.
│   │   ├── FilterChips.tsx    Filtros activos, retirables uno a uno.
│   │   ├── NavLinks.tsx       Enlaces, en fila o en columna.
│   │   ├── EmptyState.tsx     Mensaje de «sin coincidencias».
│   │   ├── ErrorState.tsx     Aviso de fallo con reintento.
│   │   └── CardSkeleton.tsx   Silueta de una tarjeta.
│   │
│   └── organisms/    Secciones completas de la interfaz.
│       ├── Header.tsx         Marca, navegación y menú móvil.
│       ├── SearchPanel.tsx    Búsqueda, filtro, chips y conteo.
│       ├── CountryGrid.tsx    Rejilla adaptable y sus tres estados.
│       ├── CountryDetail.tsx  Ficha completa de un país.
│       ├── BackToTop.tsx      Atajo para volver al inicio.
│       └── Footer.tsx         Pie de página.
│
├── hooks/        useHashRoute: la vista activa, leída de la URL.
├── types/        Country, Region, Filters y la forma cruda de los datos.
├── api/          Petición tipada, validación y errores clasificados.
├── utils/        Formato, filtrado combinado y traducciones al español.
├── styles/       Design Tokens con @theme.
├── App.tsx       Plantilla: aquí vive el estado compartido.
└── main.tsx      Punto de entrada.
```

**El criterio para separar los niveles.** Un átomo no puede dividirse sin dejar
de tener sentido: un botón, un campo, una imagen. Una molécula agrupa átomos en
un control con un propósito único, como el campo de búsqueda con su icono y su
botón de borrar. Un organismo es una sección entera de la interfaz que se
entiende por sí sola, como la cabecera o la rejilla de resultados.

## 6. Dónde vive el estado

Todo el estado compartido está en `App.tsx`. Ningún hijo guarda copia: reciben
el valor por props y piden los cambios mediante callbacks.

| Estado | Para qué sirve | Quién pide el cambio |
|---|---|---|
| `countries` | Catálogo completo, cargado una sola vez. | `CountryGrid` → `onRetry` |
| `status` | `loading`, `ready` o `error`. | — |
| `query` | Texto de búsqueda. | `SearchPanel` → `onQueryChange` |
| `region` | Región seleccionada. | `SearchPanel` → `onRegionChange` |
| `isMenuOpen` | Si el menú móvil está abierto. | `Header` → `onToggleMenu` |
| `route` | Vista activa: listado o ficha. | `CountryCard` → `onSelect` |

```
App  ── countries, status, query, region, isMenuOpen, route
 │
 ├── Header         ← isMenuOpen        → onToggleMenu, onCloseMenu
 ├── SearchPanel    ← query, region     → onQueryChange, onRegionChange
 ├── CountryGrid    ← lista filtrada    → onSelect, onRetry, onReset
 └── CountryDetail  ← país resuelto     → onBack, onSelect, onRetry
```

La lista visible y el país seleccionado no se almacenan en el estado: se
derivan con `useMemo` a partir de `countries`, `query`, `region` y `route`.
Guardarlos supondría dos fuentes de verdad y la posibilidad de que quedaran
desactualizados respecto a sus propios filtros.

### La cadena completa de un cambio

```tsx
// App.tsx — el estado y la función que lo actualiza
const [query, setQuery] = useState('');
<SearchPanel query={query} onQueryChange={setQuery} /* … */ />
```

```tsx
// organisms/SearchPanel.tsx — recibe el valor y lo propaga sin alterarlo
<SearchField value={query} onChange={onQueryChange} onClear={onClearQuery} />
```

```tsx
// atoms/TextInput.tsx — el átomo solo avisa; no guarda nada
<input value={value} onChange={(event) => onChange(event.target.value)} />
```

## 7. Navegación entre vistas

La vista activa se lee del fragmento de la URL mediante el hook
`useHashRoute`:

| Fragmento | Vista |
|---|---|
| `#/` | Listado de países |
| `#/pais/SLV` | Ficha de El Salvador |

Se eligió el fragmento y no una biblioteca de rutas por dos motivos: no añade
dependencias a un proyecto que no las necesita, y funciona en cualquier
servidor de archivos estáticos sin configurar reescrituras, que es justo como
se publica esta aplicación. Como consecuencia, la ficha de un país se puede
compartir, marcar como favorita y recargar.

## 8. Distribución adaptable

| Ancho de la ventana | Tarjetas por fila | Navegación |
|---|---|---|
| Menos de 640 px | 1 | Botón de menú |
| 640 px o más | 2 | Botón de menú |
| 768 px o más | 2 | Barra de escritorio |
| 1024 px o más | 3 | Barra de escritorio |
| 1280 px o más | 4 | Barra de escritorio |

Los puntos de quiebre llevan nombre propio —`compact`, `tablet`, `desktop` y
`wide`— y sustituyen a los de Tailwind en lugar de convivir con ellos: mezclar
ambos conjuntos rompe la cascada, porque Tailwind emite primero los
personalizados y después los suyos.

El menú de pantallas pequeñas se abre y se cierra con el mismo botón, se cierra
también con la tecla Escape, al tocar fuera y al elegir un destino. Mientras
está abierto, el fondo deja de desplazarse. Al cerrarse se desmonta en lugar de
ocultarse con estilos, de modo que sus enlaces no queden accesibles por teclado
estando invisibles.

## 9. Fuente de datos

Los datos se leen de `public/countries.json`, que se sirve junto con la
aplicación: 250 países con bandera, nombre, nombre oficial, población, región,
subregión, capital, idiomas, monedas y fronteras.

REST Countries retiró las versiones v1 a v4 de su API; el endpoint antiguo
devuelve un aviso de versión obsoleta y, al llegar sin cabeceras CORS, el
navegador lo reporta como fallo de CORS. La versión v5 exige una clave de
acceso que en un sitio estático quedaría expuesta en el repositorio público.

La petición se hace igualmente con `fetch`, con retorno tipado
`Promise<Country[]>`, validación en tiempo de ejecución y errores clasificados
en red, respuesta y formato. Para cambiar de fuente basta con reemplazar una
constante en `src/api/countries.ts`:

```ts
export const DATA_SOURCE = './countries.json';
```

El archivo se construyó uniendo tres fuentes abiertas: los países proceden de
[mledoze/countries](https://github.com/mledoze/countries), que es el conjunto
que alimentaba a REST Countries; la población viene del
[dataset del Banco Mundial](https://github.com/datasets/population), unida por
el código ISO 3166-1 alpha-3; y las banderas se referencian desde
[flagcdn.com](https://flagcdn.com).

Treinta y cinco territorios pequeños no tienen población registrada y se
muestran como «No disponible», en lugar de dejar un hueco en la tarjeta.

Las regiones, subregiones, idiomas y monedas llegan en inglés y se traducen en
`src/utils/locale.ts`. Las traducciones viven fuera de la capa de API porque
son una decisión de presentación: si la aplicación se publicara en otro idioma,
ese sería el único archivo que cambiaría. Lo que no esté en los mapas se
muestra tal como llega, que es preferible a ocultarlo.

## 10. Accesibilidad

- Enlace de salto al contenido como primer elemento tabulable.
- Cada control de formulario tiene etiqueta asociada, oculta visualmente.
- El botón del menú declara `aria-expanded` y `aria-controls`.
- El conteo de resultados vive en una región viva y se anuncia al cambiar.
- Las tarjetas son enlaces reales: funcionan con teclado y con lector de pantalla.
- La bandera lleva texto alternativo vacío en la tarjeta, porque el nombre del
  país está al lado; en la ficha, donde es el contenido principal, sí lo lleva.
- Foco visible de 3 px en todos los controles y objetivos táctiles de 44 px.
- Se respeta la preferencia del sistema para reducir el movimiento.
