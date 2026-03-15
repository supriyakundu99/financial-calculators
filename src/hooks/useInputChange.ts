import { useCallback } from "react";

/** Returns a change handler that strips leading zeros from a text input. */
export function useInputChange(setter: (value: string) => void) {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value.replace(/^0+/, "") || "0");
    },
    [setter],
  );
}
