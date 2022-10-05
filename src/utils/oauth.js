import { OAUTH_CONFIG, CHOREO_AUTH_CONFIG } from "../Config";

var idToken = null;
var userName = "";
var userRoles = [];
var userPrivileges = [];

var accessToken = null;
var refreshToken = null;

var refreshTokenFunction = null;
var sessionClearFunction = null;
var getNewTokenTries = 0;
var tokenRefreshRequests = [];

var isLoggedOut = false;

export function setIsLoggedOut(status) {
  isLoggedOut = status;
}

export function getIsLoggedOut() {
  return isLoggedOut;
}

export function setIdToken(token) {
  idToken = token;
}

export function getIdToken() {
  return idToken;
}

export function setUserName(user) {
  userName = user;
}

export function getUserName() {
  return userName;
}

export function setUserPrivileges(privileges) {
  userPrivileges = privileges;
}

export function getUserPrivileges() {
  return userPrivileges;
}

export function setUserRoles(rolesFromJWT) {
  if (typeof rolesFromJWT === "string") {
    userRoles = rolesFromJWT.split(",");
  } else if (Array.isArray(rolesFromJWT)) {
    userRoles = rolesFromJWT.slice();
  }
}

export function getUserRoles() {
  return userRoles;
}

export async function handleTokenFailure(callback) {
  tokenRefreshRequests.push(callback);
  if (tokenRefreshRequests.length === 1) {
    try {
      let accessToken = await refreshTokens();

      let callbacksToRun = tokenRefreshRequests.slice();
      callbacksToRun.forEach((e) => {
        let callbackFn = tokenRefreshRequests.shift();
        callbackFn && callbackFn();
      });
    } catch (e) {
      console.error("Could not refresh access token!", e);
      sessionClearFunction && sessionClearFunction();
    } finally {
      tokenRefreshRequests = [];
    }
  }
}

export function setRefreshTokenFunction(refreshFunction) {
  refreshTokenFunction = refreshFunction;
}

export function setSessionClearFunction(sessionClearFn) {
  sessionClearFunction = sessionClearFn;
}

function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export const isAccessGranted = (privilegeArr) => {
  const userPrivileges = getUserPrivileges();
  let isAccessGranted = false;

  for (let privilegeId of privilegeArr) {
    // if (userPrivileges.includes(privilegeId)) {
    isAccessGranted = true;
    break;
    // }
  }
  return isAccessGranted;
};

function setRefreshToken(token) {
  refreshToken = token;
}

export function getRefreshToken() {
  return refreshToken;
}

export const revokeTokens = async (callbackFn) => {
  if (!accessToken) {
    if (callbackFn) {
      callbackFn();
    }

    return null;
  }

  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let token =
    encodeURIComponent("token") + "=" + encodeURIComponent(accessToken);
  let clientId =
    encodeURIComponent("client_id") +
    "=" +
    encodeURIComponent(OAUTH_CONFIG.TOKEN_APIS.CLIENT_ID);

  let formBody = [token, clientId];

  // revoke token endpoint calling

  // try {
  //   const fetchResult = fetch(OAUTH_CONFIG.TOKEN_APIS.APIM_REVOKE_ENDPOINT, {
  //     method: "POST",
  //     headers: headers,
  //     body: formBody.join("&"),
  //   });
  //   const response = await fetchResult;

  //   if (response.ok) {
  //     if (callbackFn) {
  //       callbackFn();
  //     }
  //   } else {
  //     console.error(
  //       "Error when calling token revoke endpoint! ",
  //       response.status,
  //       " ",
  //       response.statusText
  //     );
  //   }
  // } catch (exception) {
  //   console.error("Token revocation failed: ", exception);
  // }
};

export const getNewTokens = async (resolve, failFn) => {
  if (!idToken) {
    return null;
  }

  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  let grantType =
    encodeURIComponent("grant_type") +
    "=" +
    encodeURIComponent("urn:ietf:params:oauth:grant-type:token-exchange");
  let subjectTokenType =
    encodeURIComponent("subject_token_type") +
    "=" +
    encodeURIComponent("urn:ietf:params:oauth:token-type:jwt");
  let requestTokenType =
    encodeURIComponent("requested_token_type") +
    "=" +
    encodeURIComponent("urn:ietf:params:oauth:token-type:jwt");
  let assertion =
    encodeURIComponent("subject_token") + "=" + encodeURIComponent(idToken);
  let clientId =
    encodeURIComponent("client_id") +
    "=" +
    encodeURIComponent(CHOREO_AUTH_CONFIG.TOKEN_APIS.CHOREO_CLIENT_ID);
  let clientSecret =
    encodeURIComponent("client_secret") +
    "=" +
    encodeURIComponent(CHOREO_AUTH_CONFIG.TOKEN_APIS.CHOREO_CLIENT_SECRET);
  let scope = encodeURIComponent("scope") + "=" + encodeURIComponent("openid");

  let formBody = [
    grantType,
    assertion,
    clientId,
    scope,
    clientSecret,
    subjectTokenType,
    requestTokenType,
  ];

  try {
    const fetchResult = fetch(
      CHOREO_AUTH_CONFIG.TOKEN_APIS.CHOREO_TOKEN_ENDPOINT,
      {
        method: "POST",
        headers: headers,
        body: formBody.join("&"),
      }
    );
    const response = await fetchResult;
    const jsonData = await response.json();

    if (response.ok) {
      if (jsonData) {
        let accessToken = jsonData.access_token;
        let refreshToken = jsonData.refresh_token;
        if (accessToken && refreshToken) {
          getNewTokenTries = 0;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          resolve && resolve();
        } else {
          //Checking for resolve avoids infinite looping
          if (!resolve && getNewTokenTries < 4) {
            getNewTokenTries++;
            handleTokenFailure();
          } else {
            throw (
              "Error when retrieving data from token endpoint! " +
              response.status
            );
          }
        }
      }
    } else {
      console.error(
        "Error when calling token endpoint! ",
        response.status,
        " ",
        response.statusText
      );
      throw "Error when calling token endpoint! " + response.status;
    }
  } catch (exception) {
    console.error("Get new tokens failed: ", exception);
    throw exception;
  }
};

export const refreshTokens = async (resolve) => {
  if (!refreshToken) {
    throw "Refresh token is not found";
  }

  let headers = {
    Authorization:
      "Basic " +
      btoa(
        `${CHOREO_AUTH_CONFIG.TOKEN_APIS.CHOREO_CLIENT_ID}:${CHOREO_AUTH_CONFIG.TOKEN_APIS.CHOREO_CLIENT_SECRET}`
      ),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  let grantType =
    encodeURIComponent("grant_type") +
    "=" +
    encodeURIComponent("refresh_token");
  let _refreshToken =
    encodeURIComponent("refresh_token") +
    "=" +
    encodeURIComponent(refreshToken);

  let formBody = [grantType, _refreshToken];

  try {
    const fetchResult = fetch(
      CHOREO_AUTH_CONFIG.TOKEN_APIS.CHOREO_TOKEN_ENDPOINT,
      {
        method: "POST",
        headers: headers,
        body: formBody.join("&"),
      }
    );
    const response = await fetchResult;
    const jsonData = await response.json();

    if (response.ok) {
      if (jsonData) {
        let accessToken = jsonData.access_token;
        let refreshToken = jsonData.refresh_token;
        if (accessToken && refreshToken) {
          getNewTokenTries = 0;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          resolve && resolve();
        } else {
          //Checking for resolve avoids infinite looping
          if (!resolve && getNewTokenTries < 4) {
            getNewTokenTries++;
            handleTokenFailure();
          } else {
            throw (
              "Error when retrieving data from token endpoint! " +
              response.status
            );
          }
        }
      }
    } else {
      console.error(
        "Error when calling token endpoint! ",
        response.status,
        " ",
        response.statusText
      );

      if (refreshTokenFunction) {
        let returnedIdToken = await refreshTokenFunction();

        if (returnedIdToken) {
          setIdToken(returnedIdToken);
          let accessToken = await getNewTokens();
        }
      }
    }
  } catch (exception) {
    console.error("Refresh tokens failed:  ", exception);
    throw exception;
  }
};
