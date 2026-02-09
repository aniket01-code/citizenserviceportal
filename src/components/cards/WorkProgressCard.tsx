 import { Card, CardContent } from "@/components/ui/card";
 import { Progress } from "@/components/ui/progress";
 import { MapPin, Calendar, Wrench } from "lucide-react";
 
 interface WorkProgressCardProps {
   title: string;
   area: string;
   startDate: string;
   expectedCompletion: string;
   progress: number;
   status: string;
 }
 
 export function WorkProgressCard({
   title,
   area,
   startDate,
   expectedCompletion,
   progress,
   status,
 }: WorkProgressCardProps) {
   return (
     <Card className="overflow-hidden border-l-4 border-l-municipal">
       <CardContent className="p-4">
         <div className="flex items-start gap-3">
           <div className="rounded-lg bg-municipal/10 p-2">
             <Wrench className="h-5 w-5 text-municipal" />
           </div>
           <div className="flex-1">
             <h4 className="font-semibold text-card-foreground">{title}</h4>
             <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
               <MapPin className="h-3 w-3" />
               {area}
             </div>
           </div>
           <span className="rounded-full bg-municipal/10 px-2.5 py-1 text-xs font-medium text-municipal">
             {status}
           </span>
         </div>
 
         <div className="mt-4">
           <div className="mb-2 flex items-center justify-between text-sm">
             <span className="text-muted-foreground">Progress</span>
             <span className="font-medium text-card-foreground">{progress}%</span>
           </div>
           <Progress value={progress} className="h-2" />
         </div>
 
         <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
           <div className="flex items-center gap-2 text-muted-foreground">
             <Calendar className="h-4 w-4" />
             <div>
               <p className="text-xs uppercase">Started</p>
               <p className="font-medium text-card-foreground">{startDate}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 text-muted-foreground">
             <Calendar className="h-4 w-4" />
             <div>
               <p className="text-xs uppercase">Expected</p>
               <p className="font-medium text-card-foreground">{expectedCompletion}</p>
             </div>
           </div>
         </div>
       </CardContent>
     </Card>
   );
 }