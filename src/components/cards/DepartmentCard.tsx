 import { LucideIcon } from "lucide-react";
 import { Link } from "react-router-dom";
 
 interface DepartmentCardProps {
   title: string;
   description: string;
   icon: LucideIcon;
   href: string;
   variant: "electricity" | "gas" | "municipal";
   stats?: { label: string; value: string }[];
 }
 
 export function DepartmentCard({
   title,
   description,
   icon: Icon,
   href,
   variant,
   stats,
 }: DepartmentCardProps) {
   const variantClasses = {
     electricity: "dept-card-electricity",
     gas: "dept-card-gas",
     municipal: "dept-card-municipal",
   };
 
   const iconBgClasses = {
     electricity: "bg-electricity/20 text-electricity",
     gas: "bg-gas/20 text-gas",
     municipal: "bg-municipal/20 text-municipal",
   };
 
   return (
     <Link to={href} className={`dept-card ${variantClasses[variant]} block`}>
       <div className="flex items-start gap-4">
         <div className={`rounded-xl p-3 ${iconBgClasses[variant]}`}>
           <Icon className="h-8 w-8" />
         </div>
         <div className="flex-1">
           <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
           <p className="mt-1 text-sm text-muted-foreground">{description}</p>
         </div>
       </div>
 
       {stats && stats.length > 0 && (
         <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
           {stats.map((stat, index) => (
             <div key={index}>
               <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                 {stat.label}
               </p>
               <p className="mt-1 text-lg font-semibold text-card-foreground">
                 {stat.value}
               </p>
             </div>
           ))}
         </div>
       )}
 
       <div className="mt-4 flex items-center text-sm font-medium text-primary">
         View Details →
       </div>
     </Link>
   );
 }