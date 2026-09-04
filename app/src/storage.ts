import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'rutina-casa-v1';

export type HistoryEntry = { day: 'A' | 'B' | 'C'; at: number };

export type PersistedState = {
  history: HistoryEntry[];
  rirSeen: boolean;
};

export async function loadPersisted(): Promise<PersistedState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { history: [], rirSeen: false };
    const parsed = JSON.parse(raw);
    return { history: parsed.history || [], rirSeen: !!parsed.rirSeen };
  } catch {
    return { history: [], rirSeen: false };
  }
}

export async function savePersisted(state: PersistedState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore write failures — progress tracking is best-effort
  }
}
