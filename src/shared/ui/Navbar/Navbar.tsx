import "./Navbar.scss";
import Logo from "../logo/Logo";
import { AppRoutes } from "@/shared/const/routes";
import { ThemeToggle } from "@/widgets/theme-toggler";

export default function Navbar() {
  const visibleRoutes = Object.values(AppRoutes).filter((route) => route.inPagesList);

  return (
    <header className="navbar" data-testid="navbar">
      <a className="navbar__brand" href={AppRoutes.HOME.path} aria-label="Twilite Pixelart Generator">
        <Logo width={34} height={34} />
        <span><strong>twilite</strong><small>pixelart generator</small></span>
      </a>
      <nav className="navbar__links" aria-label="Основная навигация">
        {visibleRoutes.map((route) => <a key={route.path} className={route.path === AppRoutes.HOME.path ? "is-active" : ""} href={route.path}>{route.name}</a>)}
      </nav>
      <div className="navbar__actions">
        <a className="navbar__docs" href="#docs">Документация</a>
        <ThemeToggle />
        <button className="navbar__avatar" aria-label="Открыть профиль">РГ</button>
      </div>
    </header>
  );
}
