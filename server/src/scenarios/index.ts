import type { Scenario } from '../types';
import { mansion } from './mansion';
import { theater } from './theater';
import { lighthouse } from './lighthouse';
import { train } from './train';

export const SCENARIOS: Record<string, Scenario> = { mansion, theater, lighthouse, train };
