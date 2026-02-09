 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { CreditCard, Calendar, Clock } from "lucide-react";
 
 interface BalanceCardProps {
   balance: string;
   validUntil: string;
   lastRecharge?: {
     amount: string;
     date: string;
   };
   onRecharge?: () => void;
   variant: "electricity" | "gas" | "municipal";
 }
 
 export function BalanceCard({
   balance,
   validUntil,
   lastRecharge,
   onRecharge,
   variant,
 }: BalanceCardProps) {
   const variantClasses = {
     electricity: "from-electricity/20 to-electricity/5 border-electricity/30",
     gas: "from-gas/20 to-gas/5 border-gas/30",
     municipal: "from-municipal/20 to-municipal/5 border-municipal/30",
   };
 
   const buttonVariant = {
     electricity: "bg-electricity text-white hover:bg-electricity/90",
     gas: "bg-gas text-white hover:bg-gas/90",
     municipal: "bg-municipal text-white hover:bg-municipal/90",
   };
 
   return (
     <Card className={`overflow-hidden border-2 bg-gradient-to-br ${variantClasses[variant]}`}>
       <CardHeader className="pb-2">
         <CardTitle className="flex items-center gap-2 text-lg">
           <CreditCard className="h-5 w-5" />
           Current Balance
         </CardTitle>
       </CardHeader>
       <CardContent>
         <div className="mb-4">
           <p className="text-3xl font-bold text-card-foreground">{balance}</p>
           <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
             <Calendar className="h-4 w-4" />
             <span>Valid until: {validUntil}</span>
           </div>
         </div>
 
         {lastRecharge && (
           <div className="mb-4 rounded-lg bg-background/50 p-3">
             <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
               Last Recharge
             </p>
             <div className="mt-1 flex items-center justify-between">
               <span className="font-semibold text-card-foreground">
                 {lastRecharge.amount}
               </span>
               <span className="flex items-center gap-1 text-xs text-muted-foreground">
                 <Clock className="h-3 w-3" />
                 {lastRecharge.date}
               </span>
             </div>
           </div>
         )}
 
         <Button
           onClick={onRecharge}
           className={`w-full touch-target ${buttonVariant[variant]}`}
         >
           Recharge Now
         </Button>
       </CardContent>
     </Card>
   );
 }