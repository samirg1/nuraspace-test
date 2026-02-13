import { SERVER_URL } from "../constants/urls";

/**
 * Makes a request to the specified server endpoint.
 * @param endpoint - The server endpoint to send the request to.
 * @param method - The HTTP method to use for the request.
 * @param body - The optional request body.
 * @returns A Promise that resolves to the response from the server.
 * @throws An error if the request fails.
 */
const fetchParent = async <T extends ServerEndpoints>(
    endpoint: T,
    method: "POST" | "GET",
    body?: ServerEndpointToBodyType<T>,
): Promise<ServerEndpointToResponseType<T>> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        let errorText = await response.text();
        try {
            const parsed = JSON.parse(errorText);
            if (parsed.error) errorText = parsed.error;
        } catch {
            /* empty */
        }
        // eslint-disable-next-line no-console
        console.error(
            `An error occurred while making the request to ${endpoint}.
            Status: ${response.status} ${response.statusText}.
            Response: ${errorText}`,
        );

        throw new Error(`${errorText}`);
    }

    const parsedResponse = (await response.json()) as {
        error?: string;
    } & ServerEndpointToResponseType<T>;

    if (parsedResponse.error) throw new Error(parsedResponse.error);

    return parsedResponse;
};

/**
 * Makes a GET request to the specified server endpoint.
 * @note If you use a request param for a get, you must type function call with the non-templated endpoint. e.g. ```get<"/endpoint/:paramName">('/endpoint/${param}')```
 * @param endpoint - The server endpoint to send the request to.
 * @param body - The optional request body.
 * @returns A Promise that resolves to the response from the server.
 */
export const get = async <T extends ServerEndpoints>(
    endpoint: T | EndpointCallerTypes[T],
    body?: ServerEndpointToBodyType<T>,
): Promise<ServerEndpointToResponseType<T>> =>
    await fetchParent(endpoint as T, "GET", body);

/**
 * Makes a POST request to the specified server endpoint.
 * @param endpoint - The server endpoint to send the request to.
 * @param body - The optional request body.
 * @returns A Promise that resolves to the response from the server.
 */
export const post = async <T extends ServerEndpoints>(
    endpoint: T,
    body?: ServerEndpointToBodyType<T>,
) => await fetchParent(endpoint, "POST", body);
