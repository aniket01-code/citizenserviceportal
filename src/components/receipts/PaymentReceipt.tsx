import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Printer, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface PaymentReceiptProps {
  receiptNumber: string;
  transactionId: string;
  department: 'electricity' | 'gas' | 'municipal';
  consumerName: string;
  consumerNumber: string;
  billNumber: string;
  amount: number;
  paymentMethod: string;
  paymentDate: Date;
  billingPeriod: string;
}

export function PaymentReceipt({
  receiptNumber,
  transactionId,
  department,
  consumerName,
  consumerNumber,
  billNumber,
  amount,
  paymentMethod,
  paymentDate,
  billingPeriod,
}: PaymentReceiptProps) {
  const { t } = useLanguage();
  const receiptRef = useRef<HTMLDivElement>(null);

  const departmentNames = {
    electricity: 'Electricity Department',
    gas: 'Gas Distribution Office',
    municipal: 'Municipal Corporation',
  };

  const handlePrint = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=400,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt - ${receiptNumber}</title>
          <style>
            body {
              font-family: 'Segoe UI', system-ui, sans-serif;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 2px dashed #ccc;
              padding-bottom: 16px;
              margin-bottom: 16px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #1e3a5f;
            }
            .subtitle {
              color: #666;
              margin-top: 4px;
            }
            .success-badge {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              background: #dcfce7;
              color: #16a34a;
              padding: 6px 12px;
              border-radius: 20px;
              font-weight: 600;
              margin-top: 12px;
            }
            .details {
              margin: 16px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              color: #666;
            }
            .detail-value {
              font-weight: 600;
            }
            .amount-row {
              background: #f8fafc;
              padding: 12px;
              margin: 16px 0;
              border-radius: 8px;
            }
            .amount-label {
              color: #666;
              font-size: 14px;
            }
            .amount-value {
              font-size: 28px;
              font-weight: bold;
              color: #1e3a5f;
            }
            .footer {
              text-align: center;
              margin-top: 24px;
              padding-top: 16px;
              border-top: 2px dashed #ccc;
              color: #666;
              font-size: 12px;
            }
            @media print {
              body { padding: 10px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">नागरिक सेवा</div>
            <div class="subtitle">Nagrik Seva - Citizen Services</div>
            <div class="success-badge">✓ Payment Successful</div>
          </div>
          
          <div class="amount-row">
            <div class="amount-label">Amount Paid</div>
            <div class="amount-value">₹${amount.toLocaleString('en-IN')}</div>
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Receipt No.</span>
              <span class="detail-value">${receiptNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Transaction ID</span>
              <span class="detail-value">${transactionId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Department</span>
              <span class="detail-value">${departmentNames[department]}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Consumer Name</span>
              <span class="detail-value">${consumerName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Consumer No.</span>
              <span class="detail-value">${consumerNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Bill Number</span>
              <span class="detail-value">${billNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Billing Period</span>
              <span class="detail-value">${billingPeriod}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Method</span>
              <span class="detail-value">${paymentMethod.toUpperCase()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Date</span>
              <span class="detail-value">${format(paymentDate, 'dd MMM yyyy, hh:mm a')}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your payment!</p>
            <p>This is a computer-generated receipt.</p>
            <p>For queries: 1800-XXX-XXXX</p>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = () => {
    // Create a simple text receipt for download
    const receiptText = `
NAGRIK SEVA - PAYMENT RECEIPT
================================

PAYMENT SUCCESSFUL ✓

Amount Paid: ₹${amount.toLocaleString('en-IN')}

--------------------------------
Receipt No.: ${receiptNumber}
Transaction ID: ${transactionId}
Department: ${departmentNames[department]}
Consumer Name: ${consumerName}
Consumer No.: ${consumerNumber}
Bill Number: ${billNumber}
Billing Period: ${billingPeriod}
Payment Method: ${paymentMethod.toUpperCase()}
Payment Date: ${format(paymentDate, 'dd MMM yyyy, hh:mm a')}
--------------------------------

Thank you for your payment!
This is a computer-generated receipt.
For queries: 1800-XXX-XXXX
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mx-auto max-w-md border-2" ref={receiptRef}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">नागरिक सेवा</h2>
          <p className="text-sm text-muted-foreground">Nagrik Seva - Citizen Services</p>
          
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">{t.payments.paymentSuccess}</span>
          </div>
        </div>

        {/* Amount */}
        <div className="my-6 rounded-lg bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">{t.payments.amount}</p>
          <p className="text-3xl font-bold text-foreground">
            ₹{amount.toLocaleString('en-IN')}
          </p>
        </div>

        <Separator className="my-4" />

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Receipt No.</span>
            <span className="font-mono font-semibold">{receiptNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t.payments.transactionId}</span>
            <span className="font-mono font-semibold">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Department</span>
            <span className="font-semibold">{departmentNames[department]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Consumer</span>
            <span className="font-semibold">{consumerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Consumer No.</span>
            <span className="font-mono">{consumerNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t.payments.billNumber}</span>
            <span className="font-semibold">{billNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Billing Period</span>
            <span className="font-semibold">{billingPeriod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-semibold uppercase">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Date</span>
            <span className="font-semibold">{format(paymentDate, 'dd MMM yyyy, hh:mm a')}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 touch-target gap-2"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            {t.payments.downloadReceipt}
          </Button>
          <Button
            variant="outline"
            className="flex-1 touch-target gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            {t.payments.printReceipt}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Thank you for your payment!</p>
          <p>This is a computer-generated receipt.</p>
          <p className="mt-1">For queries: 1800-XXX-XXXX</p>
        </div>
      </CardContent>
    </Card>
  );
}
