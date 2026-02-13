export default function CitySelector({ city, setCity }: { city: string; setCity: (city: string) => void }) {
    return (
        <div className="mb-8">
            <input
                className="border px-4 py-2 rounded text-black"
                placeholder="Start typing a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
        </div>
    );
}
