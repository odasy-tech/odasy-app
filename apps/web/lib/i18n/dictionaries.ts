/**
 * User-facing strings for the Odasy landing. Spanish is the default (target
 * market is Colombia / LATAM); English is available as a secondary locale.
 *
 * Keep the editorial tone consistent across both languages — translate the
 * feel, not the words.
 */

export const dictionaries = {
  es: {
    opener: {
      classification: 'Odasy · Expediente v.01',
      subhead: 'Expedición Eje Cafetero · clasificación: pública',
      subtitlePre: 'Un instrumento de campo para exploradores que quieren que sus viajes ',
      subtitleAccent: 'signifiquen algo',
      subtitlePost: '.',
      cta: 'Abrir expediente',
      footerLeft: 'fundado 2026 · colombia',
      footerRight: 'v.01 · beta privada',
    },
    premise: {
      chapter: 'Capítulo I · La premisa',
      h1Part1: 'Muchos viajan. ',
      h1Part2: 'Pocos exploran. ',
      h1Part3: 'Menos ',
      h1Accent: 'recuerdan.',
      paragraph:
        'Odasy es el sistema operativo del explorador moderno: un pasaporte vivo, un mapa que se revela al recorrerlo y un juego que se despliega en lugares reales. Cada sello se gana en campo, nunca se compra. Cada página, un capítulo que solo tú has escrito.',
    },
    explorer: {
      meta: 'Identidad · interludio',
      heading: 'No eres turista. Eres explorador.',
      paragraph:
        'Cada decisión revela tu arquetipo. Tu pasaporte no acumula visitas — refleja quién has llegado a ser. Siete formas de explorar, una mezcla única en cada persona.',
      archetypes: [
        { id: 'navigator', name: 'Navegante', copy: 'Siempre buscando nuevos horizontes.' },
        { id: 'contemplator', name: 'Contemplador', copy: 'Viaja lento. Conoce profundo.' },
        { id: 'adventurer', name: 'Aventurero', copy: 'Adrenalina y desafío físico.' },
        { id: 'sibarite', name: 'Sibarita', copy: 'Descubre el mundo con el paladar.' },
        { id: 'cultural', name: 'Cultural', copy: 'Personas, historias, tradiciones.' },
        { id: 'chronicler', name: 'Cronista', copy: 'Documenta, comparte, recuerda.' },
        { id: 'conscious', name: 'Consciente', copy: 'Viaja con responsabilidad e impacto.' },
      ],
      profileLabel: 'Tu perfil de exploración',
      profileMix: [
        { archetype: 'Contemplador', pct: 38 },
        { archetype: 'Cultural', pct: 27 },
        { archetype: 'Sibarita', pct: 18 },
        { archetype: 'Navegante', pct: 17 },
      ],
    },
    apparatus: {
      chapter: 'Capítulo II · El instrumental',
      heading: 'Tres instrumentos. Un explorador.',
      pillars: [
        {
          ref: 'REF-001',
          title: 'El pasaporte',
          copy: 'Un documento vivo. Cada check-in real se convierte en un sello, cada misión en un capítulo, cada insignia en una marca de quién has llegado a ser. El corazón de Odasy.',
        },
        {
          ref: 'REF-002',
          title: 'El mapa vivo',
          copy: 'Empieza cubierto por niebla. Se revela al caminarlo. Los territorios se desbloquean, los pines se encienden, los secretos emergen solo cuando las condiciones se alinean. El mundo es un descubrimiento.',
        },
        {
          ref: 'REF-003',
          title: 'Las misiones',
          copy: 'No son una lista de tareas. Son invitaciones a vivir. Cada misión es una narrativa con un lugar real en el centro: descubre los secretos que guardan las paredes, sigue el rastro del sabor, conquista el volcán al amanecer.',
        },
      ],
    },
    field: {
      chapter: 'Capítulo III · El campo',
      heading: 'Empezamos donde nació el café.',
      paragraph:
        'El Eje Cafetero — Quindío, Risaralda, Caldas — es nuestro primer campo. Lo suficientemente pequeño para trabajarlo con obsesión. Lo suficientemente real para probar el producto. Lo suficientemente profundo para recompensar un año de exploración.',
      stats: [
        { value: '27', label: 'Lugares curados' },
        { value: '11', label: 'Misiones' },
        { value: '06', label: 'Insignias' },
        { value: '01', label: 'Región activa' },
      ],
      now: 'Ahora',
      roadmap: ['LATAM 2027', 'Global 2028'],
      mapTitle: 'Campo 01 · Eje Cafetero',
      mapSubregions: 'quindío · risaralda · caldas',
    },
    artifact: {
      chapter: 'Capítulo IV · El artefacto',
      headingPre: 'Cada sello ',
      headingAccent: 'se gana',
      headingPost: '. Nunca se compra.',
      collection: 'Colección',
      recovered: '5 / 9 recuperados',
      hoverHint: 'pasa sobre cualquier sello',
      stamps: [
        { key: 'coffee', title: 'Origen Café', place: 'Salento, Quindío', date: '2026-07-14' },
        { key: 'first', title: 'Primera Huella', place: 'Pereira, Risaralda', date: '2026-06-02' },
        { key: 'heritage', title: 'Pueblo Patrimonio', place: 'Filandia', date: '2026-07-28' },
        { key: 'summit', title: 'Cumbre', place: 'Nevado del Ruiz' },
        { key: 'valley', title: 'Caminante del Valle', place: 'Valle de Cocora', date: '2026-08-10' },
        { key: 'sunrise', title: 'Amanecer', place: 'Los Nevados' },
        { key: 'flavour', title: 'Ruta del Sabor', place: 'Armenia, Quindío', date: '2026-09-05' },
        { key: 'river', title: 'Meandro', place: 'Río Otún' },
        { key: 'legend', title: 'Leyenda', place: '???' },
      ],
    },
    expedition: {
      chapter: 'Capítulo V · Iniciar expedición',
      headingPre: 'Los primeros ',
      headingAccent: '500 exploradores',
      headingPost: ' trazan el mapa.',
      paragraph:
        'Únete a la lista de espera. Solo escribiremos una vez, cuando la expedición comience. Sin newsletters, sin ruido, sin embudos. Solo una señal de humo.',
      emailPlaceholder: 'tu@expedicion.co',
      submit: 'Unirme a la expedición',
      submitted: 'Bienvenido, explorador',
      meta: 'lista de espera · lanzamiento · q3 2026',
    },
    dossier: {
      blocks: [
        { label: 'Clasificación', value: 'Expediente público · v.01' },
        { label: 'Compilado', value: 'Colombia · 2026' },
        { label: 'Coordenadas', value: 'N 04°32\u2032 · W 075°40\u2032' },
        { label: 'Próxima revisión', value: 'Q3 2026' },
      ],
      links: [
        { label: 'Acerca', href: '#' },
        { label: 'Privacidad', href: '#' },
        { label: 'Términos', href: '#' },
        { label: 'Contacto', href: '#' },
      ],
      copyright: '© 2026 Odasy · Beta privada',
      communityHint: 'Hermandad de exploradores · próximamente',
    },
    toggle: {
      aria: 'Cambiar idioma',
    },
  },
  en: {
    opener: {
      classification: 'Odasy · Dossier v.01',
      subhead: 'Eje Cafetero expedition · classification: public',
      subtitlePre: 'A field instrument for explorers who want their journeys to ',
      subtitleAccent: 'mean something',
      subtitlePost: '.',
      cta: 'Open the dossier',
      footerLeft: 'est. 2026 · colombia',
      footerRight: 'v.01 · private beta',
    },
    premise: {
      chapter: 'Chapter I · The premise',
      h1Part1: 'Most travel. ',
      h1Part2: 'Few explore. ',
      h1Part3: 'Fewer ',
      h1Accent: 'remember.',
      paragraph:
        'Odasy is the operating system for the modern explorer — a living passport, a map that reveals itself as you walk it, and a game that unfolds across real places. Every stamp is earned in the field, never bought. Every page, a chapter only you have written.',
    },
    explorer: {
      meta: 'Identity · interlude',
      heading: 'You are not a tourist. You are an explorer.',
      paragraph:
        "Every choice reveals your archetype. Your passport does not collect visits — it reflects who you've become. Seven ways to explore, one unique blend in every person.",
      archetypes: [
        { id: 'navigator', name: 'Navigator', copy: 'Always seeking new horizons.' },
        { id: 'contemplator', name: 'Contemplator', copy: 'Travels slow. Knows deep.' },
        { id: 'adventurer', name: 'Adventurer', copy: 'Adrenaline and physical challenge.' },
        { id: 'sibarite', name: 'Sibarite', copy: 'Discovers the world with the palate.' },
        { id: 'cultural', name: 'Cultural', copy: 'People, stories, traditions.' },
        { id: 'chronicler', name: 'Chronicler', copy: 'Documents, shares, remembers.' },
        { id: 'conscious', name: 'Conscious', copy: 'Travels with responsibility and impact.' },
      ],
      profileLabel: 'Your explorer profile',
      profileMix: [
        { archetype: 'Contemplator', pct: 38 },
        { archetype: 'Cultural', pct: 27 },
        { archetype: 'Sibarite', pct: 18 },
        { archetype: 'Navigator', pct: 17 },
      ],
    },
    apparatus: {
      chapter: 'Chapter II · The apparatus',
      heading: 'Three instruments. One explorer.',
      pillars: [
        {
          ref: 'REF-001',
          title: 'The passport',
          copy: "A living document. Every real-world check-in becomes a stamp, every mission a chapter, every badge a mark of who you've become. The heart of Odasy.",
        },
        {
          ref: 'REF-002',
          title: 'The living map',
          copy: 'Starts covered in fog. Reveals itself as you walk. Territories unlock, pins ignite, secrets surface only when the conditions are right. The world is a discovery.',
        },
        {
          ref: 'REF-003',
          title: 'The missions',
          copy: 'Not a to-do list. Invitations to live. Each mission is a narrative with a real place at its heart: discover the secrets the walls keep, follow the flavour trail, summit the volcano at dawn.',
        },
      ],
    },
    field: {
      chapter: 'Chapter III · The field',
      heading: 'We start where coffee was born.',
      paragraph:
        'The Colombian Coffee Region — Quindío, Risaralda, Caldas — is our first field. Small enough to craft with obsession. Real enough to prove the product. Deep enough to reward a year of exploration.',
      stats: [
        { value: '27', label: 'Curated places' },
        { value: '11', label: 'Missions' },
        { value: '06', label: 'Badges' },
        { value: '01', label: 'Region active' },
      ],
      now: 'Now',
      roadmap: ['LATAM 2027', 'Global 2028'],
      mapTitle: 'Field 01 · Eje Cafetero',
      mapSubregions: 'quindío · risaralda · caldas',
    },
    artifact: {
      chapter: 'Chapter IV · The artifact',
      headingPre: 'Every stamp is ',
      headingAccent: 'earned',
      headingPost: '. Never bought.',
      collection: 'Collection',
      recovered: '5 / 9 recovered',
      hoverHint: 'hover any stamp',
      stamps: [
        { key: 'coffee', title: 'Coffee Origin', place: 'Salento, Quindío', date: '2026-07-14' },
        { key: 'first', title: 'First Footprint', place: 'Pereira, Risaralda', date: '2026-06-02' },
        { key: 'heritage', title: 'Heritage Town', place: 'Filandia', date: '2026-07-28' },
        { key: 'summit', title: 'Summit', place: 'Nevado del Ruiz' },
        { key: 'valley', title: 'Valley Walker', place: 'Valle de Cocora', date: '2026-08-10' },
        { key: 'sunrise', title: 'Sunrise', place: 'Los Nevados' },
        { key: 'flavour', title: 'Flavour Trail', place: 'Armenia, Quindío', date: '2026-09-05' },
        { key: 'river', title: 'River Bend', place: 'Río Otún' },
        { key: 'legend', title: 'Legend', place: '???' },
      ],
    },
    expedition: {
      chapter: 'Chapter V · Begin expedition',
      headingPre: 'The first ',
      headingAccent: '500 explorers',
      headingPost: ' shape the map.',
      paragraph:
        "Join the waitlist. We'll only write once — when the expedition begins. No newsletters, no noise, no funnels. Just a signal fire.",
      emailPlaceholder: 'you@expedition.co',
      submit: 'Join the expedition',
      submitted: 'Welcome, explorer',
      meta: 'waitlist · launch · q3 2026',
    },
    dossier: {
      blocks: [
        { label: 'Classification', value: 'Public dossier · v.01' },
        { label: 'Compiled', value: 'Colombia · 2026' },
        { label: 'Coordinates', value: 'N 04°32\u2032 · W 075°40\u2032' },
        { label: 'Next review', value: 'Q3 2026' },
      ],
      links: [
        { label: 'About', href: '#' },
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Contact', href: '#' },
      ],
      copyright: '© 2026 Odasy · Private beta',
      communityHint: 'Brotherhood of explorers · opening soon',
    },
    toggle: {
      aria: 'Change language',
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];
export const DEFAULT_LOCALE: Locale = 'es';
export const LOCALES: Locale[] = ['es', 'en'];
