"use client";
import { useState } from "react";
import InputGroup from "@/components/inputgroup";
import SelectGroup from "@/components/selectgroup";
import { HiOutlinePlusCircle } from "react-icons/hi";

const SueldoLiquido = () => {
  const [baseSalary, setBaseSalary] = useState("");
  const [missingDays, setMissingDays] = useState("");
  const [hasGratificacion, setHasGratificacion] = useState("si");
  const [gratificacion, setGratificacion] = useState("");
  const [extraHours, setExtraHours] = useState("");

  return (
    <div className="flex justify-center items-center">
      <div>
        <form className="grid grid-cols-2 gap-0" action="">
          <div className="m-1 p-2 bg-gray-50 rounded-xl shadow-md">
            <HiOutlinePlusCircle className="inline text-green-500 size-6 mr-1"/><span>Haberes</span>
            <hr className="mt-1 h-1 border-b-0 border-gray-700 dark:bg-white/10" />
            <div className="grid grid-cols-2 gap-2">
              <InputGroup
                value={baseSalary}
                setValue={setBaseSalary}
                label="Salario Base"
              />
              <InputGroup
                value={missingDays}
                setValue={setMissingDays}
                label="Dias Ausentes"
              />
              <SelectGroup
                value={hasGratificacion}
                setValue={setHasGratificacion}
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
                setValue={setGratificacion}
                label="Gratificacion"
              />
              <InputGroup
                value={extraHours}
                setValue={setExtraHours}
                label="Horas Extras"
              />
              <InputGroup
                value={extraHours}
                setValue={() => {}}
                label="Valor Horas Extras"
                disabled
              />
              <div className="col-span-2">
                <InputGroup
                  value={extraHours}
                  setValue={() => {}}
                  label="Comision"
                  placeholder="(opcional)"
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={extraHours}
                  setValue={() => {}}
                  label="Colacion"
                  placeholder="(opcional)"
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={extraHours}
                  setValue={() => {}}
                  label="Movilizacion"
                  placeholder="(opcional)"
                />
              </div>
            </div>
          </div>
          <div className="m-1 p-2 bg-gray-50 rounded-xl shadow-md">
            <span>Descuentos</span>
            <hr className="mt-1 h-1 border-b-0 border-gray-700 dark:bg-white/10" />
            <div className="grid grid-cols-2 gap-2">
              <InputGroup
                value={baseSalary}
                setValue={setBaseSalary}
                label="AFP"
              />
              <InputGroup
                value={baseSalary}
                setValue={setBaseSalary}
                label="Total AFP"
              />
              <InputGroup
                value={baseSalary}
                setValue={setBaseSalary}
                label="Prevision"
              />
              <InputGroup
                value={baseSalary}
                setValue={setBaseSalary}
                label="Total Prevision"
              />
              <div className="col-span-2">
                <InputGroup
                  value={baseSalary}
                  setValue={setBaseSalary}
                  label="Seguro de Cesantia"
                  disabled={true}
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={baseSalary}
                  setValue={setBaseSalary}
                  label="Impuesto"
                  disabled={true}
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={baseSalary}
                  setValue={setBaseSalary}
                  label="APV"
                  disabled={true}
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={baseSalary}
                  setValue={setBaseSalary}
                  label="Otros descuentos legales"
                  placeholder="(opcional)"
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={baseSalary}
                  setValue={setBaseSalary}
                  label="Otros descuentos"
                  placeholder="(opcional)"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SueldoLiquido;
