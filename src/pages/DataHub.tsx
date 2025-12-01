import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Database, TrendingUp, CheckCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockSalesData } from "@/lib/mockData";

const DataHub = () => {
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleUpload = async () => {
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setUploaded(true);
    toast.success("Data uploaded and processed successfully!");
  };

  const handleConnect = (platform: string) => {
    toast.info(`${platform} integration coming soon!`);
  };

  if (uploaded) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Data Hub</h1>
            <p className="text-muted-foreground">Your unified business data center</p>
          </div>

          <Card className="p-8 text-center mb-6 border-primary/20 bg-primary/5">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Data Connected!</h2>
            <p className="text-muted-foreground mb-4">
              Your sales data has been processed and is now powering AI insights
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">📊 Data Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Records</span>
                  <span className="font-medium">{mockSalesData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Range</span>
                  <span className="font-medium">Jan 1-5, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Products</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Regions</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">📈 Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">KES 53,700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Units</span>
                  <span className="font-medium">183</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Order Value</span>
                  <span className="font-medium">KES 293</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Top Product</span>
                  <span className="font-medium">Baby Diapers</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-semibold">Sales Data Preview</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-left">Units</th>
                    <th className="px-6 py-3 text-left">Revenue</th>
                    <th className="px-6 py-3 text-left">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalesData.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-6 py-4">{row.date}</td>
                      <td className="px-6 py-4">{row.product}</td>
                      <td className="px-6 py-4">{row.units}</td>
                      <td className="px-6 py-4">KES {row.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4">{row.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button onClick={() => setUploaded(false)}>Upload New Data</Button>
            <Button variant="outline">View Full Dataset</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Data Hub</h1>
          <p className="text-muted-foreground">Upload or connect your business data</p>
        </div>

        {/* Upload CSV */}
        <Card className="p-8 text-center mb-6">
          <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Upload Sales Data</h2>
          <p className="text-muted-foreground mb-6">
            Upload your CSV file to generate instant insights and AI-powered recommendations
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Expected columns: date, product, units, revenue, region, customer_email
          </p>
          <Button 
            onClick={handleUpload} 
            disabled={processing}
            size="lg"
          >
            {processing ? "Processing..." : "Upload CSV File"}
          </Button>
        </Card>

        {/* E-commerce Integrations */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Or Connect Your Store</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleConnect("Shopify")}>
              <Database className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Shopify</h4>
              <p className="text-sm text-muted-foreground mb-4">Connect your Shopify store</p>
              <Button variant="outline" className="w-full">Connect</Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleConnect("Jumia")}>
              <Database className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Jumia</h4>
              <p className="text-sm text-muted-foreground mb-4">Connect your Jumia seller account</p>
              <Button variant="outline" className="w-full">Connect</Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleConnect("WooCommerce")}>
              <Database className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">WooCommerce</h4>
              <p className="text-sm text-muted-foreground mb-4">Connect your WooCommerce store</p>
              <Button variant="outline" className="w-full">Connect</Button>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="font-semibold mb-4">What happens after you connect?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">Instant Insights</p>
                <p className="text-sm text-muted-foreground">AI analyzes your data and generates business intelligence</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">AI Content</p>
                <p className="text-sm text-muted-foreground">Auto-generate marketing content tailored to your products</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">Automated Marketing</p>
                <p className="text-sm text-muted-foreground">Schedule and publish content across all channels</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DataHub;
