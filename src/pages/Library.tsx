import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Download, Trash2 } from "lucide-react";
import { mockGeneratedContent } from "@/lib/mockData";

const Library = () => {
  const contentItems = [
    { id: 1, type: "Instagram Caption", content: mockGeneratedContent.instagramCaption, date: "2024-01-10", favorite: true },
    { id: 2, type: "Email Campaign", content: mockGeneratedContent.emailCampaign, date: "2024-01-09", favorite: false },
    { id: 3, type: "TikTok Script", content: mockGeneratedContent.tiktokScript, date: "2024-01-08", favorite: true },
    { id: 4, type: "Ad Script", content: mockGeneratedContent.adScript, date: "2024-01-07", favorite: false },
    { id: 5, type: "Blog Post", content: mockGeneratedContent.blogPost.substring(0, 200) + "...", date: "2024-01-06", favorite: true },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content Library</h1>
          <p className="text-muted-foreground">Store and manage all your generated content</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search content..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Star className="w-4 h-4 mr-2" />
            Favorites Only
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="ads">Ads</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="blog">Blogs</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {contentItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {item.type}
                      </span>
                      {item.favorite && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                    <p className="text-sm">{item.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Library;
