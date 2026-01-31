import { validateEmail } from './email-v3';

describe('Email Validator', () => {
  test('valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user+tag@example.com')).toBe(true);
    expect(validateEmail('user@mail.example.com')).toBe(true);
  });

  test('invalid emails', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user..name@example.com')).toBe(false);
    expect(validateEmail('user@example')).toBe(false);
  });

  // ✅ NEW: Boundary value tests
  test('boundary cases - total length', () => {
    // 254 chars total (valid): 64 local + @ + domain (63.63.61)
    const valid254 = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(61);
    expect(validateEmail(valid254)).toBe(true);

    // 255 chars total (invalid)
    const invalid255 = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(62);
    expect(validateEmail(invalid255)).toBe(false);

    // 256 chars total (invalid)
    const invalid256 = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(63);
    expect(validateEmail(invalid256)).toBe(false);
  });

  // ✅ NEW: Boundary value tests - local part
  test('boundary cases - local part length', () => {
    // 64 chars local part (valid)
    const valid64 = 'a'.repeat(64) + '@example.com';
    expect(validateEmail(valid64)).toBe(true);

    // 65 chars local part (invalid)
    const invalid65 = 'a'.repeat(65) + '@example.com';
    expect(validateEmail(invalid65)).toBe(false);
  });

  // ✅ NEW: Special characters
  test('special characters in local part', () => {
    expect(validateEmail('user!#$%@example.com')).toBe(true);
    expect(validateEmail('user.name@example.com')).toBe(true);
    expect(validateEmail('user_name@example.com')).toBe(true);
    expect(validateEmail('user-name@example.com')).toBe(true);
  });

  // ✅ NEW: Domain validation
  test('domain edge cases', () => {
    // Valid domains
    expect(validateEmail('user@example.co.uk')).toBe(true);
    expect(validateEmail('user@mail.example.com')).toBe(true);
    expect(validateEmail('user@ex-ample.com')).toBe(true);

    // Invalid domains
    expect(validateEmail('user@example')).toBe(false); // No TLD
    expect(validateEmail('user@.com')).toBe(false); // Missing domain
    expect(validateEmail('user@example.')).toBe(false); // Trailing dot
  });

  // ✅ NEW: Plus addressing
  test('plus addressing variations', () => {
    expect(validateEmail('user+tag@example.com')).toBe(true);
    expect(validateEmail('user+tag+more@example.com')).toBe(true);
    expect(validateEmail('user+123@example.com')).toBe(true);
  });

  // ✅ NEW: Consecutive dots
  test('consecutive dots are invalid', () => {
    expect(validateEmail('user..name@example.com')).toBe(false);
    expect(validateEmail('user...name@example.com')).toBe(false);
    expect(validateEmail('user@example..com')).toBe(false);
  });

  // ✅ NEW: Empty and whitespace
  test('empty and whitespace handling', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail(' ')).toBe(false);
    expect(validateEmail('  ')).toBe(false);
    expect(validateEmail('user @example.com')).toBe(false); // Space in email
    expect(validateEmail('user@ example.com')).toBe(false); // Space in domain
  });

  // ✅ NEW: Missing parts
  test('missing email parts', () => {
    expect(validateEmail('@example.com')).toBe(false); // No local part
    expect(validateEmail('user@')).toBe(false); // No domain
    expect(validateEmail('userexample.com')).toBe(false); // No @
  });
});