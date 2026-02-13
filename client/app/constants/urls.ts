const SERVER_URL = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://your-production-server.com";

export { SERVER_URL };
