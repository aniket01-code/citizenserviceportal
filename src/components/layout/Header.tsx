import { Phone, Menu, X, User, LogOut, Shield, Search, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const { t } = useLanguage();

  const navItems = [
    { label: t.common.home, path: "/" },
    { label: t.nav.electricity, path: "/electricity" },
    { label: t.nav.gas, path: "/gas" },
    { label: t.nav.municipal, path: "/municipal" },
    { label: "Track", path: "/track" },
    { label: t.nav.emergency, path: "/emergency" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <span className="text-lg font-bold">NS</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight text-primary-foreground">
              {t.hero.title}
            </h1>
            <p className="text-xs text-primary-foreground/80">
              {t.hero.subtitle}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${
                location.pathname === item.path
                  ? "bg-primary-foreground/20"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link to="/emergency" className="hidden md:block">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <Phone className="h-4 w-4" />
              {t.nav.emergency}
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate("/kiosk")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  Kiosk Mode
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/track")}>
                  <Search className="mr-2 h-4 w-4" />
                  Track Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.common.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <User className="h-4 w-4" />
                {t.common.login}
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-primary-foreground/20 bg-primary lg:hidden">
          <div className="container flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-primary-foreground/10 ${
                  location.pathname === item.path
                    ? "bg-primary-foreground/20"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-primary-foreground/20 pt-3">
              <LanguageSwitcher />
              {user ? (
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="justify-start gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-4 w-4" />
                  {t.common.logout}
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <User className="h-4 w-4" />
                    {t.common.login}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
