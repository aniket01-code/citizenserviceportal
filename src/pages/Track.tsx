import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Search, FileText, CreditCard, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ComplaintResult {
  id: string;
  issue_type: string;
  description: string;
  department: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PaymentResult {
  id: string;
  receipt_number: string;
  amount: number;
  department: string;
  status: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
}

export default function Track() {
  const { user } = useAuth();
  const [complaintQuery, setComplaintQuery] = useState("");
  const [paymentQuery, setPaymentQuery] = useState("");
  const [complaintResults, setComplaintResults] = useState<ComplaintResult[]>([]);
  const [paymentResults, setPaymentResults] = useState<PaymentResult[]>([]);
  const [searchingComplaints, setSearchingComplaints] = useState(false);
  const [searchingPayments, setSearchingPayments] = useState(false);

  const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckCircle2 }> = {
    submitted: { label: "Submitted", variant: "secondary", icon: AlertCircle },
    "in-progress": { label: "In Progress", variant: "default", icon: Clock },
    resolved: { label: "Resolved", variant: "outline", icon: CheckCircle2 },
    pending: { label: "Pending", variant: "secondary", icon: Clock },
    completed: { label: "Completed", variant: "outline", icon: CheckCircle2 },
  };

  const searchComplaints = async () => {
    if (!user) return;
    setSearchingComplaints(true);
    const { data } = await supabase
      .from("complaints")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setComplaintResults((data as ComplaintResult[]) || []);
    setSearchingComplaints(false);
  };

  const searchPayments = async () => {
    if (!user) return;
    setSearchingPayments(true);
    const { data } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setPaymentResults((data as PaymentResult[]) || []);
    setSearchingPayments(false);
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-background py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-primary/20 p-4">
              <Search className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-heading text-foreground">Track Status</h1>
              <p className="mt-1 text-muted-foreground">
                Track your complaints and payment history
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-8 md:px-6">
        {!user ? (
          <Card className="border-2 border-muted">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Login Required</h3>
              <p className="mt-2 text-muted-foreground">Please login to track your complaints and payments</p>
              <Button className="mt-6" onClick={() => window.location.href = "/auth"}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="complaints" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto">
              <TabsTrigger value="complaints" className="touch-target gap-2">
                <FileText className="h-4 w-4" />
                Complaints
              </TabsTrigger>
              <TabsTrigger value="payments" className="touch-target gap-2">
                <CreditCard className="h-4 w-4" />
                Payments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="complaints" className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Search by complaint ID or keyword..."
                  value={complaintQuery}
                  onChange={(e) => setComplaintQuery(e.target.value)}
                  className="touch-target"
                />
                <Button onClick={searchComplaints} disabled={searchingComplaints} className="touch-target gap-2">
                  {searchingComplaints ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Search
                </Button>
              </div>

              <div className="space-y-4">
                {complaintResults
                  .filter((c) =>
                    complaintQuery
                      ? c.id.toLowerCase().includes(complaintQuery.toLowerCase()) ||
                        c.issue_type.toLowerCase().includes(complaintQuery.toLowerCase())
                      : true
                  )
                  .map((complaint) => {
                    const config = statusConfig[complaint.status] || statusConfig.submitted;
                    const StatusIcon = config.icon;
                    return (
                      <Card key={complaint.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-mono text-muted-foreground">
                                #{complaint.id.slice(0, 8).toUpperCase()}
                              </p>
                              <h4 className="mt-1 font-semibold">{complaint.issue_type}</h4>
                              <p className="mt-1 text-sm text-muted-foreground">{complaint.description}</p>
                            </div>
                            <Badge variant={config.variant} className="gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {config.label}
                            </Badge>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Department: {complaint.department}</span>
                            <span>Filed: {new Date(complaint.created_at).toLocaleDateString("en-IN")}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                {complaintResults.length === 0 && !searchingComplaints && (
                  <div className="py-12 text-center text-muted-foreground">
                    <FileText className="mx-auto mb-4 h-12 w-12" />
                    <p>Click Search to load your complaints</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Search by receipt number or transaction ID..."
                  value={paymentQuery}
                  onChange={(e) => setPaymentQuery(e.target.value)}
                  className="touch-target"
                />
                <Button onClick={searchPayments} disabled={searchingPayments} className="touch-target gap-2">
                  {searchingPayments ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Search
                </Button>
              </div>

              <div className="space-y-4">
                {paymentResults
                  .filter((p) =>
                    paymentQuery
                      ? p.receipt_number.toLowerCase().includes(paymentQuery.toLowerCase()) ||
                        p.transaction_id.toLowerCase().includes(paymentQuery.toLowerCase())
                      : true
                  )
                  .map((payment) => {
                    const config = statusConfig[payment.status] || statusConfig.pending;
                    const StatusIcon = config.icon;
                    return (
                      <Card key={payment.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-mono text-muted-foreground">
                                {payment.receipt_number}
                              </p>
                              <h4 className="mt-1 text-xl font-bold">₹{payment.amount.toLocaleString("en-IN")}</h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                TXN: {payment.transaction_id}
                              </p>
                            </div>
                            <Badge variant={config.variant} className="gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {config.label}
                            </Badge>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Dept: {payment.department} • {payment.payment_method.toUpperCase()}</span>
                            <span>{new Date(payment.created_at).toLocaleDateString("en-IN")}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                {paymentResults.length === 0 && !searchingPayments && (
                  <div className="py-12 text-center text-muted-foreground">
                    <CreditCard className="mx-auto mb-4 h-12 w-12" />
                    <p>Click Search to load your payment history</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </section>
    </Layout>
  );
}
