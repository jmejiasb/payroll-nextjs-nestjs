import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-400 px-8 py-3">
      <Link className="font-bold p-2" href={"/"}>
        Payroll
      </Link>
      <Link
        className="font-bold p-2"
        href={"/sueldo-liquido"}
      >
        Sueldo Liquido
      </Link>
    </nav>
  );
};
export default Navbar;
