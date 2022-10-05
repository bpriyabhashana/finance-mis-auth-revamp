## Add below variables to .env file that created in root

```
REACT_APP_ASGARDEO_SERVER_ORIGIN = Asgardeo server origin\
REACT_APP_ASGARDEO_CLIENT_ID = "Asgardeo client ID"

REACT_APP_AUTH_SIGNIN_REDIRECT_URL = "Application redirect URL"\
REACT_APP_AUTH_SIGNOUT_REDIRECT_URL = "Application signout URL"

REACT_APP_CHOREO_TOKEN_ENDPOINT = "Choreo token endpoint"\
REACT_APP_CHOREO_REVOKE_ENDPOINT = "Choreo revoke endpoint"\
REACT_APP_CHOREO_CLIENT_ID = "Choreo client ID"\
REACT_APP_CHOREO_CLIENT_SECRET = "Choreo client secret"
```

## Initial Application setup

Do the following changes in `Config.toml` file

```
//add your app name
export const APP_NAME = "Auth Boilerplate";

//add your app name as a route
export const APP_NAME_ROUTE = "/auth-boilerplate";
```

## To use Asgardeo ID token and Choreo token do as follow

```
import {getToken, getIdToken} from "./utils/oauth" to the respective component
```

Ex : `import { getToken, getIdToken } from "../utils/oauth"`;

Then you will be able to use such tokens from getters.

Ex: `getIdToken()`, `getToken()`

(getIdToken - Asgardeo token, getToken - APIM token)
