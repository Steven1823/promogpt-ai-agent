import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockSalesData, mockInsights } from "@/lib/mockData";
import { TrendingUp, TrendingDown, AlertCircle, Sparkles } from "lucide-react";

const ProductInsights = () => {
  const productPerformance = mockSalesData.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = { units: 0, revenue: 0 };
    }
    acc[item.product].units += item.units;
    acc[item.product].revenue += item.revenue;
    return acc;
  }, {} as Record<string, { units: number; revenue: number }>);

  const products = Object.entries(productPerformance)
    .map(([name, data]) => ({
      name,
      ...data,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendValue: Math.floor(Math.random() * 30) + 5,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Insights</h1>
          <p className="text-muted-foreground">AI-powered product performance and recommendations</p>
        </div>

        {/* AI Recommendations */}
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-background rounded-lg">
              <p className="font-semibold mb-1">💰 Pricing Opportunity</p>
              <p className="text-sm text-muted-foreground">
                Baby Diapers could support a 5% price increase based on demand patterns
              </p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="font-semibold mb-1">📦 Upsell Suggestion</p>
              <p className="text-sm text-muted-foreground">
                Customers buying Baby Oil often add Baby Lotion - create bundle offer
              </p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="font-semibold mb-1">⚠️ Stock Alert</p>
              <p className="text-sm text-muted-foreground">
                Baby Wipes selling 40% faster than usual - consider restocking
              </p>
            </div>
          </div>
        </Card>

        {/* Product Performance Table */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Product Performance</h3>
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.units} units sold
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold">KES {product.revenue.toLocaleString()}</p>
                    <div className={`flex items-center gap-1 text-sm ${
                      product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{product.trendValue}%</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Low Performers Alert */}
        <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Products Needing Attention</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Baby Shampoo sales are 20% below average. Consider promotional campaign or product review.
              </p>
              <Button variant="outline" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Promotion Ideas
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProductInsights;
