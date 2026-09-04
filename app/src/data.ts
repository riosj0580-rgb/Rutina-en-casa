import type { ImageSourcePropType } from 'react-native';

export type Exercise = {
  key: string;
  img: ImageSourcePropType | null;
  name: string;
  reps: string;
  rir: string;
  rest: string;
  restSecs: number;
  sets: number;
  note: string;
};

export type Day = {
  id: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  warmup: string[];
  cooldown: string[];
  circuit: boolean;
  rounds: number;
  ex: Exercise[];
};

const WARM_BASE = [
  'Círculos de cadera sostenida de una pared',
  'Movilidad de tobillo',
  '20 marchas en el sitio elevando rodillas con control',
  '10 sentadillas al aire sin dolor',
];

const COOL_BASE = [
  'Estiramiento de cuádriceps de pie',
  'Estiramiento de isquiotibiales sentada',
  '1 min de respiración profunda',
];

const EX = {
  silla: {
    key: 'silla',
    img: require('../assets/exercises/sentadilla-en-silla.jpeg'),
    name: 'Sentado-parado en silla',
    reps: '3 series de 8-10',
    rir: 'RIR 3',
    rest: '90 seg',
    restSecs: 90,
    sets: 3,
    note: 'La silla limita la flexión de rodilla, empuja con todo el pie.',
  },
  puente: {
    key: 'puente',
    img: require('../assets/exercises/puente-de-gluteo.jpeg'),
    name: 'Puente de glúteo',
    reps: '3 series de 12-15',
    rir: 'RIR 2-3',
    rest: '60 seg',
    restSecs: 60,
    sets: 3,
    note: 'Pausa 1-2 seg arriba.',
  },
  flexion: {
    key: 'flexion',
    img: require('../assets/exercises/flexion-en-apoyada-en-banco.jpeg'),
    name: 'Flexión de brazos inclinada',
    reps: '3 series de 8-12',
    rir: 'RIR 3',
    rest: '60-90 seg',
    restSecs: 90,
    sets: 3,
    note: 'Manos en la mesa o encimera. Cuerpo recto, sin hundir la cadera.',
  },
  superman: {
    key: 'superman',
    img: require('../assets/exercises/superman.jpeg'),
    name: 'Superman',
    reps: '3 series de 10-12',
    rir: 'RIR 2-3',
    rest: '60 seg',
    restSecs: 60,
    sets: 3,
    note: 'Sube brazos y piernas juntos, sin forzar el cuello.',
  },
  plancha: {
    key: 'plancha',
    img: require('../assets/exercises/plancha-apoyada-en-rodillas.jpeg'),
    name: 'Plancha apoyada en rodillas',
    reps: '3 series de 20-30 seg',
    rir: 'RIR 2',
    rest: '45 seg',
    restSecs: 45,
    sets: 3,
    note: 'Abdomen firme, sin dejar caer la cadera.',
  },
  rumano: {
    key: 'rumano',
    img: require('../assets/exercises/peso-muerto-a-una-pierna-apoyado-en-pared.jpeg'),
    name: 'Peso muerto rumano a una pierna',
    reps: '8 reps de cada lado',
    rir: 'RIR 3',
    rest: 'al terminar la vuelta',
    restSecs: 90,
    sets: 1,
    note: 'Apoyada en la pared. Pierna casi recta, sin doblar la rodilla de apoyo.',
  },
  talones: {
    key: 'talones',
    img: require('../assets/exercises/elevacion-de-talon.jpeg'),
    name: 'Elevación de talones',
    reps: '15 reps',
    rir: 'RIR 2',
    rest: 'al terminar la vuelta',
    restSecs: 90,
    sets: 1,
    note: 'Sube lento, baja más lento.',
  },
  pajaro: {
    key: 'pajaro',
    img: require('../assets/exercises/perro-pajaro.jpeg'),
    name: 'Pájaro-perro',
    reps: '8 de cada lado',
    rir: 'RIR 2-3',
    rest: 'al terminar la vuelta',
    restSecs: 90,
    sets: 1,
    note: 'Sin balancearse.',
  },
  escalon: {
    key: 'escalon',
    img: require('../assets/exercises/subir-escalon.jpeg'),
    name: 'Subida a escalón',
    reps: '6 de cada lado',
    rir: 'RIR 3',
    rest: '90 seg entre vueltas',
    restSecs: 90,
    sets: 1,
    note: 'Solo subir. Bajar despacio, sin dejar caer el peso.',
  },
  sillaLenta: {
    key: 'sillaLenta',
    img: require('../assets/exercises/sentadilla-en-silla.jpeg'),
    name: 'Sentado-parado en silla, bajando en 3 seg',
    reps: '3 series de 8',
    rir: 'RIR 2-3',
    rest: '90 seg',
    restSecs: 90,
    sets: 3,
    note: 'Cuenta tres segundos al bajar. Empuja con todo el pie.',
  },
  puenteUna: {
    key: 'puenteUna',
    img: require('../assets/exercises/puente-de-gluteo.jpeg'),
    name: 'Puente de glúteo a una pierna',
    reps: '3 series de 10-12',
    rir: 'RIR 2-3',
    rest: '60 seg',
    restSecs: 60,
    sets: 3,
    note: 'Una pierna solo si se siente cómoda. Pausa 1-2 seg arriba.',
  },
  remo: {
    key: 'remo',
    img: require('../assets/exercises/halon-al-pecho-con-toalla.jpeg'),
    name: 'Remo con toalla contra la puerta',
    reps: '3 series de 12',
    rir: 'RIR 2-3',
    rest: '60 seg',
    restSecs: 60,
    sets: 3,
    note: 'O apretar los omóplatos contra la pared. Sentir que los omóplatos se juntan.',
  },
  marcha: {
    key: 'marcha',
    img: require('../assets/exercises/marcha-en-el-lugar.jpg'),
    name: 'Marcha en el sitio elevando rodillas',
    reps: '3 series de 45 seg',
    rir: 'A ritmo cómodo',
    rest: '45 seg',
    restSecs: 45,
    sets: 3,
    note: 'Rodillas a la altura que no moleste, brazos acompañando.',
  },
  planchaC: {
    key: 'planchaC',
    img: require('../assets/exercises/plancha-apoyada-en-rodillas.jpeg'),
    name: 'Plancha apoyada en rodillas',
    reps: '3 series de 25-35 seg',
    rir: 'RIR 2',
    rest: '45 seg',
    restSecs: 45,
    sets: 3,
    note: 'Abdomen firme, sin dejar caer la cadera.',
  },
} satisfies Record<string, Exercise>;

export const DAYS: Record<'A' | 'B' | 'C', Day> = {
  A: {
    id: 'A',
    title: 'Día A · Fuerza de base',
    subtitle: 'Fuerza de base',
    warmup: WARM_BASE,
    cooldown: COOL_BASE,
    circuit: false,
    rounds: 1,
    ex: [EX.silla, EX.puente, EX.flexion, EX.superman, EX.plancha],
  },
  B: {
    id: 'B',
    title: 'Día B · Circuito activador',
    subtitle: 'Circuito activador',
    warmup: WARM_BASE.concat(['10 elevaciones de talón']),
    cooldown: COOL_BASE.concat(['Estiramiento de pantorrilla']),
    circuit: true,
    rounds: 3,
    ex: [EX.rumano, EX.talones, EX.pajaro, EX.escalon],
  },
  C: {
    id: 'C',
    title: 'Día C · Postura y equilibrio',
    subtitle: 'Postura y equilibrio',
    warmup: WARM_BASE,
    cooldown: COOL_BASE,
    circuit: false,
    rounds: 1,
    ex: [EX.sillaLenta, EX.puenteUna, EX.remo, EX.marcha, EX.planchaC],
  },
};

export const DAY_NAMES = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
