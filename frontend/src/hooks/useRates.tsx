import { useState, useCallback, useEffect} from "react";
import axios from "axios";
import type {PayrollRates} from "../../../backend/src/payroll/utils/types";

export function useRates(): PayrollRates | null {
  const [rates, setRates] = useState<PayrollRates | null>(null);

  const fetchRates = useCallback(async (): Promise<void> => {
    try {
      const res = await axios.get<PayrollRates>("/api/payroll/rates");
      setRates(res.data);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return rates;
}