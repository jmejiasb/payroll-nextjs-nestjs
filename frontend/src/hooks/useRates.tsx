import { useState, useCallback, useEffect} from "react";
import axios from "axios";
import type {PayrollRates} from "../../../backend/src/payroll/utils/types";


export function useRates(): PayrollRates | null {
  const [rates, setRates] = useState<PayrollRates | null>(null);

  const fetchRates = useCallback(async (): Promise<void> => {
    try {
      const res = await axios.get("http://localhost:3001/api/payroll/rates");
      setRates(res.data as PayrollRates);
    } catch (error) {
      console.error('Error fetching rates:', error);
      // You might want to handle error state here
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return rates;
}