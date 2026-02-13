import { getWeatherForCity } from "../../services/weatherapi.ts";
import type { HandlersRecord } from "../baseRoute.ts";

export const weatherRoute: Pick<HandlersRecord, "/weather/:city"> = {
    "/weather/:city": {
        method: "get",
        handler: async ({ params: { city } }) => {
            const weather = await getWeatherForCity(city as string);
            return { weather };
        },
    },
};
