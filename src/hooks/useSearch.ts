import debounce from "lodash.debounce";
import { useMemo, useState, type SetStateAction } from "react";

export function useSearch() {
  const MILLIS_DEBOUNCE = 600;
  const [search, setSearch] = useState("");
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(handleChange, MILLIS_DEBOUNCE),
    []
  );

  return { search, debouncedChangeHandler };
}
