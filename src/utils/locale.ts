import type { Region } from '../types/country';

/**
 * Traducciones al español de los valores que la fuente entrega en inglés.
 *
 * Viven aquí, fuera de la capa de API, porque son una decisión de
 * presentación: si mañana la aplicación se publicara en otro idioma, este es
 * el único archivo que cambiaría.
 */

/** Región de la fuente → región que muestra la interfaz. */
const REGIONS: Readonly<Record<string, Region>> = {
  Africa: 'África',
  Americas: 'América',
  Antarctic: 'Antártida',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
};

/** Las veinticuatro subregiones que aparecen en el conjunto de datos. */
const SUBREGIONS: Readonly<Record<string, string>> = {
  'Australia and New Zealand': 'Australia y Nueva Zelanda',
  Caribbean: 'Caribe',
  'Central America': 'América Central',
  'Central Asia': 'Asia Central',
  'Central Europe': 'Europa Central',
  'Eastern Africa': 'África Oriental',
  'Eastern Asia': 'Asia Oriental',
  'Eastern Europe': 'Europa Oriental',
  Melanesia: 'Melanesia',
  Micronesia: 'Micronesia',
  'Middle Africa': 'África Central',
  'North America': 'América del Norte',
  'Northern Africa': 'África del Norte',
  'Northern Europe': 'Europa del Norte',
  Polynesia: 'Polinesia',
  'South America': 'América del Sur',
  'South-Eastern Asia': 'Sudeste Asiático',
  'Southeast Europe': 'Europa Sudoriental',
  'Southern Africa': 'África Austral',
  'Southern Asia': 'Asia Meridional',
  'Southern Europe': 'Europa del Sur',
  'Western Africa': 'África Occidental',
  'Western Asia': 'Asia Occidental',
  'Western Europe': 'Europa Occidental',
};

/**
 * Idiomas más frecuentes del conjunto de datos. La fuente trae ciento
 * cincuenta y cinco; los que no estén aquí se muestran tal cual llegan, que es
 * preferible a ocultarlos.
 */
const LANGUAGES: Readonly<Record<string, string>> = {
  Afrikaans: 'Afrikáans',
  Albanian: 'Albanés',
  Arabic: 'Árabe',
  Armenian: 'Armenio',
  Aymara: 'Aimara',
  Belarusian: 'Bielorruso',
  Bengali: 'Bengalí',
  Berber: 'Bereber',
  Bosnian: 'Bosnio',
  Bulgarian: 'Búlgaro',
  Burmese: 'Birmano',
  Catalan: 'Catalán',
  Chinese: 'Chino',
  Croatian: 'Croata',
  Czech: 'Checo',
  Danish: 'Danés',
  Dari: 'Dari',
  Dutch: 'Neerlandés',
  English: 'Inglés',
  Estonian: 'Estonio',
  Filipino: 'Filipino',
  Finnish: 'Finés',
  French: 'Francés',
  Georgian: 'Georgiano',
  German: 'Alemán',
  Greek: 'Griego',
  'Guaraní': 'Guaraní',
  Hebrew: 'Hebreo',
  Hindi: 'Hindi',
  Hungarian: 'Húngaro',
  Icelandic: 'Islandés',
  Indonesian: 'Indonesio',
  Irish: 'Irlandés',
  Italian: 'Italiano',
  Japanese: 'Japonés',
  Kazakh: 'Kazajo',
  Khmer: 'Jemer',
  Korean: 'Coreano',
  Lao: 'Lao',
  Latvian: 'Letón',
  Lithuanian: 'Lituano',
  Macedonian: 'Macedonio',
  Malay: 'Malayo',
  Maltese: 'Maltés',
  'Māori': 'Maorí',
  Mongolian: 'Mongol',
  Nepali: 'Nepalí',
  Norwegian: 'Noruego',
  Pashto: 'Pastún',
  Persian: 'Persa',
  Polish: 'Polaco',
  Portuguese: 'Portugués',
  Quechua: 'Quechua',
  Romanian: 'Rumano',
  Russian: 'Ruso',
  Serbian: 'Serbio',
  Slovak: 'Eslovaco',
  Slovene: 'Esloveno',
  Somali: 'Somalí',
  Spanish: 'Español',
  Swahili: 'Suajili',
  Swedish: 'Sueco',
  Thai: 'Tailandés',
  Turkish: 'Turco',
  Ukrainian: 'Ucraniano',
  Urdu: 'Urdu',
  Uzbek: 'Uzbeko',
  Vietnamese: 'Vietnamita',
};

export function translateRegion(value: string | undefined): Region {
  return REGIONS[value ?? ''] ?? 'Sin región';
}

export function translateSubregion(value: string | undefined): string {
  if (!value) return '';
  return SUBREGIONS[value] ?? value;
}

export function translateLanguage(value: string): string {
  return LANGUAGES[value] ?? value;
}

/**
 * Monedas más frecuentes. La fuente trae ciento sesenta y dos nombres
 * distintos; los que no estén aquí se muestran tal como llegan.
 */
const CURRENCIES: Readonly<Record<string, string>> = {
  'Afghan afghani': 'Afgani afgano',
  'Albanian lek': 'Lek albanés',
  'Algerian dinar': 'Dinar argelino',
  'Angolan kwanza': 'Kwanza angoleño',
  'Argentine peso': 'Peso argentino',
  'Armenian dram': 'Dram armenio',
  'Aruban florin': 'Florín arubeño',
  'Australian dollar': 'Dólar australiano',
  'Azerbaijani manat': 'Manat azerbaiyano',
  'Bahamian dollar': 'Dólar bahameño',
  'Bahraini dinar': 'Dinar bareiní',
  'Bangladeshi taka': 'Taka bangladesí',
  'Bolivian boliviano': 'Boliviano',
  'Botswana pula': 'Pula de Botsuana',
  'Brazilian real': 'Real brasileño',
  'British pound': 'Libra esterlina',
  'Bulgarian lev': 'Lev búlgaro',
  'Burundian franc': 'Franco burundés',
  'Canadian dollar': 'Dólar canadiense',
  'Central African CFA franc': 'Franco CFA de África Central',
  'CFP franc': 'Franco CFP',
  'Chilean peso': 'Peso chileno',
  'Chinese yuan': 'Yuan chino',
  'Colombian peso': 'Peso colombiano',
  'Costa Rican colón': 'Colón costarricense',
  'Croatian kuna': 'Kuna croata',
  'Czech koruna': 'Corona checa',
  'Danish krone': 'Corona danesa',
  'Dominican peso': 'Peso dominicano',
  'Eastern Caribbean dollar': 'Dólar del Caribe Oriental',
  'Egyptian pound': 'Libra egipcia',
  Euro: 'Euro',
  'Guatemalan quetzal': 'Quetzal guatemalteco',
  'Honduran lempira': 'Lempira hondureño',
  'Hong Kong dollar': 'Dólar de Hong Kong',
  'Hungarian forint': 'Forinto húngaro',
  'Icelandic króna': 'Corona islandesa',
  'Indian rupee': 'Rupia india',
  'Indonesian rupiah': 'Rupia indonesia',
  'Iraqi dinar': 'Dinar iraquí',
  'Israeli new shekel': 'Nuevo séquel israelí',
  'Japanese yen': 'Yen japonés',
  'Jordanian dinar': 'Dinar jordano',
  'Kenyan shilling': 'Chelín keniano',
  'Mexican peso': 'Peso mexicano',
  'Moroccan dirham': 'Dírham marroquí',
  'New Zealand dollar': 'Dólar neozelandés',
  'Nicaraguan córdoba': 'Córdoba nicaragüense',
  'Nigerian naira': 'Naira nigeriana',
  'Norwegian krone': 'Corona noruega',
  'Panamanian balboa': 'Balboa panameño',
  'Paraguayan guaraní': 'Guaraní paraguayo',
  'Peruvian sol': 'Sol peruano',
  'Philippine peso': 'Peso filipino',
  'Polish złoty': 'Esloti polaco',
  'Pound sterling': 'Libra esterlina',
  'Romanian leu': 'Leu rumano',
  'Russian ruble': 'Rublo ruso',
  'Saudi riyal': 'Riyal saudí',
  'Singapore dollar': 'Dólar de Singapur',
  'South African rand': 'Rand sudafricano',
  'South Korean won': 'Won surcoreano',
  'Swedish krona': 'Corona sueca',
  'Swiss franc': 'Franco suizo',
  'Thai baht': 'Bat tailandés',
  'Turkish lira': 'Lira turca',
  'United Arab Emirates dirham': 'Dírham de los Emiratos Árabes Unidos',
  'United States dollar': 'Dólar estadounidense',
  'Uruguayan peso': 'Peso uruguayo',
  'Venezuelan bolívar soberano': 'Bolívar venezolano',
  'Vietnamese đồng': 'Dong vietnamita',
  'West African CFA franc': 'Franco CFA de África Occidental',
};

export function translateCurrency(value: string): string {
  return CURRENCIES[value] ?? value;
}
