import { afterEach, describe, expect, it, vi } from 'vitest';
import { useSanity } from './useSanity';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('useSanity', () => {
  it('returns false when PUBLIC_USE_SANITY is false', () => {
    vi.stubEnv('PUBLIC_USE_SANITY', 'false');
    vi.stubEnv('PUBLIC_SANITY_PROJECT_ID', 'abc123');

    expect(useSanity()).toBe(false);
  });

  it('handles mixed-case false flag', () => {
    vi.stubEnv('PUBLIC_USE_SANITY', 'FaLsE');
    vi.stubEnv('PUBLIC_SANITY_PROJECT_ID', 'abc123');

    expect(useSanity()).toBe(false);
  });

  it('returns true when a project id exists and flag does not disable it', () => {
    vi.stubEnv('PUBLIC_USE_SANITY', 'true');
    vi.stubEnv('PUBLIC_SANITY_PROJECT_ID', 'abc123');

    expect(useSanity()).toBe(true);
  });

  it('returns false when project id is missing', () => {
    vi.stubEnv('PUBLIC_USE_SANITY', '');
    vi.stubEnv('PUBLIC_SANITY_PROJECT_ID', '');

    expect(useSanity()).toBe(false);
  });
});
