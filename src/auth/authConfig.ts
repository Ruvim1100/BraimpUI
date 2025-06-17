import { type UserManagerSettings } from "oidc-client-ts";

const redirectUri = `${window.location.origin}/auth/callback`;
const silentRedirectUri = `${window.location.origin}/auth/silent-renew`;

export const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: redirectUri,
  silent_redirect_uri: silentRedirectUri,
  response_type: "code",
  scope: import.meta.env.VITE_OIDC_SCOPE,
  extraQueryParams: { p: import.meta.env.VITE_USER_FLOW },
  post_logout_redirect_uri: window.location.origin,
  automaticSilentRenew: true,
  loadUserInfo: false
};
