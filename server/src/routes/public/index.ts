import baseRouter from "../baseRoute.ts";
import { authRoutes } from "./authentication.ts";

const publicRouter = baseRouter({
    ...authRoutes,
});

export { publicRouter };
