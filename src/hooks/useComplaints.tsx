import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Database } from "@/integrations/supabase/types";

type Complaint = Database["public"]["Tables"]["complaints"]["Row"];
type DepartmentType = Database["public"]["Enums"]["department_type"];
type ComplaintStatus = Database["public"]["Enums"]["complaint_status"];

interface CreateComplaintData {
  department: DepartmentType;
  issue_type: string;
  description: string;
}

export function useComplaints(department?: DepartmentType) {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = async () => {
    if (!user) {
      setComplaints([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (department) {
        query = query.eq("department", department);
      }

      const { data, error } = await query;

      if (error) throw error;
      setComplaints(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [user, department]);

  const createComplaint = async (data: CreateComplaintData) => {
    if (!user) throw new Error("Must be logged in to create complaint");

    const { data: newComplaint, error } = await supabase
      .from("complaints")
      .insert({
        user_id: user.id,
        department: data.department,
        issue_type: data.issue_type,
        description: data.description,
        status: "submitted" as ComplaintStatus,
      })
      .select()
      .single();

    if (error) throw error;
    
    // Refresh the list
    await fetchComplaints();
    
    return newComplaint;
  };

  return {
    complaints,
    loading,
    error,
    createComplaint,
    refetch: fetchComplaints,
  };
}
