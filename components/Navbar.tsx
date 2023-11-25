import React from "react";
import { navroutes } from "@/app/constants";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white">
      <section className="max-w-7xl mx-auto flex flex-row justify-between px-2 ">
        <div>logo</div>
        <div>
          <ul className="flex flex-row gap-3">
            {navroutes.map((nav) => (
              <Link href={nav.route} key={nav.id}>
                {nav.name}
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
