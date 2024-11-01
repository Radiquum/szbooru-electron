"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppBarPC = () => {
  const pathname = usePathname()
  const links = [
    {
      id: "appbar-link-1",
      icon: "home",
      name: "Home",
      path: "/",
    },
    {
      id: "appbar-link-2",
      icon: "article",
      name: "Posts",
      path: "/posts",
    },
    {
      id: "appbar-link-3",
      icon: "tag",
      name: "Tags",
      path: "/tags",
    },
    {
      id: "appbar-link-4",
      icon: "hub",
      name: "Pools",
      path: "/pools",
    },
    {
      id: "appbar-link-5",
      icon: "search",
      name: "Search",
      path: "/search",
    },
    {
      id: "appbar-link-6",
      icon: "account_circle",
      name: "Users",
      path: "/users",
    },
  ];

  return (
    <header className="fixed surface-container-high m l">
      <nav>
        {links.map((link) => {
          return (
            <Link href={link.path} className="vertical" key={link.id}>
              <i className={pathname == link.path ? "fill" : ""}>{link.icon}</i>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
