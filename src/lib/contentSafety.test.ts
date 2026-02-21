import { describe, expect, it } from 'vitest';
import { safeExternalUrl, sanitizeCmsText } from './contentSafety';

describe('sanitizeCmsText', () => {
  it('replaces <br> tags, strips HTML, and trims', () => {
    const input = '  Hello<br>World<br/> <strong>Now</strong>  ';
    expect(sanitizeCmsText(input)).toBe('Hello\nWorld\n Now');
  });

  it('uses fallback when value is not a string', () => {
    expect(sanitizeCmsText(null, 'Fallback <em>Text</em>')).toBe('Fallback Text');
  });
});

describe('safeExternalUrl', () => {
  const fallback = 'https://example.com/fallback';

  it('returns parsed URL when protocol and host are allowed', () => {
    const result = safeExternalUrl('https://trusted.example/path?a=1', {
      fallback,
      allowedHosts: ['trusted.example'],
    });
    expect(result).toBe('https://trusted.example/path?a=1');
  });

  it('returns fallback for disallowed protocol', () => {
    const result = safeExternalUrl('http://trusted.example/path', {
      fallback,
      allowedHosts: ['trusted.example'],
    });
    expect(result).toBe(fallback);
  });

  it('returns fallback for disallowed host when allowlist is provided', () => {
    const result = safeExternalUrl('https://evil.example/path', {
      fallback,
      allowedHosts: ['trusted.example'],
    });
    expect(result).toBe(fallback);
  });

  it('returns fallback for invalid URL values', () => {
    const result = safeExternalUrl('not-a-valid-url', { fallback });
    expect(result).toBe(fallback);
  });
});
