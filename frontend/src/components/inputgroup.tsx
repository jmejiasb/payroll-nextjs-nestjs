interface InputGroupProps {
  label: string;
  value: string | number;
  setValue: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  id?: string;
  name?: string;
}

const InputGroup = ({
  label,
  value,
  setValue,
  disabled = false,
  placeholder = "0",
  type = "text",
  id,
  name,
}: InputGroupProps) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const inputName = name || inputId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputName}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div
          className={`flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-300 transition-all duration-200 ${
            disabled
              ? "bg-gray-100 outline-gray-200 cursor-not-allowed"
              : "bg-white-100 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
          }`}
        >
          <input
            id={inputId}
            type={type}
            name={inputName}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${
              disabled
                ? "text-gray-500 bg-gray-100 cursor-not-allowed"
                : "text-gray-900 bg-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default InputGroup;
