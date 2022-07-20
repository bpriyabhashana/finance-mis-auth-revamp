import { getIdToken, refreshToken, getToken, getUserName } from './oauth';
import { AppConfig } from '../../Config';

const useHttp = () => {
    const MAX_TRIES = 4;

    const handleRequest = async (url, method, body, successFn, failFn, loadingFn, currentTry) => {
        if (!currentTry) {
            currentTry = 1;
        }

        try {
            if (loadingFn) {
                loadingFn(true);
            }

            var encodedUrl = encodeURI(url);

            const response = await fetch(encodedUrl, {
                method: method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': getIdToken(),
                    'Authorization': "Bearer " + getToken(),
                },
            });

            const responseBody = await response.json();

            if (responseBody.success) {
                successFn(responseBody.data);

                if (loadingFn) {
                    loadingFn(false);
                }
            } else {
                if (response.status === 401 && currentTry < MAX_TRIES) {
                    refreshToken(() => handleRequest(encodedUrl, method, body, successFn, failFn, loadingFn, ++currentTry));
                } else if (currentTry < MAX_TRIES) {
                    handleRequest(encodedUrl, method, body, successFn, failFn, loadingFn, ++currentTry);
                } else {
                    console.error(responseBody.error);
                    if (failFn) {
                        failFn(responseBody.message);
                    }
                    if (loadingFn) {
                        loadingFn(false);
                    }
                }
            }
        } catch (err) {
            console.error(err);
            if (failFn) {
                failFn(err);
            }
            if (loadingFn) {
                loadingFn(false);
            }
        }
    }

    const isUserPrivileged = async (privilegeName, privilegeId, successFn) => {
        const endPointUrl = AppConfig.baseUrl + AppConfig.getIsUserPrivileged;
        const params = `privilegeName=${privilegeName}&privilegeId=${privilegeId}`;
        const requestUrl = `${endPointUrl}?${params}`;

        handleRequest(requestUrl, 'GET', null, (data) => {

            successFn(data);
        })
    }

    return {
        handleRequest,
        isUserPrivileged
    };
};

export default useHttp;