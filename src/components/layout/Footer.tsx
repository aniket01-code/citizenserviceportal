 import { Phone, Mail, MapPin } from "lucide-react";
 
 export function Footer() {
   return (
     <footer className="border-t bg-primary text-primary-foreground">
       <div className="container px-4 py-8 md:px-6">
         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
           {/* About */}
           <div>
             <h3 className="mb-4 text-lg font-semibold">Nagrik Seva</h3>
             <p className="text-sm text-primary-foreground/80">
               A unified platform for accessing essential public services. Making government services simple and accessible for every citizen.
             </p>
           </div>
 
           {/* Quick Links */}
           <div>
             <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
             <ul className="space-y-2 text-sm text-primary-foreground/80">
               <li><a href="/electricity" className="hover:text-primary-foreground">Electricity Services</a></li>
               <li><a href="/gas" className="hover:text-primary-foreground">Gas Services</a></li>
               <li><a href="/municipal" className="hover:text-primary-foreground">Municipal Services</a></li>
               <li><a href="/emergency" className="hover:text-primary-foreground">Emergency Contacts</a></li>
             </ul>
           </div>
 
           {/* Contact */}
           <div>
             <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
             <ul className="space-y-3 text-sm text-primary-foreground/80">
               <li className="flex items-center gap-2">
                 <Phone className="h-4 w-4" />
                 <span>1800-123-4567 (Toll Free)</span>
               </li>
               <li className="flex items-center gap-2">
                 <Mail className="h-4 w-4" />
                 <span>support@nagrikseva.gov.in</span>
               </li>
               <li className="flex items-start gap-2">
                 <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                 <span>Public Services Building, Sector 17, New Delhi - 110001</span>
               </li>
             </ul>
           </div>
 
           {/* Helpline */}
           <div>
             <h3 className="mb-4 text-lg font-semibold">24/7 Helplines</h3>
             <ul className="space-y-2 text-sm text-primary-foreground/80">
               <li>🔌 Electricity: 1912</li>
               <li>🔥 Gas Emergency: 1906</li>
               <li>🏛 Municipal: 1800-111-555</li>
               <li>🚨 Emergency: 112</li>
             </ul>
           </div>
         </div>
 
         <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
           <p>© 2024 Nagrik Seva Portal. All rights reserved. | Government of India Initiative</p>
         </div>
       </div>
     </footer>
   );
 }