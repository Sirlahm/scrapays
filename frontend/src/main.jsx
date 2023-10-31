import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthorizedApolloProvider from "../provider/Auth0ApolloProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_API_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_APP_API_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_APP_API_AUTH0_AUDIENCE,
    }}
  >
    <AuthorizedApolloProvider>
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
    </AuthorizedApolloProvider>
  </Auth0Provider>
);
