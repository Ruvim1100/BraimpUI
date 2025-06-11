import { User, type UserManagerSettings } from 'oidc-client-ts';

export interface AppUser extends User {
}

export const oidcConfig: UserManagerSettings = {
authority: "https://braimpplatform.ciamlogin.com/braimpplatform.onmicrosoft.com/",
  client_id: "775fcf03-ff20-4233-a5d9-418d768bddd5",
  redirect_uri: "http://localhost:5173/auth-callback",
  post_logout_redirect_uri: "http://localhost:5173/",
  scope: "openid profile email api://braimp-api/access_api",
  loadUserInfo: false,
  automaticSilentRenew: true, 
  response_type: 'code'
};