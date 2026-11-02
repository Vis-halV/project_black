export const USERNAME_MIN_LENGTH = 1;
export const USERNAME_MAX_LENGTH = 30;

export function normalizeUsername(username: string): string {
  return username.toLowerCase();
}

export function validateUsername(username: string): {
  valid: boolean;
  normalized?: string;
  error?: string;
} {
  const normalized = normalizeUsername(username);

  if (
    normalized.length < USERNAME_MIN_LENGTH ||
    normalized.length > USERNAME_MAX_LENGTH
  ) {
    return {
      valid: false,
      error: "Username must be between 1 and 30 characters.",
    };
  }

  if (!/^[a-z0-9._]+$/.test(normalized)) {
    return {
      valid: false,
      error: "Only letters, numbers, periods, and underscores are allowed.",
    };
  }

  if (normalized.startsWith(".") || normalized.endsWith(".")) {
    return {
      valid: false,
      error: "Username cannot start or end with a period.",
    };
  }

  if (normalized.includes("..")) {
    return {
      valid: false,
      error: "Consecutive periods are not allowed.",
    };
  }

  return {
    valid: true,
    normalized,
  };
}
