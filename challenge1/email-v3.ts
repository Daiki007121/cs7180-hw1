// Email Validator (V3 - Final)
export function validateEmail(email: string): boolean {
  if (!email) return false;

  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!regex.test(email)) return false;
  if (email.includes('..')) return false;
  if (email.length > 254) return false;

  const [local, domain] = email.split('@');
  if (local.length > 64) return false;
  if (!domain.includes('.')) return false;

  return true;
}
