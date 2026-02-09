import { Layout } from "@/components/layout/Layout";
import { DepartmentCard } from "@/components/cards/DepartmentCard";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { ComplaintCard } from "@/components/cards/ComplaintCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Zap,
  Flame,
  Building2,
  Phone,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const recentComplaints = [
  {
    id: "EL2024001",
    title: "Frequent power fluctuations",
    description: "Voltage issues in evening hours",
    date: "Feb 3, 2024",
    status: "in-progress" as const,
  },
  {
    id: "MC2024001",
    title: "Garbage not collected",
    description: "No pickup for 3 days",
    date: "Feb 4, 2024",
    status: "in-progress" as const,
  },
];

const recentNotices = [
  {
    title: "Scheduled Power Cut",
    description: "Maintenance in Sector 17-19 on Feb 10, 10 AM - 4 PM",
    date: "Feb 8",
    type: "warning" as const,
  },
  {
    title: "Water Supply Timing Change",
    description: "New timing: 6-10 AM and 5-7 PM in Wards 3-8",
    date: "Feb 8",
    type: "info" as const,
  },
];

export default function Index() {
  const { t } = useLanguage();

  const quickStats = [
    { label: t.stats.activeComplaints, value: "3", icon: FileText, color: "text-warning" },
    { label: t.stats.inProgress, value: "2", icon: Clock, color: "text-info" },
    { label: t.stats.resolved, value: "5", icon: CheckCircle2, color: "text-success" },
    { label: t.stats.pendingDues, value: "₹0", icon: AlertCircle, color: "text-muted-foreground" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-in text-display text-primary-foreground">
              {t.hero.title}
            </h1>
            <p className="mt-2 text-2xl font-medium text-primary-foreground/90">
              {t.hero.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              {t.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="touch-target text-base"
              >
                <Link to="/electricity">
                  <Zap className="mr-2 h-5 w-5" />
                  {t.nav.electricity}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="touch-target text-base"
              >
                <Link to="/gas">
                  <Flame className="mr-2 h-5 w-5" />
                  {t.nav.gas}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="touch-target text-base"
              >
                <Link to="/municipal">
                  <Building2 className="mr-2 h-5 w-5" />
                  {t.nav.municipal}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mt-5 px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className={`${stat.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Departments */}
      <section className="container px-4 py-12 md:px-6">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          🏛️ Departments
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <DepartmentCard
            title={t.departments.electricity.title}
            description={t.departments.electricity.description}
            icon={Zap}
            href="/electricity"
            variant="electricity"
            stats={[
              { label: t.stats.balance, value: "₹1,250" },
              { label: t.payments.dueDate, value: "Mar 15" },
            ]}
          />
          <DepartmentCard
            title={t.departments.gas.title}
            description={t.departments.gas.description}
            icon={Flame}
            href="/gas"
            variant="gas"
            stats={[
              { label: "Last Booking", value: "Jan 15" },
              { label: "Next Due", value: "Feb 20" },
            ]}
          />
          <DepartmentCard
            title={t.departments.municipal.title}
            description={t.departments.municipal.description}
            icon={Building2}
            href="/municipal"
            variant="municipal"
            stats={[
              { label: "Property Tax", value: "₹12,500" },
              { label: "Due", value: "Mar 31" },
            ]}
          />
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className="bg-muted/50 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recent Complaints */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{t.complaints.yourComplaints}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/electricity">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentComplaints.map((complaint) => (
                  <ComplaintCard key={complaint.id} {...complaint} />
                ))}
              </CardContent>
            </Card>

            {/* Recent Notices */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Latest Notices</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/electricity">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentNotices.map((notice, index) => (
                  <NoticeCard key={index} {...notice} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="container px-4 py-12 md:px-6">
        <Card className="overflow-hidden border-2 border-destructive/30 bg-gradient-to-r from-destructive/10 to-background">
          <CardContent className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-card-foreground">
                🚨 {t.emergency.title}
              </h3>
              <p className="mt-1 text-muted-foreground">
                {t.emergency.description}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="touch-target shrink-0 bg-destructive text-white hover:bg-destructive/90"
            >
              <Link to="/emergency">
                <Phone className="mr-2 h-5 w-5" />
                {t.emergency.helpline}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
