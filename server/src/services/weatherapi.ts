import { WEATHER_API_KEY } from "../constants.ts";

interface WeatherInfoByDay {
    mintemp_c: number;
    maxtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    condition: {
        text: string;
    };
}

export const getWeatherForCity = async (city: string): Promise<Weather> => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`;
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        console.error(`Weather API request failed - ${res.status} - ${text}`);
        throw new Error("Failed to retrieve weather data");
    }

    const data = (await res.json()) as any;
    const dayData = data?.forecast?.forecastday?.[0]?.day as WeatherInfoByDay | undefined;
    if (!dayData) throw new Error("No weather data available");
    return {
        location: data.location,
        minTemp: dayData.mintemp_c,
        maxTemp: dayData.maxtemp_c,
        maxWind: dayData.maxwind_kph,
        totalPrecip: dayData.totalprecip_mm,
        condition: dayData.condition.text,
    };
};
