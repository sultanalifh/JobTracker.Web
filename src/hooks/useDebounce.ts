import { useCallback, useEffect, type DependencyList } from "react";

export function useDebounce(effect: () => void, deps: DependencyList, delay: number) {
    const callback = useCallback(effect, deps)

    useEffect(() => {
        const timeout = setTimeout(callback, delay)

        return () => clearTimeout(timeout)
    }, [callback, delay])
}