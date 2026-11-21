import { SCENARIOS } from './scenarios';
import type { Scenario, SessionState } from './types';

export const MAX_LIVES = 3;
const HINT_AFTER = 2;

export class GameError extends Error {
  status: number;

  constructor(status: number) {
    super();
    this.status = status;
  }
}

function scenarioOf(state: SessionState): Scenario {
  return SCENARIOS[state.scenario];
}

function clueView(sc: Scenario, id: string) {
  return { id, ...sc.clues[id] };
}

function gain(state: SessionState, id: string | undefined) {
  if (!id) return undefined;
  if (!state.clues.includes(id)) state.clues.push(id);
  return clueView(scenarioOf(state), id);
}

function assertPlaying(state: SessionState) {
  if (state.finished) throw new GameError(409);
}

export function newState(scenarioId: string): SessionState {
  if (!SCENARIOS[scenarioId]) throw new GameError(404);
  return { scenario: scenarioId, clues: [], presented: {}, fallbacks: {}, lives: MAX_LIVES, finished: false };
}

// 클라이언트에 정답과 진행하지 않은 콘텐츠를 보내지 않는다.
export function publicView(state: SessionState) {
  const sc = scenarioOf(state);
  return {
    title: sc.title,
    intro: sc.intro,
    start: sc.start,
    interrogation: sc.interrogation,
    locations: sc.locations.map(({ id, name, art, desc, spots }) => ({
      id, name, art, desc,
      spots: spots.map(({ id, label, x, y, medium, large }) => ({ id, label, x, y, medium, large })),
    })),
    suspects: sc.suspects.map(({ id, name, role, portrait, intro, talk }) => ({ id, name, role, portrait, intro, talk })),
    accusation: { code: sc.accusation.code, intro: sc.accusation.intro, questions: sc.accusation.questions },
    lives: state.lives,
    maxLives: MAX_LIVES,
  };
}

export function inspect(state: SessionState, locationId: string, spotId: string) {
  assertPlaying(state);
  const spot = scenarioOf(state).locations.find((l) => l.id === locationId)?.spots.find((s) => s.id === spotId);
  if (!spot) throw new GameError(404);
  return { text: spot.text, clue: gain(state, spot.clue) };
}

export function present(state: SessionState, suspectId: string, clueId: string) {
  assertPlaying(state);
  const sus = scenarioOf(state).suspects.find((s) => s.id === suspectId);
  if (!sus) throw new GameError(404);
  if (!state.clues.includes(clueId)) throw new GameError(403);
  const r = sus.reactions[clueId];
  if (!r) {
    const count = state.fallbacks[sus.id] = (state.fallbacks[sus.id] ?? 0) + 1;
    // 힌트는 조사할 곳만 가리키고 단서를 직접 주지 않는다.
    const hint = count >= HINT_AFTER ? sus.hints.find((h) => !state.clues.includes(h.clue)) : undefined;
    return { text: hint?.text ?? sus.fallback, reacted: false };
  }
  const key = `${sus.id}:${clueId}`;
  // 횟수에 따른 감정 표현은 LLM이 맡고, 실토 내용은 again·againGives로 고정한다.
  const again = (state.presented[key] = (state.presented[key] ?? 0) + 1) > 1;
  const text = again ? (r.again || sus.pressed || r.text) : r.text;
  return { text, reacted: true, clue: gain(state, again ? r.againGives : r.gives) };
}

export function accuse(state: SessionState, picks: Record<string, string>) {
  assertPlaying(state);
  const { questions, answer } = scenarioOf(state).accusation;
  const valid = questions.every((q) => q.options.some((o) => o.id === picks?.[q.key]));
  if (!valid) throw new GameError(400);
  const correct = questions.filter((q) => picks[q.key] === answer[q.key]).length;
  const success = correct === questions.length;
  if (!success) state.lives--;
  state.finished = success || state.lives === 0;
  const endings = scenarioOf(state).endings;
  return {
    correct,
    total: questions.length,
    lives: state.lives,
    ending: state.finished ? { success, text: success ? endings.success : endings.fail } : undefined,
  };
}
