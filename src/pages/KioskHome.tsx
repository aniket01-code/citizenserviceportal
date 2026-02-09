import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Flame,
  Building2,
  Phone,
  User,
  LogIn,
  Maximize,
  Search,
  FileText,
} from "lucide-react";

export default function KioskHome() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const services = [
    {
      title: t.departments.electricity.title,
      description: t.departments.electricity.description,
      icon: Zap,
      href: "/electricity",
      gradient: "from-electricity/20 to-electricity/5",
      iconColor: "text-electricity",
      iconBg: "bg-electricity/20",
    },
    {
      title: t.departments.gas.title,
      description: t.departments.gas.description,
      icon: Flame,
      href: "/gas",
      gradient: "from-gas/20 to-gas/5",
      iconColor: "text-gas",
      iconBg: "bg-gas/20",
    },
    {
      title: t.departments.municipal.title,
      description: t.departments.municipal.description,
      icon: Building2,
      href: "/municipal",
      gradient: "from-municipal/20 to-municipal/5",
      iconColor: "text-municipal",
      iconBg: "bg-municipal/20",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Kiosk Header Bar */}
      <header className="flex items-center justify-between border-b bg-primary px-6 py-3 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <span className="text-lg font-bold">NS</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">{t.hero.title}</h1>
            <p className="text-xs text-primary-foreground/80">{t.hero.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium tabular-nums">
            {currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Maximize className="h-5 w-5" />
          </Button>
          {user ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { signOut(); }}
              className="gap-2"
            >
              <User className="h-4 w-4" />
              {t.common.logout}
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/auth")}
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              {t.common.login}
            </Button>
          )}
        </div>
      </header>

      {/* Main Kiosk Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-8 py-12">
        {/* Welcome */}
        <div className="mb-12 text-center">
          <h2 className="text-display text-foreground">{t.hero.title}</h2>
          <p className="mt-2 text-xl text-muted-foreground">{t.hero.description}</p>
        </div>

        {/* Service Cards - Large touch targets */}
        <div className="grid w-full max-w-5xl gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.href} to={service.href}>
                <Card className={`group cursor-pointer overflow-hidden border-2 bg-gradient-to-br ${service.gradient} transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  <CardContent className="flex flex-col items-center p-10 text-center">
                    <div className={`mb-6 rounded-2xl ${service.iconBg} p-6`}>
                      <Icon className={`h-16 w-16 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="touch-target gap-2 text-base"
          >
            <Link to="/track">
              <Search className="h-5 w-5" />
              Track Complaint / Payment
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="touch-target gap-2 text-base"
          >
            <Link to="/emergency">
              <Phone className="h-5 w-5" />
              {t.emergency.helpline}
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted px-6 py-4 text-center text-sm text-muted-foreground">
        <p>नागरिक सेवा Kiosk • Touch to interact • Session auto-expires after 3 min inactivity</p>
      </footer>
    </div>
  );
}
