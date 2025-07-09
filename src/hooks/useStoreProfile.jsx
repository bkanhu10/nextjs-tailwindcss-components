import { getStoreProfile } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";

const useStoreProfile = () => {
  const [storeProfile, setStoreProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStoreProfile = useCallback(async () => {
    try {
      const res = await getStoreProfile();
      // console.log("Store Profile: ", res);
      setStoreProfile(res?.data);
    } catch (error) {
      console.log("Failed getting store profile: ", error);
    }
  }, []);

  useEffect(() => {
    fetchStoreProfile();
  }, [fetchStoreProfile]);

  return { storeProfile, isLoading, error, fetchStoreProfile };
};

export default useStoreProfile;
