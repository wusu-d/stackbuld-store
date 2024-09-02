import React from "react";
import Logo from "../Logo/Logo";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <nav className="">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-4 md:px-20">
        <Logo />
        <ul className="flex gap-6 text-xs md:text-sm">
          <li>
            <Link href={"/category"}>Categories</Link>
          </li>
          <li>Shop</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
