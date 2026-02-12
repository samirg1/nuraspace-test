import { useState } from "react";
import CitySelector from "../components/CitySelector"
import WeatherCard from "../components/WeatherCard";

export default function Home() {
    const [city, setCity] = useState<string | null>(null);
    return (
        <div className="min-h-screen bg-gray-50 p-10 text-center">
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <p className="mb-6 text-gray-600">
                Select a city to view current weather
            </p>

            <CitySelector onSelect={setCity} />

            {city && <WeatherCard city={city} />}
        </div>
    );
}
