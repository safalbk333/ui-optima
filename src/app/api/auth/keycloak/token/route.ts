import { NextResponse } from 'next/server';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type TokenRequestBody =
  | {
      code: string;
      codeVerifier: string;
      redirectUri: string;
    }
  | {
      refreshToken: string;
    };

function getKeycloakTokenUrl() {
  const { url, realm } = CONFIG.keycloak;

  return `${url.replace(/\/$/, '')}/realms/${realm}/protocol/openid-connect/token`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TokenRequestBody;
    const tokenUrl = getKeycloakTokenUrl();
    const params = new URLSearchParams({
      client_id: CONFIG.keycloak.clientId,
    });

    if ('refreshToken' in body) {
      params.set('grant_type', 'refresh_token');
      params.set('refresh_token', body.refreshToken);
    } else {
      params.set('grant_type', 'authorization_code');
      params.set('code', body.code);
      params.set('redirect_uri', body.redirectUri);
      params.set('code_verifier', body.codeVerifier);
    }

    if (CONFIG.keycloak.clientSecret) {
      params.set('client_secret', CONFIG.keycloak.clientSecret);
    }

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.error_description ?? data.error ?? 'Token request failed.' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Keycloak token exchange failed:', error);

    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
