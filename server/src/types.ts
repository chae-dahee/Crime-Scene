export type Portrait = Record<string, unknown>;

export interface Clue {
  name: string;
  icon: string;
  desc: string;
}

export interface Spot {
  id: string;
  label: string;
  x: number;
  y: number;
  medium?: boolean;
  large?: boolean;
  clue?: string;
  text: string;
}

export interface Location {
  id: string;
  name: string;
  art: string;
  desc: string;
  spots: Spot[];
}

export interface Reaction {
  text: string;
  gives?: string;
  again?: string;
  againGives?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  portrait: Portrait;
  intro: string;
  talk: string;
  reactions: Record<string, Reaction>;
  fallback: string;
  pressed?: string;
}

export interface Question {
  key: string;
  label: string;
  options: { id: string; label: string }[];
}

export interface Scenario {
  title: string;
  intro: string[];
  start: string;
  interrogation?: string;
  clues: Record<string, Clue>;
  locations: Location[];
  suspects: Suspect[];
  accusation: {
    code: string;
    intro: string;
    questions: Question[];
    answer: Record<string, string>;
  };
  endings: { success: string[]; fail: string[] };
}

export interface SessionState {
  scenario: string;
  clues: string[];
  presented: string[];
  lives: number;
  finished: boolean;
}
