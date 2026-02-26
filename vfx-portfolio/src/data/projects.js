// ═══════════════════════════════════════════════
//  DATA — Selected Projects
//  Edit this file to update portfolio work
// ═══════════════════════════════════════════════

export const PROJECTS = [
  {
    id: 'dune',
    colorKey: 'w1',
    category: 'Feature Film · Environment Supervisor',
    title: 'Dune: Part Two',
    subtitle: 'Desert Arrakis · Sandworm Sequences',
    description:
      'Led the environment team responsible for the vast desert landscapes of Arrakis. Created the procedural dune systems, sand simulation rigs, and integrated the massive sandworm sequences with practical photography.',
    studio: 'Legendary / Warner Bros.',
    year: '2024',
    role: 'Environment Supervisor',
    deliverables: 'Desert biomes, dune simulation, compositing',
    tags: ['Houdini', 'Katana', 'RenderMan', 'Nuke'],
  },
  {
    id: 'gladiator',
    colorKey: 'w2',
    category: 'Feature Film · VFX Lead',
    title: 'Gladiator II',
    subtitle: 'Ancient Rome · Colosseum Crowds',
    description:
      'Supervised a team of 18 artists delivering the Colosseum environment extensions, crowd simulations, and 200+ shots of ancient Rome. Worked directly with Ridley Scott to match his exacting visual standards.',
    studio: 'Paramount Pictures',
    year: '2024',
    role: 'VFX Lead',
    deliverables: '200+ shots, Colosseum, crowd sim',
    tags: ['Houdini', 'Maya', 'Nuke', 'Mantra'],
  },
  {
    id: 'hotd',
    colorKey: 'w3',
    category: 'Streaming Series · Senior Compositor',
    title: 'House of the Dragon',
    subtitle: 'Dragon Compositing · Sky Replacements',
    description:
      'Responsible for the integration of CG dragon elements with live-action photography across 42 shots in season 2. Developed a new keying workflow that significantly reduced turnaround time for exterior dragon sequences.',
    studio: 'HBO Max',
    year: '2024',
    role: 'Senior Compositor',
    deliverables: '42 shots, dragon integration, sky work',
    tags: ['Nuke', 'Flame', 'After Effects'],
  },
  {
    id: 'furiosa',
    colorKey: 'w4',
    category: 'Feature Film · CG Supervisor',
    title: 'Furiosa',
    subtitle: 'Wasteland Environments · Vehicle FX',
    description:
      'Supervised CG environment and destruction FX for the post-apocalyptic Wasteland sequences. Developed procedural destruction tools in Houdini that were adopted studio-wide across subsequent productions.',
    studio: 'Warner Bros. / Kennedy Miller Mitchell',
    year: '2024',
    role: 'CG Supervisor',
    deliverables: 'Wasteland build, destruction FX, vehicles',
    tags: ['Houdini', 'Unreal', 'Nuke', 'Substance'],
  },
  {
    id: 'shogun',
    colorKey: 'w5',
    category: 'Streaming Series · Lead FX Artist',
    title: 'Shogun',
    subtitle: 'Feudal Japan · Fluid Simulations',
    description:
      'Lead artist on ocean and harbour water simulations for the battle sequences. Designed and executed large-scale ocean FLIP simulations in Houdini, achieving an unprecedented level of photorealism for a television production.',
    studio: 'FX / Hulu',
    year: '2024',
    role: 'Lead FX Artist',
    deliverables: 'Ocean sim, harbour environment, fire & smoke',
    tags: ['Houdini FLIP', 'Pyro', 'Nuke'],
  },
  {
    id: 'aquaman',
    colorKey: 'w6',
    category: 'Feature Film · FX Artist',
    title: 'Aquaman 2',
    subtitle: 'Ocean Simulations · Underwater Environments',
    description:
      'Created large-scale underwater environments and ocean surface simulations. Developed custom shader networks to achieve specific light scattering properties of deep ocean environments.',
    studio: 'DC / Warner Bros.',
    year: '2023',
    role: 'FX Artist',
    deliverables: 'Underwater enviro, ocean surface, bioluminescence',
    tags: ['Houdini', 'Katana', 'RenderMan', 'Nuke'],
  },
  {
    id: 'apes',
    colorKey: 'w7',
    category: 'Feature Film · Environment Artist',
    title: 'Kingdom of the Planet of the Apes',
    subtitle: 'Jungle Biomes · Sky Matte Paintings',
    description:
      'Responsible for foliage and jungle environment assets used across 80+ shots, along with sky matte paintings and atmospheric light integration for exterior sequences.',
    studio: 'Weta FX / 20th Century Studios',
    year: '2024',
    role: 'Environment Artist',
    deliverables: 'Jungle biomes, matte painting, sky work',
    tags: ['Maya', 'SpeedTree', 'Nuke', 'Photoshop'],
  },
];

// Gradient backgrounds keyed by colorKey
export const PROJECT_GRADIENTS = {
  w1: 'linear-gradient(145deg,#080b14 0%,#0e1a30 35%,#1a3560 65%,#2a5598 100%)',
  w2: 'linear-gradient(145deg,#120a06 0%,#2d1208 35%,#5c2510 65%,#9a4020 100%)',
  w3: 'linear-gradient(145deg,#050f0a 0%,#0a2015 35%,#153a25 65%,#24603a 100%)',
  w4: 'linear-gradient(145deg,#0f0818 0%,#200f38 35%,#3d1a6e 65%,#6633b8 100%)',
  w5: 'linear-gradient(145deg,#0d0b08 0%,#201c10 35%,#3d3520 65%,#6d5e38 100%)',
  w6: 'linear-gradient(145deg,#080c14 0%,#10182c 35%,#1a2e50 65%,#243d6e 100%)',
  w7: 'linear-gradient(145deg,#0a0808 0%,#1a1010 35%,#301818 65%,#502020 100%)',
};
