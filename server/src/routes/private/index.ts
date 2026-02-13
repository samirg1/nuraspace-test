import baseRouter from "../baseRoute.ts";
import { userRoute } from "./getUser.ts";
import { weatherRoute } from "./weather.ts";

const privateRouter = baseRouter({
    ...weatherRoute,
    ...userRoute,
});

export { privateRouter };
