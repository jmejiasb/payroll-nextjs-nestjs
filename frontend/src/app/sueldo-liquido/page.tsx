"use client";
import { useState, useMemo, useCallback } from "react";
import InputGroup from "@/components/inputgroup";
import SelectGroup from "@/components/selectgroup";
import {
  HiOutlinePlusCircle,
  HiOutlineMinusCircle,
  HiPlusCircle,
  HiMinusCircle,
  HiCurrencyDollar,
} from "react-icons/hi";
import { useRates } from "@/hooks/useRates";
import type { SelectOption } from "@/types/types";
import { calculateUniqueTax } from "./utils/utils";

const SueldoLiquido = () => {
  const rates = useRates();

  const [formData, setFormData] = useState({
    baseSalary: "",
    missingDays: "",
    hasGratificacion: "si",
    gratificacion: "",
    extraHours: "",
    comision: "",
    lunch: "",
    transport: "",
    afp: "",
    prevision: "",
    apv: "",
    otherLegal: "",
    other: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateNetSalary = useCallback(() => {
    const baseSalary = Number(formData.baseSalary) ?? 0;
    const missingDays = Number(formData.missingDays) ?? 0;

    const baseSalaryTotal = baseSalary - Math.round(baseSalary / 30 * missingDays)

    const maxGratificacion = Math.round(((rates?.minSalary ?? 0) * 4.75) / 12);

    const baseGratificacion = baseSalaryTotal * 0.25;

    const gratificacion =
      formData.hasGratificacion === "si"
        ? Math.min(baseGratificacion, maxGratificacion)
        : 0;

    const grossSalary = baseSalaryTotal + gratificacion;

    const afpTotal = Math.round((grossSalary * Number(formData.afp)) / 100);
    const previsionTotal = Math.round(
      (grossSalary * Number(formData.prevision)) / 100
    );

    const lifeExpectancy = Math.round(
      (grossSalary * Number(rates?.lifeExpectancy)) / 100
    );

    const AfcRate = rates?.unemploymentInsurance?.[0];
    const unemploymentInsurance = Math.round(
      (grossSalary * Number(AfcRate?.worker)) / 100
    );

    const impSalary =
      grossSalary -
      afpTotal -
      previsionTotal -
      unemploymentInsurance;

    const uniqueTax = calculateUniqueTax(impSalary, rates?.utm ?? 0);

    return {
      baseSalaryTotal,
      gratificacion,
      afpTotal,
      previsionTotal,
      lifeExpectancy,
      unemploymentInsurance,
      uniqueTax,
    };
  }, [formData, rates]);

  const afpOptions = useMemo<SelectOption[]>(() => {
    const afpList = rates?.afp ?? [];
    return afpList.map((a) => ({ label: a.name ?? "", value: a.worker ?? 0 }));
  }, [rates?.afp]);

  const {
    baseSalaryTotal,
    gratificacion,
    afpTotal,
    previsionTotal,
    unemploymentInsurance,
    uniqueTax,
  } = useMemo(() => calculateNetSalary(), [calculateNetSalary]);

  const totalHaberes = useMemo(() => {
    const comision = Number(formData.comision);
    const lunch = Number(formData.lunch);
    const transport = Number(formData.transport);
    return baseSalaryTotal + gratificacion + comision + lunch + transport
  }, [formData, baseSalaryTotal, gratificacion])

  const totalDescuentos = useMemo(() => {
    const apv = Number(formData.apv)
    const other = Number(formData.other)
    const otherLegal = Number(formData.otherLegal)

    return afpTotal + previsionTotal +  unemploymentInsurance + uniqueTax + apv + other + otherLegal
  }, [formData, afpTotal, previsionTotal, unemploymentInsurance, uniqueTax])

  return (
    <div className="flex justify-center items-center mt-8">
      <div>
        <form className="grid grid-cols-2 gap-0" action="">
          <div className="m-1 p-2 bg-gray-50 rounded-xl shadow-md">
            <HiOutlinePlusCircle className="inline text-green-500 size-6 mr-1" />
            <span>Haberes</span>
            <hr className="mt-1 h-1 border-b-0 border-gray-700 dark:bg-white/10" />
            <div className="grid grid-cols-2 gap-2">
              <InputGroup
                value={formData.baseSalary}
                onChange={(value) => handleChange("baseSalary", value)}
                label="Salario Base"
              />
              <InputGroup
                value={formData.missingDays}
                onChange={(value) => handleChange("missingDays", value)}
                label="Dias Ausentes"
              />
              <SelectGroup
                value={formData.hasGratificacion}
                onChange={(value) => handleChange("hasGratificacion", value)}
                options={[
                  {
                    label: "Si",
                    value: "si",
                  },
                  {
                    label: "No",
                    value: "no",
                  },
                ]}
                label="Gratificacion"
              />
              <InputGroup
                value={gratificacion}
                onChange={() => {}}
                label="Gratificacion"
              />
              <InputGroup
                value={formData.extraHours}
                onChange={(value) => handleChange("extraHours", value)}
                label="Horas Extras"
              />
              <InputGroup
                value={0}
                onChange={() => {}}
                label="Valor Horas Extras"
                disabled
              />
              <div className="col-span-2">
                <InputGroup
                  value={formData.comision}
                  onChange={(value) => handleChange("comision", value)}
                  label="Comision"
                  placeholder="(opcional)"
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={formData.lunch}
                  onChange={(value) => handleChange("lunch", value)}
                  label="Colacion"
                  placeholder="(opcional)"
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={formData.transport}
                  onChange={(value) => handleChange("transport", value)}
                  label="Movilizacion"
                  placeholder="(opcional)"
                />
              </div>
            </div>
          </div>
          <div className="m-1 p-2 bg-gray-50 rounded-xl shadow-md">
            <HiOutlineMinusCircle className="inline text-red-500 size-6 mr-1" />
            <span>Descuentos</span>
            <hr className="mt-1 h-1 border-b-0 border-gray-700 dark:bg-white/10" />
            <div className="grid grid-cols-2 gap-2">
              <SelectGroup
                value={formData.afp}
                onChange={(value) => handleChange("afp", value)}
                options={afpOptions}
                label="AFP"
              />
              <InputGroup
                value={afpTotal}
                onChange={() => {}}
                label="Total AFP"
                disabled
              />
              <SelectGroup
                value={formData.prevision}
                onChange={(value) => handleChange("prevision", value)}
                options={[
                  {
                    label: "fonasa",
                    value: 7,
                  },
                ]}
                label="Previsión"
              />
              <InputGroup
                value={previsionTotal}
                onChange={() => {}}
                label="Total Prevision"
                disabled
              />
              <div className="col-span-2">
                <InputGroup
                  value={unemploymentInsurance}
                  onChange={() => {}}
                  label="Seguro de Cesantia"
                  disabled
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={uniqueTax}
                  onChange={() => {}}
                  label="Impuesto Unico"
                  disabled
                />
              </div>
              {/* <div className="col-span-2">
                <InputGroup
                  value={lifeExpectancy}
                  onChange={() => {}}
                  label="Seguro Social Expetativa de Vida"
                  disabled
                />
              </div> */}
              <div className="col-span-2">
                <InputGroup
                  value={formData.apv}
                  onChange={(value) => handleChange("apv", value)}
                  label="APV"
                  placeholder={"(opcional)"}
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={formData.otherLegal}
                  onChange={(value) => handleChange("otherLegal", value)}
                  label="Otros descuentos legales"
                  placeholder="(opcional)"
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={formData.other}
                  onChange={(value) => handleChange("other", value)}
                  label="Otros descuentos"
                  placeholder="(opcional)"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="flex m-1 py-2 px-6 gap-3 bg-gray-50 rounded-xl shadow-md ">
          <div className="flex align-bottom">
            <HiPlusCircle className="block text-green-600 size-6 mr-1" />
            <InputGroup
              value={totalHaberes}
              onChange={() => {}}
              label="Haberes"
              disabled
            />
          </div>
          <div className="flex align-bottom ml-auto">
            <HiMinusCircle className="block text-red-600 size-6 mr-1" />
            <InputGroup
              value={totalDescuentos}
              onChange={() => {}}
              label="Descuentos"
              disabled
            />
          </div>
          <div className="flex align-bottom ml-auto">
            <HiCurrencyDollar className="block text-green-400 size-6 mr-1" />
            <InputGroup
              value={totalHaberes - totalDescuentos}
              onChange={() => {}}
              label="Sueldo Liquido"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SueldoLiquido;
