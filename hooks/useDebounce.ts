import { useRef, useCallback } from "react";

/**
 * useDebounce Hook
 * @param func - La fonction à débouncer
 * @param timeout - Délai en millisecondes avant l'exécution (par défaut 500ms)
 * @returns Une fonction débouncée
 */
export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  timeout: number = 500
): (...args: Parameters<T>) => void {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, timeout);
    },
    [func, timeout]
  );

  return debouncedFunction;
}
