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
import { WorkProgressCard } from "@/components/cards/WorkProgressCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Building2, Users, CreditCard, Bell, MessageSquare, Wrench, IndianRupee, FileUp } from "lucide-react";

const personnelData = [
  { name: "Dr. Anita Desai", role: "Municipal Commissioner", phone: "9876543230", area: "City Wide" },
  { name: "Karan Malhotra", role: "Ward Officer - Ward 5", phone: "9876543231", area: "Ward 5" },
  { name: "Sunita Verma", role: "Sanitation Supervisor", phone: "9876543232", area: "Ward 5-8" },
  { name: "Ramesh Yadav", role: "Water Supply Engineer", phone: "9876543233", area: "All Wards" },
];

const notices = [
  { title: "Water Supply Timing Change", description: "From Feb 10, water supply will be available 6 AM - 10 AM and 5 PM - 7 PM in Wards 3-8", date: "Feb 8, 2024", type: "warning" as const },
  { title: "Road Work - Main Street", description: "Main Street near City Center will be closed for resurfacing from Feb 12-20. Use alternative routes.", date: "Feb 7, 2024", type: "info" as const },
  { title: "Garbage Collection Drive", description: "Special waste collection drive on Feb 15. Keep segregated waste ready by 8 AM.", date: "Feb 5, 2024", type: "info" as const },
];

const ongoingWorks = [
  { title: "Main Road Resurfacing", area: "Sector 12-15, Main Street", startDate: "Jan 15, 2024", expectedCompletion: "Feb 28, 2024", progress: 65, status: "On Track" },
  { title: "Water Pipeline Replacement", area: "Ward 7, Block A-D", startDate: "Feb 1, 2024", expectedCompletion: "Mar 15, 2024", progress: 25, status: "On Track" },
  { title: "Community Park Development", area: "Sector 18, Central Park", startDate: "Dec 1, 2023", expectedCompletion: "Feb 20, 2024", progress: 85, status: "Ahead" },
  { title: "Drainage System Upgrade", area: "Ward 3-4", startDate: "Jan 20, 2024", expectedCompletion: "Mar 30, 2024", progress: 15, status: "Delayed" },
];

const issueTypes = [
  "Garbage Collection",
  "Water Supply",
  "Drainage/Sewage",
  "Road Repair",
  "Street Lights",
  "Parks & Gardens",
  "Property Tax",
  "Birth/Death Certificate",
  "Building Permission",
  "Other",
];

export default function Municipal() {
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
      <section className="bg-gradient-to-br from-municipal/20 via-municipal/10 to-background py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-municipal/20 p-4">
              <Building2 className="h-12 w-12 text-municipal" />
            </div>
            <div>
              <h1 className="text-heading text-foreground">{t.departments.municipal.title}</h1>
              <p className="mt-1 text-muted-foreground">
                {t.departments.municipal.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-8 md:px-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-2 sm:w-auto sm:grid-cols-7">
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
            <TabsTrigger value="works" className="touch-target gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Works</span>
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
                balance="₹12,500.00"
                validUntil="Due: March 31, 2024"
                lastRecharge={{ amount: "₹8,500.00", date: "Apr 1, 2023" }}
                variant="municipal"
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
                  amount={12500}
                  billNumber="MC2024PT0456"
                  department="municipal"
                  consumerName={user?.user_metadata?.full_name || "Citizen"}
                  consumerNumber="PT-W5-00123"
                  dueDate="March 31, 2024"
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
              
              {showReceipt && paymentData && (
                <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
                  <DialogContent className="max-w-md p-0">
                    <PaymentReceipt
                      receiptNumber={paymentData.receiptNumber}
                      transactionId={paymentData.transactionId}
                      department="municipal"
                      consumerName={user?.user_metadata?.full_name || "Citizen"}
                      consumerNumber="PT-W5-00123"
                      billNumber="MC2024PT0456"
                      amount={12500}
                      paymentMethod="upi"
                      paymentDate={new Date()}
                      billingPeriod="Property Tax FY 2024-25"
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <DocumentUpload department="municipal" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Required Documents</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-municipal" />
                    {t.documents.idProof} - Aadhaar, PAN, Voter ID
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-municipal" />
                    Property Documents - Sale deed, Registry
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-municipal" />
                    Previous Tax Receipts - For disputes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-municipal" />
                    Building Plan - For construction permissions
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="works" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Ongoing Development Works</h3>
              <p className="text-sm text-muted-foreground">
                Track progress of infrastructure projects in your area
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ongoingWorks.map((work, index) => (
                <WorkProgressCard key={index} {...work} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personnel" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Appointed Personnel</h3>
              <p className="text-sm text-muted-foreground">
                Contact your area officers for assistance
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {personnelData.map((person, index) => (
                <PersonnelCard key={index} {...person} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="complaints" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{t.complaints.yourComplaints}</h3>
                <ComplaintsList department="municipal" />
              </div>
              <ComplaintForm department="municipal" issueTypes={issueTypes} />
            </div>
          </TabsContent>

          <TabsContent value="notices" className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Notices & Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with civic announcements, schedules, and alerts
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
