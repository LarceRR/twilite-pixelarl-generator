import React from "react";
import "./Navbar.scss";
import Logo from "../logo/Logo";
import { AppRoutes } from "@/shared/const/routes";
import { ThemeToggle } from "@/widgets/theme-toggler";

const Navbar: React.FC = () => {
  // Get only routes that should appear in the navigation
  const visibleRoutes = Object.values(AppRoutes).filter(
    (route) => route.inPagesList,
  );

  return (
    <div className="navbar-wrapper">
      <div className="navbar-item">
        <Logo />
      </div>
      <div className="navbar-item">
        {visibleRoutes.map((route) => (
          <span key={route.path}>{route.name}</span>
        ))}
      </div>
      <div className="navbar-item">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
