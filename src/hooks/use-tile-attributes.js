import { getTilesOptions } from "@/lib/api";
import { useEffect, useState } from "react";

/**
 * @description A hook for fetching and managing tile product attributes.
 *
 * This hook retrieves data for various product attributes related to tiles,
 * including brands, categories, subcategories, colors, sizes, product layouts,
 * product overviews, and tile types. It manages the loading state and error state
 * during the fetch operation.
 *
 * @returns {Object} An object containing:
 * - `productAttributes`: An object with arrays of brands, categories, subcategories,
 *   colors, sizes, product layouts, product overviews, and tile types.
 * - `isLoading`: A boolean indicating whether the hook is currently fetching data.
 * - `error`: A boolean indicating whether an error occurred while fetching data.
 */
const useTileAttributes = () => {
  const [productAttributes, setProductAttributes] = useState({
    brands: [],
    categories: [],
    subCategories: [],
    colors: [],
    sizes: [],
    productLayout: [],
    productOverview: [],
    tileTypes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTilesOptions = async () => {
      setIsLoading(true);
      try {
        const res = await getTilesOptions();
        console.log("Tiles Options: ", res);
        if (res.status === 200) {
          setProductAttributes({
            brands: res.data.brands,
            categories: res.data.categories,
            subCategories: res.data.subcategories,
            colors: res.data.colors,
            sizes: res.data.sizes,
            productLayout: res.data.productLayout,
            productOverview: res.data.productOverview,
            tileTypes: res.data.tileTypes,
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

export default useTileAttributes;
