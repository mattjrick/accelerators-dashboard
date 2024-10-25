import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  acceleratorNames: string[];
}

const OverviewTabsContent: React.FC<OverviewTabsContentProps> = ({ formState, handleInputChange, acceleratorNames }) => {
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
              <Input
                id="linked_service"
                value={formState.linked_service}
                onChange={(e) => handleInputChange('linked_service', e.target.value)}
              />
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
              <Label htmlFor="effort">Times Used</Label>
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
            <Label>Linked Accelerators</Label>
            {formState.linked_accelerators.map((accelerator, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={accelerator}
                  onChange={(e) => {
                    const newAccelerators = [...formState.linked_accelerators];
                    newAccelerators[index] = e.target.value;
                    handleInputChange('linked_accelerators', newAccelerators);
                  }}
                  placeholder="Enter accelerator"
                />
                {index === formState.linked_accelerators.length - 1 && (
                  <Button type="button" onClick={() => handleInputChange('linked_accelerators', [...formState.linked_accelerators, ''])}>
                    Add
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OverviewTabsContent;