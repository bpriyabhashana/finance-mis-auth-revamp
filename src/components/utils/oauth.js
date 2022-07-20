import { OAUTH_CONFIG } from "../../Config";

var idToken = null;
var userName = "";
var userRoles = [];
var userPrivileges = [];

var apiToken = null;
var refreshTokenFunction = null;
var getNewAPITokenTries = 0;
var tokenRefreshRequests = [];

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
    if (typeof rolesFromJWT === 'string') {
        userRoles = rolesFromJWT.split(',');
    } else if (Array.isArray(rolesFromJWT)) {
        userRoles = rolesFromJWT.slice();
    }
}

export function getUserRoles() {
    return userRoles;
}

export async function refreshToken(callback) {
    if (refreshTokenFunction) {
        tokenRefreshRequests.push(callback);
        if (tokenRefreshRequests.length === 1) {
            try {
                let returnedIdToken = await refreshTokenFunction();
                returnedIdToken && setIdToken(returnedIdToken);
                let apiToken = await getNewAPIToken();
            } catch (e) {
                console.error("Could not refresh access token!", e);
            } finally {
                let callbacksToRun = tokenRefreshRequests.slice();
                callbacksToRun.forEach(e => {
                    let callbackFn = tokenRefreshRequests.shift();
                    callbackFn && callbackFn();
                });

            }
        }
    }
}

export function setRefreshTokenFunction(refreshFunction) {
    refreshTokenFunction = refreshFunction;
}

function setToken(token) {
    apiToken = token;
}

export function getToken() {
    // return apiToken;
    return OAUTH_CONFIG.SKIP_TOKEN_EXCHANGE ? OAUTH_CONFIG.BEARER_TOKEN : apiToken;
}

export const getNewAPIToken = async (resolve) => {

    if (!idToken || !idToken.length) {
        return null;
    }

    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    let grantType = encodeURIComponent("grant_type") + "=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer");
    let assertion = encodeURIComponent("assertion") + "=" + encodeURIComponent(idToken);
    let clientId = encodeURIComponent("client_id") + "=" + encodeURIComponent(OAUTH_CONFIG.TOKEN_APIS.CLIENT_ID);

    let formBody = [grantType, assertion, clientId];


    try {
        const fetchResult = fetch(OAUTH_CONFIG.TOKEN_APIS.ASGARDEO_TOKEN_EXCHANGE, {
            method: "POST",
            headers: headers,
            body: formBody.join("&")
        });
        const response = await fetchResult;
        const jsonData = await response.json();

        if (response.ok) {
            if (jsonData) {
                let accessToken = jsonData.access_token;
                if (accessToken) {
                    getNewAPITokenTries = 0;
                    setToken(accessToken);
                    resolve && resolve();
                } else {
                    //Checking for resolve avoids infinite looping
                    if (!resolve && getNewAPITokenTries < 4) {
                        getNewAPITokenTries++;
                        refreshToken();
                    }
                }
            }
        } else {
            console.error("Error when calling token endpoint! ", response.status, " ", response.statusText);
            switch (response.status) {
                case 404:
                    return "Looks like the services of the application are under maintenance at the moment. Please try again in a few minutes.";
                case 401:
                    return "It seems that the services of the application are temporarily inaccessible. Please contact the Internal Apps Team if this continues.";
                default:
                    return "The application seems to have run into an issue! Try reloading the page. Please contact the Internal Apps Team if this continues.";
            }
        }
    } catch (exception) {
        return "Looks like the services of the application are under maintenance or unavailable at the moment. Please try again in a few minutes.";
    }
    return;
}