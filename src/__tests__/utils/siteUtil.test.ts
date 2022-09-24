import validateUrl from '../../utils/siteUtil';

describe('validateUrl', () => {
  it('returns true for a valid URL', () => {
    expect(validateUrl('https://www.example.com')).toBe(true);
  });

  it('returns false for an invalid URL', () => {
    expect(validateUrl('wwwexampleco.m')).toBe(false);
    expect(validateUrl('wwwexamplecom')).toBe(false);
    expect(validateUrl('wwwexampleco/m')).toBe(false);
  });

  it('returns false for an empty string', () => {
    expect(validateUrl('')).toBe(false);
  });
});
