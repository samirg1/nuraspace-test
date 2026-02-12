export default function CitySelector({ onSelect }: { onSelect: (city: string) => void }) {
    return (
        <div className="mb-8">
            <select
                onChange={(e) => onSelect(e.target.value)}
                className="border px-4 py-2 rounded"
            >
                <option value="">Select a city</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Sydney">Sydney</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Perth">Perth</option>
            </select>
        </div>
    );
}
