 import { AlertTriangle, Info, Bell } from "lucide-react";
 
 type NoticeType = "urgent" | "warning" | "info";
 
 interface NoticeCardProps {
   title: string;
   description: string;
   date: string;
   type: NoticeType;
 }
 
 export function NoticeCard({ title, description, date, type }: NoticeCardProps) {
   const icons = {
     urgent: AlertTriangle,
     warning: Bell,
     info: Info,
   };
 
   const Icon = icons[type];
 
   const typeClasses = {
     urgent: "notice-urgent",
     warning: "notice-warning",
     info: "notice-info",
   };
 
   const iconClasses = {
     urgent: "text-destructive",
     warning: "text-warning",
     info: "text-info",
   };
 
   return (
     <div className={`notice-card ${typeClasses[type]}`}>
       <div className={`shrink-0 ${iconClasses[type]}`}>
         <Icon className="h-5 w-5" />
       </div>
       <div className="flex-1">
         <div className="flex items-start justify-between gap-4">
           <h4 className="font-medium text-card-foreground">{title}</h4>
           <time className="shrink-0 text-xs text-muted-foreground">{date}</time>
         </div>
         <p className="mt-1 text-sm text-muted-foreground">{description}</p>
       </div>
     </div>
   );
 }