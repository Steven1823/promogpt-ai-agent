import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, CheckCircle } from "lucide-react";
import { mockSalesData } from "@/lib/mockData";
import { toast } from "sonner";

const Upload = () => {
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleUpload = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setUploaded(true);
      toast.success("Data uploaded and processed successfully!");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Business Data</h1>
          <p className="text-muted-foreground">Import your sales data to generate insights</p>
        </div>

        {!uploaded ? (
          <Card className="p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <UploadIcon className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Upload Your CSV File</h2>
            <p className="text-muted-foreground mb-8">
              Drag and drop your sales data CSV file here, or click to browse
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-12 mb-6 hover:border-primary transition-colors cursor-pointer">
              <p className="text-muted-foreground">Drop your CSV file here</p>
            </div>
            <Button size="lg" onClick={handleUpload} disabled={processing}>
              {processing ? "Processing..." : "Upload CSV File"}
            </Button>
            <div className="mt-8 text-left bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Expected columns:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Date (YYYY-MM-DD)</li>
                <li>• Product name</li>
                <li>• Units sold</li>
                <li>• Revenue</li>
                <li>• Region/Location</li>
              </ul>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    Data Uploaded Successfully!
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {mockSalesData.length} records processed and ready for analysis
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data Preview</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Date</th>
                      <th className="text-left py-2 px-4">Product</th>
                      <th className="text-left py-2 px-4">Units</th>
                      <th className="text-left py-2 px-4">Revenue</th>
                      <th className="text-left py-2 px-4">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSalesData.slice(0, 5).map((row, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2 px-4">{row.date}</td>
                        <td className="py-2 px-4">{row.product}</td>
                        <td className="py-2 px-4">{row.units}</td>
                        <td className="py-2 px-4">KES {row.revenue.toLocaleString()}</td>
                        <td className="py-2 px-4">{row.region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Showing 5 of {mockSalesData.length} records
              </p>
            </Card>

            <div className="flex gap-4">
              <Button onClick={() => setUploaded(false)}>Upload New File</Button>
              <Button variant="outline">View Full Dataset</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Upload;
