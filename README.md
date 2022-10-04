## Add below variables to .env file that created in root

REACT_APP_BASE_URL= \
REACT_APP_ASGARDEO_CLIENT_ID= \
REACT_APP_ASGARDEO_SERVER_ORIGIN= \
REACT_APP_APIM_TOKEN_ENDPOINT= \
REACT_APP_APIM_IDP_CLIENT_ID= \
REACT_APP_APIM_IDP_CLIENT_SECRET=

REACT_APP_ARR_API_URL=

## To use Asgardeo ID token and APIM token do as follow

# import {getToken, getIdToken} from "./utils/oauth" to the respective component

Ex : import { getToken, getIdToken } from "../utils/oauth";

Then you will be able to use such tokens from getters.

Ex: getIdToken(), getToken()

(getIdToken - Asgardeo token, getToken - APIM token)
