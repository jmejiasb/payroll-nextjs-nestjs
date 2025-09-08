"use client";
import { useState } from "react";
import InputGroup from "@/components/inputgroup";
import SelectGroup from "@/components/selectgroup";
import { HiOutlinePlusCircle, HiOutlineMinusCircle, HiPlusCircle, HiMinusCircle, HiCurrencyDollar  } from "react-icons/hi";

const SueldoLiquido = () => {
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

  return (
    <div className="flex justify-center items-center">
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
                value={formData.gratificacion}
                onChange={(value) => handleChange("gratificacion", value)}
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
                options={[]}
                label="AFP"
              />
              <InputGroup
                value={0}
                onChange={() => {}}
                label="Total AFP"
                disabled
              />
              <SelectGroup
                value={formData.prevision}
                onChange={(value) => handleChange("prevision", value)}
                options={[]}
                label="Previsión"
              />
              <InputGroup
                value={0}
                onChange={() => {}}
                label="Total Prevision"
                disabled
              />
              <div className="col-span-2">
                <InputGroup
                  value={0}
                  onChange={() => {}}
                  label="Seguro de Cesantia"
                  disabled
                />
              </div>
              <div className="col-span-2">
                <InputGroup
                  value={0}
                  onChange={() => {}}
                  label="Seguro Social Expetativa de Vida"
                  disabled
                />
              </div>
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
              value={0}
              onChange={() => {}}
              label="Haberes"
              disabled
            />
          </div>
          <div className="flex align-bottom ml-auto">
            <HiMinusCircle className="block text-red-600 size-6 mr-1" />
            <InputGroup
              value={0}
              onChange={() => {}}
              label="Descuentos"
              disabled
            />
          </div>
          <div className="flex align-bottom ml-auto">
            <HiCurrencyDollar className="block text-green-400 size-6 mr-1" />
            <InputGroup
              value={0}
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
