import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryParamString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (key, values) => {
      const params = new URLSearchParams(searchParams);

      // console.log("Params from createQueryString: ", params.toString());
      // Remove existing entries for the key
      params.delete(key);

      // Append each value for the key
      if (Array.isArray(values)) {
        values.forEach((value) => params.append(key, value));
      } else if (values) {
        params.append(key, values);
      }
      params.set("page", 1);
      console.log(
        "Params from createQueryString but after append: ",
        params.toString()
      );
      return params.toString();
    },
    [searchParams]
  );

  return { createQueryString };
};

export default useQueryParamString;
