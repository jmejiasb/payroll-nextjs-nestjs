import { useState, useCallback, useEffect} from "react";
import axios from "axios";
import type { Company } from "@/types/types";

export function useCompanies(): Company[] {
  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = useCallback(async (): Promise<void> => {
    try {
      const res = await axios.get<Company[]>("/api/companies");
      setCompanies(res.data);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return companies;
}