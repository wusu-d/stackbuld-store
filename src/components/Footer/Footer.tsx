import React from "react";
import { Github, Linkedin } from "lucide-react";

import Logo from "../Logo/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 bg-slate-400">
      <div className="max-w-6xl mx-auto px-4 md:px-20 py-10">
        <Logo />
        <span className="flex gap-3 items-center my-3">
          <Linkedin className="w-5 g-5" />
          <Github className="w-5 g-5" />
        </span>
        <p>&copy; 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
