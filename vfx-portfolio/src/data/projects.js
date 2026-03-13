// ─────────────────────────────────────────────────────────────────────────────
//  PROJECTS DATA — Marcos Muñoz · VFX Digital Compositor
//
//  FIELDS
//  ──────
//  id        string   unique slug
//  cat       string   category label shown in cards/modal
//  title     string   project title
//  sub       string   subtitle / director · distributor · year
//  desc      string   paragraph shown in modal
//  studio    string   production company
//  year      string   release / production year
//  role      string   your specific role
//  del       string   deliverables summary
//  tags      string[] software tools
//  format    string   Film | TV Series | Commercial | Music Video | Short Film | Exhibition | VR / Exhibition
//  color     number   palette index (0-14) — used when no image is set
//  featured  boolean  true → eligible to appear in the main Work grid
//  order     number   display order on the main Work grid (lower = first, max 7 shown)
//                     set to null or omit to exclude from the ordered slots
//  images    object   optional — all paths relative to /public/images/
//    .square   1:1  image shown in the grid card background
//    .wide   16:9  image shown as hover background in the Work section
//    .poster   2:3  tall poster shown in the modal right panel
//
//  ADDING IMAGES
//  ─────────────
//  1. Drop your files in /public/images/  (e.g. society-of-the-snow-square.jpg)
//  2. Set the images field on the project:
//       images: {
//         square:  '/images/society-of-the-snow-square.jpg',
//         wide:    '/images/society-of-the-snow-wide.jpg',
//         poster:  '/images/society-of-the-snow-poster.jpg',
//       }
//  3. Any missing key falls back to the CSS gradient palette (color field).
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [

  // ── FILMS ─────────────────────────────────────────────────────────────────

  {
    id:      'society-of-the-snow',
    cat:     'Feature Film',
    title:   'Society of the Snow',
    sub:     'J.A. Bayona · Netflix · 2023',
    desc:    'VFX compositing on J.A. Bayona\'s survival epic. Roto & prep work supporting the senior team across exteriors and snow environment shots. Integration of CG elements under senior supervision on a large-scale international production.',
    studio:  'El Ranchito VFX',
    year:    '2023',
    role:    'VFX Junior Compositor',
    del:     'Roto & prep, CG integration, cleanup',
    tags:    ['Nuke', 'Mocha Pro', 'ShotGrid'],
    format:  'Film',
    color:   0,
    featured: true,
    order:   1,           // ← 1st slot on the main grid
    images: {
      square:  "/images/projects/society_of_the_snow/square.webp",      // e.g. '/images/society-square.jpg'
      wide:    "/images/projects/society_of_the_snow/wide.webp",
      poster:  "/images/projects/society_of_the_snow/poster.webp",
    },
  },

  {
    id:      'leave-the-world-behind',
    cat:     'Feature Film',
    title:   'Leave the World Behind',
    sub:     'Sam Esmail · Netflix · 2023',
    desc:    'Compositing work on Sam Esmail\'s psychological thriller. VFX shot integration, roto and paint support for final sequences. Contributing to the visual language of one of Netflix\'s highest-profile releases of the year.',
    studio:  'El Ranchito VFX',
    year:    '2023',
    role:    'VFX Junior Compositor',
    del:     'Roto, paint support, shot compositing',
    tags:    ['Nuke', 'Mocha Pro', 'ShotGrid'],
    format:  'Film',
    color:   1,
    featured: true,
    order:   2,
    images: {
      square:  "/images/projects/leave_the_world_behind/square.webp",
      wide:    "/images/projects/leave_the_world_behind/wide.webp",
      poster:  "/images/projects/leave_the_world_behind/poster.webp",
    },
  },

  {
    id:      'lionel',
    cat:     'Feature Film',
    title:   'Lionel',
    sub:     '2025',
    desc:    'Feature film VFX compositing at LaLivingston. CG-heavy shots with atmospheric effects — smoke, particles and volumetrics built in Blender and integrated into Nuke. Generative AI tools used to support specific plate requirements.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'CG integration, atmospherics, AI-assisted elements',
    tags:    ['Nuke', 'Blender', 'ComfyUI', 'ShotGrid'],
    format:  'Film',
    color:   2,
    featured: true,
    order:   3,
    images: {
      square:  "/images/projects/lionel/square.webp",
      wide:    "/images/projects/lionel/wide.webp",
      poster:  "/images/projects/lionel/poster.webp",
    },
  },

  // ── TV SERIES ─────────────────────────────────────────────────────────────

  {
    id:      'la-coleccionista',
    cat:     'TV Series',
    title:   'La Coleccionista',
    sub:     '2025',
    desc:    'Full compositing work across multiple episodes. Chroma key, set extensions, CG integration and cleanup. Working within an established VFX pipeline using ShotGrid for version management and supervisor review.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'Chroma key, CG integration, cleanup',
    tags:    ['Nuke', 'Mocha Pro', 'ShotGrid'],
    format:  'TV Series',
    color:   8,
    featured: true,
    order:   4,
    images: {
      square:  "/images/projects/la_coleccionista/square.webp",
      wide:    "/images/projects/la_coleccionista/wide.webp",
      poster:  "/images/projects/la_coleccionista/poster.webp",
    },
  },

  {
    id:      'la-ruta-v2',
    cat:     'TV Series',
    title:   'La Ruta Vol. 2: Ibiza',
    sub:     'HBO Max · 2025',
    desc:    'VFX compositing on the second volume of the Spanish drama series. Sky replacements, environment extensions, and integration of digital elements to support the visual look of the Ibiza-set production.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'Sky replacement, environment extensions, compositing',
    tags:    ['Nuke', 'Mocha Pro', 'ShotGrid'],
    format:  'TV Series',
    color:   9,
    featured: true,
    order:   5,
    images: {
      square:  "/images/projects/la_ruta/square.webp",
      wide:    "/images/projects/la_ruta/wide.webp",
      poster:  "/images/projects/la_ruta/poster.webp",
    },
  },

  {
    id:      'nails',
    cat:     'TV Series',
    title:   'Nails',
    sub:     '2025',
    desc:    'Compositing across multiple episodes of the series. Integration of digital elements into practical scenes, cleanup and rig removal, and colour continuity work between cameras and locations.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'Compositing, cleanup, colour continuity',
    tags:    ['Nuke', 'Mocha Pro', 'ShotGrid'],
    format:  'TV Series',
    color:   10,
    featured: true,
    order:   6,
    images: {
      square:  "/images/projects/nails/square.webp",
      wide:    "/images/projects/nails/wide.webp",
      poster:  "/images/projects/nails/poster.webp",
    },
  },

  {
    id:      'esa-noche',
    cat:     'TV Series',
    title:   'That Night',
    sub:     '2026',
    desc:    'Current production. VFX compositing work including set extensions, atmospheric effects, and shot cleanup. Using established LaLivingston pipeline for delivery and supervisor review.',
    studio:  'LaLivingston',
    year:    '2026',
    role:    'VFX Digital Compositor',
    del:     'Set extensions, atmospherics, cleanup',
    tags:    ['Nuke', 'Blender', 'ShotGrid'],
    format:  'TV Series',
    color:   11,
    featured: true,
    order:   7,
    images: {
      square:  "/images/projects/esa_noche/square.webp",
      wide:    "/images/projects/esa_noche/wide.webp",
      poster:  "/images/projects/esa_noche/poster.webp",
    },
  },

  // ── MUSIC VIDEOS ──────────────────────────────────────────────────────────

  {
    id:      'problema-cabron',
    cat:     'Music Video',
    title:   'Problema Cabrón',
    sub:     'Residente · 2023',
    desc:    'VFX compositing for Residente\'s politically charged music video. Shot compositing, element integration and colour treatment to support the bold visual direction of the production.',
    studio:  'El Ranchito VFX',
    year:    '2023',
    role:    'VFX Junior Compositor',
    del:     'Compositing, element integration, colour treatment',
    tags:    ['Nuke', 'Mocha Pro'],
    format:  'Music Video',
    color:   3,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  {
    id:      'quiero-ser-baladista',
    cat:     'Music Video',
    title:   'Quiero Ser Baladista',
    sub:     'Residente · 2023',
    desc:    'Second Residente collaboration. VFX compositing including green screen integration, digital environments and stylised colour work. Part of a high-profile artistic production with strong visual direction.',
    studio:  'El Ranchito VFX',
    year:    '2023',
    role:    'VFX Junior Compositor',
    del:     'Green screen, digital environments, styling',
    tags:    ['Nuke', 'After Effects', 'Mocha Pro'],
    format:  'Music Video',
    color:   4,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  // ── COMMERCIALS ───────────────────────────────────────────────────────────

  {
    id:      'el-corte-ingles',
    cat:     'Commercial',
    title:   'El Corte Inglés Christmas Ad',
    sub:     'Christmas Campaign · 2023',
    desc:    'High-profile Christmas campaign for El Corte Inglés. VFX compositing including product integration, beauty work and digital snow elements. Delivery adapted for multiple broadcast formats and durations.',
    studio:  'El Ranchito VFX',
    year:    '2023',
    role:    'VFX Junior Compositor',
    del:     'Product integration, digital snow, multi-format delivery',
    tags:    ['Nuke', 'Maya', 'ShotGrid'],
    format:  'Commercial',
    color:   5,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  {
    id:      'aldi-christmas',
    cat:     'Commercial',
    title:   'ALDI Christmas Ad',
    sub:     'Christmas Campaign · 2023',
    desc:    'VFX compositing for the ALDI Christmas campaign. Integration of CG decorative elements, digital colour grading and delivery in multiple formats for TV and digital platforms.',
    studio:  'El Ranchito VFX',
    year:    '2023',
    role:    'VFX Junior Compositor',
    del:     'CG integration, colour grading, multi-platform delivery',
    tags:    ['Nuke', 'Maya', 'Mocha Pro'],
    format:  'Commercial',
    color:   6,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  // ── SHORT FILMS ───────────────────────────────────────────────────────────

  {
    id:      'atrapados',
    cat:     'Short Film',
    title:   'Atrapados',
    sub:     'Cáritas · 2025',
    desc:    'Full VFX work on this short film produced for Cáritas. From script breakdown to final delivery — environment extensions, CG element integration and compositing throughout the piece.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'Set extensions, CG integration, full compositing',
    tags:    ['Nuke', 'Blender', 'ComfyUI'],
    format:  'Short Film',
    color:   7,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  // ── EXHIBITIONS ───────────────────────────────────────────────────────────

  {
    id:      'awakening-to-life',
    cat:     'Immersive Exhibition',
    title:   'Awakening to Life',
    sub:     'Ancient Egypt · Córdoba · 2025',
    desc:    'VFX compositing for an immersive exhibition experience about Ancient Egypt. Building visual content designed for large-format projection across multiple surfaces — a different challenge from traditional screen compositing.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'Immersive VFX, large-format compositing',
    tags:    ['Nuke', 'Blender', 'After Effects'],
    format:  'Exhibition',
    color:   12,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  {
    id:      'history-of-money',
    cat:     'Immersive Exhibition',
    title:   'History of Money',
    sub:     'Fundación Banco Santander · Madrid · 2025',
    desc:    'Visual content for the History of Money exhibition at Fundación Banco Santander. Compositing and VFX supporting a large-scale museum installation with multiple projection surfaces and interactive elements.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'Exhibition VFX, projection mapping content',
    tags:    ['Nuke', 'After Effects', 'Blender'],
    format:  'Exhibition',
    color:   13,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

  {
    id:      'chillida-convergence',
    cat:     'Immersive Exhibition / VR',
    title:   'Eduardo Chillida: Convergence',
    sub:     'Comb of the Wind VR · San Diego · 2025',
    desc:    'VFX work on an immersive VR experience dedicated to sculptor Eduardo Chillida\'s iconic Comb of the Wind installation. Compositing adapted for virtual reality delivery — a technically demanding format with zero tolerance for visual inconsistency.',
    studio:  'LaLivingston',
    year:    '2025',
    role:    'VFX Digital Compositor',
    del:     'VR compositing, immersive VFX',
    tags:    ['Nuke', 'Blender', 'After Effects'],
    format:  'VR / Exhibition',
    color:   14,
    featured: false,
    order:   null,
    images: {
      square:  null,
      wide:    null,
      poster:  null,
    },
  },

]

// ── DERIVED EXPORTS ──────────────────────────────────────────────────────────

// All featured projects sorted by the `order` field for the main Work grid.
// Projects with order: null are excluded. Max 7 slots.
export const featuredProjects = projects
  .filter(p => p.featured && p.order !== null)
  .sort((a, b) => a.order - b.order)
  .slice(0, 7)
