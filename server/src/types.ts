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
  // 숨기던 사실이 이미 밝혀진 뒤에는 다시 숨기지 않도록 대사를 바꾼다.
  known?: { clue: string; text: string };
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
  hints: { clue: string; text: string }[];
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
  // 아직 얻지 않은 단서 중 needs 단서를 가진 힌트에서 무작위로 준다.
  adHints: { clue: string; text: string; needs?: string }[];
}

export interface SessionState {
  scenario: string;
  clues: string[];
  presented: Record<string, number>;
  fallbacks: Record<string, number>;
  lives: number;
  finished: boolean;
  hintTicket?: number; // 광고 시작 시각(ms)
  adHints?: number; // 받은 광고 힌트 수. 기능 배포 전에 시작한 세션에는 없다.
}
