import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { mockSalesData, mockInsights, mockCustomers } from "@/lib/mockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Insights = () => {
  const revenueByRegion = mockSalesData.reduce((acc, item) => {
    acc[item.region] = (acc[item.region] || 0) + item.revenue;
    return acc;
  }, {} as Record<string, number>);

  const regionData = Object.entries(revenueByRegion).map(([name, value]) => ({ name, value }));
  
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  const productRevenue = mockSalesData.reduce((acc, item) => {
    acc[item.product] = (acc[item.product] || 0) + item.revenue;
    return acc;
  }, {} as Record<string, number>);

  const productData = Object.entries(productRevenue)
    .map(([product, revenue]) => ({ product, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Business Insights</h1>
          <p className="text-muted-foreground">Data-driven intelligence for your business</p>
        </div>

        {/* AI Summary */}
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-xl font-bold mb-3">🤖 AI Summary</h2>
          <p className="text-lg mb-4">{mockInsights.summary}</p>
          <div className="p-4 bg-background rounded-lg">
            <p className="font-semibold text-primary">30-Day Forecast</p>
            <p className="text-muted-foreground">{mockInsights.forecast}</p>
          </div>
        </Card>

        {/* Revenue Trend */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Performance & Regional Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Top Products by Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Revenue by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Customer Intelligence */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Top Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Total Spent</th>
                  <th className="text-left py-3 px-4">Visits</th>
                  <th className="text-left py-3 px-4">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((customer) => (
                  <tr key={customer.email} className="border-b">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.email}</td>
                    <td className="py-3 px-4 font-semibold">KES {customer.totalSpent.toLocaleString()}</td>
                    <td className="py-3 px-4">{customer.visits}</td>
                    <td className="py-3 px-4 text-muted-foreground">{customer.lastPurchase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
