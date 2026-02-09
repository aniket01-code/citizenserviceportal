 import { Layout } from "@/components/layout/Layout";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import {
   Phone,
   Ambulance,
   Shield,
   Flame,
   Zap,
   Droplets,
   Building2,
   AlertTriangle,
 } from "lucide-react";
 
 const emergencyContacts = [
   { name: "Emergency (All)", number: "112", icon: AlertTriangle, color: "bg-destructive text-white" },
   { name: "Ambulance", number: "102", icon: Ambulance, color: "bg-destructive/90 text-white" },
   { name: "Police", number: "100", icon: Shield, color: "bg-primary text-primary-foreground" },
   { name: "Fire", number: "101", icon: Flame, color: "bg-gas text-white" },
 ];
 
 const serviceContacts = [
   { name: "Electricity Helpline", number: "1912", icon: Zap, description: "Power outages, electrical emergencies" },
   { name: "Gas Emergency", number: "1906", icon: Flame, description: "Gas leaks, cylinder emergencies" },
   { name: "Water Supply", number: "1916", icon: Droplets, description: "Water pipeline bursts, supply issues" },
   { name: "Municipal Helpline", number: "1800-111-555", icon: Building2, description: "Civic issues, garbage, roads" },
 ];
 
 const safetyTips = [
   { title: "Gas Leak", tips: ["Turn off gas regulator immediately", "Open all windows and doors", "Do not use electrical switches", "Leave the area and call 1906"] },
   { title: "Electrical Fire", tips: ["Turn off main power switch if safe", "Do not use water on electrical fires", "Use fire extinguisher if available", "Call 101 immediately"] },
   { title: "Water Logging", tips: ["Stay away from electric poles", "Do not walk through flowing water", "Move to higher ground", "Call municipal helpline"] },
 ];
 
 export default function Emergency() {
   return (
     <Layout>
       {/* Hero Section */}
       <section className="bg-gradient-to-br from-destructive/20 via-destructive/10 to-background py-12">
         <div className="container px-4 md:px-6">
           <div className="flex items-center gap-4">
             <div className="animate-pulse-soft rounded-2xl bg-destructive/20 p-4">
               <Phone className="h-12 w-12 text-destructive" />
             </div>
             <div>
               <h1 className="text-heading text-foreground">Emergency Contacts</h1>
               <p className="mt-1 text-muted-foreground">
                 Quick access to all emergency helplines and safety information
               </p>
             </div>
           </div>
         </div>
       </section>
 
       {/* Emergency Numbers */}
       <section className="container px-4 py-8 md:px-6">
         <h2 className="mb-6 text-xl font-semibold text-foreground">
           🚨 Emergency Numbers (Call Immediately)
         </h2>
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
           {emergencyContacts.map((contact) => {
             const Icon = contact.icon;
             return (
               <Card key={contact.number} className={`overflow-hidden ${contact.color}`}>
                 <CardContent className="p-6 text-center">
                   <Icon className="mx-auto mb-3 h-10 w-10" />
                   <h3 className="text-lg font-semibold">{contact.name}</h3>
                   <p className="mt-2 text-3xl font-bold">{contact.number}</p>
                   <Button
                     asChild
                     variant="secondary"
                     className="mt-4 w-full touch-target"
                   >
                     <a href={`tel:${contact.number}`}>
                       <Phone className="mr-2 h-4 w-4" />
                       Call Now
                     </a>
                   </Button>
                 </CardContent>
               </Card>
             );
           })}
         </div>
       </section>
 
       {/* Service Helplines */}
       <section className="container px-4 py-8 md:px-6">
         <h2 className="mb-6 text-xl font-semibold text-foreground">
           📞 Service Helplines
         </h2>
         <div className="grid gap-4 sm:grid-cols-2">
           {serviceContacts.map((contact) => {
             const Icon = contact.icon;
             return (
               <Card key={contact.number} className="overflow-hidden">
                 <CardContent className="flex items-center gap-4 p-4">
                   <div className="rounded-xl bg-primary/10 p-3">
                     <Icon className="h-6 w-6 text-primary" />
                   </div>
                   <div className="flex-1">
                     <h3 className="font-semibold text-card-foreground">
                       {contact.name}
                     </h3>
                     <p className="text-sm text-muted-foreground">
                       {contact.description}
                     </p>
                   </div>
                   <Button asChild variant="outline" className="touch-target shrink-0">
                     <a href={`tel:${contact.number.replace(/-/g, "")}`}>
                       <Phone className="mr-2 h-4 w-4" />
                       {contact.number}
                     </a>
                   </Button>
                 </CardContent>
               </Card>
             );
           })}
         </div>
       </section>
 
       {/* Safety Tips */}
       <section className="container px-4 py-8 md:px-6">
         <h2 className="mb-6 text-xl font-semibold text-foreground">
           ⚠️ Emergency Safety Tips
         </h2>
         <div className="grid gap-4 sm:grid-cols-3">
           {safetyTips.map((section) => (
             <Card key={section.title}>
               <CardContent className="p-4">
                 <h3 className="mb-3 font-semibold text-card-foreground">
                   {section.title}
                 </h3>
                 <ul className="space-y-2">
                   {section.tips.map((tip, index) => (
                     <li
                       key={index}
                       className="flex items-start gap-2 text-sm text-muted-foreground"
                     >
                       <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                       {tip}
                     </li>
                   ))}
                 </ul>
               </CardContent>
             </Card>
           ))}
         </div>
       </section>
     </Layout>
   );
 }