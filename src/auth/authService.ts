import { UserManager} from "oidc-client-ts";
import { oidcConfig } from "./authConfig";

const userManager = new UserManager(oidcConfig);

export const signIn = () => userManager.signinRedirect();
export const signOut = () => userManager.signoutRedirect();
export const getUser = () => userManager.getUser();
export const signinCallback = () => userManager.signinRedirectCallback();
export const silentCallback = () => userManager.signinSilentCallback();
export const events = userManager.events;
