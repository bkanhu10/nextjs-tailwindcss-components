import { getAllSanitary } from "@/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useSanitaryProducts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 1,
    totalPages: 1,
    items: 0,
  });

  const fetchProducts = useCallback(
    async (page, filters) => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams(searchParams);

        console.log("queryParams from fetchProducts: ", queryParams.toString());

        // // Append filters to query params
        // Object.entries(filters).forEach(([key, values]) => {
        //   values.forEach((value) => queryParams.append(key, value));
        // });

        queryParams.set("page", page || 1);

        // console.log("Query params: ", queryParams.toString());
        router.push(`${pathname}?${queryParams.toString()}`);
        console.log(`${queryParams.toString()}`);
        // const res = await getSanitaryProducts(`?${queryParams.toString()}`);
        const res = await getAllSanitary(`${queryParams.toString()}`);
        const { products, count, totalPages } = res?.data;
        setData(products);
        setPagination({
          count,
          currentPage: res?.data?.page,
          totalPages: totalPages,
          items: products.length,
        });
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [pathname, router, searchParams]
  );

  // Fetch products when filters or page change
  useEffect(() => {
    // console.log(`SearchParams from effect: ${searchParams?.toString()} `);
    const page = parseInt(searchParams.get("page")) || 1;
    const filters = {
      productStatus: searchParams.get("productStatus"),
      category: searchParams.get("category"),
      subcategory: searchParams.get("subcategory"),
    };

    fetchProducts(page, filters);
  }, [searchParams, fetchProducts]);

  return {
    data,
    isLoading,
    error,
    pagination,
    fetchProducts,
  };
};

export default useSanitaryProducts;
