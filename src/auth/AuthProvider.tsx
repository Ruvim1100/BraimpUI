import { AuthProvider as OidcProvider } from "react-oidc-context";
import { oidcConfig } from "./authConfig";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <OidcProvider {...oidcConfig}
  onSigninCallback={() => {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = "/dashboard";
  }}
  >{children}</OidcProvider>
);
