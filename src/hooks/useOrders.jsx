import { getAllOrders } from "@/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useOrders = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 1,
    totalPages: 1,
    items: 0,
  });

  const fetchOrders = useCallback(
    async (page, filters) => {
      setIsLoading(true);

      try {
        const queryParams = new URLSearchParams(searchParams);

        queryParams.set("page", page || 1);

        router.push(`${pathname}?${queryParams.toString()}`);
        // console.log(`${queryParams.toString()}`);

        const res = await getAllOrders(`${queryParams.toString()}`);
        // console.log("All Orders data: ", res.data);

        const { totalCount, totalPages, orders } = res?.data;

        setData(orders);
        setPagination({
          count: totalCount,
          currentPage: res?.data?.page,
          totalPages: totalPages,
          items: orders.length,
        });
      } catch (err) {
        setError(true);
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [pathname, router, searchParams]
  );

  // Fetch orders when filters or page change
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const filters = {
      orderStatus: searchParams.get("orderStatus"),
      orderDateStart: searchParams.get("orderDate[start]"),
      orderDateEnd: searchParams.get("orderDate[end]"),
    };

    fetchOrders(page, filters);
  }, [searchParams, fetchOrders]);

  return {
    data,
    isLoading,
    error,
    pagination,
    fetchOrders,
  };
};

export default useOrders;
