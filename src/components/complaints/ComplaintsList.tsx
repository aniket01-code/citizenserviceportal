import { useNavigate } from "react-router-dom";
import { ComplaintCard } from "@/components/cards/ComplaintCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useComplaints } from "@/hooks/useComplaints";
import { LogIn, FileX } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type DepartmentType = Database["public"]["Enums"]["department_type"];

interface ComplaintsListProps {
  department: DepartmentType;
}

export function ComplaintsList({ department }: ComplaintsListProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { complaints, loading } = useComplaints(department);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <LogIn className="mb-4 h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">Login to view your complaints</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/auth")}>
          Sign In
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileX className="mb-4 h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground">No complaints filed yet</p>
        <p className="text-sm text-muted-foreground">
          Use the form to file your first complaint
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <ComplaintCard
          key={complaint.id}
          id={complaint.id.slice(0, 8).toUpperCase()}
          title={complaint.issue_type}
          description={complaint.description}
          date={new Date(complaint.created_at).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          status={complaint.status}
        />
      ))}
    </div>
  );
}
