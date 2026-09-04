import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { createAudioPlayer } from 'expo-audio';
import { DAYS, DAY_NAMES, type Day } from './data';
import { loadPersisted, savePersisted, type HistoryEntry } from './storage';

export type Screen = 'home' | 'warmup' | 'exercise' | 'cooldown' | 'done' | 'progress';

type State = {
  screen: Screen;
  dayId: 'A' | 'B' | 'C' | null;
  exIdx: number;
  round: number;
  setsDone: Record<number, number>;
  checks: Record<string, boolean>;
  timer: number | null;
  showPain: boolean;
  showRir: boolean;
  rirSeen: boolean;
  history: HistoryEntry[];
};

const initialState: State = {
  screen: 'home',
  dayId: null,
  exIdx: 0,
  round: 1,
  setsDone: {},
  checks: {},
  timer: null,
  showPain: false,
  showRir: false,
  rirSeen: false,
  history: [],
};

const restSound = require('../assets/sounds/rest-done.wav');

function beep() {
  try {
    Vibration.vibrate([0, 120, 80, 120]);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {}
  try {
    const player = createAudioPlayer(restSound);
    player.play();
    setTimeout(() => player.remove(), 1500);
  } catch {}
}

export function useRoutine() {
  const [state, setState] = useState<State>(initialState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadPersisted().then(({ history, rirSeen }) => {
      setState((s) => ({ ...s, history, rirSeen }));
    });
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const persist = useCallback((history: HistoryEntry[], rirSeen: boolean) => {
    savePersisted({ history, rirSeen });
  }, []);

  const day: Day | null = state.dayId ? DAYS[state.dayId] : null;

  const startRest = useCallback((secs: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState((s) => ({ ...s, timer: secs }));
    intervalRef.current = setInterval(() => {
      setState((s) => {
        if (s.timer === null) return s;
        if (s.timer <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          beep();
          return { ...s, timer: null };
        }
        return { ...s, timer: s.timer - 1 };
      });
    }, 1000);
  }, []);

  const skipRest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState((s) => ({ ...s, timer: null }));
  }, []);

  const start = useCallback((id: 'A' | 'B' | 'C') => {
    setState((s) => ({
      ...s,
      screen: 'warmup',
      dayId: id,
      exIdx: 0,
      round: 1,
      setsDone: {},
      checks: {},
      timer: null,
    }));
  }, []);

  const goHome = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState((s) => ({ ...s, screen: 'home', timer: null }));
  }, []);

  const goProgress = useCallback(() => setState((s) => ({ ...s, screen: 'progress' })), []);

  const goFirstExercise = useCallback(
    () => setState((s) => ({ ...s, screen: 'exercise', exIdx: 0, round: 1 })),
    []
  );

  const completeSet = useCallback(() => {
    setState((s) => {
      const d = s.dayId ? DAYS[s.dayId] : null;
      if (!d) return s;
      const i = s.exIdx;
      if (d.circuit) {
        const last = i === d.ex.length - 1;
        if (last) {
          if (s.round >= d.rounds) return { ...s, screen: 'cooldown' };
          startRest(90);
          return { ...s, exIdx: 0, round: s.round + 1 };
        }
        return { ...s, exIdx: i + 1 };
      }
      const done = Math.min((s.setsDone[i] || 0) + 1, d.ex[i].sets);
      const setsDone = { ...s.setsDone, [i]: done };
      startRest(d.ex[i].restSecs);
      return { ...s, setsDone };
    });
  }, [startRest]);

  const setSet = useCallback(
    (n: number) => {
      setState((s) => {
        const d = s.dayId ? DAYS[s.dayId] : null;
        if (!d) return s;
        const i = s.exIdx;
        const cur = s.setsDone[i] || 0;
        const val = cur >= n ? n - 1 : n;
        const setsDone = { ...s.setsDone, [i]: val };
        if (val > cur) startRest(d.ex[i].restSecs);
        return { ...s, setsDone };
      });
    },
    [startRest]
  );

  const nextExercise = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState((s) => {
      const d = s.dayId ? DAYS[s.dayId] : null;
      if (!d) return s;
      if (d.circuit) {
        const last = s.exIdx === d.ex.length - 1;
        if (last && s.round >= d.rounds) return { ...s, screen: 'cooldown', timer: null };
        if (last) return { ...s, exIdx: 0, round: s.round + 1, timer: null };
        return { ...s, exIdx: s.exIdx + 1, timer: null };
      }
      if (s.exIdx >= d.ex.length - 1) return { ...s, screen: 'cooldown', timer: null };
      return { ...s, exIdx: s.exIdx + 1, timer: null };
    });
  }, []);

  const finishDay = useCallback(() => {
    setState((s) => {
      if (!s.dayId) return s;
      const entry: HistoryEntry = { day: s.dayId, at: Date.now() };
      const history = s.history.concat([entry]);
      persist(history, s.rirSeen);
      return { ...s, history, screen: 'done' };
    });
  }, [persist]);

  const toggleCheck = useCallback((kind: string, idx: number) => {
    setState((s) => {
      const k = kind + idx;
      const checks = { ...s.checks, [k]: !s.checks[k] };
      return { ...s, checks };
    });
  }, []);

  const openPain = useCallback(() => setState((s) => ({ ...s, showPain: true })), []);
  const closePain = useCallback(() => setState((s) => ({ ...s, showPain: false })), []);
  const openRir = useCallback(() => setState((s) => ({ ...s, showRir: true })), []);
  const closeRir = useCallback(() => {
    setState((s) => {
      persist(s.history, true);
      return { ...s, showRir: false, rirSeen: true };
    });
  }, [persist]);

  const lastLabel = useCallback(
    (id: 'A' | 'B' | 'C') => {
      const times = state.history.filter((h) => h.day === id).map((h) => h.at);
      if (!times.length) return 'Aún no lo has hecho';
      const days = Math.floor((Date.now() - Math.max(...times)) / 86400000);
      if (days <= 0) return 'Última vez: hoy';
      if (days === 1) return 'Última vez: ayer';
      return 'Última vez: hace ' + days + ' días';
    },
    [state.history]
  );

  const vm = useMemo(() => {
    const s = state;
    const d = day;
    const ex = d ? d.ex[s.exIdx] : null;
    const setsCount = ex ? ex.sets : 0;
    const doneCount = s.setsDone[s.exIdx] || 0;
    const sets = [];
    for (let n = 1; n <= setsCount; n++) {
      const done = n <= doneCount;
      sets.push({ n, label: 'Serie ' + n, done, pending: !done });
    }

    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - ((now.getDay() + 6) % 7));
    const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((label, i) => {
      const start = monday.getTime() + i * 86400000;
      const done = s.history.some((h) => h.at >= start && h.at < start + 86400000);
      return { label, done, pending: !done };
    });
    const weekCount = week.filter((w) => w.done).length;
    const sessions = s.history
      .slice()
      .reverse()
      .slice(0, 8)
      .map((h) => {
        const dt = new Date(h.at);
        return {
          title: DAYS[h.day] ? DAYS[h.day].title : 'Sesión',
          when:
            DAY_NAMES[dt.getDay()] +
            ' ' +
            dt.getDate() +
            ' · ' +
            dt.getHours() +
            ':' +
            String(dt.getMinutes()).padStart(2, '0'),
        };
      });

    const t = s.timer;
    const timerText = t === null ? '' : Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0');

    const circuit = !!(d && d.circuit);
    const stepLabel = !d
      ? ''
      : circuit
        ? 'Vuelta ' + s.round + ' de ' + d.rounds + ' · ' + (s.exIdx + 1) + '/' + d.ex.length
        : 'Ejercicio ' + (s.exIdx + 1) + ' de ' + d.ex.length;
    const lastEx = !!(d && s.exIdx === d.ex.length - 1 && (!circuit || s.round >= d.rounds));

    const weekSummary =
      weekCount === 0
        ? 'Todavía no hay días marcados esta semana.'
        : weekCount === 1
          ? '1 día completado esta semana.'
          : weekCount + ' días completados esta semana.';

    const doneLine = d ? 'Marcamos el ' + d.title.split(' · ')[0] + ' en tu semana. Descansa y toma agua.' : '';

    return {
      day: d,
      dayTitle: d ? d.title : '',
      stepLabel,
      ex,
      isCircuit: circuit,
      isStraight: !circuit,
      sets,
      timerOn: t !== null,
      timerText,
      warmup: d ? d.warmup : [],
      cooldown: d ? d.cooldown : [],
      nextLabel: lastEx ? 'Ir al enfriamiento' : 'Siguiente ejercicio',
      lastA: lastLabel('A'),
      lastB: lastLabel('B'),
      lastC: lastLabel('C'),
      week,
      weekCount,
      sessions,
      weekSummary,
      doneLine,
    };
  }, [state, day, lastLabel]);

  return {
    state,
    vm,
    actions: {
      start,
      goHome,
      goProgress,
      goFirstExercise,
      completeSet,
      setSet,
      nextExercise,
      finishDay,
      toggleCheck,
      skipRest,
      openPain,
      closePain,
      openRir,
      closeRir,
    },
  };
}
