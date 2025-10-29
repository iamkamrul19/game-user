import { useState } from "react";
// import debounce from "lodash.debounce";
import { useDebounce } from "./useDebounce";

const useFilter = () => {
  const [search, setSearch] = useState<{
    [key: string]: string | number | boolean;
  }>({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  //   const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  //   const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [range, setRange] = useState([0, 1000]);
  const [isPriceChanged, setIsPriceChanged] = useState(false);

  const debouncedRange = useDebounce(range, 1000);
  const minPrice = isPriceChanged ? debouncedRange[0] : undefined;
  const maxPrice = isPriceChanged ? debouncedRange[1] : undefined;

  const handleRangeChange = (values: number[]) => {
    setRange(values);
    setIsPriceChanged(true); // mark as changed
  };

  const clearRange = () => {
    setRange([0, 1000]);
    setIsPriceChanged(false); // reset
  };

  // Original handler
  //   const handleRange = useCallback((values: number[]) => {
  //     setRange([...values]);
  //     setMinPrice(values[0] || undefined);
  //     setMaxPrice(values[1] || undefined);
  //   }, []);

  //   // Debounced version
  //   const debouncedHandleRange = useMemo(
  //     () => debounce(handleRange, 500),
  //     [handleRange]
  //   );

  //   useEffect(() => {
  //     return () => {
  //       debouncedHandleRange.cancel();
  //     };
  //   }, [debouncedHandleRange]);

  //   return {
  //     page,
  //     setPage,
  //     limit,
  //     setLimit,
  //     search,
  //     setSearch,
  //     range,
  //     setRange: debouncedRange, // use debounced version
  //     maxPrice,
  //     minPrice,
  //     // setMaxPrice,
  //     // setMinPrice,
  //   };
  return {
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    range, // immediate for UI
    setRange: handleRangeChange, // updates immediately
    debouncedRange, // stable for API
    minPrice,
    maxPrice,
    setIsPriceChanged,
    clearRange,
  };
};

export default useFilter;
