type User = {
    username: string;
    password: string;
    name: string;
    email: string;
};

type Weather = {
    location: { name: string; region: string; country: string };
    minTemp: number;
    maxTemp: number;
    maxWind: number;
    totalPrecip: number;
    condition: string;
};

type ServerEndpoints =
    | "/auth/login"
    | "/auth/register"
    | "/weather/:city"
    | "/user/:token";

type EndpointCallerTypes = {
    "/auth/login": "/auth/login";
    "/auth/register": "/auth/register";
    "/weather/:city": `/weather/${string}`;
    "/user/:token": `/user/${string}`;
};

type EndpointBodyTypes = {
    "/auth/login": { username: string; password: string };
    "/auth/register": { username: string; password: string };
    "/weather/:city": Record<string, never>;
    "/user/:token": Record<string, never>;
};

type EndpointResponseTypes = {
    "/auth/login": { user: User, token: string };
    "/auth/register": { user: User };
    "/weather/:city": { weather: Weather };
    "/user/:token": { user: User };
};

type ServerEndpointToCallerType<T extends ServerEndpoints> =
    EndpointCallerTypes[T];
type ServerEndpointToBodyType<T extends ServerEndpoints> = EndpointBodyTypes[T];
type ServerEndpointToResponseType<T extends ServerEndpoints> =
    EndpointResponseTypes[T];
