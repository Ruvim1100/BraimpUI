import { AuthProvider as OidcProvider } from "react-oidc-context";
import { oidcConfig } from "./authConfig";
import { paths } from "../routes/paths";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <OidcProvider {...oidcConfig}
  onSigninCallback={() => {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = paths.learning.dashboard;
  }}
  >{children}</OidcProvider>
);