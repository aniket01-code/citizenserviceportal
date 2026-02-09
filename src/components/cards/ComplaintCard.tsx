 import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 
 type ComplaintStatus = "submitted" | "in-progress" | "resolved";
 
 interface ComplaintCardProps {
   id: string;
   title: string;
   description: string;
   date: string;
   status: ComplaintStatus;
 }
 
 export function ComplaintCard({
   id,
   title,
   description,
   date,
   status,
 }: ComplaintCardProps) {
   const statusConfig = {
     submitted: {
       label: "Submitted",
       className: "status-submitted",
       icon: AlertCircle,
     },
     "in-progress": {
       label: "In Progress",
       className: "status-in-progress",
       icon: Clock,
     },
     resolved: {
       label: "Resolved",
       className: "status-resolved",
       icon: CheckCircle2,
     },
   };
 
   const config = statusConfig[status];
   const StatusIcon = config.icon;
 
   return (
     <Card className="overflow-hidden">
       <CardContent className="p-4">
         <div className="flex items-start justify-between gap-4">
           <div className="flex-1">
             <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-muted-foreground">
                 #{id}
               </span>
               <span className={`status-badge ${config.className}`}>
                 <StatusIcon className="h-3 w-3" />
                 {config.label}
               </span>
             </div>
             <h4 className="mt-2 font-medium text-card-foreground">{title}</h4>
             <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
               {description}
             </p>
           </div>
         </div>
         <div className="mt-3 flex items-center justify-between border-t pt-3">
           <span className="text-xs text-muted-foreground">Filed on: {date}</span>
           <button className="text-sm font-medium text-primary hover:underline">
             View Details
           </button>
         </div>
       </CardContent>
     </Card>
   );
 }