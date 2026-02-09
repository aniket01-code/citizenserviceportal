import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PersonnelCard } from "@/components/cards/PersonnelCard";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { NoticeCard } from "@/components/cards/NoticeCard";
import { ComplaintForm } from "@/components/forms/ComplaintForm";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";
import { UPIPayment } from "@/components/payments/UPIPayment";
import { DocumentUpload } from "@/components/documents/DocumentUpload";
import { PaymentReceipt } from "@/components/receipts/PaymentReceipt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Flame, Users, CreditCard, Bell, MessageSquare, IndianRupee, FileUp } from "lucide-react";

const personnelData = [
  { name: "Suresh Patel", role: "Area Manager", phone: "9876543220", area: "Zone A" },
  { name: "Neha Gupta", role: "Gas Safety Officer", phone: "9876543221", area: "Zone A-B" },
  { name: "Vikram Rao", role: "Delivery Coordinator", phone: "9876543222", area: "All Zones" },
];

const notices = [
  { title: "Cylinder Delivery Delay", description: "Due to festival rush, delivery may be delayed by 2-3 days in Zone A. We apologize for inconvenience.", date: "Feb 7, 2024", type: "warning" as const },
  { title: "Safety Inspection Drive", description: "Free gas connection safety check in Sector 15-20 on Feb 15. Book your slot now!", date: "Feb 5, 2024", type: "info" as const },
  { title: "Gas Leak Alert - Zone B", description: "Temporary gas supply cut in Zone B Block 3. Repair work ongoing.", date: "Feb 4, 2024", type: "urgent" as const },
];

const issueTypes = [
  "Cylinder Delivery Delay",
  "Gas Leak",
  "Defective Equipment",
  "Booking Issue",
  "Refund Request",
  "New Connection",
  "Transfer Connection",
  "Other",
];

export default function Gas() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    transactionId: string;
    receiptNumber: string;
  } | null>(null);

  const handlePaymentComplete = (transactionId: string) => {
    setPaymentData({
      transactionId,
      receiptNumber: `RCP${Date.now().toString(36).toUpperCase()}`,
    });
    setShowReceipt(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gas/20 via-gas/10 to-background py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gas/20 p-4">
              <Flame className="h-12 w-12 text-gas" />
            </div>
            <div>
              <h1 className="text-heading text-foreground">{t.departments.gas.title}</h1>
              <p className="mt-1 text-muted-foreground">
                {t.departments.gas.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-8 md:px-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:grid-cols-6">
            <TabsTrigger value="overview" className="touch-target gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="touch-target gap-2">
              <IndianRupee className="h-4 w-4" />
              <span className="hidden sm:inline">{t.payments.billPayment}</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="touch-target gap-2">
              <FileUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t.documents.upload}</span>
            </TabsTrigger>
            <TabsTrigger value="personnel" className="touch-target gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Personnel</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="touch-target gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t.complaints.title}</span>
            </TabsTrigger>
            <TabsTrigger value="notices" className="touch-target gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notices</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <BalanceCard
                balance="2 Cylinders"
                validUntil="Next Booking: Feb 20"
                lastRecharge={{ amount: "₹1,103.00", date: "Jan 15, 2024" }}
                variant="gas"
              />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Notices</h3>
                {notices.slice(0, 2).map((notice, index) => (
                  <NoticeCard key={index} {...notice} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">{t.payments.scanQR}</h3>
                <UPIPayment
                  amount={1103}
                  billNumber="GAS2024020801"
                  department="gas"
                  consumerName={user?.user_metadata?.full_name || "Citizen"}
                  consumerNumber="GAS-ZA-00789"
                  dueDate="February 20, 2024"
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
              
              {showReceipt && paymentData && (
                <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
                  <DialogContent className="max-w-md p-0">
                    <PaymentReceipt
                      receiptNumber={paymentData.receiptNumber}
                      transactionId={paymentData.transactionId}
                      department="gas"
                      consumerName={user?.user_metadata?.full_name || "Citizen"}
                      consumerNumber="GAS-ZA-00789"
                      billNumber="GAS2024020801"
                      amount={1103}
                      paymentMethod="upi"
                      paymentDate={new Date()}
                      billingPeriod="LPG Cylinder Refill"
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <DocumentUpload department="gas" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Required Documents</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gas" />
                    {t.documents.idProof} - Aadhaar, PAN, Voter ID
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gas" />
                    {t.documents.addressProof} - Utility bill, Rent agreement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gas" />
                    KYC Form - For new connections
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gas" />
                    Safety Certificate - For industrial connections
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personnel" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Appointed Personnel</h3>
              <p className="text-sm text-muted-foreground">
                Contact your area officers for assistance
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {personnelData.map((person, index) => (
                <PersonnelCard key={index} {...person} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="complaints" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{t.complaints.yourComplaints}</h3>
                <ComplaintsList department="gas" />
              </div>
              <ComplaintForm department="gas" issueTypes={issueTypes} />
            </div>
          </TabsContent>

          <TabsContent value="notices" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Notices & Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with delivery schedules, safety alerts, and announcements
              </p>
            </div>
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <NoticeCard key={index} {...notice} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
