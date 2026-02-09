import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Bill {
  id: string;
  department: 'electricity' | 'gas' | 'municipal';
  bill_number: string;
  amount: number;
  due_date: string;
  billing_period_start: string;
  billing_period_end: string;
  status: 'unpaid' | 'paid' | 'overdue';
  created_at: string;
}

export interface Payment {
  id: string;
  bill_id: string | null;
  department: 'electricity' | 'gas' | 'municipal';
  amount: number;
  payment_method: 'upi' | 'card' | 'netbanking' | 'cash';
  transaction_id: string;
  upi_reference: string | null;
  status: 'pending' | 'completed' | 'failed';
  receipt_number: string;
  created_at: string;
}

export function useBills(department?: 'electricity' | 'gas' | 'municipal') {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBills();
      fetchPayments();
    } else {
      setBills([]);
      setPayments([]);
      setLoading(false);
    }
  }, [user, department]);

  const fetchBills = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('bills')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (department) {
        query = query.eq('department', department);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBills(data as Bill[] || []);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (department) {
        query = query.eq('department', department);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPayments(data as Payment[] || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const createPayment = async (
    billId: string | null,
    dept: 'electricity' | 'gas' | 'municipal',
    amount: number,
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cash',
    upiReference?: string
  ) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please login to make a payment',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const transactionId = `TXN${Date.now()}`;
      const receiptNumber = `RCP${Date.now().toString(36).toUpperCase()}`;

      const { data, error } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          bill_id: billId,
          department: dept,
          amount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          upi_reference: upiReference || null,
          status: 'completed',
          receipt_number: receiptNumber,
        })
        .select()
        .single();

      if (error) throw error;

      // Update bill status if there's a bill
      if (billId) {
        await supabase
          .from('bills')
          .update({ status: 'paid' })
          .eq('id', billId);
      }

      toast({
        title: 'Payment Successful!',
        description: `Transaction ID: ${transactionId}`,
      });

      await fetchBills();
      await fetchPayments();

      return data as Payment;
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: 'Payment Failed',
        description: 'Please try again',
        variant: 'destructive',
      });
      return null;
    }
  };

  return {
    bills,
    payments,
    loading,
    createPayment,
    refreshBills: fetchBills,
    refreshPayments: fetchPayments,
  };
}
