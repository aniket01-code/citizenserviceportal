 import { Phone, MapPin, User } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 
 interface PersonnelCardProps {
   name: string;
   role: string;
   phone: string;
   area: string;
   image?: string;
 }
 
 export function PersonnelCard({ name, role, phone, area, image }: PersonnelCardProps) {
   return (
     <Card className="overflow-hidden transition-shadow hover:shadow-md">
       <CardContent className="p-4">
         <div className="flex items-start gap-4">
           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
             {image ? (
               <img
                 src={image}
                 alt={name}
                 className="h-14 w-14 rounded-full object-cover"
               />
             ) : (
               <User className="h-7 w-7 text-primary" />
             )}
           </div>
           <div className="flex-1">
             <h4 className="font-semibold text-card-foreground">{name}</h4>
             <p className="text-sm text-muted-foreground">{role}</p>
             <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
               <span className="flex items-center gap-1">
                 <MapPin className="h-3 w-3" />
                 {area}
               </span>
             </div>
           </div>
         </div>
         <div className="mt-4 flex gap-2">
           <Button
             variant="outline"
             size="sm"
             className="flex-1 touch-target"
             asChild
           >
             <a href={`tel:${phone}`}>
               <Phone className="mr-2 h-4 w-4" />
               {phone}
             </a>
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 }