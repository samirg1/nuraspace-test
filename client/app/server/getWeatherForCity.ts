import { get } from "."

export const getWeatherForCity = async (city: string) => {
    const { weather } = await get<"/weather/:city">(`/weather/${city}`);
    return weather;
}
