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
          Authorization: "Bearer " + getIdToken(),
          JWTAssertion:
            "eyJ4NXQiOiJaV1JtWTJJME9HVTJNVFprWmpJeE56SmpZbUUyTnpWbU5tSTFNV0ZpT0dNeU5qZGxaV1kyTldNMU1ESmpZVFExTXpReU1HTTJPV1EzWW1VME1EVmxZUSIsImtpZCI6IlpXUm1ZMkkwT0dVMk1UWmtaakl4TnpKalltRTJOelZtTm1JMU1XRmlPR015TmpkbFpXWTJOV00xTURKallUUTFNelF5TUdNMk9XUTNZbVUwTURWbFlRX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiI5YmEyOTVlZTBkNzZmYjkxODRjMGM5YmYyMGE1OTE4Y2QyNDU5ZmQwNDU4OTZmZmM4Y2U2N2MwMjM4MDIwOWRhIiwiYXRfaGFzaCI6InVzQ2RCTFV1blF0aFA3aUxXbnNyT2ciLCJzdWIiOiI5MmJhYjhiMC04ZTdhLTQ5NzAtOTk4Ni0yMDgwY2JmNzZkMmYiLCJhbXIiOlsiT3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2FwaS5hc2dhcmRlby5pb1wvdFwvd3NvMnByb2R1Y3Rpb25cL29hdXRoMlwvdG9rZW4iLCJncm91cHMiOlsidXNlcl9yb2xlMi5lbnRncmEtYXBwbWFuYWdlci5idSIsInJlYWRvbmx5LmZpbmFuY2UubWFzdGVyZGF0YS5hbGwuYXBwcyIsImludGVncmF0aW9uLXNmc2hhcmVkIiwiSW50ZXJuYWxcL2V2ZXJ5b25lIiwid3NvMi5hbGwuZW1wbG95ZWVzIiwid3NvMi5lbmdpbmVlcmluZy01Iiwic3RnLXRyYXZlbHRlYW0udHJhdmVsLm1hbmFnZXIuYWxsLmFwcHMiLCJ1c2VyX3JvbGUxLmVudGdyYS1hcHBtYW5hZ2VyLmJ1IiwidXNlci5maW5hbmNlLmFyci5taXMuYWxsLmFwcHMiLCJ1c2VyLmZpbmFuY2UuZmxhc2gubWlzLmFsbC5hcHBzIl0sInNpZCI6ImRhNDc0OWRhLTkxMDctNDRiNy1hNGY0LWUyMDY5ZmI0ZjQxYyIsImF1ZCI6WyJOV1IzUUhYOGhhcmhBQWJTYUNmWmlkbzZDOHNhIiwiaHR0cHM6XC9cL2FwaW0tYXBwcy53c28yLmNvbVwvb2F1dGgyXC90b2tlbiIsImh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldlwvb2F1dGgyXC90b2tlbiJdLCJjX2hhc2giOiJPQy1FM3hDWlUxY2hHTC1zallQR0FnIiwibmJmIjoxNjc4MTg2NzY0LCJhenAiOiJOV1IzUUhYOGhhcmhBQWJTYUNmWmlkbzZDOHNhIiwib3JnX2lkIjoiMWFmYzM2NmUtNTJmNi00ODRlLWIxYjctN2JlZDZmOThhMTNlIiwiZXhwIjoxNjc4MTk3NTY0LCJvcmdfbmFtZSI6IndzbzJwcm9kdWN0aW9uIiwiaWF0IjoxNjc4MTg2NzY0LCJqdGkiOiJmM2Q0NTkzYS1lYmNhLTRiYmMtOGZlYy00ZTc4YWI2OWE2YzAiLCJlbWFpbCI6ImJ1ZGRoaWthcEB3c28yLmNvbSJ9.C7v5eFUXsuyagrsJuBATSlQA9CehwB8vvkkbA219pZJj3OJ902Wzv8cP6RTo3sYjzFPBtUIl5jutIFspzn8NKRMWfowRIEJ-HbCIzn4JPj74JxLIRbSVbCJ08o01pa54_3-WKnlnddDbY95y72PQjURC7CvM3zFXyxsvkWRgWCeudH0JuLKN53lNtwPSmLFvTmDapL8J9hwvp8vmMqZxKeI-rkQN3tTo_KYQvuEwYbonMyP0LCM_0SSymQ0pXlxs81n-CXn9iXvwdH36V4URgQwonakRBLDZaIWV9rVaEcc7ZdtN7D3yRENHlzX21adP-9Oibhe-53v8Fo9rjEMSqw",
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
