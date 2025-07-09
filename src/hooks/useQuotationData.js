// src/hooks/useQuotationData.ts
import {
  fetchIndividualQuotation,
  getAllProformaInvoicesByQuoteId,
} from "@/lib/api";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useQuotationData = (id) => {
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [proformaInvoices, setProformaInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Fire both network requests in parallel */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [quoteRes, piRes] = await Promise.all([
        fetchIndividualQuotation(id),
        getAllProformaInvoicesByQuoteId(id),
      ]);

      setQuoteDetails(quoteRes?.data ?? null);
      setProformaInvoices(piRes?.data?.invoice ?? []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /** Kick off fetch when `id` arrives / changes */
  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  /** Stable return value = fewer re‑renders down‑stream */
  return useMemo(
    () => ({
      quoteDetails,
      proformaInvoices,
      isLoading: loading,
      error,
      refetch: fetchData,
    }),
    [quoteDetails, proformaInvoices, loading, error, fetchData]
  );
};
