"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavRailPC = () => {
  const pathname = usePathname();
  const links = [
    {
      id: "navrail-link-1",
      icon: "upload",
      name: "Upload",
      path: "/upload",
    },
    {
      id: "navrail-link-2",
      icon: "favorite",
      name: "Liked",
      path: "/liked",
    },
    {
      id: "navrail-link-3",
      icon: "star",
      name: "Favorites",
      path: "/favorite",
    },
  ];

  return (
    <nav className="surface-container-high m l left">
      <button className="transparent circle extra">
        <img className="responsive" src="/favicon.ico" />
      </button>
      {links.map((link) => {
        return (
          <Link href={link.path} key={link.id}>
            <i className={pathname == link.path ? "fill" : ""}>{link.icon}</i>
            <span>{link.name}</span>
          </Link>
        );
      })}
      <div className="max"></div>
      <a>
        <i>settings</i>
        <span>Settings</span>
      </a>
      <a>
        <i>logout</i>
        <span>Logout</span>
      </a>
    </nav>
  );
};
