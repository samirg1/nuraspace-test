import {
    type UseQueryOptions,
    useQuery as useQueryBase,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoader } from "~/state/loading";

function useQuery<
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends readonly unknown[] = unknown[],
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
    const query = useQueryBase<TQueryFnData, TError, TData, TQueryKey>(options);
    const setLoader = useLoader((state) => state.set);
    const stopLoader = useLoader((state) => state.stop);

    useEffect(() => {
        if (query.isPending) setLoader("Loading data ...");
        else stopLoader();
    }, [query.isPending]);

    useEffect(() => {
        if (query.isError) {
            stopLoader();
        }
    }, [query.isError, query.error]);

    return query;
}

export { useQuery };
