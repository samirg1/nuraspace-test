export default function WeatherCard({ city }: { city: string }) {
    return (
        <div className="mx-auto max-w-sm bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">{city}</h3>
            <p className="text-gray-500 mb-2">🌤 Weather goes here</p>
            <p>Temperature: -- °C</p>
            <p>Condition: --</p>
        </div>
    );
}
