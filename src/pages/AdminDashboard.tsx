import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart3,
  Users,
  FileText,
  CreditCard,
  Activity,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  Zap,
  Flame,
  Building2,
} from "lucide-react";

interface DashboardStats {
  totalComplaints: number;
  activeComplaints: number;
  resolvedComplaints: number;
  totalPayments: number;
  totalRevenue: number;
  totalUsers: number;
  activeSessions: number;
}

interface ComplaintItem {
  id: string;
  issue_type: string;
  department: string;
  status: string;
  created_at: string;
  description: string;
}

interface PaymentItem {
  id: string;
  receipt_number: string;
  amount: number;
  department: string;
  status: string;
  payment_method: string;
  created_at: string;
}

interface SessionItem {
  id: string;
  kiosk_id: string;
  started_at: string;
  ended_at: string | null;
  actions_count: number;
  status: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [stats, setStats] = useState<DashboardStats>({
    totalComplaints: 0,
    activeComplaints: 0,
    resolvedComplaints: 0,
    totalPayments: 0,
    totalRevenue: 0,
    totalUsers: 0,
    activeSessions: 0,
  });
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchDashboardData = async () => {
    setLoading(true);

    const [complaintsRes, paymentsRes, sessionsRes] = await Promise.all([
      supabase.from("complaints").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("payments").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("kiosk_sessions").select("*").order("started_at", { ascending: false }).limit(50),
    ]);

    const allComplaints = (complaintsRes.data as ComplaintItem[]) || [];
    const allPayments = (paymentsRes.data as PaymentItem[]) || [];
    const allSessions = (sessionsRes.data as SessionItem[]) || [];

    setComplaints(allComplaints);
    setPayments(allPayments);
    setSessions(allSessions);

    setStats({
      totalComplaints: allComplaints.length,
      activeComplaints: allComplaints.filter((c) => c.status !== "resolved").length,
      resolvedComplaints: allComplaints.filter((c) => c.status === "resolved").length,
      totalPayments: allPayments.length,
      totalRevenue: allPayments.reduce((sum, p) => sum + p.amount, 0),
      totalUsers: new Set(allComplaints.map((c) => (c as any).user_id)).size,
      activeSessions: allSessions.filter((s) => s.status === "active").length,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      fetchDashboardData();
    }
  }, [adminLoading, isAdmin]);

  if (adminLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <Shield className="mb-4 h-16 w-16 text-destructive" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="mt-2 text-muted-foreground">You don't have admin privileges to access this page.</p>
          <Button className="mt-6" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </Layout>
    );
  }

  const departmentIcon = (dept: string) => {
    if (dept === "electricity") return <Zap className="h-4 w-4 text-electricity" />;
    if (dept === "gas") return <Flame className="h-4 w-4 text-gas" />;
    return <Building2 className="h-4 w-4 text-municipal" />;
  };

  const statusBadge = (status: string) => {
    if (status === "resolved" || status === "completed")
      return <Badge variant="outline" className="gap-1 text-success"><CheckCircle2 className="h-3 w-3" />{status}</Badge>;
    if (status === "in-progress" || status === "active")
      return <Badge className="gap-1"><Clock className="h-3 w-3" />{status}</Badge>;
    return <Badge variant="secondary" className="gap-1"><AlertCircle className="h-3 w-3" />{status}</Badge>;
  };

  const updateComplaintStatus = async (id: string, newStatus: "submitted" | "in-progress" | "resolved") => {
    await supabase.from("complaints").update({ status: newStatus }).eq("id", id);
    fetchDashboardData();
  };

  const filteredComplaints =
    statusFilter === "all" ? complaints : complaints.filter((c) => c.status === statusFilter);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-background py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-primary/20 p-4">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-heading text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Kiosk monitoring & service management</p>
              </div>
            </div>
            <Button variant="outline" onClick={fetchDashboardData} disabled={loading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container -mt-4 px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Complaints", value: stats.totalComplaints, icon: FileText, color: "text-info" },
            { label: "Active", value: stats.activeComplaints, icon: Clock, color: "text-warning" },
            { label: "Resolved", value: stats.resolvedComplaints, icon: CheckCircle2, color: "text-success" },
            { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, icon: CreditCard, color: "text-primary" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="shadow-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Tabs */}
      <section className="container px-4 py-8 md:px-6">
        <Tabs defaultValue="complaints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="complaints" className="gap-2">
              <FileText className="h-4 w-4" />
              Complaints
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-2">
              <Activity className="h-4 w-4" />
              Kiosk Sessions
            </TabsTrigger>
          </TabsList>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-4">
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">{filteredComplaints.length} complaints</span>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Dept</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.id.slice(0, 8)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{c.issue_type}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{c.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{departmentIcon(c.department)}</TableCell>
                      <TableCell>{statusBadge(c.status)}</TableCell>
                      <TableCell className="text-xs">{new Date(c.created_at).toLocaleDateString("en-IN")}</TableCell>
                      <TableCell>
                        <Select
                          value={c.status}
                          onValueChange={(val: "submitted" | "in-progress" | "resolved") => updateComplaintStatus(c.id, val)}
                        >
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="submitted">Submitted</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredComplaints.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        No complaints found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Dept</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.receipt_number}</TableCell>
                      <TableCell className="font-bold">₹{p.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>{departmentIcon(p.department)}</TableCell>
                      <TableCell className="text-xs uppercase">{p.payment_method}</TableCell>
                      <TableCell>{statusBadge(p.status)}</TableCell>
                      <TableCell className="text-xs">{new Date(p.created_at).toLocaleDateString("en-IN")}</TableCell>
                    </TableRow>
                  ))}
                  {payments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        No payments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Kiosk Sessions ({sessions.length})
                </CardTitle>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kiosk ID</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Ended</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono">{s.kiosk_id}</TableCell>
                      <TableCell className="text-xs">
                        {new Date(s.started_at).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs">
                        {s.ended_at ? new Date(s.ended_at).toLocaleString("en-IN") : "—"}
                      </TableCell>
                      <TableCell>{s.actions_count}</TableCell>
                      <TableCell>{statusBadge(s.status)}</TableCell>
                    </TableRow>
                  ))}
                  {sessions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                        No kiosk sessions recorded yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
