import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, Clock, Copy, Download, Printer, Smartphone } from 'lucide-react';

interface UPIPaymentProps {
  amount: number;
  billNumber: string;
  department: 'electricity' | 'gas' | 'municipal';
  consumerName: string;
  consumerNumber: string;
  dueDate: string;
  onPaymentComplete?: (transactionId: string) => void;
}

export function UPIPayment({
  amount,
  billNumber,
  department,
  consumerName,
  consumerNumber,
  dueDate,
  onPaymentComplete,
}: UPIPaymentProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [transactionId, setTransactionId] = useState<string>('');

  // UPI payment string format
  const upiId = 'nagrikseva@upi';
  const merchantName = 'Nagrik Seva';
  const transactionNote = `${department.toUpperCase()} Bill - ${billNumber}`;
  
  const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: 'UPI ID Copied',
      description: upiId,
    });
  };

  // Simulate payment confirmation (in real implementation, this would poll a payment gateway)
  const simulatePaymentConfirmation = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      const txnId = `TXN${Date.now()}`;
      setTransactionId(txnId);
      setPaymentStatus('completed');
      onPaymentComplete?.(txnId);
      toast({
        title: t.payments.paymentSuccess,
        description: `${t.payments.transactionId}: ${txnId}`,
      });
    }, 3000);
  };

  const departmentColors = {
    electricity: 'bg-electricity/10 border-electricity',
    gas: 'bg-gas/10 border-gas',
    municipal: 'bg-municipal/10 border-municipal',
  };

  if (paymentStatus === 'completed') {
    return (
      <Card className={`border-2 ${departmentColors[department]}`}>
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-4 rounded-full bg-success/20 p-4">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{t.payments.paymentSuccess}</h3>
          <p className="mt-2 text-muted-foreground">₹{amount.toLocaleString('en-IN')}</p>
          
          <div className="mt-6 w-full space-y-3 rounded-lg bg-muted p-4 text-left">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t.payments.transactionId}</span>
              <span className="font-mono font-semibold">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t.payments.billNumber}</span>
              <span className="font-semibold">{billNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Consumer</span>
              <span className="font-semibold">{consumerName}</span>
            </div>
          </div>

          <div className="mt-6 flex w-full gap-3">
            <Button variant="outline" className="flex-1 touch-target gap-2">
              <Download className="h-4 w-4" />
              {t.payments.downloadReceipt}
            </Button>
            <Button variant="outline" className="flex-1 touch-target gap-2">
              <Printer className="h-4 w-4" />
              {t.payments.printReceipt}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 ${departmentColors[department]}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t.payments.billPayment}</CardTitle>
        <CardDescription>{t.payments.scanQR}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bill Details */}
        <div className="space-y-3 rounded-lg bg-muted/50 p-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t.payments.billNumber}</span>
            <span className="font-semibold">{billNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Consumer</span>
            <span className="font-semibold">{consumerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Consumer No.</span>
            <span className="font-mono">{consumerNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t.payments.dueDate}</span>
            <span className="font-semibold">{dueDate}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg">
            <span className="font-medium">{t.payments.amount}</span>
            <span className="font-bold text-foreground">₹{amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-xl border-4 border-muted bg-white p-4">
            <QRCodeSVG
              value={upiString}
              size={200}
              level="H"
              includeMargin
              imageSettings={{
                src: '/favicon.ico',
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </div>
          
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{t.payments.upiId}: </span>
            <code className="font-mono">{upiId}</code>
            <Button variant="ghost" size="icon" onClick={handleCopyUPI} className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'processing' ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-warning/10 py-4 text-warning">
            <Clock className="h-5 w-5 animate-pulse" />
            <span className="font-medium">Waiting for payment confirmation...</span>
          </div>
        ) : (
          <Button 
            onClick={simulatePaymentConfirmation} 
            className="w-full touch-target text-lg"
            size="lg"
          >
            {t.payments.payNow} - ₹{amount.toLocaleString('en-IN')}
          </Button>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Scan the QR code using any UPI app (Google Pay, PhonePe, Paytm, etc.)
        </p>
      </CardContent>
    </Card>
  );
}
