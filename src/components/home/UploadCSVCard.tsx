import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { parseCSV, REQUIRED_COLUMNS, uploadCSVData, getSession, SalesRow } from "@/lib/sessionStore";
import { aiGenerate, ingestCSV } from "@/lib/apiStubs";

interface UploadCSVCardProps {
  onUploadComplete: () => void;
}

const UploadCSVCard = ({ onUploadComplete }: UploadCSVCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".csv")) {
        setUploadError("Please upload a CSV file");
        return;
      }

      setIsProcessing(true);
      setUploadError(null);

      try {
        const text = await file.text();
        const result = parseCSV(text);

        if (!result.success) {
          const errorResult = result as { success: false; error: string; missingColumns: string[] };
          setUploadError(errorResult.error);
          toast.error("CSV validation failed", {
            description: errorResult.error,
          });
          setIsProcessing(false);
          return;
        }

        const successResult = result as { success: true; rows: SalesRow[]; headers: string[] };

        // Ingest CSV
        await ingestCSV({ rows: successResult.rows, filename: file.name });

        toast.success("CSV uploaded successfully!", {
          description: `${successResult.rows.length} records loaded`,
        });

        // Regenerate insights
        toast.loading("Generating AI insights...");
        await aiGenerate({
          action: "regenerate_insights",
          dataPreview: successResult.rows.slice(0, 10),
          context: { businessProfile: getSession().businessProfile },
        });

        // Generate content samples
        await aiGenerate({
          action: "generate_content_samples",
          dataSummary: { rowCount: successResult.rows.length },
        });

        toast.dismiss();
        toast.success("Insights generated!");

        onUploadComplete();
      } catch (error) {
        console.error("Upload error:", error);
        setUploadError("Failed to process file");
        toast.error("Upload failed");
      } finally {
        setIsProcessing(false);
      }
    },
    [onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const downloadTemplate = () => {
    const template = `date,product,units,revenue,region,customer_email
2024-01-01,Baby Diapers,34,10200,Nairobi,grace@mail.com
2024-01-02,Baby Oil,26,7800,Kisumu,kevin@mail.com`;
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      id="upload-csv-card"
      className={`p-6 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-primary/10 ${
        isDragging ? "border-primary border-2 bg-primary/5" : "border-border/50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={!isProcessing ? handleClick : undefined}
    >
      <input
        ref={fileInputRef}
        id="upload-csv-input"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleChange}
      />

      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
            isProcessing
              ? "bg-primary/20"
              : isDragging
              ? "bg-primary/30 scale-110"
              : "bg-primary/10 group-hover:bg-primary/20"
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-primary" />
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-1">Upload CSV</h3>
          <p className="text-sm text-muted-foreground">
            {isProcessing
              ? "Processing your data..."
              : isDragging
              ? "Drop file here"
              : "Drag & drop or click to upload"}
          </p>
        </div>

        {uploadError && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Required: {REQUIRED_COLUMNS.join(", ")}
        </div>

        <Button
          id="upload-csv-btn"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            downloadTemplate();
          }}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download Template
        </Button>
      </div>
    </Card>
  );
};

export default UploadCSVCard;
