import { authRoutes } from "./authentication.ts";
import baseRouter from "./baseRoute.ts";
import { weatherRoute } from "./weather.ts";

const router = baseRouter({
    ...authRoutes,
    ...weatherRoute,
});

export default router;
