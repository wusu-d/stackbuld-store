import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="text-base md:text-lg tracking-widest font-bold">
      WUSU STORE
    </Link>
  );
};

export default Logo;
