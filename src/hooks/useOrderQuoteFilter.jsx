import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useQueryParamString from "./useQueryParamString";

const useOrderQuoteFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { createQueryString } = useQueryParamString();

  const handleFilterChange = useCallback(
    (key) => (event) => {
      const value = event.target.value;

      const updatedFilters = value === "" ? null : [value];

      const newQueryString = createQueryString(key, updatedFilters);

      // console.log(`From ProductFilter: ${pathname}?${newQueryString}`);
      router.push(`${pathname}?${newQueryString}`);
    },
    [createQueryString, pathname, router]
  );

  return {
    handleFilterChange,
    selectedFilters: {
      orderStatus: searchParams.get("orderStatus"),
      orderDateStart: searchParams.get("orderDate[start]"),
      orderDateEnd: searchParams.get("orderDate[end]"),
    },
  };
};

export default useOrderQuoteFilters;
