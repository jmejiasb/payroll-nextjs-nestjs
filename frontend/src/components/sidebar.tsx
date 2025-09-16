"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiUser, HiDocument, HiCog, HiBriefcase } from "react-icons/hi";
import type { IconType } from "react-icons";

type Item = { href: string; label: string; icon: IconType };

const items: Item[] = [
  { href: "/", label: "Principal", icon: HiHome },
  { href: "/employees", label: "Empleados", icon: HiUser },
  { href: "/companies", label: "Empresas", icon: HiBriefcase },
  { href: "/sueldo-liquido", label: "Payroll", icon: HiDocument },
  { href: "/settings", label: "Settings", icon: HiCog },
];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: Item & { active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none transition
        hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-black/20 
        ${active ? "bg-blue-50 font-medium shadow-inner text-slate-800" : "text-slate-800"}`}
    >
      <Icon className="h-5 w-5" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="relative flex w-full max-w-3xs flex-col p-4 bg-blue-100">
      <nav className="flex flex-col gap-1 p-2 font-sans">
        {items.map((it) => {
          const isActive =
            pathname === it.href ||
            (it.href !== "/" && pathname.startsWith(it.href));
          return <NavItem key={it.href} {...it} active={isActive} />;
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
