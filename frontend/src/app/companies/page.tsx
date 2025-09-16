"use client";
import Card from "./components/card";
import { useCompanies } from "@/hooks/useCompanies";

const CompaniesPage = () => {
  const companies = useCompanies();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4">
        <h1 className="text-slate-800 font-extrabold text-xl">
          Gestion de Empresas
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-5 w-full">
        {companies?.length > 0
          ? [...companies]
              .sort((a, b) => a.name?.localeCompare(b.name))
              .map((com) => (
                <Card key={com.id} id={com.id} name={com.name} rut={com.rut} />
              ))
          : null}
      </div>
    </div>
  );
};

export default CompaniesPage;
