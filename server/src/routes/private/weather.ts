import { getWeatherForCity } from "../../services/weatherapi.ts";
import type { HandlersRecord } from "../baseRoute.ts";

export const weatherRoute: Pick<HandlersRecord, "/weather/:city"> = {
    "/weather/:city": {
        method: "get",
        handler: async ({ params: { city } }) => {
            if (!/^[a-zA-Z]+$/.test(city as string)) return { error: { message: "Invalid city name", code: 400 } };
            try {
                const weather = await getWeatherForCity(city as string);
                return { weather };
            } catch (error) {
                return { error: { message: (error as Error).message, code: 500 } };
            }
        },
    },
};
