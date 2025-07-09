import { getSanitaryProductOptions } from "@/lib/api";
import { useEffect, useState } from "react";

/**
 * @description A hook for fetching and managing sanitary product attributes.
 *
 * @returns {Object} An object with the following properties:
 * - `productAttributes`: An object containing arrays of categories, subcategories, brands, and colors.
 * - `isLoading`: A boolean indicating whether the hook is currently fetching data.
 * - `error`: A boolean indicating whether an error was encountered while fetching data.
 */
const useSanitaryAttributes = () => {
  const [productAttributes, setProductAttributes] = useState({
    categories: [],
    subcategories: [],
    brands: [],
    colors: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTilesOptions = async () => {
      setIsLoading(true);
      try {
        const res = await getSanitaryProductOptions();
        console.log("Sanitary Options: ", res);
        if (res.status === 200) {
          setProductAttributes({
            categories: res.data.categories,
            subcategories: res.data.subcategories,
            brands: res.data.brands,
            colors: res.data.colors,
          });
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTilesOptions();
  }, []);

  return { productAttributes, isLoading, error };
};

export default useSanitaryAttributes;
