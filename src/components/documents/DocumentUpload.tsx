import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, Image, X, Check, Loader2 } from 'lucide-react';

type DocumentType = 'id_proof' | 'address_proof' | 'meter_photo' | 'bill_copy' | 'other';

interface UploadedDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  uploadedAt: Date;
}

interface DocumentUploadProps {
  department?: 'electricity' | 'gas' | 'municipal';
  complaintId?: string;
  onUploadComplete?: (doc: UploadedDocument) => void;
}

export function DocumentUpload({ department, complaintId, onUploadComplete }: DocumentUploadProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedType, setSelectedType] = useState<DocumentType>('id_proof');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);

  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: 'id_proof', label: t.documents.idProof },
    { value: 'address_proof', label: t.documents.addressProof },
    { value: 'meter_photo', label: t.documents.meterPhoto },
    { value: 'bill_copy', label: t.documents.billCopy },
    { value: 'other', label: t.documents.other },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please login to upload documents',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Error',
        description: 'Only JPG, PNG, WEBP, and PDF files are allowed',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('citizen-documents')
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      // Save document metadata to database
      const { data: docData, error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          department: department || null,
          complaint_id: complaintId || null,
          document_type: selectedType,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setUploadProgress(100);

      const uploadedDoc: UploadedDocument = {
        id: docData.id,
        name: file.name,
        type: selectedType,
        size: file.size,
        uploadedAt: new Date(),
      };

      setUploadedDocs((prev) => [...prev, uploadedDoc]);
      onUploadComplete?.(uploadedDoc);

      toast({
        title: t.documents.uploadSuccess,
        description: file.name,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeDocument = async (docId: string) => {
    try {
      const doc = uploadedDocs.find((d) => d.id === docId);
      if (!doc) return;

      await supabase.from('documents').delete().eq('id', docId);
      setUploadedDocs((prev) => prev.filter((d) => d.id !== docId));

      toast({
        title: 'Document removed',
      });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t.documents.uploadDocument}
        </CardTitle>
        <CardDescription>{t.documents.maxSize}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Document Type Selector */}
        <div>
          <label className="mb-2 block text-sm font-medium">{t.documents.selectType}</label>
          <Select value={selectedType} onValueChange={(v) => setSelectedType(v as DocumentType)}>
            <SelectTrigger className="touch-target">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="touch-target">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Drop Zone */}
        <div
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {uploading ? (
            <div className="space-y-4">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <Progress value={uploadProgress} className="mx-auto w-48" />
              <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">{t.documents.dragDrop}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                JPG, PNG, WEBP, PDF • Max 5MB
              </p>
            </>
          )}
        </div>

        {/* Uploaded Documents List */}
        {uploadedDocs.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t.documents.uploaded}</h4>
            {uploadedDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg bg-muted p-3"
              >
                <div className="flex items-center gap-3">
                  {doc.name.endsWith('.pdf') ? (
                    <FileText className="h-8 w-8 text-destructive" />
                  ) : (
                    <Image className="h-8 w-8 text-info" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {documentTypes.find((t) => t.value === doc.type)?.label} • {formatFileSize(doc.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    {t.documents.uploaded}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDocument(doc.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
