import { useDebouncer } from "~/hooks/useDebouncer";
import { useQuery } from "~/hooks/useQuery";
import { getWeatherForCity } from "~/server/getWeatherForCity";
import { useLoader } from "~/state/loading";
import { Spinner } from "./Spinner";

export default function WeatherCard({ city }: { city: string }) {
    const loaderValue = useLoader((state) => state.value);
    const setLoader = useLoader((state) => state.set);
    const cityQuery = useDebouncer(city, 2000, () => setLoader("Loading data..."));

    const { data, error } = useQuery({
        queryKey: ["weather", cityQuery],
        queryFn: async () => {
            const weather = await getWeatherForCity(cityQuery);
            setLoader(null);
            return weather;
        },
    });

    return (
        <div className="mx-auto max-w-sm bg-white rounded-xl shadow p-6">
            {loaderValue ? (
                    <span className="inline-flex items-center gap-2 text-black">
                    {loaderValue} <Spinner />
                    </span>
            ) : error ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : (
                <>
                    <h3 className="text-xl font-semibold mb-2 text-black">
                        {data?.location ? `${data.location.name}, ${data.location.region}, ${data.location.country}` : "--"}
                    </h3>
                    <p className="text-black">
                        Temperature Range: {data?.minTemp ?? "--"} °C -{" "}
                        {data?.maxTemp ?? "--"} °C
                    </p>
                    <p className="text-black">Condition: {data?.condition ?? "--"}</p>
                    <p className="text-black">Max Wind: {data?.maxWind ?? "--"} km/h</p>
                </>
            )}
        </div>
    );
}
