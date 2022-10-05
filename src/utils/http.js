import { getIdToken, handleTokenFailure, getAccessToken } from "./oauth";

const useHttp = () => {
  const MAX_TRIES = 3;

  const handleRequest = async (
    url,
    method,
    body,
    successFn,
    failFn,
    loadingFn,
    currentTry
  ) => {
    if (!currentTry) {
      currentTry = 0;
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
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      const responseBody = await response.json();
      if (response.status === 200) {
        successFn(responseBody);
      } else {
        if (response.status === 401 && currentTry < MAX_TRIES) {
          handleTokenFailure(() =>
            handleRequest(
              encodedUrl,
              method,
              body,
              successFn,
              failFn,
              loadingFn,
              ++currentTry
            )
          );
        } else if (currentTry < MAX_TRIES) {
          handleRequest(
            encodedUrl,
            method,
            body,
            successFn,
            failFn,
            loadingFn,
            ++currentTry
          );
        } else {
          console.error(responseBody.message);
          if (failFn) {
            failFn(responseBody.message);
          }
        }
      }
    } catch (err) {
      console.error(err);
      if (failFn) {
        failFn(err);
      }
    } finally {
      if (loadingFn) {
        loadingFn(false);
      }
    }
  };

  const handleFileRequest = async (
    url,
    method,
    body,
    successFn,
    failFn,
    loadingFn,
    currentTry
  ) => {
    if (!currentTry) {
      currentTry = 0;
    }

    try {
      if (loadingFn) {
        loadingFn(true);
      }

      var encodedUrl = encodeURI(url);

      const response = await fetch(encodedUrl, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      const responseBody = await response.json();
      if (response.status === 200) {
        successFn(responseBody);
      } else {
        if (response.status === 401 && currentTry < MAX_TRIES) {
          handleTokenFailure(() =>
            handleFileRequest(
              encodedUrl,
              method,
              body,
              successFn,
              failFn,
              loadingFn,
              ++currentTry
            )
          );
        } else if (currentTry < MAX_TRIES) {
          handleFileRequest(
            encodedUrl,
            method,
            body,
            successFn,
            failFn,
            loadingFn,
            ++currentTry
          );
        } else {
          console.error(responseBody.message);
          if (failFn) {
            failFn(responseBody.message);
          }
        }
      }
    } catch (err) {
      console.error(err);
      if (failFn) {
        failFn(err);
      }
    } finally {
      if (loadingFn) {
        loadingFn(false);
      }
    }
  };
  return {
    handleRequest,
    handleFileRequest,
  };
};

export default useHttp;
