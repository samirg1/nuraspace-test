import { useEffect, useState } from "react";

const useDebouncer = <T>(
    value: T,
    delay: number = 1000,
    beforeWaiting?: () => void,
): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        if (beforeWaiting !== undefined) beforeWaiting();
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

export { useDebouncer };
