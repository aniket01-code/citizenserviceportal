-- Create bills table for tracking utility bills
CREATE TABLE public.bills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    department department_type NOT NULL,
    bill_number TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'overdue')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table for tracking transactions
CREATE TABLE public.payments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    bill_id UUID REFERENCES public.bills(id) ON DELETE SET NULL,
    department department_type NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'card', 'netbanking', 'cash')),
    transaction_id TEXT NOT NULL,
    upi_reference TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    receipt_number TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table for citizen uploads
CREATE TABLE public.documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    department department_type,
    complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('id_proof', 'address_proof', 'meter_photo', 'bill_copy', 'other')),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Bills RLS policies
CREATE POLICY "Users can view their own bills"
ON public.bills FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own bills"
ON public.bills FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Payments RLS policies
CREATE POLICY "Users can view their own payments"
ON public.payments FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own payments"
ON public.payments FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Documents RLS policies
CREATE POLICY "Users can view their own documents"
ON public.documents FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can upload their own documents"
ON public.documents FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own documents"
ON public.documents FOR DELETE
USING (user_id = auth.uid());

-- Add updated_at triggers
CREATE TRIGGER update_bills_updated_at
BEFORE UPDATE ON public.bills
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for citizen documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'citizen-documents', 
    'citizen-documents', 
    false,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- Storage policies for citizen documents
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'citizen-documents' AND auth.uid()::text = (storage.foldername(name))[1]);