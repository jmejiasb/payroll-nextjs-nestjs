import Link from "next/link";
import { HiHome } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-8 py-3 h-16">
      <Link className="font-bold p-2" href={"/"}>
        Payroll
      </Link>
      <HiHome
        className="mx-auto w-8 h-8"
      />
    </nav>
  );
};
export default Navbar;
