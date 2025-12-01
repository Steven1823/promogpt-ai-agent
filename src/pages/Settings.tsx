import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockBusinessProfile } from "@/lib/mockData";
import { toast } from "sonner";

const Settings = () => {
  const [profile, setProfile] = useState(mockBusinessProfile);

  const handleSave = () => {
    toast.success("Business profile saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Settings</h1>
          <p className="text-muted-foreground">Manage your business profile and brand identity</p>
        </div>

        <div className="max-w-3xl space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Business Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={profile.industry}
                  onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={profile.targetAudience}
                  onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="products">Products/Services</Label>
                <Textarea
                  id="products"
                  value={profile.products}
                  onChange={(e) => setProfile({ ...profile, products: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Brand Voice</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandVoice">Content Voice Style</Label>
                <Input
                  id="brandVoice"
                  value={profile.brandVoice}
                  onChange={(e) => setProfile({ ...profile, brandVoice: e.target.value })}
                  placeholder="e.g., Friendly, professional, humorous"
                />
              </div>

              <div className="space-y-2">
                <Label>Brand Colors</Label>
                <div className="flex gap-4">
                  {profile.brandColors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...profile.brandColors];
                          newColors[index] = e.target.value;
                          setProfile({ ...profile, brandColors: newColors });
                        }}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <span className="text-sm text-muted-foreground">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Social Media Links</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={profile.socialMedia.instagram}
                  onChange={(e) => setProfile({
                    ...profile,
                    socialMedia: { ...profile.socialMedia, instagram: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={profile.socialMedia.facebook}
                  onChange={(e) => setProfile({
                    ...profile,
                    socialMedia: { ...profile.socialMedia, facebook: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok">TikTok</Label>
                <Input
                  id="tiktok"
                  value={profile.socialMedia.tiktok}
                  onChange={(e) => setProfile({
                    ...profile,
                    socialMedia: { ...profile.socialMedia, tiktok: e.target.value }
                  })}
                />
              </div>
            </div>
          </Card>

          <Button size="lg" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
