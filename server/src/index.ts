import type { Action, Result, Session } from './session';

export { Session } from './session';

interface Env {
  SESSION: DurableObjectNamespace<Session>;
  ALLOWED_ORIGINS: string;
}

const ACTIONS: Action[] = ['inspect', 'present', 'accuse'];

function corsHeaders(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  if (!env.ALLOWED_ORIGINS.split(',').includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(req: Request, env: Env, { status, body }: Result) {
  return new Response(body ?? null, { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(req, env) } });
}

function error(req: Request, env: Env, status: number) {
  return json(req, env, { status });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(req, env) });
    if (req.method !== 'POST') return error(req, env, 405);

    const input = await req.json<Record<string, any>>().catch((): Record<string, any> => ({}));
    const path = new URL(req.url).pathname.split('/').filter(Boolean);

    if (path.length === 1 && path[0] === 'sessions') {
      return json(req, env, await env.SESSION.get(env.SESSION.newUniqueId()).start(String(input.scenario)));
    }

    if (path.length === 3 && path[0] === 'sessions' && ACTIONS.includes(path[2] as Action)) {
      let id: DurableObjectId;
      try {
        id = env.SESSION.idFromString(path[1]);
      } catch {
        return error(req, env, 404);
      }
      return json(req, env, await env.SESSION.get(id).act(path[2] as Action, input));
    }

    return error(req, env, 404);
  },
};
