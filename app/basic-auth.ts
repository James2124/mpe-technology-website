export function basicAdminIsConfigured() {
  return Boolean(process.env.MPE_ADMIN_USERNAME?.trim() && process.env.MPE_ADMIN_PASSWORD);
}

export async function validBasicAuthorization(value: string | null) {
  const expectedUsername = process.env.MPE_ADMIN_USERNAME?.trim();
  const expectedPassword = process.env.MPE_ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword || !value?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    const bytes = Uint8Array.from(atob(value.slice(6)), (character) => character.charCodeAt(0));
    decoded = new TextDecoder().decode(bytes);
  } catch {
    return false;
  }

  const separator = decoded.indexOf(":");
  if (separator < 0) return false;
  const username = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);
  return safeEqual(username, expectedUsername) && await safeEqualAsync(password, expectedPassword);
}

async function safeEqualAsync(left: string, right: string) {
  const encoder = new TextEncoder();
  const [leftDigest, rightDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  return safeEqualBytes(new Uint8Array(leftDigest), new Uint8Array(rightDigest));
}

function safeEqual(left: string, right: string) {
  const encoder = new TextEncoder();
  return safeEqualBytes(encoder.encode(left), encoder.encode(right));
}

function safeEqualBytes(left: Uint8Array, right: Uint8Array) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return difference === 0;
}
