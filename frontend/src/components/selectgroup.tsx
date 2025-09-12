import type { SelectOption } from "../types/types"

interface SelectGroupProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
}

const SelectGroup = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Seleccione una opcion...",
  id,
  name,
}: SelectGroupProps) => {
  // Generate unique ID if not provided
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const selectName = name || selectId;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={selectId}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <div
          className={`flex items-center justify-center rounded-md h-10 pr-3 outline-1 -outline-offset-1 outline-gray-300 transition-all duration-200 ${
            disabled
              ? "bg-gray-50 outline-gray-200"
              : "bg-white has-[select:focus-within]:outline-2 has-[select:focus-within]:-outline-offset-2 has-[select:focus-within]:outline-indigo-600"
          }`}
        >
          <select
            id={selectId}
            name={selectName}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`block w-full py-1.5 px-3 text-base focus:outline-none sm:text-sm/6 rounded-md ${
              disabled
                ? "text-gray-500 bg-gray-50 cursor-not-allowed"
                : "text-gray-900 bg-white cursor-pointer"
            }`}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectGroup;
