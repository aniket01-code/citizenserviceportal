import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquarePlus, CheckCircle2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useComplaints } from "@/hooks/useComplaints";
import type { Database } from "@/integrations/supabase/types";

type DepartmentType = Database["public"]["Enums"]["department_type"];

interface ComplaintFormProps {
  department: DepartmentType;
  issueTypes: string[];
}

export function ComplaintForm({ department, issueTypes }: ComplaintFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createComplaint } = useComplaints(department);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
  });

  const buttonColors = {
    electricity: "bg-electricity hover:bg-electricity/90",
    gas: "bg-gas hover:bg-gas/90",
    municipal: "bg-municipal hover:bg-municipal/90",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to file a complaint");
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const complaint = await createComplaint({
        department,
        issue_type: formData.issueType,
        description: formData.description,
      });
      
      setIsSubmitted(true);
      toast.success(`Complaint registered successfully! ID: ${complaint.id.slice(0, 8).toUpperCase()}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <LogIn className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-card-foreground">
            Login Required
          </h3>
          <p className="mt-2 text-muted-foreground">
            Please login to file and track your complaints
          </p>
          <Button
            className="mt-6"
            onClick={() => navigate("/auth")}
          >
            Sign In / Sign Up
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="border-2 border-success/30 bg-success-light">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="mb-4 h-16 w-16 text-success" />
          <h3 className="text-xl font-semibold text-card-foreground">
            Complaint Submitted Successfully!
          </h3>
          <p className="mt-2 text-muted-foreground">
            Your complaint has been registered. You will receive updates via SMS.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ issueType: "", description: "" });
            }}
          >
            File Another Complaint
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          File a Complaint
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="issueType">Issue Type</Label>
            <Select
              value={formData.issueType}
              onValueChange={(value) =>
                setFormData({ ...formData, issueType: value })
              }
              required
            >
              <SelectTrigger id="issueType" className="touch-target">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your issue in detail..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className={`w-full touch-target text-white ${buttonColors[department]}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
