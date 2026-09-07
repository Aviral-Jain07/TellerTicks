import { create } from 'zustand';
import type { Persona } from '../lib/mockData';

type Scope = 'worldwide' | 'national' | 'statewise';
type View = 'foryou' | 'explore';

interface User {
  name: string;
  email: string;
  tier: string;
  avatar: string;
}

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password?: string) => void;
  logout: () => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  activeView: View;
  setActiveView: (v: View) => void;

  persona: Persona;
  setPersona: (p: Persona) => void;

  scope: Scope;
  setScope: (s: Scope) => void;

  activePlatform: string;
  setActivePlatform: (p: string) => void;

  savedDossierIds: string[];
  toggleBookmark: (id: string) => void;

  alerts: Record<string, boolean>;
  toggleAlert: (key: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: true,
  user: { name: 'Arjun Mehta', email: 'arjun.mehta@tellerticks.ai', tier: 'Pro Analyst', avatar: 'AM' },
  login: (email) => set({
    isAuthenticated: true,
    user: { name: 'Arjun Mehta', email: email || 'arjun.mehta@tellerticks.ai', tier: 'Pro Analyst', avatar: 'AM' }
  }),
  logout: () => set({ isAuthenticated: false, user: null }),

  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  activeView: 'foryou',
  setActiveView: (v) => set({ activeView: v }),

  persona: 'tech-policy',
  setPersona: (p) => set({ persona: p }),

  scope: 'worldwide',
  setScope: (s) => set({ scope: s }),

  activePlatform: 'all',
  setActivePlatform: (p) => set({ activePlatform: p }),

  savedDossierIds: [],
  toggleBookmark: (id) => set((state) => ({
    savedDossierIds: state.savedDossierIds.includes(id)
      ? state.savedDossierIds.filter((fid) => fid !== id)
      : [...state.savedDossierIds, id]
  })),

  alerts: {
    trendingTopics: true,
    viralContent: true,
    sentimentShifts: false,
    competitorMentions: true,
    breakingNews: true
  },
  toggleAlert: (key) => set((state) => ({
    alerts: { ...state.alerts, [key]: !state.alerts[key] }
  }))
}));
