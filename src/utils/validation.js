// Form validation shared by the Login and Register pages.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_RE.test(String(email || '').trim());

// Login only needs a non-trivial password; registration enforces strength.
export const isValidLoginPassword = (password) => String(password || '').length >= 6;

export const isStrongPassword = (password) =>
  String(password || '').length >= 8 &&
  /[a-z]/.test(password) &&
  /[A-Z]/.test(password) &&
  /\d/.test(password);

export const isValidName = (name) => {
  const trimmed = String(name || '').trim();
  return trimmed.length >= 2 && /^[a-zA-Z\s]+$/.test(trimmed);
};

export const isValidPhone = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

/** 0–5 score used by the registration strength meter. */
export const passwordStrength = (password = '') => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  return score;
};

/** Progressive phone formatting as the user types. */
export const formatPhoneNumber = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `+${digits.slice(0, -10)} ${digits.slice(-10, -7)}-${digits.slice(-7, -4)}-${digits.slice(-4)}`;
};
