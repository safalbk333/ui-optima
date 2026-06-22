// ----------------------------------------------------------------------

function base64UrlEncode(buffer: Uint8Array) {
  const base64 = btoa(String.fromCharCode(...buffer));

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function generateRandomString(length = 32) {
  const array = new Uint8Array(length);

  crypto.getRandomValues(array);

  return base64UrlEncode(array);
}

export async function createPkcePair() {
  const codeVerifier = generateRandomString(64);
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const codeChallenge = base64UrlEncode(new Uint8Array(digest));

  return { codeVerifier, codeChallenge };
}
