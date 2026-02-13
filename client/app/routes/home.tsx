import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CitySelector from "~/components/CitySelector"
import WeatherCard from "~/components/WeatherCard";
import { useAuthentication } from "~/state/authentication";

export default function Home() {
    const navigate = useNavigate();
    const [city, setCity] = useState<string>("");
    const user = useAuthentication((state) => state.user);

    useEffect(() => {
        if (!user) navigate("/");
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 p-10 text-center">
            <h1 className="text-3xl font-bold mb-4 text-black">Home</h1>
            <p className="mb-6 text-gray-600">
                Select a city to view current weather
            </p>

            <CitySelector city={city} setCity={setCity} />

            {city && <WeatherCard city={city} />}
        </div>
    );
}
