import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

interface OverviewTabsContentProps {
  formState: {
    name: string;
    linked_service: string;
    description: string;
    effort: number;
    times_used: number;
    status: string;
    linked_accelerators: string[];
  };
  handleInputChange: (field: string, value: any) => void;
  acceleratorNames?: { name: string }[];
}

const OverviewTabsContent: React.FC<OverviewTabsContentProps> = ({ formState, handleInputChange, acceleratorNames = [] }) => {
  const handleLinkedAcceleratorsChange = (selectedAccelerators: string[]) => {
    handleInputChange('linked_accelerators', selectedAccelerators);
  };

  const available_services = [
    { value: "Core Cloud", label: "Core Cloud" },
    { value: "Discovery", label: "Discovery" },
    { value: "Secure by Design", label: "Secure by Design" },
    { value: "Cloud strategy", label: "Cloud strategy" },
    { value: "Platform", label: "Platform" },
    { value: "Automation", label: "Automation" },
    { value: "FinOps", label: "FinOps" },
  ];

  return (
    <TabsContent value="overview">
      <Card>
        <CardHeader>
          <CardTitle>Accelerator Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formState.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linked_service">Linked Service</Label>
              <Select
                onValueChange={(value) => handleInputChange('linked_service', value)}
                defaultValue={formState.linked_service}
              >
                <SelectTrigger id="linked_service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {available_services.map(service => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formState.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="effort">Effort (hours)</Label>
              <Input
                id="effort"
                type="number"
                value={formState.effort}
                onChange={(e) => handleInputChange('effort', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="times_used">Times Used</Label>
              <Input
                id="times_used"
                type="number"
                value={formState.times_used}
                onChange={(e) => handleInputChange('times_used', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => handleInputChange('status', value)}
                defaultValue={formState.status}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linked_accelerators">Linked Accelerators</Label>
            <MultiSelect
              options={acceleratorNames.map(a => ({ label: a.name, value: a.name }))}
              onValueChange={handleLinkedAcceleratorsChange}
              defaultValue={formState.linked_accelerators}
              placeholder="Select linked accelerators"
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OverviewTabsContent;