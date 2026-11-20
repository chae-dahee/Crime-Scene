import { DurableObject } from 'cloudflare:workers';
import { GameError, accuse, inspect, newState, present, publicView } from './game';
import type { SessionState } from './types';

export interface Result {
  status: number;
  body?: string;
}

export type Action = 'inspect' | 'present' | 'accuse';

export class Session extends DurableObject {
  async start(scenarioId: string): Promise<Result> {
    return this.run(async () => {
      const state = newState(scenarioId);
      await this.ctx.storage.put('state', state);
      return { session: this.ctx.id.toString(), ...publicView(state) };
    });
  }

  async act(action: Action, input: Record<string, any>): Promise<Result> {
    return this.run(async () => {
      const state = await this.ctx.storage.get<SessionState>('state');
      if (!state) throw new GameError(404);
      const body = action === 'inspect' ? inspect(state, input.location, input.spot)
        : action === 'present' ? present(state, input.suspect, input.clue)
        : accuse(state, input.picks);
      await this.ctx.storage.put('state', state);
      return body;
    });
  }

  private async run(fn: () => Promise<unknown>): Promise<Result> {
    try {
      return { status: 200, body: JSON.stringify(await fn()) };
    } catch (e) {
      if (e instanceof GameError) return { status: e.status };
      throw e;
    }
  }
}
