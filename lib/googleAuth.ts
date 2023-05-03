export function arrayBufferToBase64Url(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

/**
 * Get a Google auth token given service user credentials. This function
 * is a very slightly modified version of the one found at
 * https://community.cloudflare.com/t/example-google-oauth-2-0-for-service-accounts-using-cf-worker/258220
 *
 * @param {string} user   the service user identity, typically of the
 *   form [user]@[project].iam.gserviceaccount.com
 * @param {string} key    the private key corresponding to user
 * @param {string} scope  the scopes to request for this token, a
 *   listing of available scopes is provided at
 *   https://developers.google.com/identity/protocols/oauth2/scopes
 * @returns a valid Google auth token for the provided service user and scope or undefined
 */
export async function getGoogleAuthToken(
  user: string,
  key: string,
  scope: string
): Promise<string | undefined> {
  function objectToBase64url(object: object) {
    return arrayBufferToBase64Url(
      new TextEncoder().encode(JSON.stringify(object))
    );
  }

  function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  async function sign(content: string, signingKey: string) {
    const buf = str2ab(content);
    const plainKey = signingKey
      .replace("-----BEGIN PRIVATE KEY-----", "")
      .replace("-----END PRIVATE KEY-----", "")
      .replace(/(\r\n|\n|\r)/gm, "");
    const binaryKey = str2ab(atob(plainKey));
    const signer = await crypto.subtle.importKey(
      "pkcs8",
      binaryKey,
      {
        name: "RSASSA-PKCS1-V1_5",
        hash: { name: "SHA-256" },
      },
      false,
      ["sign"]
    );
    const binarySignature = await crypto.subtle.sign(
      { name: "RSASSA-PKCS1-V1_5" },
      signer,
      buf
    );
    return arrayBufferToBase64Url(binarySignature);
  }

  const jwtHeader = objectToBase64url({ alg: "RS256", typ: "JWT" });
  try {
    const assertiontime = Math.round(Date.now() / 1000);
    const expirytime = assertiontime + 3600;
    const claimset = objectToBase64url({
      iss: user,
      scope: scope,
      aud: "https://oauth2.googleapis.com/token",
      exp: expirytime,
      iat: assertiontime,
    });

    const jwtUnsigned = jwtHeader + "." + claimset;
    const signedJwt = jwtUnsigned + "." + (await sign(jwtUnsigned, key));
    const body =
      "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" +
      signedJwt;
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
        Host: "oauth2.googleapis.com",
      },
      body: body,
    });
    const oauth = (await response.json()) as any;
    return oauth.access_token;
  } catch (err) {
    console.log("ERROR", err, JSON.stringify(err));
  }
}
