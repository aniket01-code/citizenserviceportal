import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes inactivity

export function useKioskSession() {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(SESSION_TIMEOUT);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const lastActivityRef = useRef(Date.now());

  const startSession = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("kiosk_sessions")
      .insert({ user_id: user.id, status: "active" })
      .select("id")
      .single();
    if (data) {
      setSessionId(data.id);
      setIsActive(true);
      lastActivityRef.current = Date.now();
    }
  }, [user]);

  const endSession = useCallback(async () => {
    if (sessionId) {
      await supabase
        .from("kiosk_sessions")
        .update({ ended_at: new Date().toISOString(), status: "completed" })
        .eq("id", sessionId);
    }
    setSessionId(null);
    setIsActive(false);
  }, [sessionId]);

  const logActivity = useCallback(
    async (actionType: string, department?: string, details?: Record<string, string | number | boolean>) => {
      if (!user) return;
      lastActivityRef.current = Date.now();
      setTimeLeft(SESSION_TIMEOUT);
      await supabase.from("kiosk_activity_logs").insert([{
        session_id: sessionId,
        user_id: user.id,
        action_type: actionType,
        department,
        details: details || {},
      }]);
    },
    [user, sessionId]
  );

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    setTimeLeft(SESSION_TIMEOUT);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const events = ["mousedown", "touchstart", "keydown", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      const remaining = Math.max(0, SESSION_TIMEOUT - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        endSession();
      }
    }, 1000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, resetTimer, endSession]);

  return {
    sessionId,
    isActive,
    timeLeft,
    startSession,
    endSession,
    logActivity,
    resetTimer,
  };
}
