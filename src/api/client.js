// Centralised HTTP client for the TeakSpice API.
//
// In production the base URL comes from REACT_APP_API_BASE_URL (see
// .env.production). In development that variable is undefined, so we fall back
// to an empty string and let Create React App's `proxy` (package.json) forward
// relative `/api/...` requests to the Go backend on :8080. This is what fixes
// the old `fetch("undefined/api/...")` bug.
export const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Thrown for any non-2xx response so callers can branch on `.status`.
export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Perform an API request and return the parsed JSON body.
 *
 * @param {string} path           Path beginning with `/api/...`
 * @param {object} [options]
 * @param {string} [options.method='GET']
 * @param {object} [options.body]   Serialised to JSON automatically
 * @param {boolean} [options.auth=false]  Attach the bearer token
 * @param {AbortSignal} [options.signal]  For cancellation in effects
 */
export async function request(path, { method = 'GET', body, auth = false, signal } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Network error — please check your connection.', 0);
  }

  // Some endpoints (e.g. cart clear) may return an empty body.
  const text = await res.text();
  const data = text ? safeParse(text) : null;

  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data && data.details);
  }

  return data;
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
